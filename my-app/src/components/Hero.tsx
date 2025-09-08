'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, Download, Github, Linkedin, ArrowRight, Code, Database, Smartphone } from 'lucide-react'

export default function Hero() {
  const [showScrollUp, setShowScrollUp] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const techIcons = [
    { icon: Code, delay: 0.1 },
    { icon: Database, delay: 0.2 },
    { icon: Smartphone, delay: 0.3 },
  ]

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden animated-bg"
    >
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Professional Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-300">
                Available for Projects
              </span>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-4">
            <span className="text-lg text-gray-400 font-medium tracking-wide uppercase">
              Hello, I'm
            </span>
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
            <span className="text-gradient">
              Your Name
            </span>
          </h1>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light mb-4">
              Full Stack Developer
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              Crafting enterprise-grade applications with cutting-edge technologies. 
              Specializing in scalable solutions and exceptional user experiences.
            </p>
          </div>

          {/* Tech Icons */}
          <div className="flex justify-center space-x-4 sm:space-x-8 mb-12">
            {techIcons.map((tech, index) => (
              <div
                key={index}
                className="glass-card p-3 sm:p-4 rounded-xl hover:glow transition-all duration-300"
              >
                <tech.icon size={24} className="sm:w-8 sm:h-8 text-cyan-400" />
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 px-4">
            <a
              href="#projects"
              className="group glass px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white hover:glow transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              View My Work
              <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="glass-dark px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-gray-300 hover:text-white hover:glow-purple transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a
              href="#"
              className="glass-card p-3 sm:p-4 rounded-xl hover:glow transition-all duration-300"
            >
              <Github size={20} className="sm:w-6 sm:h-6 text-gray-300 hover:text-white" />
            </a>
            <a
              href="#"
              className="glass-card p-3 sm:p-4 rounded-xl hover:glow transition-all duration-300"
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6 text-gray-300 hover:text-white" />
            </a>
          </div>
        </div>

        {/* Scroll Up Button - Only shows when scrolled down */}
        {showScrollUp && (
          <div className="fixed bottom-8 left-8 z-50">
            <button
              onClick={scrollToTop}
              className="glass p-3 rounded-full hover:glow transition-all duration-300 animate-bounce"
            >
              <ChevronUp size={24} className="text-gray-300 hover:text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
