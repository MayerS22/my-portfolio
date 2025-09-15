'use client'

import { ChevronDown, Download, Github, Linkedin, ArrowRight, Code, Database, Smartphone } from 'lucide-react'

export default function HeroSimple() {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const techIcons = [
    { icon: Code, delay: 0.1 },
    { icon: Database, delay: 0.2 },
    { icon: Smartphone, delay: 0.3 },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden animated-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Professional Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6">
            <span className="text-gradient">
              Your Name
            </span>
          </h1>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-light mb-4">
              Full Stack Developer
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Crafting enterprise-grade applications with cutting-edge technologies. 
              Specializing in scalable solutions and exceptional user experiences.
            </p>
          </div>

          {/* Tech Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            {techIcons.map((tech, index) => (
              <div
                key={index}
                className="glass-card p-4 rounded-xl hover:glow transition-all duration-300"
              >
                <tech.icon size={32} className="text-cyan-400" />
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a
              href="#projects"
              className="group glass px-8 py-4 rounded-xl font-semibold text-white hover:glow transition-all duration-300 flex items-center gap-3"
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="glass-dark px-8 py-4 rounded-xl font-semibold text-gray-300 hover:text-white hover:glow-purple transition-all duration-300 flex items-center gap-3"
            >
              <Download size={20} />
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="glass-card p-4 rounded-xl hover:glow transition-all duration-300"
            >
              <Github size={24} className="text-gray-300 hover:text-white" />
            </a>
            <a
              href="#"
              className="glass-card p-4 rounded-xl hover:glow transition-all duration-300"
            >
              <Linkedin size={24} className="text-gray-300 hover:text-white" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToNext}
            className="glass p-3 rounded-full hover:glow transition-all duration-300 animate-bounce"
          >
            <ChevronDown size={24} className="text-gray-300 hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
