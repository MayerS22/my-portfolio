'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { Github } from 'lucide-react'
import Image from 'next/image'
// Removed unused imports

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  
  // Scroll trigger for the entire section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Transform scroll progress into different animation values
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  // Memoize projects data to prevent unnecessary re-renders
  const projects = useMemo(() => [
    {
      id: 1,
      title: "AutoInsight - Business Intelligence Platform",
      description: "A+ Graduation project: Advanced data analysis and machine learning platform designed to help businesses navigate challenges during layoffs and restructuring. Features predictive analytics, workforce forecasting, and real-time decision-making tools.",
      image: "/images/AutoInsight.png",
      technologies: ["React", "Vite", "Tailwind CSS", "Redux", "Python", "Machine Learning", "Data Analysis", "Forecasting Models", "Interactive Dashboards", "Real-time Analytics"],
      liveUrl: "#",
      githubUrl: "https://github.com/MayerS22/AutoInsight",
      category: "Full-Stack"
    },
    {
      id: 2,
      title: "Taskify - Task Management App",
      description: "Smart, simple, and stylish task management application for daily organization, deadline reminders, and personal productivity. Built with TypeScript and modern web technologies.",
      image: "/images/Taskify.png",
      technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "SQLite", "Authentication", "Real-time Updates"],
      liveUrl: "#",
      githubUrl: "https://github.com/MayerS22/Taskify",
      category: "Full-Stack"
    },
    {
      id: 3,
      title: "Speedo Transfer Mobile Application",
      description: "Completed secure money transfer application for Banque Misr. Features include user authentication, fund transfers, transaction history, and real-time notifications. Built with Jetpack Compose, Kotlin, and MVVM architecture.",
      image: "/images/Speedo.png",
      technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Android", "Firebase", "REST APIs", "Material Design", "Biometric Auth"],
      liveUrl: "#",
      githubUrl: "https://github.com/MayerS22/speedoo",
      category: "Mobile"
    },
    {
      id: 4,
      title: "E-Commerce Mobile Application",
      description: "Mobile e-commerce app with user authentication and real-time product data. Built with Flutter and Firebase.",
      image: "/images/ecommerce-app.jpg",
      technologies: ["Flutter", "Firebase", "Dart", "State Management", "Cloud Firestore", "Authentication", "Payment Integration", "Push Notifications"],
      liveUrl: "#",
      githubUrl: "https://github.com/MayerS22/E-commerce-Mobile-App",
      category: "Mobile"
    }
  ], [])

  const categories = useMemo(() => ["All", "Full-Stack", "Mobile", "Frontend", "Backend", "AI/ML"], [])
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = useMemo(() => 
    activeCategory === "All" 
      ? projects 
      : projects.filter(project => project.category === activeCategory),
    [activeCategory, projects]
  )

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-hidden animated-bg">
      {/* Simple Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ opacity, scale, y }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating my skills and passion for creating innovative solutions
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'glass text-white glow'
                  : 'glass-card text-gray-300 hover:text-white hover:glow'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative glass-card rounded-xl overflow-hidden hover:glow transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  priority={index < 2} // Prioritize first 2 images
                  onError={(e) => {
                    // Fallback to a gradient background if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                {/* Fallback gradient background */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <span className="text-4xl opacity-50">📱</span>
                </div>
                
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4"
                >
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glass rounded-full text-white hover:text-cyan-400 transition-colors"
                  >
                    <Github size={20} />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-cyan-400 font-medium">{project.category}</span>
                  <motion.div
                    animate={{ scale: hoveredProject === project.id ? 1.1 : 1 }}
                    className="text-2xl"
                  >
                    👁️
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 glass-card text-gray-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredProject === project.id ? 0.1 : 0 }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Interested in working together? Let&apos;s discuss your next project!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="glass px-8 py-3 rounded-xl font-semibold text-white hover:glow transition-all duration-300"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
