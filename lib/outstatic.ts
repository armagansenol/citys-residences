import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"

interface Frontmatter {
  title: string
  subtitle?: string
  image?: string
  sectionId: string
  order?: number | string
  locale?: string
}

export async function getCitysParkContent(locale: string = "en") {
  try {
    // Try to get content from MDX files in outstatic directory
    const contentDir = path.join(process.cwd(), "outstatic", "content", "citys-park")

    if (!fs.existsSync(contentDir)) {
      console.warn(`Content directory not found: ${contentDir}`)
      return []
    }

    // Look for files with the locale suffix (e.g., children-parks-en.mdx)
    const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(`-${locale}.mdx`) || file.endsWith(`.mdx`))

    const documents = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(contentDir, file)
        const fileContents = fs.readFileSync(filePath, "utf8")

        try {
          // Parse MDX content with frontmatter
          const { content, frontmatter } = await compileMDX<Frontmatter>({
            source: fileContents,
            options: {
              parseFrontmatter: true,
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
              },
            },
          })

          // Check if the file is for the correct locale
          if (frontmatter.locale && frontmatter.locale !== locale) {
            return null
          }

          return {
            title: frontmatter.title,
            subtitle: frontmatter.subtitle || "",
            image: frontmatter.image || "",
            sectionId: frontmatter.sectionId,
            order: typeof frontmatter.order === "string" ? parseInt(frontmatter.order) || 0 : frontmatter.order || 0,
            content: content,
            locale: frontmatter.locale || locale,
            slug: path.basename(file, `.mdx`).replace(`-${locale}`, ""),
            publishedAt: new Date().toISOString(),
            status: "published",
          }
        } catch (error) {
          console.error(`Error parsing MDX file ${file}:`, error)
          return null
        }
      })
    )

    // Filter out null values and sort by order
    return documents.filter((doc): doc is NonNullable<typeof doc> => doc !== null).sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error fetching citys-park content:", error)
    return []
  }
}

export async function getCitysParkDocument(slug: string, locale: string = "en") {
  try {
    // Try different possible file paths
    const possiblePaths = [
      path.join(process.cwd(), "outstatic", "content", "citys-park", `${slug}-${locale}.mdx`),
      path.join(process.cwd(), "outstatic", "content", "citys-park", `${slug}.mdx`),
      path.join(process.cwd(), "outstatic", "content", "citys-park", locale, `${slug}.mdx`),
    ]

    let filePath = null
    for (const path of possiblePaths) {
      if (fs.existsSync(path)) {
        filePath = path
        break
      }
    }

    if (!filePath) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source: fileContents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      },
    })

    return {
      title: frontmatter.title,
      subtitle: frontmatter.subtitle || "",
      image: frontmatter.image || "",
      sectionId: frontmatter.sectionId,
      order: typeof frontmatter.order === "string" ? parseInt(frontmatter.order) || 0 : frontmatter.order || 0,
      content: content,
      locale: frontmatter.locale || locale,
      slug: slug,
      publishedAt: new Date().toISOString(),
      status: "published",
    }
  } catch (error) {
    console.error("Error fetching citys-park document:", error)
    return null
  }
}
