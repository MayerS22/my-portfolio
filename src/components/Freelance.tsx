'use client'

import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { ExternalLink, Github, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import SplitText from './SplitText'

export interface FreelanceProject {
  id: number
  title: string
  client: string
  description: string
  image: string
  images: string[]
  technologies: string[]
  duration: string
  liveUrl: string
  githubUrl: string
  category: string
}

export default function Freelance() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<FreelanceProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const openModal = useCallback((project: FreelanceProject) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }, [])

  const goToNextImage = useCallback(() => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
  }, [selectedProject])

  const goToPrevImage = useCallback(() => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
  }, [selectedProject])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') goToNextImage()
      if (e.key === 'ArrowLeft') goToPrevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal, goToNextImage, goToPrevImage])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isModalOpen])

  const projects = useMemo(() => [
    {
      id: 1,
      title: "SafetyZone Consumer Website",
      client: "SafetyZone",
      description: "Modern consumer-facing website built with Next.js and React. Features real-time safety reporting, emergency services integration, and responsive design for optimal mobile experience.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
      duration: "2 months",
      liveUrl: "https://safetyzoone.com/",
      githubUrl: "#",
      category: "Frontend"
    },
    {
      id: 2,
      title: "SafetyZone Consumer App",
      client: "SafetyZone",
      description: "Mobile app for SafetyZone consumers with real-time safety reporting, emergency services, incident tracking, and direct communication with civil defense.",
      image: "/images/safetyZoneConsumer/0.png",
      images: ["/images/safetyZoneConsumer/0.png", "/images/safetyZoneConsumer/1.png", "/images/safetyZoneConsumer/2.png", "/images/safetyZoneConsumer/3.png", "/images/safetyZoneConsumer/4.png", "/images/safetyZoneConsumer/5.png"],
      technologies: ["Flutter", "Firebase", "Dart", "REST APIs"],
      duration: "3 months",
      liveUrl: "#",
      githubUrl: "#",
      category: "Mobile"
    },
    {
      id: 3,
      title: "SafetyZone Provider App",
      client: "SafetyZone",
      description: "Mobile app for SafetyZone providers with real-time incident management, emergency response coordination, and communication with dispatch center.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/SaftyZoneprovider/HomePage.png", "/images/SaftyZoneprovider/BasicInfo.png", "/images/SaftyZoneprovider/chats.png", "/images/SaftyZoneprovider/Offers.png", "/images/SaftyZoneprovider/PendingScreen.png"],
      technologies: ["Flutter", "Firebase", "Dart", "Socket.io"],
      duration: "4 months",
      liveUrl: "#",
      githubUrl: "#",
      category: "Mobile"
    }
  ], [])

  return (
    <section id="freelance" ref={ref} className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            <SplitText text="Freelance" charDelay={35} />{' '}
            <span className="text-green-700"><SplitText text="Projects" charDelay={35} /></span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
          }}>
            Projects I&apos;ve delivered for clients worldwide
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="card overflow-hidden hover:border-green-600 transition-colors"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${0.4 + index * 0.15}s, transform 0.6s ease ${0.4 + index * 0.15}s`
              }}
            >
              <div className="relative h-48 bg-neutral-300">
                <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">{project.category}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-green-700 font-medium uppercase tracking-wide">Client</span>
                  <span className="text-sm font-semibold text-neutral-900">{project.client}</span>
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-neutral-900">{project.title}</h3>
                  {project.images && project.images.length > 1 && (
                    <button onClick={() => openModal(project)} className="p-3 text-neutral-500 hover:text-green-700 touch-target" aria-label="View project images">
                      <Eye size={20} />
                    </button>
                  )}
                </div>
                <p className="text-neutral-700 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center gap-2 mb-4 text-xs text-neutral-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 9 0 0118 0z" />
                  </svg>
                  <span>{project.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-neutral-300 text-neutral-800 text-xs rounded-full">{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-neutral-300 text-neutral-500 text-xs rounded-full">+{project.technologies.length - 4}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-3 sm:py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1 touch-target">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-3 sm:py-2 bg-neutral-300 hover:bg-neutral-400 text-neutral-800 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1 touch-target">
                      <Github size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s'
        }}>
          <p className="text-neutral-700 mb-6">Have a project in mind? Let&apos;s work together!</p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
            Let&apos;s Talk
          </a>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/80" onClick={closeModal} />
          <button onClick={closeModal} className="absolute top-4 right-4 z-[60] p-3 bg-white hover:bg-neutral-200 rounded-full shadow-lg touch-target" aria-label="Close modal">
            <X size={24} />
          </button>
          <div className="relative w-full max-w-5xl z-50">
            <div className="relative bg-neutral-200 rounded-xl overflow-hidden shadow-2xl">
              <div className="relative h-[50vh] sm:h-[60vh] bg-neutral-300">
                <Image src={selectedProject.images[currentImageIndex] || selectedProject.image} alt={selectedProject.title} fill className="object-contain" priority sizes="100vw" />
                {selectedProject.images.length > 1 && (
                  <>
                    <button onClick={goToPrevImage} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg touch-target z-10" aria-label="Previous image">
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={goToNextImage} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg touch-target z-10" aria-label="Next image">
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                {selectedProject.images.length > 1 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 rounded-full shadow-md z-10">
                    <span className="text-neutral-800 text-sm font-medium">{currentImageIndex + 1} / {selectedProject.images.length}</span>
                  </div>
                )}
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-2 left-2 right-2 flex gap-2 overflow-x-auto pb-2">
                    {selectedProject.images.map((image, index) => (
                      <button key={index} onClick={() => setCurrentImageIndex(index)} className={`relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 touch-target ${index === currentImageIndex ? 'border-green-600' : 'border-transparent'}`}>
                        <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 bg-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900">{selectedProject.title}</h3>
                <p className="text-sm text-neutral-700">{selectedProject.client}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
