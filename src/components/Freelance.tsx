'use client'

import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Eye, ChevronLeft, ChevronRight, ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import SplitText from './SplitText'
import AnimatedModal from './motion/AnimatedModal'

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

const ACCENT_CHIP = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'

export default function Freelance() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedProject, setSelectedProject] = useState<FreelanceProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const deliverables = useMemo<FreelanceProject[]>(() => [
    {
      id: 1, title: "Consumer Website", client: "SafetyZone",
      description: "Modern consumer-facing website with real-time safety reporting, emergency services integration, and responsive design.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
      duration: "2 months", liveUrl: "https://safetyzoone.com/", githubUrl: "#", category: "Web"
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
    setSelectedProject((p) => {
      if (!p) return p
      setCurrentImageIndex((prev) => (prev + 1) % p.images.length)
      return p
    })
  }, [])

  const goToPrevImage = useCallback(() => {
    setSelectedProject((p) => {
      if (!p) return p
      setCurrentImageIndex((prev) => (prev - 1 + p.images.length) % p.images.length)
      return p
    })
  }, [])

  // Carousel arrow-key nav (Escape + overlay handled by AnimatedModal)
  useEffect(() => {
    if (!isModalOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNextImage()
      if (e.key === 'ArrowLeft') goToPrevImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isModalOpen, goToNextImage, goToPrevImage])

  return (
    <section id="freelance" ref={ref} className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow mb-4 block">Client work</span>
          <h2 className="heading-display text-clamp-section" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="Freelance" charDelay={25} />{' '}
            <span className="text-gradient"><SplitText text="Projects" charDelay={25} /></span>
          </h2>
          <motion.p
            className="mt-3 text-base sm:text-lg max-w-md"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Real products, real clients — from concept to launch.
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Case study intro */}
          <motion.div
            className="card p-6 sm:p-8 mb-10 flex flex-col sm:flex-row sm:items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }}>
              <Image src="/images/SaftyZoneprovider/SaftyZone.png" alt="SafetyZone" width={56} height={56} className="object-contain p-1.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="eyebrow" style={{ color: 'var(--accent-primary)' }}>Case study</span>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <Clock size={11} /> ~9 months
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                SafetyZone — safety &amp; emergency platform
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                A multi-platform product suite — web, consumer app, and provider app — delivering real-time safety
                reporting, emergency services, and dispatch coordination. Three deliverables, one connected experience.
              </p>
            </div>
            <a
              href="https://safetyzoone.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-white text-sm font-semibold rounded-lg shrink-0 self-start sm:self-center"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <ExternalLink size={14} /> Visit
            </a>
          </motion.div>

          {/* Deliverables grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {deliverables.map((project, index) => (
              <motion.div
                key={project.id}
                className="card overflow-hidden group"
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, borderColor: 'var(--accent-primary)' }}
              >
                <div className="relative h-44 overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <Image
                    src={project.images[0] || project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 dark-overlay" />
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-full text-white" style={{ background: 'var(--accent-gradient)' }}>
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full text-white backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.4)' }}>
                      <Clock size={10} /> {project.duration}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[11px] rounded-md font-medium" style={{ background: ACCENT_CHIP, color: 'var(--accent-primary)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.images.length > 1 && (
                      <button
                        onClick={() => openModal(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors"
                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                      >
                        <Eye size={13} /> Screenshots
                      </button>
                    )}
                    {project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg text-white"
                        style={{ background: 'var(--accent-gradient)' }}
                      >
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
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
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px -8px color-mix(in srgb, var(--accent-primary) 60%, transparent)' }}
              whileTap={{ scale: 0.97 }}
            >
              Let&apos;s Talk <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Carousel modal (reuses AnimatedModal for overlay / Escape / body-lock) */}
      <AnimatedModal isOpen={isModalOpen} onClose={closeModal} className="max-w-5xl">
        {selectedProject && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
            <div className="relative h-[50vh] sm:h-[65vh]" style={{ background: 'var(--bg-tertiary)' }}>
              <Image src={selectedProject.images[currentImageIndex] || selectedProject.image} alt={selectedProject.title} fill className="object-contain" priority sizes="100vw" />
              {selectedProject.images.length > 1 && (
                <>
                  <button onClick={goToPrevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 glass rounded-full touch-target z-10" style={{ color: 'var(--text-primary)' }} aria-label="Previous image"><ChevronLeft size={22} /></button>
                  <button onClick={goToNextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 glass rounded-full touch-target z-10" style={{ color: 'var(--text-primary)' }} aria-label="Next image"><ChevronRight size={22} /></button>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full z-10">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{currentImageIndex + 1} / {selectedProject.images.length}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto pb-1 z-10 no-scrollbar">
                    {selectedProject.images.map((image, i) => (
                      <button key={i} onClick={() => setCurrentImageIndex(i)} className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden touch-target" style={{ border: i === currentImageIndex ? '2px solid var(--accent-primary)' : '2px solid rgba(255,255,255,0.25)' }} aria-label={`View image ${i + 1}`} aria-current={i === currentImageIndex ? 'true' : undefined}>
                        <Image src={image} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="56px" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="p-5 text-center">
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{selectedProject.client} &bull; {selectedProject.duration}</p>
            </div>
          </div>
        )}
      </AnimatedModal>
    </section>
  )
}
