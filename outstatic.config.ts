const config = {
  collections: {
    "citys-park": {
      name: "Citys Park",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
          required: true,
        },
        {
          name: "subtitle",
          label: "Subtitle",
          type: "string",
        },
        {
          name: "image",
          label: "Image",
          type: "image",
        },
        {
          name: "sectionId",
          label: "Section ID",
          type: "string",
          required: true,
        },
        {
          name: "order",
          label: "Order",
          type: "number",
          required: true,
        },
        {
          name: "content",
          label: "Content",
          type: "rich-text",
          required: true,
        },
        {
          name: "locale",
          label: "Locale",
          type: "select",
          options: [
            { label: "English", value: "en" },
            { label: "Turkish", value: "tr" },
          ],
          required: true,
        },
      ],
      // Enable MDX support
      format: "mdx",
      // Specify the content path for MDX files in outstatic directory
      path: "outstatic/content/citys-park",
      // Enable frontmatter parsing
      frontmatter: true,
    },
  },
}

export default config
