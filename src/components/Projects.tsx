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
    { id: 1, title: "Grace App", description: "AI-powered practice-management SaaS for Canadian mental-health professionals. Built most of the UI and API integration, owned the appointment-scheduling module (availability checks, conflict detection), booking links and waitlist, and built AI features: live session transcription and AI session summaries using OpenAI and Gemini on an event-driven Google Cloud pipeline.", image: "/images/GraceApp.png", images: ["/images/GraceApp.png"], technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "Python", "GCP", "OpenAI", "Gemini"], githubUrl: "#", liveUrl: "https://www.joingrace.ai/en/", category: "Full-Stack" },
    { id: 2, title: "MayerHub", description: "My all-in-one personal life manager: tasks, finances, calendar, notes, journal, health and reports, with AI-powered features like a smart food tracker and expense tracking. Shipped as a web app plus desktop installers for Windows, macOS and Linux on one shared backend.", image: "/images/MayerHub.png", images: ["/images/MayerHub.png"], technologies: ["Next.js", "TypeScript", "AI APIs", "Desktop"], githubUrl: "#", liveUrl: "https://mayer-rise-up.vercel.app", category: "Full-Stack" },
    { id: 3, title: "SafetyZone Consumer Website", description: "Modern consumer-facing website with real-time safety reporting and emergency services integration.", image: "/images/SaftyZoneprovider/SaftyZone.png", images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"], technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"], githubUrl: "#", liveUrl: "https://safetyzoone.com/", category: "Frontend" },
    { id: 4, title: "AutoInsight", description: "Graduation project (A+): a platform that turns company data into cleaned datasets, ML forecasts and chatbot answers for layoff planning. I built the frontend dashboard in a 5-person team.", image: "/images/AutoInsight.png", images: ["/images/AutoInsight.png"], technologies: ["React", "Vite", "Python", "ML"], githubUrl: "https://github.com/MayerS22/AutoInsight", liveUrl: "#", category: "Full-Stack" },
    { id: 5, title: "Mini-Instapay", description: "Microservices P2P payment platform with JWT auth, transaction history, RabbitMQ-driven notifications and financial reports. I built the React/Tailwind frontend in a 4-person team.", image: "/images/MiniInstapay.png", images: ["/images/MiniInstapay.png"], technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB", "RabbitMQ", "Docker"], githubUrl: "#", liveUrl: "#", category: "Full-Stack" },
    { id: 6, title: "SafetyZone Provider App", description: "Mobile app for SafetyZone providers with real-time incident management, emergency response coordination, and communication with dispatch center.", image: "/images/SaftyZoneprovider/SaftyZone.png", images: ["/images/SaftyZoneprovider/HomePage.png", "/images/SaftyZoneprovider/BasicInfo.png", "/images/SaftyZoneprovider/chats.png", "/images/SaftyZoneprovider/Offers.png", "/images/SaftyZoneprovider/PendingScreen.png"], technologies: ["Flutter", "Firebase", "Dart", "Socket.io"], githubUrl: "#", liveUrl: "#", category: "Mobile" },
    { id: 7, title: "SafetyZone Consumer App", description: "Mobile app for SafetyZone consumers with real-time safety reporting, emergency services, and incident tracking.", image: "/images/safetyZoneConsumer/0.png", images: ["/images/safetyZoneConsumer/0.png", "/images/safetyZoneConsumer/1.png", "/images/safetyZoneConsumer/2.png", "/images/safetyZoneConsumer/3.png", "/images/safetyZoneConsumer/4.png", "/images/safetyZoneConsumer/5.png"], technologies: ["Flutter", "Firebase", "Dart", "REST APIs"], githubUrl: "#", liveUrl: "#", category: "Mobile" },
    { id: 8, title: "Speedo Transfer", description: "Money-transfer app built during my Banque Misr internship. I built the frontend with my team: screens, UI components and navigation in Jetpack Compose, connected to REST APIs.", image: "/images/Speedo.png", images: ["/images/Speedo.png"], technologies: ["Kotlin", "Jetpack Compose", "Material Design", "REST APIs"], githubUrl: "https://github.com/MayerS22/speedoo", liveUrl: "#", category: "Mobile" },
    { id: 9, title: "Checko", description: "Full-stack mobile todo with intelligent insights.", image: "/images/Checko/checko-1.jpeg", images: ["/images/Checko/checko-1.jpeg", "/images/Checko/checko-2.jpeg"], technologies: ["React Native", "Firebase", "TypeScript"], githubUrl: "https://github.com/MayerS22/Checko", liveUrl: "#", category: "Mobile" },
    { id: 10, title: "E-Commerce", description: "Mobile e-commerce with real-time data.", image: "/images/ecommerce-app.jpg", images: ["/images/ecommerce-app.jpg"], technologies: ["Flutter", "Firebase", "Dart"], githubUrl: "https://github.com/MayerS22/E-commerce-Mobile-App", liveUrl: "#", category: "Mobile" }
  ], [])

  const categories = useMemo(() => ["All", "Full-Stack", "Mobile", "Frontend"], [])
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = useMemo(() =>
    activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory),
    [activeCategory, projects]
  )

  return (
    <section id="projects" ref={ref} className="section">
      <div className="container-content">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow mb-4 block">Portfolio</span>
          <h2 className="heading-display text-clamp-section" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="Featured" charDelay={30} />{' '}
            <span className="text-gradient"><SplitText text="Projects" charDelay={30} /></span>
          </h2>
          <motion.p
            className="mt-3 text-base sm:text-lg max-w-md"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            A showcase of my recent work.
          </motion.p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all touch-target"
              aria-pressed={activeCategory === category}
              style={activeCategory === category
                ? { background: 'var(--accent-gradient)', color: 'white', boxShadow: '0 8px 24px -8px color-mix(in srgb, var(--accent-primary) 60%, transparent)' }
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
                  transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.015, boxShadow: '0 20px 60px -20px color-mix(in srgb, var(--accent-primary) 40%, transparent)' }}
                  layout
                  onClick={() => openProjectModal(project)}
                >
                  <div className={`relative overflow-hidden ${isFirst ? 'h-64 sm:h-80 lg:h-96' : 'h-64 sm:h-72'}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={isFirst ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                    />
                    <div className="absolute inset-0 dark-overlay" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-primary) 12%, transparent) 0%, transparent 50%)' }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 80%, color-mix(in srgb, var(--accent-primary) 18%, transparent) 0%, transparent 60%)' }} />

                    <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--accent-gradient)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md text-white" style={{ background: 'rgba(0,0,0,0.4)' }}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                    <h3 className={`font-display font-semibold mb-2 text-white ${isFirst ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
                      {project.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, isFirst ? 6 : 4).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-xs rounded-md font-medium backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > (isFirst ? 6 : 4) && (
                        <span className="px-2.5 py-1 text-xs rounded-md" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)' }}>
                          +{project.technologies.length - (isFirst ? 6 : 4)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg backdrop-blur-sm"
                        style={{ background: 'rgba(255,255,255,0.16)', color: 'white' }}
                      >
                        <Eye size={13} /> Details
                      </span>
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all hover:bg-white/25"
                          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.22)', color: 'white' }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${project.title} source code on GitHub`}
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
                          aria-label={`${project.title} live demo`}
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
