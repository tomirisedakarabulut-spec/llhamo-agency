import { useState, useRef } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  Upload,
  Image,
  Trash2,
  Copy,
  Eye,
  Download,
  Search,
  Filter,
  Grid,
  List,
  Plus
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

export default function AdminMedia() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'brutal-logo.svg',
      path: '/logo.svg',
      size: '2.4 KB',
      type: 'image/svg+xml',
      uploadDate: '2024-01-15',
      dimensions: '512x512'
    },
    {
      id: 2,
      name: 'favicon.svg',
      path: '/favicon.svg',
      size: '1.8 KB',
      type: 'image/svg+xml',
      uploadDate: '2024-01-15',
      dimensions: '32x32'
    },
    {
      id: 3,
      name: 'portfolio-1.svg',
      path: '/portfolio/1.svg',
      size: '3.2 KB',
      type: 'image/svg+xml',
      uploadDate: '2024-01-14',
      dimensions: '800x600'
    }
  ])
  
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedFiles, setSelectedFiles] = useState([])
  const fileInputRef = useRef(null)

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files)
    setIsUploading(true)

    try {
      for (const file of uploadedFiles) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/media/upload', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          const newFile = {
            id: Date.now() + Math.random(),
            name: file.name,
            path: result.path,
            size: formatFileSize(file.size),
            type: file.type,
            uploadDate: new Date().toISOString().split('T')[0],
            dimensions: result.dimensions || 'Unknown'
          }
          setFiles(prev => [newFile, ...prev])
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading files')
    }

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleCopyPath = (path) => {
    navigator.clipboard.writeText(path)
    alert('Path copied to clipboard!')
  }

  const handleDeleteFile = async (fileId) => {
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        const file = files.find(f => f.id === fileId)
        const response = await fetch('/api/admin/media/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ path: file.path })
        })

        if (response.ok) {
          setFiles(prev => prev.filter(f => f.id !== fileId))
        }
      } catch (error) {
        console.error('Delete error:', error)
        alert('Error deleting file')
      }
    }
  }

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  return (
    <AdminLayout title="MEDIA LIBRARY">
      <Head>
        <title>Media Library | LHAMO Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 
              className="text-3xl font-black text-black mb-2"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              BRUTAL MEDIA ARSENAL
            </h1>
            <p className="font-bold text-gray-600">
              Manage your savage visual assets with brutal efficiency
            </p>
          </div>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="neo-button flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>{isUploading ? 'UPLOADING...' : 'UPLOAD FILES'}</span>
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-card bg-yellow-300 p-8 text-center border-dashed border-4 border-black"
          onDrop={(e) => {
            e.preventDefault()
            const files = Array.from(e.dataTransfer.files)
            handleFileUpload({ target: { files } })
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <Upload className="w-16 h-16 text-black mx-auto mb-4" />
          <h3 className="text-xl font-black text-black mb-2">
            DRAG & DROP BRUTAL VISUALS
          </h3>
          <p className="font-bold text-black mb-4">
            Or click to select files from your device
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="neo-button-secondary"
          >
            SELECT FILES
          </button>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="neo-card bg-white p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="SEARCH MEDIA FILES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full neo-input pr-12 uppercase placeholder:text-gray-500"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 border-4 border-black ${
                  viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-black'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 border-4 border-black ${
                  viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-black'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Bulk Actions */}
            {selectedFiles.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm">
                  {selectedFiles.length} selected
                </span>
                <button className="neo-button-secondary text-sm">
                  BULK DELETE
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Files Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`neo-card p-4 group relative ${
                  selectedFiles.includes(file.id) ? 'bg-red-600 text-white' : 'bg-white text-black'
                }`}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => toggleFileSelection(file.id)}
                    className="w-4 h-4"
                  />
                </div>

                {/* File Preview */}
                <div className="bg-gray-100 border-2 border-black h-32 flex items-center justify-center mb-4 overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.path}
                      alt={file.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <Image className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                {/* File Info */}
                <div className="mb-4">
                  <h4 className="font-black text-sm mb-1 truncate" title={file.name}>
                    {file.name}
                  </h4>
                  <div className="text-xs font-bold opacity-75 space-y-1">
                    <div>{file.size}</div>
                    <div>{file.dimensions}</div>
                    <div>{file.uploadDate}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => window.open(file.path, '_blank')}
                    className={`flex-1 text-center py-1 px-2 border-2 font-bold text-xs ${
                      selectedFiles.includes(file.id)
                        ? 'bg-white text-black border-white'
                        : 'bg-gray-100 text-black border-black'
                    }`}
                    title="View"
                  >
                    <Eye className="w-3 h-3 inline" />
                  </button>
                  <button
                    onClick={() => handleCopyPath(file.path)}
                    className={`flex-1 text-center py-1 px-2 border-2 font-bold text-xs ${
                      selectedFiles.includes(file.id)
                        ? 'bg-yellow-300 text-black border-white'
                        : 'bg-black text-white border-black'
                    }`}
                    title="Copy Path"
                  >
                    <Copy className="w-3 h-3 inline" />
                  </button>
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    className="p-1 bg-red-600 text-white border-2 border-black hover:bg-red-800 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card bg-white p-6"
          >
            <div className="space-y-4">
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center space-x-4 p-4 border-2 border-black ${
                    selectedFiles.includes(file.id) ? 'bg-red-600 text-white' : 'bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => toggleFileSelection(file.id)}
                    className="w-4 h-4"
                  />
                  
                  <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={file.path}
                        alt={file.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <Image className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-black text-lg">{file.name}</h4>
                    <div className="text-sm font-bold opacity-75">
                      {file.size} • {file.dimensions} • {file.uploadDate}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.open(file.path, '_blank')}
                      className="p-2 bg-gray-200 text-black border-2 border-black hover:bg-gray-300"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyPath(file.path)}
                      className="p-2 bg-black text-white border-2 border-black hover:bg-gray-800"
                      title="Copy Path"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-2 bg-red-600 text-white border-2 border-black hover:bg-red-800"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredFiles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card bg-white text-center py-12"
          >
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-black text-black mb-2">
              NO MEDIA FILES FOUND
            </h3>
            <p className="font-bold text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search term'
                : 'Upload your first brutal visual assets!'
              }
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="neo-button"
            >
              UPLOAD FIRST FILE
            </button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'TOTAL FILES', value: files.length },
            { label: 'SELECTED', value: selectedFiles.length },
            { label: 'IMAGES', value: files.filter(f => f.type.startsWith('image/')).length },
            { label: 'SHOWING', value: filteredFiles.length }
          ].map((stat, index) => (
            <div key={stat.label} className="neo-card bg-black text-white p-4 text-center">
              <div className="text-2xl font-black text-red-600 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </AdminLayout>
  )
}
