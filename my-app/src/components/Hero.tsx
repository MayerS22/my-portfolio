'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          {/* Greeting */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-lg text-gray-400 font-medium tracking-wide uppercase">
              Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-gradient">
              Mayer Frieg
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light mb-4">
              Software Engineer & Full Stack Developer
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              Crafting enterprise-grade applications with cutting-edge technologies. 
              Specializing in scalable solutions and exceptional user experiences.
            </p>
          </motion.div>

          {/* Tech Icons */}
          <motion.div 
            className="flex justify-center space-x-4 sm:space-x-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {techIcons.map((tech, index) => (
              <motion.div
                key={index}
                className="glass-card p-3 sm:p-4 rounded-xl hover:glow transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <tech.icon size={24} className="sm:w-8 sm:h-8 text-cyan-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="group glass px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white hover:glow transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="#contact"
              className="glass-dark px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-gray-300 hover:text-white hover:glow-purple transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-4 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.a
              href="#"
              className="glass-card p-3 sm:p-4 rounded-xl hover:glow transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} className="sm:w-6 sm:h-6 text-gray-300 hover:text-white" />
            </motion.a>
            <motion.a
              href="#"
              className="glass-card p-3 sm:p-4 rounded-xl hover:glow transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6 text-gray-300 hover:text-white" />
            </motion.a>
          </motion.div>
        </motion.div>

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
