const fs = require("fs")
const path = require("path")

// Function to read MDX file and extract frontmatter and content
function parseMDXFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

  if (!frontmatterMatch) {
    throw new Error("Invalid MDX file format")
  }

  const frontmatterStr = frontmatterMatch[1]
  const mdxContent = frontmatterMatch[2]

  // Parse frontmatter
  const frontmatter = {}
  frontmatterStr.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":")
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim()
      // Remove quotes if present
      frontmatter[key.trim()] = value.replace(/^["']|["']$/g, "")
    }
  })

  return {
    frontmatter,
    content: mdxContent.trim(),
  }
}

// Function to create Outstatic document structure
function createOutstaticDocument(filePath, locale) {
  const { frontmatter, content } = parseMDXFile(filePath)
  const filename = path.basename(filePath, ".mdx")

  return {
    title: frontmatter.title,
    subtitle: frontmatter.subtitle || "",
    image: frontmatter.image || "",
    sectionId: frontmatter.sectionId,
    order: parseInt(frontmatter.order) || 0,
    content: content,
    locale: locale,
    slug: filename,
    publishedAt: new Date().toISOString(),
    status: "published",
  }
}

// Main migration function
function migrateCitysParkContent() {
  const contentDir = path.join(process.cwd(), "content", "citys-park")
  const locales = ["en", "tr"]

  console.log("Starting migration of citys-park content to Outstatic format...\n")

  locales.forEach((locale) => {
    const localeDir = path.join(contentDir, locale)

    if (!fs.existsSync(localeDir)) {
      console.log(`Locale directory not found: ${localeDir}`)
      return
    }

    const files = fs.readdirSync(localeDir).filter((file) => file.endsWith(".mdx"))

    console.log(`Processing ${locale} locale (${files.length} files):`)

    files.forEach((file) => {
      const filePath = path.join(localeDir, file)
      try {
        const document = createOutstaticDocument(filePath, locale)
        console.log(`  ✓ ${file} -> ${document.slug}`)

        // You can save this to a JSON file or directly to Outstatic
        const outputPath = path.join(
          process.cwd(),
          "outstatic",
          "content",
          "citys-park",
          `${document.slug}-${locale}.json`
        )

        // Ensure directory exists
        const outputDir = path.dirname(outputPath)
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true })
        }

        fs.writeFileSync(outputPath, JSON.stringify(document, null, 2))
        console.log(`    Saved to: ${outputPath}`)
      } catch (error) {
        console.error(`  ✗ Error processing ${file}:`, error.message)
      }
    })

    console.log("")
  })

  console.log("Migration completed!")
  console.log("\nNext steps:")
  console.log("1. Set up your GitHub OAuth app")
  console.log("2. Configure environment variables")
  console.log("3. Access the Outstatic dashboard at /outstatic")
  console.log("4. Import the generated JSON files or create content manually")
}

// Run migration
if (require.main === module) {
  migrateCitysParkContent()
}

module.exports = { migrateCitysParkContent }
