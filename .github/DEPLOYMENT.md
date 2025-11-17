# GitHub Pages Deployment

This repository is configured to automatically deploy Storybook to GitHub Pages when a semantic version tag is pushed.

## Tag Pattern

The deployment workflow triggers on tags matching these patterns:
- `v[0-9]+.[0-9]+.[0-9]+` (e.g., `v1.0.0`, `v2.15.3`)
- `v[0-9]+.[0-9]+.[0-9]+-*` (e.g., `v1.0.0-beta`, `v2.0.0-alpha.1`)

## How to Deploy

1. Commit and push your changes to the repository
2. Create and push a tag with the semantic version pattern:

```bash
# Create a tag
git tag v1.0.0

# Or create a tag with a suffix
git tag v1.0.0-beta

# Push the tag to trigger deployment
git push origin v1.0.0
```

3. The GitHub Actions workflow will automatically:
   - Build the Storybook
   - Deploy it to GitHub Pages

4. Your Storybook will be available at: `https://tkottke90.github.io/preact-dialog/`

## Repository Settings

Make sure GitHub Pages is enabled in your repository settings:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

## Local Testing

To test the production build locally:

```bash
# Build with production settings (includes base path)
npm run build-storybook

# Build without base path (for local preview)
npm run build-storybook:local

# Preview the built storybook
npx http-server storybook-static
```

## Configuration

The base path for GitHub Pages is configured in `.storybook/main.ts`:
- Production builds use `/preact-dialog/` as the base path
- Development builds use the default root path

