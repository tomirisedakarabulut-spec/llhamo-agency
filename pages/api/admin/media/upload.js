import fs from 'fs'
import path from 'path'
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    })

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Upload error:', err)
        return res.status(500).json({ message: 'Upload failed' })
      }

      const file = files.file
      if (!file) {
        return res.status(400).json({ message: 'No file provided' })
      }

      // Get file info
      const fileName = file.originalFilename || file.newFilename
      const filePath = `/uploads/${file.newFilename}`
      const fileSize = file.size

      // For images, you could get dimensions here using a library like 'sharp'
      // For now, we'll return basic info
      
      res.status(200).json({
        message: 'File uploaded successfully',
        path: filePath,
        name: fileName,
        size: fileSize,
        dimensions: 'Unknown' // Could be calculated for images
      })
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
