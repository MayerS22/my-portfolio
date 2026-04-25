'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useMounted } from '@/hooks/useMounted'
import { useTheme } from './ThemeProvider'
import { useLenis } from '@/providers/SmoothScrollProvider'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Freelance', href: '#freelance' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isMounted = useMounted()
  const { theme, toggleTheme } = useTheme()
  const lenis = useLenis()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 30)
    const sections = ['home', 'about', 'skills', 'experience', 'freelance', 'projects', 'contact']
    const pos = window.scrollY + 120
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
      setActiveSection('contact')
    } else {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= pos) { setActiveSection(sections[i]); break }
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(() => { handleScroll(); ticking = false }); ticking = true }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMounted, handleScroll])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileOpen])

  const goTo = (href: string) => {
    setIsMobileOpen(false)
    if (lenis) {
      lenis.scrollTo(href)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled && "glass glass--header"
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center"
          >
            <span
              className="text-xl italic font-light tracking-wide"
              style={{ fontFamily: 'var(--font-geist-mono), cursive', color: 'var(--text-primary)' }}
            >
              <span className="text-gradient">M</span>ayer{' '}
              <span className="text-gradient">F</span>rieg
            </span>
            <span
              className="inline-block w-1.5 h-1.5 rounded-full ml-1.5 -translate-y-1.5"
              style={{ background: 'var(--accent-primary)' }}
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase()
              return (
                <button
                  key={item.name}
                  onClick={() => goTo(item.href)}
                  className="relative text-[13px] font-medium tracking-wide uppercase px-4 py-2 rounded-lg transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className="relative z-10 transition-colors duration-200"
                    style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                  >
                    {item.name}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Desktop right area */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
              style={{
                color: 'var(--text-muted)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark'
                  ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={15} />
                    </motion.div>
                  )
                  : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={15} />
                    </motion.div>
                  )
                }
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg touch-target transition-all duration-200",
              isScrolled && "glass"
            )}
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen
                ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} />
                  </motion.div>
                )
                : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'var(--bg-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'var(--gradient-mesh)' }}
            />
            <div className="flex-1 flex flex-col items-center justify-center gap-2 relative z-10">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.name.toLowerCase()
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => goTo(item.href)}
                    className="text-2xl font-semibold py-2 px-6 rounded-lg transition-colors relative"
                    style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full"
                        style={{ background: 'var(--accent-gradient)' }}
                      />
                    )}
                    {item.name}
                  </motion.button>
                )
              })}
            </div>
            <div className="relative z-10 flex items-center justify-center gap-3 pb-12">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-lg transition-colors"
                style={{
                  color: 'var(--text-muted)',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
