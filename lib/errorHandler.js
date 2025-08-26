// Error handling utilities for the backend

export class AppError extends Error {
  constructor(message, statusCode = 500, code = null) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleError(error, req, res) {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  })

  // If it's our custom error, use its status code
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      error: error.message,
      code: error.code
    })
  }

  // For unexpected errors, return 500
  return res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  })
}

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export function validateRequiredFields(data, fields) {
  const missing = fields.filter(field => !data[field])
  
  if (missing.length > 0) {
    throw new AppError(
      `Missing required fields: ${missing.join(', ')}`,
      400,
      'MISSING_FIELDS'
    )
  }
}

export function validateFileUpload(file, allowedTypes = [], maxSize = 10 * 1024 * 1024) {
  if (!file) {
    throw new AppError('No file provided', 400, 'NO_FILE')
  }

  if (file.size > maxSize) {
    throw new AppError('File too large', 400, 'FILE_TOO_LARGE')
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
    throw new AppError('Invalid file type', 400, 'INVALID_FILE_TYPE')
  }
}

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
}

export function validateSlug(slug) {
  if (!slug || typeof slug !== 'string') {
    throw new AppError('Invalid slug', 400, 'INVALID_SLUG')
  }

  // Only allow alphanumeric, hyphens, and underscores
  if (!/^[a-zA-Z0-9-_]+$/.test(slug)) {
    throw new AppError('Slug contains invalid characters', 400, 'INVALID_SLUG_CHARS')
  }

  return slug.toLowerCase()
}

