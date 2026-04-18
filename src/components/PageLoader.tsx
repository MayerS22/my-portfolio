'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, type ReactNode } from 'react'

export default function PageLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            style={{ background: '#0a0a0f' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                  Mayer{' '}
                  <span className="text-gradient">Frieg</span>
                </h1>
              </motion.div>
              <motion.div
                className="h-0.5 mt-3 mx-auto bg-gradient-to-r from-indigo-500 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{ delay: 0.6, duration: 0.7, ease: 'easeInOut' }}
              />
              <motion.p
                className="text-sm mt-4"
                style={{ color: '#64748b' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                Loading portfolio...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && children}
    </>
  )
}
