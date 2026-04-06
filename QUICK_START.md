# Quick Start Guide

Your minimal blog is ready! Here's how to get started:

## 🚀 Running Your Blog

### View locally:
```bash
cd ~/Documentos/Dev/Blog
npm run dev
```

Then open http://localhost:8000 in your browser.

### Or serve it manually:
```bash
cd ~/Documentos/Dev/Blog/public
python3 -m http.server 8000
```

## ✍️ Creating Posts

1. Create a new `.md` file in the `posts/` folder
2. Add YAML frontmatter at the top:

```markdown
---
title: "Post Title"
date: 2026-04-05
author: "Your Name"
tags:
  - tag1
  - tag2
excerpt: "Short summary"
---

# Your content here

Write in Markdown!
```

3. Run `npm run build` to generate the static site
4. Your new post appears on the index and tag pages

## 📁 Project Files

| File | Purpose |
|------|---------|
| `posts/` | Your markdown blog posts |
| `templates/` | HTML templates (index, post, tag pages) |
| `public/` | Generated static website (ready to deploy) |
| `build.js` | Build script that generates your site |
| `config.json` | Blog title, author, and settings |
| `README.md` | Full documentation |

## 🎯 Key Features Already Built

✅ **Markdown Posts** - Write in markdown, publish as HTML  
✅ **Tags/Categories** - Auto-generated tag pages  
✅ **RSS Feed** - Located at `/feed.xml`  
✅ **Search** - Minimal JavaScript search at `/search.html`  
✅ **Search Index** - JSON file with all posts for search  
✅ **Responsive Design** - Works on all devices  
✅ **No Dependencies** - Published site has zero dependencies  

## 🎨 Customizing

### Change blog title/author:
Edit `config.json`

### Change styling:
Edit CSS in `templates/index.html`, `templates/post.html`, `templates/tag.html`

### Add static files:
Create a `static/` folder with CSS/JS files, they'll be copied to `public/`

## 📦 Deploying

Your blog is just static HTML! Deploy to:

- **Netlify**: Drag & drop the `public/` folder
- **Vercel**: Deploy the `public/` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **Any web host**: Upload `public/` via FTP/SFTP

## 📝 Example Post

Create `posts/hello-world.md`:

```markdown
---
title: "Hello, World!"
date: 2026-04-05
author: "Your Name"
tags:
  - First
  - Welcome
excerpt: "My first blog post"
---

# Hello, World!

This is my first blog post. I can use:

- **Bold text**
- *Italic text*
- `Code`
- [Links](https://example.com)

## Code blocks

\`\`\`javascript
console.log("Hello!");
\`\`\`

Enjoy writing! 🎉
```

Then run `npm run build` and refresh your browser.

## 🆘 Troubleshooting

**Posts not showing?**
- Make sure you ran `npm run build`
- Check that markdown files are in the `posts/` folder
- Check dates are in format `2026-04-05`

**Build failing?**
- Check that Node.js is installed: `node --version`
- Reinstall dependencies: `npm install`

**Styling looks wrong?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check that CSS is properly formatted in templates

## 📚 Learn More

See `README.md` for full documentation.

Happy blogging! 📝✨
