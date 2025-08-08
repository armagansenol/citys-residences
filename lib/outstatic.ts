import outstaticConfig from "../outstatic.config"

// Note: Outstatic v1.4.0 has different API structure
// This is a simplified implementation that reads from the generated JSON files
import fs from "fs"
import path from "path"

export async function getCitysParkContent(locale: string = "en") {
  try {
    const contentDir = path.join(process.cwd(), "outstatic", "content", "citys-park")

    if (!fs.existsSync(contentDir)) {
      console.warn("Outstatic content directory not found")
      return []
    }

    const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(`-${locale}.json`))

    const documents = files.map((file) => {
      const filePath = path.join(contentDir, file)
      const content = fs.readFileSync(filePath, "utf8")
      return JSON.parse(content)
    })

    // Sort by order
    return documents.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error fetching citys-park content:", error)
    return []
  }
}

export async function getCitysParkDocument(slug: string, locale: string = "en") {
  try {
    const filePath = path.join(process.cwd(), "outstatic", "content", "citys-park", `${slug}-${locale}.json`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const content = fs.readFileSync(filePath, "utf8")
    return JSON.parse(content)
  } catch (error) {
    console.error("Error fetching citys-park document:", error)
    return null
  }
}
