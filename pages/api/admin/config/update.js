import fs from 'fs'
import path from 'path'

export default async function updateConfig(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const configData = req.body
    
    // Validate required fields
    if (!configData.site?.name || !configData.site?.url) {
      return res.status(400).json({ message: 'Missing required site configuration' })
    }

    // Ensure config directory exists
    const configDir = path.join(process.cwd(), 'content', 'config')
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true })
    }

    // Write configuration file
    const configPath = path.join(configDir, 'site.json')
    fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), 'utf8')

    res.status(200).json({ 
      message: 'Configuration updated successfully',
      path: configPath
    })

  } catch (error) {
    console.error('Error updating configuration:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
