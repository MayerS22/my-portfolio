'use client'

import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { Github, ExternalLink, Eye } from 'lucide-react'
import Image from 'next/image'
import ProjectDetailModal, { Project } from './ProjectDetailModal'
import SplitText from './SplitText'

export default function Projects() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    { id: 7, title: "SafetyZone Consumer Website", description: "Modern consumer-facing website with real-time safety reporting and emergency services integration.", image: "/images/SaftyZoneprovider/SaftyZone.png", images: ["/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"], technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"], githubUrl: "#", liveUrl: "https://safetyzoone.com/", category: "Frontend" }
  ], [])

  const categories = useMemo(() => ["All", "Full-Stack", "Mobile", "Frontend"], [])
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = useMemo(() =>
    activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory),
    [activeCategory, projects]
  )

  return (
    <section id="projects" ref={ref} className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            <SplitText text="Featured" charDelay={35} />{' '}
            <span className="text-green-700"><SplitText text="Projects" charDelay={35} /></span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
          }}>
            A showcase of my recent work
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors touch-target ${
                activeCategory === category ? 'bg-green-600 text-white' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="card overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.5s ease ${0.5 + index * 0.08}s, transform 0.5s ease ${0.5 + index * 0.08}s`
              }}
            >
              <div className="relative h-48 bg-neutral-300">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">{project.category}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-neutral-900">{project.title}</h3>
                  <button onClick={() => openProjectModal(project)} className="p-3 text-neutral-500 hover:text-green-700 touch-target" aria-label="View project details">
                    <Eye size={20} />
                  </button>
                </div>
                <p className="text-neutral-700 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-neutral-200 text-neutral-800 text-xs rounded-full">{tech}</span>
                  ))}
                </div>
                {(project.liveUrl && project.liveUrl !== "#") || (project.githubUrl && project.githubUrl !== "#") ? (
                  <div className="flex gap-2">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 touch-target">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 touch-target">
                        <Github size={14} /> Code
                      </a>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
    </section>
  )
}
