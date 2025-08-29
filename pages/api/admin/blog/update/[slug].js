import fs from 'fs'
import path from 'path'

export default async function updateBlogPost(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { slug } = req.query
  
  try {
    const postData = req.body
    
    // Validate required fields
    if (!postData.title || !postData.content) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const contentDir = path.join(process.cwd(), 'content', 'blog')
    const filePath = path.join(contentDir, `${slug}.md`)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Post not found' })
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

    // Write updated file
    fs.writeFileSync(filePath, frontmatter, 'utf8')

    res.status(200).json({ 
      message: 'Post updated successfully',
      slug: slug,
      path: filePath
    })

  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
