# Minimal Blog

A super minimal, privacy-first blog inspired by [Bear Blog](https://bearblog.dev/).

## Features

- 📝 **Markdown-based** - Write posts in markdown with YAML frontmatter
- ⚡ **Static HTML** - Fast, lightweight, and no dependencies at runtime
- 🏷️ **Tags/Categories** - Organize posts with tags
- 📡 **RSS Feed** - Automatic RSS feed generation
- 🔍 **Search** - JSON-based search index
- 🎨 **Minimal Design** - Clean, readable, distraction-free
- 🔒 **Privacy-first** - No trackers, no third-party scripts
- 📱 **Mobile-friendly** - Responsive design that works everywhere
- ♿ **Accessible** - Semantic HTML for better accessibility

## Project Structure

```
.
├── posts/              # Your markdown blog posts
├── templates/          # HTML templates for generating pages
├── public/             # Generated static HTML (output)
├── config.json         # Blog configuration
├── build.js            # Build script
├── package.json        # Dependencies
└── README.md          # This file
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Your First Post

Create a markdown file in the `posts/` directory, e.g., `posts/my-first-post.md`:

```markdown
---
title: "My First Post"
date: 2026-04-05
author: "Your Name"
tags:
  - Blog
  - Welcome
excerpt: "A short summary of your post"
---

# Your post content goes here

You can use **markdown** formatting in your posts.

- Lists work
- As do code blocks

\`\`\`javascript
console.log("Hello, World!");
\`\`\`
```

### 3. Configure Your Blog

Edit `config.json` to customize:

```json
{
  "title": "My Blog",
  "description": "My personal blog",
  "author": "Your Name",
  "siteUrl": "https://yourblog.com",
  "language": "en"
}
```

### 4. Build Your Blog

```bash
npm run build
```

This generates static HTML in the `public/` directory.

### 5. View Your Blog Locally

```bash
npm run dev
```

Then open http://localhost:8000 in your browser.

Or serve the `public/` folder with any static file server.

## Deployment

Since your blog is just static HTML, you can deploy it anywhere:

### Netlify

```bash
npm run build
# Deploy the 'public' folder
```

### Vercel

```bash
npm run build
# Deploy the 'public' folder
```

### GitHub Pages

```bash
npm run build
# Push the 'public' folder to your gh-pages branch
```

### Traditional Hosting

Just upload the `public/` folder to any web server via FTP/SFTP.

## Features Explained

### Posts

Create posts in `posts/` with YAML frontmatter:

- **title** - Post title
- **date** - Publication date (ISO format)
- **author** - Author name
- **tags** - Array of tags for categorization
- **excerpt** - Short summary shown on index

### Tags

Posts can have multiple tags. Each tag gets its own page at `/tags/{tag-slug}.html` listing all posts with that tag.

### RSS Feed

An RSS feed is automatically generated at `/feed.xml`. Readers can subscribe to your blog updates.

### Search Index

A `search-index.json` file is generated containing all posts for client-side search implementation.

## Customization

### Styling

Edit the CSS in the templates:
- `templates/index.html` - Home page styles
- `templates/post.html` - Post page styles
- `templates/tag.html` - Tag page styles

### Markdown Rendering

The blog uses [marked.js](https://marked.js.org/) for markdown rendering. Customize rendering in `build.js`:

```javascript
marked.setOptions({
  // Your options here
});
```

## CLI Commands

```bash
# Build the blog
npm run build

# Serve locally (requires Python 3)
npm run serve

# Build and serve
npm run dev
```

## Tips

- Use consistent date formats: `2026-04-05`
- Keep excerpts concise (150 characters or less)
- Use meaningful, descriptive tags
- Optimize images before including them
- Test your build before deploying

## License

MIT

---

Made with AI.
