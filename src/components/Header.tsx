'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap'
import { turnTo } from '@/lib/pageTurn'
import HeaderDesk from './book/HeaderDesk'

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
  const { theme, toggleTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const menuOpenRef = useRef(false)
  menuOpenRef.current = isMobileOpen

  useFocusTrap(menuRef, isMobileOpen)

  // Active section: whichever section's top has crossed 40% of the viewport (rect-based, so pin spacers don't skew it).
  const updateActive = useCallback(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'freelance', 'projects', 'contact']
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      setActiveSection('contact')
      return
    }
    const line = window.innerHeight * 0.4
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i])
      if (el && el.getBoundingClientRect().top <= line) { setActiveSection(sections[i]); return }
    }
    setActiveSection('home')
  }, [])

  // Scroll events: glass state, hide on scroll down / reveal on scroll up, active nav item.
  useGSAP(() => {
    const header = headerRef.current!
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      gsap.from(header, { yPercent: -100, opacity: 0, duration: 1, delay: 0.2 })
    })

    const showAnim = gsap.to(header, { yPercent: -110, duration: 0.45, ease: 'power3.inOut', paused: true })
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        setIsScrolled(y > 30)
        updateActive()
        if (menuOpenRef.current || y < 200 || self.direction === -1) showAnim.reverse()
        else showAnim.play()
      },
    })
    return () => { st.kill(); showAnim.kill() }
  }, { dependencies: [updateActive] })

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileOpen])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isMobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMobileOpen])

  // Chapter navigation plays the ink page-turn (falls back to a smooth scroll without motion).
  const goTo = (href: string) => {
    setIsMobileOpen(false)
    turnTo(href)
  }

  // Hover: labels scramble into place (pointer devices, motion allowed).
  const scramble = (e: React.PointerEvent<HTMLAnchorElement>, text: string) => {
    if (!window.matchMedia(MQ.pointerMotion).matches) return
    const label = e.currentTarget.querySelector('[data-nav-label]')
    gsap.to(label, { duration: 0.6, scrambleText: { text, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', speed: 0.5 }, overwrite: true })
  }

  // Allow modifier-clicks (new tab / new window) to behave natively
  const onNavClick = (e: React.MouseEvent, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    goTo(href)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500",
          isScrolled && "glass glass--header"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => onNavClick(e, '#home')}
            className="group flex items-center"
            aria-label="Mayer Frieg — back to top"
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
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase()
              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => onNavClick(e, item.href)}
                  onPointerEnter={(e) => scramble(e, item.name)}
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
                    data-nav-label
                    className="relative z-10 transition-colors duration-200"
                    style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                  >
                    {item.name}
                  </span>
                </a>
              )
            })}
          </nav>

          {/* Desktop right area */}
          <div className="hidden md:flex items-center gap-2">
            <HeaderDesk />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
              style={{
                color: 'var(--text-muted)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              aria-pressed={theme === 'dark'}
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
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
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
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
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
                  <motion.a
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={(e) => onNavClick(e, item.href)}
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
                  </motion.a>
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
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                aria-pressed={theme === 'dark'}
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
