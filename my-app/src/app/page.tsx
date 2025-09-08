'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
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

export default function Home() {
  return (
    <main className="min-h-screen">
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
