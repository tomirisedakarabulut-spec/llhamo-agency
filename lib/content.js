import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')
const blogDirectory = path.join(contentDirectory, 'blog')
const configDirectory = path.join(contentDirectory, 'config')

// Site configuration
export function getSiteConfig() {
  const configPath = path.join(configDirectory, 'site.json')
  const configContent = fs.readFileSync(configPath, 'utf8')
  return JSON.parse(configContent)
}

// Blog functions
export function getAllBlogSlugs() {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(blogDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      }
    })
}

export function getBlogPostBySlug(slug) {
  const fullPath = path.join(blogDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    ...data,
    content
  }
}

export async function getBlogPostContent(slug) {
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return null
  }
  
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(post.content)
  
  const contentHtml = processedContent.toString()
  
  return {
    ...post,
    contentHtml
  }
}

export function getAllBlogPosts() {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(blogDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      return getBlogPostBySlug(slug)
    })
    .filter(post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  
  return allPosts
}

export function getFeaturedBlogPosts() {
  return getAllBlogPosts().filter(post => post.featured === true)
}

export function getBlogPostsByCategory(category) {
  if (category === 'ALL' || !category) {
    return getAllBlogPosts()
  }
  
  return getAllBlogPosts().filter(post => 
    post.category?.toLowerCase() === category.toLowerCase()
  )
}

export function getBlogCategories() {
  const posts = getAllBlogPosts()
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))]
  return ['ALL', ...categories.sort()]
}

// Portfolio functions (similar structure)
export function getAllPortfolioItems() {
  // For now, return the existing data structure
  // Later this can be moved to markdown files too
  return [
    {
      id: 1,
      title: 'SAVAGE SNEAKER EMPIRE',
      category: 'BRANDING',
      client: 'SNEAKERBEAST',
      description: 'Complete brand destruction and reconstruction for premium sneaker empire.',
      results: '+347% SALES BRUTALITY',
      image: '/portfolio/1.svg',
      featured: true,
      tags: ['BRANDING', 'DESIGN', 'STRATEGY']
    },
    // ... other portfolio items
  ]
}

// Services functions
export function getAllServices() {
  // Return the existing services data
  // This can also be moved to a JSON file for easier management
  return [
    {
      id: 'creative',
      title: 'CREATIVE\nCAMPAIGNS',
      description: 'WE SMASH BORING WITH BRUTAL CREATIVITY THAT MAKES YOUR BRAND LEGENDARY!',
      features: ['BRAND STORYTELLING', 'VISUAL IDENTITY', 'CAMPAIGN STRATEGY', 'CONTENT CREATION', 'CREATIVE DIRECTION'],
      price: '₺15,000',
      popular: false,
      color: 'red'
    },
    // ... other services
  ]
}

// Utility functions
export function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('tr-TR', options)
}

export function calculateReadTime(content) {
  const wordsPerMinute = 200
  const words = content.split(' ').length
  const readTime = Math.ceil(words / wordsPerMinute)
  return `${readTime} MIN`
}

export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}
