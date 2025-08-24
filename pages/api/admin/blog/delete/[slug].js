import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { slug } = req.query
  
  try {
    const contentDir = path.join(process.cwd(), 'content', 'blog')
    const filePath = path.join(contentDir, `${slug}.md`)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Delete the file
    fs.unlinkSync(filePath)

    res.status(200).json({ 
      message: 'Post deleted successfully',
      slug: slug
    })

  } catch (error) {
    console.error('Error deleting post:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
