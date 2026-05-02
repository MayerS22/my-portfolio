'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Eye } from 'lucide-react'
import Image from 'next/image'
import ProjectDetailModal, { Project } from './ProjectDetailModal'
import SplitText from './SplitText'
import TiltCard from './motion/TiltCard'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProjectModal = useCallback((project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  const closeProjectModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }, [])

  const projects = useMemo(() => [
    { id: 1, title: "AutoInsight", description: "Advanced data analysis and ML platform for business intelligence.", image: "/images/AutoInsight.png", images: ["/images/AutoInsight.png"], technologies: ["React", "Vite", "Python", "ML"], githubUrl: "https://github.com/MayerS22/AutoInsight", liveUrl: "#", category: "Full-Stack" },
    { id: 2, title: "SafetyZone Consumer App", description: "Mobile app for SafetyZone consumers with real-time safety reporting, emergency services, and incident tracking.", image: "/images/safetyZoneConsumer/0.png", images: ["/images/safetyZoneConsumer/0.png", "/images/safetyZoneConsumer/1.png", "/images/safetyZoneConsumer/2.png", "/images/safetyZoneConsumer/3.png", "/images/safetyZoneConsumer/4.png", "/images/safetyZoneConsumer/5.png"], technologies: ["Flutter", "Firebase", "Dart", "REST APIs"], githubUrl: "#", liveUrl: "#", category: "Mobile" },
    { id: 3, title: "Speedo Transfer", description: "Secure money transfer app for Banque Misr.", image: "/images/Speedo.png", images: ["/images/Speedo.png"], technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Firebase"], githubUrl: "https://github.com/MayerS22/speedoo", liveUrl: "#", category: "Mobile" },
    { id: 4, title: "Checko", description: "Full-stack mobile todo with intelligent insights.", image: "/images/Checko/checko-1.jpeg", images: ["/images/Checko/checko-1.jpeg", "/images/Checko/checko-2.jpeg"], technologies: ["React Native", "Firebase", "TypeScript"], githubUrl: "https://github.com/MayerS22/Checko", liveUrl: "#", category: "Mobile" },
    { id: 5, title: "E-Commerce", description: "Mobile e-commerce with real-time data.", image: "/images/ecommerce-app.jpg", images: ["/images/ecommerce-app.jpg"], technologies: ["Flutter", "Firebase", "Dart"], githubUrl: "https://github.com/MayerS22/E-commerce-Mobile-App", liveUrl: "#", category: "Mobile" },
    { id: 6, title: "SafetyZone Provider App", description: "Mobile app for SafetyZone providers with real-time incident management, emergency response coordination, and communication with dispatch center.", image: "/images/SaftyZoneprovider/SaftyZone.png", images: ["/images/SaftyZoneprovider/HomePage.png", "/images/SaftyZoneprovider/BasicInfo.png", "/images/SaftyZoneprovider/chats.png", "/images/SaftyZoneprovider/Offers.png", "/images/SaftyZoneprovider/PendingScreen.png"], technologies: ["Flutter", "Firebase", "Dart", "Socket.io"], githubUrl: "#", liveUrl: "#", category: "Mobile" },
    { id: 7, title: "SafetyZone Consumer Website", description: "Modern consumer-facing website with real-time safety reporting and emergency services integration.", image: "/images/SaftyZoneprovider/SaftyZone.png", images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"], technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"], githubUrl: "#", liveUrl: "https://safetyzoone.com/", category: "Frontend" },
    { id: 8, title: "Grace App", description: "Cloud-native SaaS platform for Canadian mental health professionals. Multi-tenant user management, role aggregation, Redis caching, and frontend components built in an Agile environment.", image: "/images/GraceApp.png", images: ["/images/GraceApp.png"], technologies: ["React", "Node.js", "Redis", "TypeScript", "PostgreSQL"], githubUrl: "#", liveUrl: "https://www.joingrace.ai/en/", category: "Full-Stack" },
    { id: 9, title: "Taskify", description: "Productivity web app with React frontend and Node.js backend. Task management, authentication, and persistent storage.", image: "/images/Taskify.png", images: ["/images/Taskify.png"], technologies: ["React", "Node.js", "JavaScript", "REST APIs"], githubUrl: "#", liveUrl: "#", category: "Full-Stack" }
  ], [])

  const categories = useMemo(() => ["All", "Full-Stack", "Mobile", "Frontend"], [])
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = useMemo(() =>
    activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory),
    [activeCategory, projects]
  )

  return (
    <section id="projects" ref={ref} className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-4 py-1.5 rounded-full"
            style={{ color: 'var(--accent-primary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-clamp-section font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="Featured" charDelay={35} />{' '}
            <span className="text-gradient"><SplitText text="Projects" charDelay={35} /></span>
          </h2>
          <motion.p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A showcase of my recent work
          </motion.p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all touch-target"
              style={activeCategory === category
                ? { background: 'var(--accent-gradient)', color: 'white', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)' }
                : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }
              }
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => {
            const isFirst = index === 0 && activeCategory === "All"
            return (
              <TiltCard key={project.id} className={`[perspective:1000px] ${isFirst ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                  <motion.div
                    className="relative rounded-2xl overflow-hidden group cursor-pointer"
                    style={{ background: 'var(--bg-tertiary)' }}
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ scale: 1.015, boxShadow: '0 20px 60px rgba(99, 102, 241, 0.15)' }}
                    layout
                    onClick={() => openProjectModal(project)}
                  >
                {/* Background image */}
                <div className={`relative overflow-hidden ${isFirst ? 'h-64 sm:h-80 lg:h-96' : 'h-64 sm:h-72'}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes={isFirst ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                  />

                  {/* Multi-layer gradient overlay — theme-aware */}
                  <div className="absolute inset-0 dark-overlay" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, transparent 50%)' }} />

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 80%, rgba(99,102,241,0.15) 0%, transparent 60%)' }} />

                  {/* Number badge */}
                  <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--accent-gradient)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md text-white" style={{ background: 'rgba(0,0,0,0.35)' }}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                  <h3 className={`font-bold mb-2 text-white ${isFirst ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, isFirst ? 6 : 4).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-xs rounded-md font-medium backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > (isFirst ? 6 : 4) && (
                      <span className="px-2.5 py-1 text-xs rounded-md" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}>
                        +{project.technologies.length - (isFirst ? 6 : 4)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    <button
                      className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg backdrop-blur-sm transition-all hover:bg-white/20"
                      style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
                    >
                      <Eye size={13} /> Details
                    </button>
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all hover:bg-white/20"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={13} /> Code
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-white"
                        style={{ background: 'var(--accent-gradient)' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
              </TiltCard>
            )
          })}
        </div>
      </div>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
    </section>
  )
}
