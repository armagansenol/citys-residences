// /app/api/mux/static-renditions/route.ts
import { NextResponse } from 'next/server'

const MUX_TOKEN_ID = process.env.MUX_TOKEN_ID!
const MUX_TOKEN_SECRET = process.env.MUX_TOKEN_SECRET!

console.log('MUX_TOKEN_ID', MUX_TOKEN_ID)
console.log('MUX_TOKEN_SECRET', MUX_TOKEN_SECRET)

const BASE_URL = 'https://api.mux.com/video/v1'

// Basic auth header
const authHeader =
  'Basic ' +
  Buffer.from(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`).toString('base64')

async function fetchJson(url: string) {
  const res = await fetch(url, {
    headers: { Authorization: authHeader },
  })
  return res.json()
}

type MuxAsset = {
  id: string
  [key: string]: unknown
}

async function fetchAllAssets(): Promise<MuxAsset[]> {
  const allAssets: MuxAsset[] = []
  const limit = 100 // Mux API max limit per page
  let pageToken: string | undefined = undefined
  let pageCount = 0

  while (true) {
    const url = pageToken
      ? `${BASE_URL}/assets?limit=${limit}&page_token=${pageToken}`
      : `${BASE_URL}/assets?limit=${limit}`

    const response = await fetchJson(url)
    pageCount++

    if (response?.data && Array.isArray(response.data)) {
      allAssets.push(...(response.data as MuxAsset[]))
      console.log(
        `Fetched page ${pageCount}: ${response.data.length} assets (total: ${allAssets.length})`
      )

      // Mux API uses cursor-based pagination
      // Check if there's a next page token
      pageToken = response?.pagination?.next_page_token

      if (!pageToken) {
        console.log(`Finished fetching all assets. Total: ${allAssets.length}`)
        break // No more pages
      }
    } else {
      console.log(`Unexpected response format on page ${pageCount}`)
      break
    }
  }

  return allAssets
}

async function hasStaticRenditions(assetId: string) {
  const res = await fetchJson(`${BASE_URL}/assets/${assetId}`)

  // Check if static renditions exist (ready) or are being prepared
  // This prevents creating duplicates
  const staticRenditions = res?.data?.static_renditions
  return (
    staticRenditions?.ready === true ||
    staticRenditions?.status === 'preparing' ||
    staticRenditions?.status === 'ready'
  )
}

async function createStaticRenditions(assetId: string) {
  const res = await fetch(`${BASE_URL}/assets/${assetId}/static-renditions`, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resolution: 'highest', // generates low, medium, high
    }),
  })

  const data = await res.json()

  // If Mux returns an error saying static renditions already exist, handle it gracefully
  if (!res.ok && data?.error) {
    // Check if error is about static renditions already existing
    const errorMessage = data.error?.message || JSON.stringify(data.error)
    if (
      errorMessage.includes('already') ||
      errorMessage.includes('exists') ||
      errorMessage.includes('duplicate')
    ) {
      console.log(
        `Asset ${assetId} already has static renditions (Mux API error)`
      )
      return { alreadyExists: true, data }
    }
    throw new Error(`Mux API error: ${errorMessage}`)
  }

  return data
}

type ReportItem =
  | {
      assetId: string
      status: 'already-exists'
    }
  | {
      assetId: string
      status: 'triggered'
      mux: unknown
    }
  | {
      assetId: string
      status: 'error'
      error: string
    }

export async function GET(request: Request) {
  try {
    // Get limit from query parameter (default: process all assets)
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : undefined

    const allAssets = await fetchAllAssets()

    if (!allAssets || allAssets.length === 0) {
      return NextResponse.json({ error: 'No assets found.' }, { status: 404 })
    }

    // Filter to only process existing assets up to the limit
    const assetsToProcess = limit ? allAssets.slice(0, limit) : allAssets

    console.log(
      `Processing ${assetsToProcess.length} assets (out of ${allAssets.length} total)`
    )

    const report: ReportItem[] = []
    const processedAssetIds = new Set<string>() // Track processed assets to prevent duplicates

    for (const asset of assetsToProcess) {
      const assetId = asset.id

      // Skip if we've already processed this asset ID (deduplication)
      if (processedAssetIds.has(assetId)) {
        console.log(`Skipping duplicate asset ID: ${assetId}`)
        continue
      }
      processedAssetIds.add(assetId)

      const alreadyHave = await hasStaticRenditions(assetId)

      if (alreadyHave) {
        report.push({
          assetId,
          status: 'already-exists',
        })
        continue
      }

      // Trigger the generation
      try {
        const result = await createStaticRenditions(assetId)

        // Check if Mux API indicated it already exists
        if (result?.alreadyExists) {
          report.push({
            assetId,
            status: 'already-exists',
          })
        } else {
          report.push({
            assetId,
            status: 'triggered',
            mux: result,
          })
        }
      } catch (error) {
        console.error(`Error creating static renditions for ${assetId}:`, error)
        report.push({
          assetId,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }

      // Avoid rate limits
      await new Promise(res => setTimeout(res, 800))
    }

    return NextResponse.json({
      ok: true,
      totalAssets: allAssets.length,
      assetsToProcess: assetsToProcess.length,
      processed: report.length,
      details: report,
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    )
  }
}
