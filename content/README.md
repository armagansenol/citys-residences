# Content Management with MDX

This project uses MDX files to manage content in multiple languages. Content is organized by sections and locales.

## Directory Structure

```
content/
├── citys-park/
│   ├── tr/           # Turkish content
│   │   ├── citys-lounge.mdx
│   │   ├── open-squares.mdx
│   │   ├── open-pools.mdx
│   │   ├── children-parks.mdx
│   │   ├── walking-tracks.mdx
│   │   └── open-sports-areas.mdx
│   └── en/           # English content
│       ├── citys-lounge.mdx
│       ├── open-squares.mdx
│       ├── open-pools.mdx
│       ├── children-parks.mdx
│       ├── walking-tracks.mdx
│       └── open-sports-areas.mdx
└── README.md
```

## MDX File Format

Each MDX file should have frontmatter with the following fields:

```mdx
---
title: "Section Title"
subtitle: "Section Subtitle"
image: "/img/section/image.jpg"
sectionId: "section-id"
order: 1
---

Your content here in Markdown format.

You can use **bold**, *italic*, and other markdown features.

Line breaks will be converted to `<br />` tags automatically.
```

## Required Frontmatter Fields

- `title`: The main title for the section
- `subtitle`: The subtitle or description
- `image`: Path to the main image (relative to public/)
- `sectionId`: Must match the section ID defined in `lib/constants.ts`
- `order`: Numeric order for sorting (1-6 for citys-park)

## Content Guidelines

1. **Images**: Use the existing images in `/public/img/citys-park/`
2. **Section IDs**: Must match exactly with the IDs in `lib/constants.ts`
3. **Ordering**: Use the `order` field to control the sequence
4. **HTML in titles**: You can include HTML like `<br />` tags in titles
5. **Line breaks**: Single line breaks become `<br />` tags, double line breaks become new paragraphs

## Adding New Sections

1. Create the directory structure: `content/{section-name}/{locale}/`
2. Add the section configuration to `lib/constants.ts`
3. Create a content loader function in `lib/content/index.ts`
4. Update the page component to use the new content loader

## Supported Locales

- `tr` - Turkish
- `en` - English

## Technical Details

- Content is loaded server-side during build time
- Frontmatter is parsed using `gray-matter`
- Content is automatically converted from Markdown to HTML-like format
- Files are sorted by the `order` field in frontmatter 