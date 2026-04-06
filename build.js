const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const slugify = require('slugify');

const config = require('./config.json');
const postsDir = './posts';
const templatesDir = './templates';
const publicDir = './public';

// Ensure output directories exist
[publicDir, path.join(publicDir, 'posts'), path.join(publicDir, 'tags')].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Read all markdown files
const getPostFiles = () => {
  return fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .sort()
    .reverse();
};

// Parse a markdown file into post object
const parsePost = (filename) => {
  const filePath = path.join(postsDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const slug = slugify(data.title || filename.replace('.md', ''), { lower: true, strict: true });
  
  return {
    slug,
    title: data.title || filename.replace('.md', ''),
    excerpt: data.excerpt || content.substring(0, 150).replace(/<[^>]*>/g, ''),
    content: marked(content),
    date: data.date ? new Date(data.date) : new Date(fs.statSync(filePath).mtime),
    tags: data.tags || [],
    author: data.author || config.author,
    filename
  };
};

// Get all posts
const allPosts = getPostFiles().map(parsePost).sort((a, b) => b.date - a.date);

console.log(`📝 Found ${allPosts.length} posts`);

// Generate HTML template functions
const getTemplate = (name) => {
  const filePath = path.join(templatesDir, `${name}.html`);
  return fs.readFileSync(filePath, 'utf-8');
};

const renderTemplate = (template, data) => {
  let html = template;
  Object.entries(data).forEach(([key, value]) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return html;
};

// Generate individual post pages
const generatePostPages = () => {
  const postTemplate = getTemplate('post');
  
  allPosts.forEach(post => {
    const html = renderTemplate(postTemplate, {
      title: post.title,
      siteTitle: config.title,
      content: post.content,
      date: post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      tags: post.tags.map(tag => 
        `<span class="tag"><a href="/tags/${slugify(tag, { lower: true })}.html">#${tag}</a></span>`
      ).join(' '),
      author: post.author
    });
    
    const outputPath = path.join(publicDir, 'posts', `${post.slug}.html`);
    fs.writeFileSync(outputPath, html);
  });
  
  console.log(`✅ Generated ${allPosts.length} post pages`);
};

// Generate index/home page
const generateIndex = () => {
  const indexTemplate = getTemplate('index');
  const postsList = allPosts.slice(0, config.postsPerPage).map(post => `
    <article>
      <h2><a href="/posts/${post.slug}.html">${post.title}</a></h2>
      <p class="meta">${post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
      <p>${post.excerpt}</p>
      ${post.tags.length ? `<p class="tags">${post.tags.map(tag => `<a href="/tags/${slugify(tag, { lower: true })}.html">#${tag}</a>`).join(' ')}</p>` : ''}
    </article>
  `).join('\n');

  const html = renderTemplate(indexTemplate, {
    siteTitle: config.title,
    siteDescription: config.description,
    postsList: postsList,
    totalPosts: allPosts.length
  });

  fs.writeFileSync(path.join(publicDir, 'index.html'), html);
  console.log('✅ Generated index page');
};

// Generate tag pages
const generateTagPages = () => {
  const tags = new Map();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      if (!tags.has(tag)) tags.set(tag, []);
      tags.get(tag).push(post);
    });
  });

  const tagTemplate = getTemplate('tag');
  
  tags.forEach((posts, tag) => {
    const postsList = posts.map(post => `
      <article>
        <h3><a href="/posts/${post.slug}.html">${post.title}</a></h3>
        <p class="meta">${post.date.toLocaleDateString()}</p>
      </article>
    `).join('\n');

    const html = renderTemplate(tagTemplate, {
      siteTitle: config.title,
      tagName: tag,
      postsList: postsList,
      postCount: posts.length
    });

    const tagSlug = slugify(tag, { lower: true, strict: true });
    fs.writeFileSync(path.join(publicDir, 'tags', `${tagSlug}.html`), html);
  });

  console.log(`✅ Generated ${tags.size} tag pages`);
};

// Generate RSS feed
const generateRSSFeed = () => {
  const items = allPosts.map(post => `
  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${config.siteUrl}/posts/${post.slug}.html</link>
    <guid>${config.siteUrl}/posts/${post.slug}.html</guid>
    <pubDate>${post.date.toUTCString()}</pubDate>
    <description>${escapeXml(post.excerpt)}</description>
  </item>
  `).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(config.title)}</title>
    <link>${config.siteUrl}</link>
    <description>${escapeXml(config.description)}</description>
    <language>${config.language}</language>
    ${items}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss);
  console.log('✅ Generated RSS feed');
};

// Generate search index (JSON)
const generateSearchIndex = () => {
  const index = allPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt.replace(/<[^>]*>/g, ''),
    tags: post.tags,
    date: post.date.toISOString()
  }));

  fs.writeFileSync(path.join(publicDir, 'search-index.json'), JSON.stringify(index, null, 2));
  console.log('✅ Generated search index');
};

// Helper function to escape XML
const escapeXml = (str) => {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Copy static assets
const copyAssets = () => {
  if (fs.existsSync('./static')) {
    const copyDir = (src, dest) => {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.statSync(srcPath).isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      });
    };
    copyDir('./static', publicDir);
    console.log('✅ Copied static assets');
  }
};

// Main build function
const build = () => {
  console.log('🏗️  Building blog...\n');
  
  if (allPosts.length === 0) {
    console.log('⚠️  No posts found in ./posts directory');
  } else {
    generatePostPages();
    generateIndex();
    generateTagPages();
    generateRSSFeed();
    generateSearchIndex();
  }
  
  copyAssets();
  
  console.log('\n✨ Build complete! Open ./public/index.html in your browser');
};

build();
