'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { modalOverlay, modalContent } from '@/lib/animations'

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  showCloseButton?: boolean
}

export default function AnimatedModal({
  isOpen,
  onClose,
  children,
  className = '',
  showCloseButton = true,
}: AnimatedModalProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const variants = shouldReduceMotion
    ? { hidden: {}, visible: {}, exit: {} }
    : undefined

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          variants={variants ?? modalOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[10000] p-2 glass rounded-full text-text-primary hover:text-accent transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          )}
          <motion.div
            className={`relative z-10 w-full ${className}`}
            variants={variants ?? modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
