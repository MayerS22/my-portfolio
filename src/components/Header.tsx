'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'
import { useMounted } from '@/hooks/useMounted'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Freelance', href: '#freelance' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/MayerS22', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/', icon: Linkedin },
  { name: 'Email', href: 'mailto:mayerfrieg@outlook.com', icon: Mail },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isMounted = useMounted()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
    const sections = ['home', 'about', 'skills', 'experience', 'freelance', 'projects', 'contact']
    const scrollPosition = window.scrollY + 100
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50
    if (isAtBottom) {
      setActiveSection('contact')
    } else {
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [isMounted, handleScroll])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all border-b ${
      isScrolled ? 'bg-neutral-200/90 backdrop-blur-sm border-neutral-300' : 'bg-neutral-300/70 backdrop-blur-md border-neutral-300/50'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-neutral-900 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Mayer Frieg
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.name.toLowerCase() ? 'text-green-700' : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 text-neutral-600 hover:text-green-700 rounded-lg hover:bg-neutral-300 transition-colors touch-target">
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-3 text-neutral-700 hover:bg-neutral-300 rounded-lg touch-target">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-neutral-200 border-t border-neutral-300 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium touch-target ${
                    activeSection === item.name.toLowerCase() ? 'bg-green-100 text-green-700' : 'text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4 px-4 pt-4 border-t border-neutral-300 mt-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 text-neutral-600 hover:text-green-700 touch-target">
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
