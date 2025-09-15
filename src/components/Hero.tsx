'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Download, Github, Linkedin, ArrowRight, Code, Database, Smartphone, Sparkles, Zap, Target } from 'lucide-react'
import { useMounted } from '@/hooks/useMounted'

export default function Hero() {
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const isMounted = useMounted()

  const texts = [
    'Full Stack Developer',
    'React Specialist',
    'Node.js Expert',
    'UI/UX Enthusiast',
    'Problem Solver'
  ]

  useEffect(() => {
    if (!isMounted) return

    const typeSpeed = isDeleting ? 30 : 60
    const pauseTime = 1500

    const timer = setTimeout(() => {
      const current = texts[textIndex]
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1))
      } else {
        setCurrentText(current.substring(0, currentText.length + 1))
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, textIndex, texts, isMounted])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    { icon: Code, text: 'Modern Web Apps' },
    { icon: Database, text: 'Scalable Backends' },
    { icon: Smartphone, text: 'Mobile Solutions' }
  ]

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Professional Badge */}
          <div className="mb-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-gray-300">
              <Sparkles size={16} className="text-cyan-400" />
              Available for new opportunities
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-4 animate-fade-in-up">
            <span className="text-lg md:text-xl text-gray-400 font-medium tracking-wide">
              Hello, I&apos;m
            </span>
          </div>

          {/* Name with enhanced styling */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Mayer Frieg
            </span>
          </h1>

          {/* Dynamic Title */}
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-light mb-6 h-12 flex items-center justify-center">
              <span className="text-gray-300">I&apos;m a </span>
              <span className="text-cyan-400 ml-2 min-h-[1.2em]">
                {currentText}
                <span className="typing-cursor">|</span>
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating exceptional digital experiences through clean code, 
              innovative solutions, and user-centered design. Let&apos;s build something amazing together.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in-up">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-all duration-200">
                <feature.icon size={18} className="text-cyan-400" />
                <span className="text-sm text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
            <a
              href="#projects"
              className="group w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105"
            >
              <Zap size={18} />
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#contact"
              className="group w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              <Target size={18} />
              Let&apos;s Connect
            </a>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex justify-center space-x-6 mb-12 animate-fade-in-up">
            <a
              href="https://github.com/MayerS22"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <Github size={24} className="text-gray-300 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/mayer-frieg-7a0368226/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Linkedin size={24} className="text-gray-300 group-hover:text-white transition-colors" />
            </a>
            <a
              href="mailto:mayerfrieg@outlook.com"
              className="group p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <Download size={24} className="text-gray-300 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-fade-in-up">
            <button
              onClick={scrollToNext}
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
