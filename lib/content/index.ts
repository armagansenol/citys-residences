import fs from "fs"
import path from "path"
import { ReactNode } from "react"
import { compileMDX } from "next-mdx-remote/rsc"
import { getCitysParkContent as getOutstaticCitysParkContent } from "../outstatic"

export interface ContentItem {
  title: ReactNode
  subtitle: ReactNode
  image: string
  images?: string[]
  sectionId: string
  order: number
  content: ReactNode
  url: string[]
  description: ReactNode
  bg?: string
}

export interface ContentFrontmatter {
  title: string
  subtitle: string
  image: string
  sectionId: string
  order: number
  images?: string[]
  bg?: string
}

const contentDirectory = path.join(process.cwd(), "content")

export async function getContentItems(section: string, locale: string): Promise<ContentItem[]> {
  const sectionPath = path.join(contentDirectory, section, locale)

  if (!fs.existsSync(sectionPath)) {
    console.warn(`Content directory not found: ${sectionPath}`)
    return []
  }

  const filenames = fs.readdirSync(sectionPath).filter((name) => name.endsWith(".mdx"))

  const items = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(sectionPath, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")

      // Compile the full MDX content
      const { content, frontmatter } = await compileMDX<ContentFrontmatter>({
        source: fileContents,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        },
      })

      // Also compile just the title and subtitle for JSX support
      const titleComponent = await compileMDX({
        source: frontmatter.title,
        options: {
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        },
      })

      const subtitleComponent = frontmatter.subtitle
        ? await compileMDX({
            source: frontmatter.subtitle,
            options: {
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
              },
            },
          })
        : null

      return {
        ...frontmatter,
        title: titleComponent.content,
        subtitle: subtitleComponent?.content || frontmatter.subtitle,
        content: content,
        description: content, // For compatibility with existing components
        url: frontmatter.images || [frontmatter.image], // Use images array if available, otherwise single image
      } as ContentItem
    })
  )

  // Sort by order field
  return items.sort((a, b) => a.order - b.order)
}

export async function getCitysParkContent(locale: string): Promise<ContentItem[]> {
  // Try to get content from Outstatic first
  try {
    const outstaticContent = await getOutstaticCitysParkContent(locale)
    if (outstaticContent && outstaticContent.length > 0) {
      // Transform Outstatic data to match ContentItem interface
      return outstaticContent.map((item: any) => ({
        title: item.title,
        subtitle: item.subtitle,
        image: item.image || "",
        images: item.images || [],
        sectionId: item.sectionId,
        order: item.order,
        content: item.content,
        url: item.images || [item.image],
        description: item.content,
        bg: item.bg,
      }))
    }
  } catch (error) {
    console.warn("Failed to load Outstatic content, falling back to MDX files:", error)
  }

  // Fallback to existing MDX files
  return getContentItems("citys-park", locale)
}

export async function getCitysLifePrivilegesContent(locale: string): Promise<ContentItem[]> {
  return getContentItems("citys-life-privileges", locale)
}

export async function getCitysMembersClubContent(locale: string): Promise<ContentItem[]> {
  return getContentItems("citys-members-club", locale)
}

export async function getResidencesContent(locale: string): Promise<ContentItem[]> {
  return getContentItems("residences", locale)
}
