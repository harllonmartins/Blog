---
title: "Getting Started with Your First Post"
date: 2026-04-03
author: "Your Name"
tags:
  - Guide
  - Blog
  - Markdown
excerpt: "A quick guide to creating your first blog post with markdown and frontmatter."
---

Creating a blog post is incredibly simple. You just need to:

## Step 1: Create a markdown file

Create a new `.md` file in the `posts/` directory. For example, `my-first-post.md`.

## Step 2: Add frontmatter

At the top of your file, add YAML frontmatter with post metadata:

```yaml
---
title: "My First Post"
date: 2026-04-05
author: "Your Name"
tags:
  - First
  - Post
excerpt: "This is my first blog post!"
---
```

## Step 3: Write your content

Write your post content in markdown below the frontmatter:

```markdown
# This is a heading

This is a paragraph. You can use **bold**, *italic*, and `code`.

## Subheading

- Bullet points
- Are easy
- To create

[Links](https://example.com) work too!
```

## Step 4: Build your blog

Run `npm run build` to generate your static HTML pages. The blog will be built in the `public/` directory.

## Step 5: Deploy

Simply deploy the `public/` folder to any static hosting service like:

- Netlify
- Vercel
- GitHub Pages
- Any web server

That's it! Your minimalist blog is ready to share with the world.

---

**Happy blogging!** 🚀
