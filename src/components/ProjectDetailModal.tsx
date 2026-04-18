'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Github, ExternalLink } from 'lucide-react'
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goToNextImage()
      if (e.key === 'ArrowLeft') goToPrevImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose, goToNextImage, goToPrevImage])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    if (project) setCurrentImageIndex(0)
  }, [project])

  const hasMultipleImages = project ? project.images.length > 1 : false
  const currentImage = project ? (project.images[currentImageIndex] || project.image) : ''

  return (
    <AnimatePresence>
      {project && isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            style={{ background: 'var(--bg-secondary)' }}
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-[10000] p-2 glass rounded-full" style={{ color: 'var(--text-primary)' }} aria-label="Close">
              <X size={20} />
            </button>

            {/* Image */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh] relative flex items-center justify-center p-4" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="relative w-full h-full">
                <Image src={currentImage} alt={project.title} fill className="object-contain" priority />
                {hasMultipleImages && (
                  <>
                    <button onClick={goToPrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 glass rounded-full z-10" aria-label="Previous"><ChevronLeft size={24} /></button>
                    <button onClick={goToNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 glass rounded-full z-10" aria-label="Next"><ChevronRight size={24} /></button>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 glass rounded-full z-10">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{currentImageIndex + 1} / {project.images.length}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-1/3 p-6 overflow-y-auto">
              <span className="text-xs font-bold mb-2 block text-accent">{project.category}</span>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{project.title}</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

              <div className="mb-6">
                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
                {project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full px-4 py-3 text-white rounded-lg font-medium mb-2" style={{ background: 'var(--accent-gradient)' }}>
                    <Github size={18} /> GitHub
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full px-4 py-3 rounded-lg font-medium" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
