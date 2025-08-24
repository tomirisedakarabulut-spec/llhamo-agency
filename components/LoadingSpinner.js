import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 'md', text = 'Yükleniyor...' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Neo Brutalist Loading Spinner */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} border-4 border-black bg-yellow-300 shadow-[4px_4px_0px_0px_#000]`}
        >
          {/* Spinner Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-2 bg-red-600 border border-black"
            />
          </div>
          
          {/* Corner Elements */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-black"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-black"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-black"></div>
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-black"></div>
        </motion.div>
      </div>

      {/* Loading Text */}
      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="font-bold text-black text-lg">{text}</p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm text-gray-600 mt-1"
          >
            LHAMO gücü yükleniyor...
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

// Page Loading Component
export function PageLoader() {
  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" text="SAYFA YÜKLENİYOR" />
        
        {/* Loading Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-4 bg-red-600 border border-black"
            />
          </div>
          <p className="text-sm font-bold text-black mt-2">BRUTAL GÜÇ YÜKLENİYOR...</p>
        </div>
      </div>
    </div>
  )
}

// Button Loading Component
export function ButtonLoader({ text = "Gönderiliyor..." }) {
  return (
    <div className="flex items-center space-x-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
      />
      <span className="font-bold">{text}</span>
    </div>
  )
}
