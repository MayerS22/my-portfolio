'use client'

import { useState, useCallback, useEffect } from 'react'
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

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') goToNextImage()
    if (e.key === 'ArrowLeft') goToPrevImage()
  }, [isOpen, onClose, goToNextImage, goToPrevImage])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

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

  useEffect(() => {
    if (project) setCurrentImageIndex(0)
  }, [project])

  if (!project || !isOpen) return null

  const hasMultipleImages = project.images.length > 1
  const currentImage = project.images[currentImageIndex] || project.image

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4" onClick={onClose}>

        {/* Modal Content - stop propagation so clicks inside don't close */}
        <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[10000] p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh] bg-gray-100 relative flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image
                src={currentImage}
                alt={project.title}
                fill
                className="object-contain"
                priority
              />

              {/* Arrows - only show if multiple images */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg z-10"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg z-10"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {/* Counter */}
              {hasMultipleImages && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full shadow z-10">
                  <span className="text-sm font-medium">{currentImageIndex + 1} / {project.images.length}</span>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/3 p-6 overflow-y-auto bg-gray-50">
            <span className="text-xs text-green-600 font-bold mb-2 block">{project.category}</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h2>
            <p className="text-gray-700 text-sm mb-6">{project.description}</p>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">{tech}</span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t">
              {project.githubUrl !== "#" && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium mb-2">
                  <Github size={18} />
                  GitHub
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-lg font-medium">
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
