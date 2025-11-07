/**
 * Cache Revalidation Webhook Endpoint
 *
 * This API route allows the PHP backend to trigger cache revalidation
 * when data changes in the MySQL database.
 *
 * Security: Uses a secret token to authenticate requests
 *
 * @example PHP Backend Usage:
 * ```php
 * $secret = 'your-secret-token';
 * $url = 'https://yourdomain.com/api/revalidate';
 * $data = ['type' => 'brands', 'lang' => 'tr'];
 *
 * $ch = curl_init($url);
 * curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 * curl_setopt($ch, CURLOPT_POST, true);
 * curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
 * curl_setopt($ch, CURLOPT_HTTPHEADER, [
 *     'Content-Type: application/json',
 *     'X-Revalidate-Secret: ' . $secret
 * ]);
 * $response = curl_exec($ch);
 * ```
 */

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// Define allowed revalidation types
type RevalidationType =
  | 'categories'
  | 'subcategories'
  | 'floors'
  | 'brands'
  | 'citys-times'
  | 'citys-park'
  | 'citys-living'
  | 'citys-members-club'
  | 'residences-slider'
  | 'all'

interface RevalidateRequest {
  type: RevalidationType | RevalidationType[]
  lang?: string
  categoryId?: string
  filters?: {
    category?: string
    subCategory?: string
    floor?: string
  }
}

// Get secret from environment variable
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  try {
    // 1. Verify secret token
    const token = request.headers.get('X-Revalidate-Secret')

    if (!REVALIDATE_SECRET) {
      console.error('REVALIDATE_SECRET not configured')
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 500 }
      )
    }

    if (token !== REVALIDATE_SECRET) {
      console.error('Invalid revalidation token')
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // 2. Parse request body
    const body: RevalidateRequest = await request.json()
    const { type, lang, categoryId, filters } = body

    if (!type) {
      return NextResponse.json(
        { error: 'Missing "type" parameter' },
        { status: 400 }
      )
    }

    // 3. Perform revalidation based on type
    const types = Array.isArray(type) ? type : [type]
    const revalidatedTags: string[] = []

    for (const t of types) {
      switch (t) {
        case 'categories':
          revalidateTag('categories')
          revalidatedTags.push('categories')
          if (lang) {
            revalidateTag(`categories-${lang}`)
            revalidatedTags.push(`categories-${lang}`)
          }
          break

        case 'subcategories':
          revalidateTag('subcategories')
          revalidatedTags.push('subcategories')
          if (lang) {
            revalidateTag(`subcategories-${lang}`)
            revalidatedTags.push(`subcategories-${lang}`)
          }
          if (categoryId) {
            revalidateTag(`subcategories-${categoryId}`)
            revalidatedTags.push(`subcategories-${categoryId}`)
          }
          break

        case 'floors':
          revalidateTag('floors')
          revalidatedTags.push('floors')
          if (lang) {
            revalidateTag(`floors-${lang}`)
            revalidatedTags.push(`floors-${lang}`)
          }
          break

        case 'brands':
          revalidateTag('brands')
          revalidatedTags.push('brands')
          if (lang) {
            revalidateTag(`brands-${lang}`)
            revalidatedTags.push(`brands-${lang}`)
          }
          if (filters?.category) {
            revalidateTag(`brands-category-${filters.category}`)
            revalidatedTags.push(`brands-category-${filters.category}`)
          }
          if (filters?.subCategory) {
            revalidateTag(`brands-subcategory-${filters.subCategory}`)
            revalidatedTags.push(`brands-subcategory-${filters.subCategory}`)
          }
          if (filters?.floor) {
            revalidateTag(`brands-floor-${filters.floor}`)
            revalidatedTags.push(`brands-floor-${filters.floor}`)
          }
          break

        case 'citys-times':
          revalidateTag('citys-times')
          revalidatedTags.push('citys-times')
          if (lang) {
            revalidateTag(`citys-times-${lang}`)
            revalidatedTags.push(`citys-times-${lang}`)
          }
          break

        case 'citys-park':
          revalidateTag('citys-citysPark')
          revalidatedTags.push('citys-citysPark')
          break

        case 'citys-living':
          revalidateTag('citys-citysLiving')
          revalidatedTags.push('citys-citysLiving')
          break

        case 'citys-members-club':
          revalidateTag('citys-membersClub')
          revalidatedTags.push('citys-membersClub')
          break

        case 'residences-slider':
          revalidateTag('residences-slider')
          revalidateTag('citys-residencesSlider')
          revalidatedTags.push('residences-slider', 'citys-residencesSlider')
          break

        case 'all':
          // Revalidate everything
          const allTags = [
            'categories',
            'subcategories',
            'floors',
            'brands',
            'citys-times',
            'citys-citysPark',
            'citys-citysLiving',
            'citys-membersClub',
            'residences-slider',
            'citys-residencesSlider',
          ]
          allTags.forEach(tag => revalidateTag(tag))
          revalidatedTags.push(...allTags)
          break

        default:
          return NextResponse.json(
            { error: `Unknown type: ${t}` },
            { status: 400 }
          )
      }
    }

    // 4. Return success response
    return NextResponse.json({
      success: true,
      revalidated: types,
      tags: revalidatedTags,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      {
        error: 'Revalidation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Optional: Support GET requests for testing
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('secret')

  if (!REVALIDATE_SECRET || token !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({
    message: 'Revalidation webhook is active',
    usage: 'Send POST request with X-Revalidate-Secret header',
    example: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Revalidate-Secret': 'your-secret-token',
      },
      body: {
        type: 'brands',
        lang: 'tr',
      },
    },
  })
}
