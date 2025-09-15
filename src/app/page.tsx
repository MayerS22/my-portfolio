'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Dynamic import for client-only components to prevent hydration issues
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), {
  ssr: false,
  loading: () => null
})

const BackToTop = dynamic(() => import('@/components/BackToTop'), {
  ssr: false,
  loading: () => null
})

// Lazy load heavy components
const Experience = dynamic(() => import('@/components/Experience'), {
  loading: () => <div className="h-96 bg-gray-800/20 rounded-lg animate-pulse" />
})

const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <div className="h-96 bg-gray-800/20 rounded-lg animate-pulse" />
})

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}
