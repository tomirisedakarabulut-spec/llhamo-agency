#!/usr/bin/env node

/**
 * LHAMO Blog Post Creator
 * Creates a new blog post with proper frontmatter and structure
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve)
  })
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

async function createBlogPost() {
  console.log('🔥 LHAMO BLOG POST CREATOR 🔥\n')
  
  try {
    const title = await question('Blog post title: ')
    const excerpt = await question('Excerpt: ')
    const author = await question('Author (default: LHAMO TEAM): ') || 'LHAMO TEAM'
    const category = await question('Category (BRANDING/AI/SOCIAL/VIDEO/CONVERSION/GROWTH): ')
    const readTime = await question('Read time (e.g., 5 MIN): ')
    const tagsInput = await question('Tags (comma separated): ')
    const featured = await question('Featured post? (y/N): ')
    
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
    const date = getCurrentDate()
    const slug = `${date}-${generateSlug(title)}`
    
    const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
author: "${author}"
date: "${date}"
category: "${category.toUpperCase()}"
readTime: "${readTime}"
featured: ${featured.toLowerCase() === 'y'}
image: "/portfolio/1.svg"
tags: ${JSON.stringify(tags, null, 2).replace(/\n/g, '\n  ')}
seo:
  metaTitle: "${title} | LHAMO Blog"
  metaDescription: "${excerpt}"
  keywords: ${JSON.stringify(tags, null, 2).replace(/\n/g, '\n    ')}
---

# ${title.toUpperCase()}

*Published on ${new Date(date).toLocaleDateString('tr-TR')} by ${author}*

---

## INTRODUCTION

${excerpt}

### 🔥 SECTION 1

Write your brutal content here...

### ⚡ SECTION 2

More savage insights...

### 🎯 SECTION 3

Destroy the competition with these tips...

---

## CONCLUSION

Wrap up your brutal wisdom here.

**[CONTACT THE BRUTAL ARMY →](/contact)**

---

*Want more savage insights? Subscribe to our newsletter and join the army of legendary brands.*`
    
    const contentDir = path.join(process.cwd(), 'content', 'blog')
    
    // Create content directory if it doesn't exist
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }
    
    const filePath = path.join(contentDir, `${slug}.md`)
    
    if (fs.existsSync(filePath)) {
      console.log(`❌ File already exists: ${filePath}`)
      rl.close()
      return
    }
    
    fs.writeFileSync(filePath, frontmatter)
    
    console.log(`✅ Blog post created successfully!`)
    console.log(`📁 File: ${filePath}`)
    console.log(`🔗 URL: /blog/${slug}`)
    console.log(`\n🎯 Next steps:`)
    console.log(`1. Edit the content in ${filePath}`)
    console.log(`2. Add a proper image to /public/portfolio/`)
    console.log(`3. Update the image path in the frontmatter`)
    console.log(`4. Run 'npm run dev' to preview`)
    
  } catch (error) {
    console.error('❌ Error creating blog post:', error)
  }
  
  rl.close()
}

createBlogPost()
