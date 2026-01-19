'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

export interface Project {
  id: number
  title: string
  description: string
  image: string
  images: string[]
  technologies: string[]
  liveUrl: string
  githubUrl: string
  category: string
}

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToNextImage = useCallback(() => {
    if (!project) return
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }, [project])

  const goToPrevImage = useCallback(() => {
    if (!project) return
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }, [project])

  // Touch/Swipe handlers for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) goToNextImage()
    if (isRightSwipe) goToPrevImage()
  }, [touchStart, touchEnd, goToNextImage, goToPrevImage])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') goToNextImage()
    if (e.key === 'ArrowLeft') goToPrevImage()
  }, [isOpen, onClose, goToNextImage, goToPrevImage])

  // Add/remove keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!project) return null

  const hasMultipleImages = project.images.length > 1

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-2 sm:inset-4 md:inset-10 lg:inset-20 z-50 flex items-center justify-center pointer-events-none"
          >
            <div
              className="glass rounded-2xl lg:rounded-3xl w-full max-w-7xl h-full overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-20 p-2 sm:top-4 sm:right-4 bg-gray-800/90 hover:bg-gray-700 rounded-full transition-all hover:scale-110"
                aria-label="Close modal"
              >
                <X size={20} className="text-white sm:w-6 sm:h-6" />
              </button>

              {/* Image Gallery Section */}
              <div
                className="w-full md:w-2/3 lg:w-3/4 h-[40vh] md:h-full relative bg-black flex-shrink-0"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={project.images[currentImageIndex] || project.image}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                      sizes="100vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={goToPrevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 glass hover:bg-gray-700 rounded-full transition-all hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 glass hover:bg-gray-700 rounded-full transition-all hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                  <div className="absolute bottom-16 sm:bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-full">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {currentImageIndex + 1} / {project.images.length}
                    </span>
                  </div>
                )}

                {/* Image Thumbnails */}
                {hasMultipleImages && (
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all border-2 ${
                          index === currentImageIndex
                            ? 'border-cyan-400 scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Info Section */}
              <div className="w-full md:w-1/3 lg:w-1/4 p-4 sm:p-6 md:p-8 flex flex-col overflow-y-auto">
                <span className="text-xs sm:text-sm text-cyan-400 font-medium mb-2">
                  {project.category}
                </span>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 glass-card text-gray-300 text-[10px] sm:text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Link - only show if not "#" */}
                {project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition-opacity"
                  >
                    View on GitHub
                  </a>
                )}

                {/* Keyboard Hints */}
                {hasMultipleImages && (
                  <div className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-gray-500 hidden md:block">
                    Use arrow keys or swipe to navigate • Press ESC to close
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
