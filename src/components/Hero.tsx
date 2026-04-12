'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChevronDown, Mail, Github, Linkedin, ArrowRight, Code, Database, Smartphone } from 'lucide-react'
import Image from 'next/image'
import TextReveal from './TextReveal'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  const texts = useMemo(() => ['Full Stack Developer', 'React Specialist', 'Node.js Expert', 'UI/UX Enthusiast', 'Problem Solver'], [])

  useEffect(() => {
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
  }, [currentText, isDeleting, textIndex, texts])

  useEffect(() => { setMounted(true) }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background photo — faint full-width on mobile, right side on desktop */}
      <div
        className={`absolute right-0 top-0 h-full w-full lg:w-1/2 transition-all duration-1000 ease-out ${mounted ? 'translate-x-0 opacity-20 lg:opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <Image
          src="/Me.jpeg"
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Mobile: light full overlay | Desktop: left-fade gradient only */}
        <div className="absolute inset-0 bg-neutral-300/30 lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#d4d4d8] via-[#d4d4d8]/30 to-transparent w-[40%]" />
      </div>

      {/* Text content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">
        <div className="max-w-3xl">
          <div className={`mb-6 inline-flex items-center gap-2 bg-neutral-200/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-neutral-700 transition-all duration-700 delay-300 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
            Available for new opportunities
          </div>

          <div className={`mb-4 transition-all duration-700 delay-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}>
            <span className="text-lg md:text-xl text-neutral-600">Hello, I&apos;m</span>
          </div>

          <h1 className={`text-clamp-hero font-bold mb-6 text-neutral-900 transition-all duration-700 delay-700 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
            <TextReveal delay={300}>Mayer Frieg</TextReveal>
          </h1>

          <div className={`mb-8 transition-all duration-700 delay-[900ms] ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-neutral-800 font-light mb-6 h-12 flex items-center scroll-animate delay-100">
              <span className="text-neutral-600">I&apos;m a </span>
              <span className="text-green-700 ml-2 min-h-[1.2em]">
                {currentText}
                <span className="typing-cursor">|</span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 max-w-xl leading-relaxed">
              Passionate about creating exceptional digital experiences through clean code,
              innovative solutions, and user-centered design.
            </p>
          </div>

          <div className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-[1100ms] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            {[
              { icon: Code, text: 'Modern Web Apps' },
              { icon: Database, text: 'Scalable Backends' },
              { icon: Smartphone, text: 'Mobile Solutions' }
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-2 bg-neutral-200/80 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4">
                <feature.icon size={16} className="text-green-700 sm:size-[18px]" />
                <span className="text-sm text-neutral-800">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 items-center mb-10 transition-all duration-700 delay-[1300ms] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <a
              href="#projects"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              View My Work
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto bg-neutral-200/80 backdrop-blur-sm hover:bg-neutral-300 text-neutral-900 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Let&apos;s Connect
            </a>
          </div>

          <div className={`flex space-x-3 sm:space-x-4 transition-all duration-700 delay-[1500ms] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <a href="https://github.com/MayerS22" target="_blank" rel="noopener noreferrer" className="p-4 sm:p-3 bg-neutral-200/80 backdrop-blur-sm hover:bg-neutral-300 rounded-lg transition-colors touch-target" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/mayer-frieg-7a0368226/" target="_blank" rel="noopener noreferrer" className="p-4 sm:p-3 bg-neutral-200/80 backdrop-blur-sm hover:bg-neutral-300 rounded-lg transition-colors touch-target" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="mailto:mayerfrieg@outlook.com" className="p-4 sm:p-3 bg-neutral-200/80 backdrop-blur-sm hover:bg-neutral-300 rounded-lg transition-colors touch-target" aria-label="Email">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button onClick={scrollToNext} className={`flex flex-col items-center gap-2 text-neutral-500 hover:text-neutral-700 transition-all duration-700 delay-[1700ms] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </div>
    </section>
  )
}
