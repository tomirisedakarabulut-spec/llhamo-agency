import fs from 'fs'
import path from 'path'
import { requireAuth } from '../../../../lib/auth'

async function createBlogPost(req, res) {
  try {
    const postData = req.body
    
    // Validate required fields
    if (!postData.title || !postData.content || !postData.slug) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Create frontmatter
    const frontmatter = `---
title: "${postData.title}"
excerpt: "${postData.excerpt || ''}"
author: "${postData.author || 'LHAMO TEAM'}"
date: "${postData.date || new Date().toISOString().split('T')[0]}"
category: "${postData.category || 'GENERAL'}"
readTime: "${postData.readTime || '5 MIN'}"
featured: ${postData.featured || false}
image: "${postData.image || '/portfolio/1.svg'}"
tags: ${JSON.stringify(postData.tags || [], null, 2).replace(/\n/g, '\n  ')}
seo:
  metaTitle: "${postData.seo?.metaTitle || postData.title}"
  metaDescription: "${postData.seo?.metaDescription || postData.excerpt || ''}"
  keywords: ${JSON.stringify(postData.seo?.keywords || postData.tags || [], null, 2).replace(/\n/g, '\n    ')}
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

export default requireAuth(createBlogPost)
