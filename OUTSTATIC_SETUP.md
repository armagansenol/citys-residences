# Outstatic CMS Integration for Citys Park Content

This document explains how to set up and use Outstatic CMS for managing the citys-park content in your Next.js 14 project with MDX file support.

## What is Outstatic?

Outstatic is an open-source content management system (CMS) for static websites using Next.js. It allows you to manage content through a user-friendly interface and stores all data in your GitHub repository.

## Setup Instructions

### 1. GitHub OAuth App Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the following details:
   - **Application name**: `Citys Residences CMS`
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/outstatic/auth/callback`
4. Copy the **Client ID** and **Client Secret**

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Outstatic Configuration
OUTSTATIC_GITHUB_ID=your_github_oauth_app_id
OUTSTATIC_GITHUB_SECRET=your_github_oauth_app_secret
OUTSTATIC_SECRET=your_random_secret_key_here

# Repository Configuration
OUTSTATIC_REPO_SLUG=armagansenol/citys-residences
OUTSTATIC_REPO_ID=your_github_repo_id
OUTSTATIC_REPO_OWNER=armagansenol
OUTSTATIC_REPO_BRANCH=outstatic-integration
```

### 3. Generate Secret Key

Run this command to generate a secure secret key:

```bash
openssl rand -base64 32
```

### 4. Repository Settings

- **OUTSTATIC_REPO_ID**: Your GitHub repository ID (found in repository settings)
- **OUTSTATIC_REPO_SLUG**: Format: `username/repository-name`
- **OUTSTATIC_REPO_BRANCH**: Usually `main` or `master`

## MDX File Support

### Configuration

Outstatic is now configured to work with MDX files directly. The configuration includes:

1. **`.outstatic.json`**: Specifies MDX format and content path
2. **`outstatic.config.ts`**: Defines collection structure with MDX support
3. **`lib/outstatic.ts`**: Updated to parse MDX files with frontmatter

### MDX File Structure

Your MDX files should follow this structure:

```mdx
---
title: "Children's Parks"
subtitle: "Intertwined with nature, real childhood"
image: "/img/citys-park/03.jpg"
sectionId: "children-parks"
order: 4
---

Children growing up with play...  
At City's Park, every swing opens to a dream, every laugh opens to freedom.

Designed not just for playing, but for exploring, dreaming, and living childhood to the fullest.

Every childhood is a fairy tale, and this fairy tale is written;  
where you can walk barefoot on the grass, dream in the shadow of swings, intertwined with nature, with safety and love...
```

### Content Directory Structure

```
content/
├── citys-park/
│   ├── en/
│   │   ├── children-parks.mdx
│   │   ├── citys-lounge.mdx
│   │   ├── open-pools.mdx
│   │   └── ...
│   └── tr/
│       ├── children-parks.mdx
│       ├── citys-lounge.mdx
│       ├── open-pools.mdx
│       └── ...
```

## Usage

### Accessing the CMS

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/outstatic`
3. Sign in with your GitHub account
4. You'll see the "Citys Park" collection

### Content Management Workflow

1. **Create Content**: Use the Outstatic dashboard to create new citys-park sections
2. **Edit Content**: Modify existing content through the rich text editor
3. **Publish**: Set status to "published" to make content visible
4. **Preview**: Changes are automatically deployed via Vercel

### MDX File Management

- **Direct Editing**: Edit MDX files directly in your code editor
- **CMS Interface**: Use the Outstatic dashboard for non-technical users
- **Version Control**: All changes are tracked in GitHub
- **Automatic Sync**: Changes made in the CMS are saved as MDX files

## File Structure

```
├── outstatic.config.ts          # Outstatic configuration with MDX support
├── .outstatic.json              # Outstatic settings (MDX format)
├── app/
│   ├── api/outstatic/[[...ost]]/route.ts  # API routes
│   └── (cms)/outstatic/[[...ost]]/page.tsx # CMS dashboard
├── lib/
│   ├── outstatic.ts             # MDX file parsing utilities
│   └── content/index.ts         # Content loading with MDX support
├── content/
│   └── citys-park/              # MDX content files
│       ├── en/
│       └── tr/
└── outstatic/
    └── content/                 # Generated content (fallback)
```

## Benefits

1. **MDX Support**: Full MDX file support with frontmatter
2. **User-Friendly Interface**: Non-technical users can manage content
3. **Version Control**: All changes are tracked in GitHub
4. **Rich Text Editor**: Easy content editing with markdown support
5. **Image Management**: Built-in image upload and management
6. **Multi-language Support**: Manage content in multiple locales
7. **Real-time Preview**: See changes immediately after publishing

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Check your GitHub OAuth app settings
2. **Repository Access**: Ensure the OAuth app has access to your repository
3. **Environment Variables**: Verify all required variables are set
4. **MDX Parsing Errors**: Check MDX file format and frontmatter structure
5. **Build Errors**: Check that Outstatic is properly configured in `next.config.mjs`

### MDX File Issues

- **Frontmatter Format**: Ensure frontmatter is properly formatted with `---` delimiters
- **Required Fields**: Make sure all required fields are present in frontmatter
- **File Encoding**: Use UTF-8 encoding for MDX files
- **File Names**: Use kebab-case for file names (e.g., `children-parks.mdx`)

### Getting Help

- [Outstatic Documentation](https://outstatic.com/docs)
- [GitHub OAuth Setup Guide](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)

## Next Steps

1. Set up your GitHub OAuth app
2. Configure environment variables
3. Test the CMS dashboard with MDX files
4. Start managing content through Outstatic
5. Deploy to production with proper environment variables
6. Train content editors on using the CMS interface
