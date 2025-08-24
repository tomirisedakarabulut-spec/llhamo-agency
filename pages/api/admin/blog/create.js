import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const postData = req.body
    
    // Validate required fields
    if (!postData.title || !postData.content || !postData.slug) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Create frontmatter
    const frontmatter = `---
title: "${postData.title}"
excerpt: "${postData.excerpt}"
author: "${postData.author}"
date: "${postData.date}"
category: "${postData.category}"
readTime: "${postData.readTime}"
featured: ${postData.featured}
image: "${postData.image}"
tags: ${JSON.stringify(postData.tags, null, 2).replace(/\n/g, '\n  ')}
seo:
  metaTitle: "${postData.seo?.metaTitle || postData.title}"
  metaDescription: "${postData.seo?.metaDescription || postData.excerpt}"
  keywords: ${JSON.stringify(postData.seo?.keywords || postData.tags, null, 2).replace(/\n/g, '\n    ')}
---

${postData.content}`

    // Ensure content directory exists
    const contentDir = path.join(process.cwd(), 'content', 'blog')
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }

    // Write file
    const filePath = path.join(contentDir, `${postData.slug}.md`)
    
    if (fs.existsSync(filePath)) {
      return res.status(409).json({ message: 'Post with this slug already exists' })
    }

    fs.writeFileSync(filePath, frontmatter, 'utf8')

    res.status(201).json({ 
      message: 'Post created successfully',
      slug: postData.slug,
      path: filePath
    })

  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
