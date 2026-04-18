'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Home, User, Code, Briefcase, Palette, Folder, Mail, FileText, Sun, Moon, Github, Linkedin, Printer, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface Command {
  id: string
  label: string
  icon: React.ElementType
  action: () => void
  keywords: string[]
}

let setOpenExternal: ((open: boolean) => void) | null = null

export function openCommandPalette() {
  setOpenExternal?.(true)
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toggleTheme, theme } = useTheme()

  const commands: Command[] = [
    { id: 'home', label: 'Go to Home', icon: Home, action: () => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }), keywords: ['home', 'top'] },
    { id: 'about', label: 'Go to About', icon: User, action: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }), keywords: ['about', 'bio'] },
    { id: 'skills', label: 'Go to Skills', icon: Code, action: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }), keywords: ['skills', 'tech', 'stack'] },
    { id: 'experience', label: 'Go to Experience', icon: Briefcase, action: () => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }), keywords: ['experience', 'work', 'education'] },
    { id: 'freelance', label: 'Go to Freelance', icon: Palette, action: () => document.querySelector('#freelance')?.scrollIntoView({ behavior: 'smooth' }), keywords: ['freelance', 'client'] },
    { id: 'projects', label: 'Go to Projects', icon: Folder, action: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }), keywords: ['projects', 'portfolio'] },
    { id: 'contact', label: 'Go to Contact', icon: Mail, action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), keywords: ['contact', 'email'] },
    { id: 'cv', label: 'View CV', icon: FileText, action: () => window.open('/images/Cv/Mayer Soliman CV.pdf'), keywords: ['cv', 'resume', 'download'] },
    { id: 'theme', label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? Sun : Moon, action: toggleTheme, keywords: ['theme', 'dark', 'light', 'mode'] },
    { id: 'github', label: 'Open GitHub', icon: Github, action: () => window.open('https://github.com/MayerS22'), keywords: ['github', 'code'] },
    { id: 'linkedin', label: 'Open LinkedIn', icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/mayer-frieg-7a0368226/'), keywords: ['linkedin', 'social'] },
    { id: 'email', label: 'Send Email', icon: Mail, action: () => window.location.href = 'mailto:mayerfrieg@outlook.com', keywords: ['email', 'send', 'mail'] },
    { id: 'print', label: 'Print / Save as PDF', icon: Printer, action: () => window.print(), keywords: ['print', 'pdf', 'save', 'export'] },
  ]

  const filtered = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.keywords.some(k => k.includes(search.toLowerCase()))
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  useEffect(() => {
    setOpenExternal = setIsOpen
    return () => { setOpenExternal = null }
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsOpen(prev => !prev)
      setSearch('')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const executeCommand = (cmd: Command) => {
    setIsOpen(false)
    setSearch('')
    cmd.action()
  }

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      executeCommand(filtered[selectedIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setSearch('')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-start justify-center pt-[20vh] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setIsOpen(false); setSearch('') }} />

          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <Search size={18} style={{ color: 'var(--text-muted)' }} />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyNav}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text-primary)' }}
              />
              <kbd className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  No results found
                </div>
              ) : (
                filtered.map((cmd, index) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors"
                    style={{
                      background: index === selectedIndex ? 'var(--glass-bg)' : 'transparent',
                      color: index === selectedIndex ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <cmd.icon size={16} className="flex-shrink-0" />
                    <span className="flex-1">{cmd.label}</span>
                    {index === selectedIndex && (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Enter ↵</span>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 text-xs" style={{ borderTop: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
              <span>Navigate with ↑↓ • Select with Enter</span>
              <button onClick={() => { setIsOpen(false); setSearch('') }} className="flex items-center gap-1 hover:text-accent transition-colors">
                <X size={12} /> Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
