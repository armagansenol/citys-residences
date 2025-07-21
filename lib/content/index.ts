import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface ContentItem {
  title: string
  subtitle: string
  image: string
  sectionId: string
  order: number
  content: string
  url: string[]
  description: string
}

export interface ContentFrontmatter {
  title: string
  subtitle: string
  image: string
  sectionId: string
  order: number
}

const contentDirectory = path.join(process.cwd(), "content")

// Convert markdown content to HTML-like format for display
function processMarkdownContent(content: string): string {
  // Simple markdown to HTML conversion for basic formatting
  return content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0)
    .map(
      (paragraph) => `<p>${paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, " <br /> ")}</p>`
    )
    .join("\n")
}

export async function getContentItems(section: string, locale: string): Promise<ContentItem[]> {
  const sectionPath = path.join(contentDirectory, section, locale)

  if (!fs.existsSync(sectionPath)) {
    console.warn(`Content directory not found: ${sectionPath}`)
    return []
  }

  const filenames = fs.readdirSync(sectionPath).filter((name) => name.endsWith(".mdx"))

  const items = filenames.map((filename) => {
    const filePath = path.join(sectionPath, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data: frontmatter, content } = matter(fileContents)

    const processedContent = processMarkdownContent(content)

    return {
      ...frontmatter,
      content: processedContent,
      description: processedContent, // For compatibility with existing MembersClubItem component
      url: [frontmatter.image], // Convert to array format to match existing structure
    } as ContentItem
  })

  // Sort by order field
  return items.sort((a, b) => a.order - b.order)
}

export async function getCitysParkContent(locale: string): Promise<ContentItem[]> {
  return getContentItems("citys-park", locale)
}

export async function getCitysLifePrivilegesContent(locale: string): Promise<ContentItem[]> {
  return getContentItems("citys-life-privileges", locale)
}
