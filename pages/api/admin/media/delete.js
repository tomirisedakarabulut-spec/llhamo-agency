import fs from 'fs'
import path from 'path'

export default async function deleteMedia(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { filePath } = req.body
    
    if (!filePath) {
      return res.status(400).json({ message: 'File path is required' })
    }

    const fullPath = path.join(process.cwd(), 'public', filePath)
    
    // Security check: ensure the file is in the uploads directory
    if (!fullPath.includes('uploads')) {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Delete the file
    fs.unlinkSync(fullPath)

    res.status(200).json({ 
      message: 'File deleted successfully',
      path: filePath
    })

  } catch (error) {
    console.error('Error deleting file:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
