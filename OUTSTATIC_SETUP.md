# Outstatic CMS Integration for Citys Park Content

This document explains how to set up and use Outstatic CMS for managing the citys-park content in your Next.js 14 project.

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

# Optional: GitHub repository settings
OUTSTATIC_REPO_ID=your_github_repo_id
OUTSTATIC_REPO_SLUG=your_github_username/your_repo_name
OUTSTATIC_REPO_BRANCH=main
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

## Usage

### Accessing the CMS

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/outstatic`
3. Sign in with your GitHub account
4. You'll see the "Citys Park" collection

### Content Structure

The citys-park collection includes the following fields:

- **Title**: The main title of the section
- **Subtitle**: Optional subtitle
- **Image**: Cover image for the section
- **Section ID**: Unique identifier for the section
- **Order**: Display order (1, 2, 3, etc.)
- **Content**: Rich text content (supports markdown)
- **Locale**: Language selection (en/tr)

### Migration from MDX Files

To migrate your existing MDX content:

```bash
npm run migrate-outstatic
```

This will:
1. Read all existing MDX files from `content/citys-park/`
2. Convert them to Outstatic format
3. Save JSON files in `outstatic/content/citys-park/`

### Content Management Workflow

1. **Create Content**: Use the Outstatic dashboard to create new citys-park sections
2. **Edit Content**: Modify existing content through the rich text editor
3. **Publish**: Set status to "published" to make content visible
4. **Preview**: Changes are automatically deployed via Vercel

### Fallback System

The system is designed with a fallback mechanism:
- First, it tries to load content from Outstatic
- If Outstatic is not available, it falls back to the existing MDX files
- This ensures your site continues to work during the transition

## File Structure

```
├── outstatic.config.ts          # Outstatic configuration
├── app/
│   ├── api/outstatic/[...outstatic]/route.ts  # API routes
│   └── outstatic/page.tsx       # CMS dashboard
├── lib/
│   └── outstatic.ts             # Data fetching utilities
├── scripts/
│   └── migrate-to-outstatic.js  # Migration script
└── outstatic/
    └── content/
        └── citys-park/          # Generated content files
```

## Benefits

1. **User-Friendly Interface**: Non-technical users can manage content
2. **Version Control**: All changes are tracked in GitHub
3. **Rich Text Editor**: Easy content editing with markdown support
4. **Image Management**: Built-in image upload and management
5. **Multi-language Support**: Manage content in multiple locales
6. **Real-time Preview**: See changes immediately after publishing

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Check your GitHub OAuth app settings
2. **Repository Access**: Ensure the OAuth app has access to your repository
3. **Environment Variables**: Verify all required variables are set
4. **Build Errors**: Check that Outstatic is properly configured in `next.config.mjs`

### Getting Help

- [Outstatic Documentation](https://outstatic.com/docs)
- [GitHub OAuth Setup Guide](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Next.js Documentation](https://nextjs.org/docs)

## Next Steps

1. Set up your GitHub OAuth app
2. Configure environment variables
3. Run the migration script
4. Test the CMS dashboard
5. Start managing content through Outstatic
6. Deploy to production with proper environment variables
