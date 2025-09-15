'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, Download, Github, Linkedin, ArrowRight, Code, Database, Smartphone } from 'lucide-react'
import { useMounted } from '@/hooks/useMounted'
import NoSSR from '@/components/NoSSR'

export default function Hero() {
  const [showScrollUp, setShowScrollUp] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isMounted = useMounted()

  useEffect(() => {
    if (!isMounted) return
    
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 300)
    }
    
    // Trigger animations on mount with a small delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMounted])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      
      {/* Floating orbs - only show after mount to prevent hydration issues */}
      <NoSSR>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-lg animate-float" 
             style={{ animationDelay: '2s' }} />
      </NoSSR>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Greeting */}
          <div 
            className={`mb-4 ${isMounted && isVisible ? 'animate-slide-down' : 'opacity-0'}`}
            style={{ animationDelay: isMounted ? '0.2s' : '0s' }}
          >
            <span className="text-sm md:text-lg text-gray-400 font-medium tracking-wide uppercase">
              Hello, I&apos;m
            </span>
          </div>

          {/* Name */}
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isMounted && isVisible ? 'animate-fade-scale' : 'opacity-0'}`}
            style={{ animationDelay: isMounted ? '0.4s' : '0s' }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Mayer Frieg
            </span>
          </h1>

          {/* Title */}
          <div 
            className={`mb-8 ${isMounted && isVisible ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: isMounted ? '0.6s' : '0s' }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl text-white font-light mb-4">
              Full Stack Developer
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              Crafting enterprise-grade applications with cutting-edge technologies. 
              Specializing in scalable solutions and exceptional user experiences.
            </p>
          </div>

          {/* Tech Icons */}
          <div 
            className={`flex justify-center space-x-4 mb-8 ${isMounted && isVisible ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: isMounted ? '0.8s' : '0s' }}
          >
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300">
              <Code size={20} className="text-cyan-400" />
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300">
              <Database size={20} className="text-cyan-400" />
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300">
              <Smartphone size={20} className="text-cyan-400" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-4 ${isMounted && isVisible ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: isMounted ? '1s' : '0s' }}
          >
            <a
              href="#projects"
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              View My Work
              <ArrowRight size={16} />
            </a>
            
            <a
              href="#contact"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div 
            className={`flex justify-center space-x-4 ${isMounted && isVisible ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: isMounted ? '1.2s' : '0s' }}
          >
            <a
              href="https://github.com/MayerS22"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              <Github size={20} className="text-gray-300 hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/mayer-frieg-7a0368226/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              <Linkedin size={20} className="text-gray-300 hover:text-white" />
            </a>
          </div>
        </div>

        {/* Scroll Up Button */}
        <NoSSR>
          {showScrollUp && (
            <div className="fixed bottom-8 left-8 z-50">
              <button
                onClick={scrollToTop}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <ChevronUp size={20} className="text-gray-300 hover:text-white" />
              </button>
            </div>
          )}
        </NoSSR>
      </div>
    </section>
  )
}
