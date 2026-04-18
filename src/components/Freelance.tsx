'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Eye, X, ChevronLeft, ChevronRight, ArrowRight, Clock } from 'lucide-react'
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
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedProject, setSelectedProject] = useState<FreelanceProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  const projects = useMemo(() => [
    {
      id: 1, title: "Consumer Website", client: "SafetyZone",
      description: "Modern consumer-facing website with real-time safety reporting, emergency services integration, and responsive design.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
      duration: "2 months", liveUrl: "https://safetyzoone.com/", githubUrl: "#", category: "Frontend"
    },
    {
      id: 2, title: "Consumer App", client: "SafetyZone",
      description: "Mobile app with real-time safety reporting, emergency services, incident tracking, and direct communication with civil defense.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/safetyZoneConsumer/0.png", "/images/safetyZoneConsumer/1.png", "/images/safetyZoneConsumer/2.png", "/images/safetyZoneConsumer/3.png", "/images/safetyZoneConsumer/4.png", "/images/safetyZoneConsumer/5.png"],
      technologies: ["Flutter", "Firebase", "Dart", "REST APIs"],
      duration: "3 months", liveUrl: "#", githubUrl: "#", category: "Mobile"
    },
    {
      id: 3, title: "Provider App", client: "SafetyZone",
      description: "Provider-facing mobile app with real-time incident management, emergency response coordination, and dispatch center communication.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/SaftyZoneprovider/HomePage.png", "/images/SaftyZoneprovider/BasicInfo.png", "/images/SaftyZoneprovider/chats.png", "/images/SaftyZoneprovider/Offers.png", "/images/SaftyZoneprovider/PendingScreen.png"],
      technologies: ["Flutter", "Firebase", "Dart", "Socket.io"],
      duration: "4 months", liveUrl: "#", githubUrl: "#", category: "Mobile"
    }
  ], [])

  return (
    <section id="freelance" ref={ref} className="py-16 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-4 py-1.5 rounded-full"
            style={{ color: 'var(--accent-primary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.3 }}
          >
            Client work
          </motion.span>
          <h2 className="text-clamp-section font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="Freelance" charDelay={25} />{' '}
            <span className="text-gradient"><SplitText text="Projects" charDelay={25} /></span>
          </h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            Real products, real clients — from concept to launch
          </motion.p>
        </motion.div>

        {/* Two-column split cards: image left, details right */}
        <div className="max-w-6xl mx-auto space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              whileHover={{ borderColor: 'var(--accent-primary)', y: -3, boxShadow: '0 16px 48px rgba(99, 102, 241, 0.12)' }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left column — screenshot */}
                <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto md:min-h-[280px] overflow-hidden flex-shrink-0" style={{ background: 'var(--bg-tertiary)' }}>
                  <Image
                    src={project.images[0] || project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 dark-overlay" />

                  {/* Category + Duration overlay */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1.5 text-xs font-bold rounded-full text-white" style={{ background: 'var(--accent-gradient)' }}>
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full text-white backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.35)' }}>
                      <Clock size={11} /> {project.duration}
                    </span>
                  </div>

                  {/* Client badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Image
                      src={project.image}
                      alt={project.client}
                      width={44}
                      height={44}
                      className="w-10 h-10 rounded-full object-contain p-1"
                      style={{ background: 'rgba(255,255,255,0.9)' }}
                    />
                  </div>
                </div>

                {/* Right column — details */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    SafetyZone {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-xs rounded-md font-medium" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    {project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 text-white text-sm font-semibold rounded-lg"
                        style={{ background: 'var(--accent-gradient)' }}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.images.length > 1 && (
                      <button
                        onClick={() => openModal(project)}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors"
                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                      >
                        <Eye size={14} /> Screenshots
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Have a project in mind? Let&apos;s work together!</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-semibold"
            style={{ background: 'var(--accent-gradient)' }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            Let&apos;s Talk <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal} />
            <button onClick={closeModal} className="absolute top-4 right-4 z-[10000] p-3 glass rounded-full touch-target" style={{ color: 'var(--text-primary)' }} aria-label="Close modal">
              <X size={24} />
            </button>
            <motion.div className="relative w-full max-w-5xl z-50" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                <div className="relative h-[50vh] sm:h-[65vh]" style={{ background: 'var(--bg-tertiary)' }}>
                  <Image src={selectedProject.images[currentImageIndex] || selectedProject.image} alt={selectedProject.title} fill className="object-contain" priority sizes="100vw" />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button onClick={goToPrevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 glass rounded-full touch-target z-10" aria-label="Previous"><ChevronLeft size={22} /></button>
                      <button onClick={goToNextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 glass rounded-full touch-target z-10" aria-label="Next"><ChevronRight size={22} /></button>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full z-10">
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{currentImageIndex + 1} / {selectedProject.images.length}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto pb-1 z-10">
                        {selectedProject.images.map((image, i) => (
                          <button key={i} onClick={() => setCurrentImageIndex(i)} className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden touch-target" style={{ border: i === currentImageIndex ? '2px solid var(--accent-primary)' : '2px solid rgba(255,255,255,0.2)' }}>
                            <Image src={image} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="56px" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>SafetyZone {selectedProject.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{selectedProject.client} &bull; {selectedProject.duration}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
