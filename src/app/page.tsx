'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), {
  ssr: false,
  loading: () => null
})

const BackToTop = dynamic(() => import('@/components/BackToTop'), {
  ssr: false,
  loading: () => null
})

const Experience = dynamic(() => import('@/components/Experience'), {
  loading: () => <div className="h-96 bg-neutral-800/20 rounded-lg animate-pulse" />
})

const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <div className="h-96 bg-neutral-800/20 rounded-lg animate-pulse" />
})

const Freelance = dynamic(() => import('@/components/Freelance'), {
  loading: () => <div className="h-96 bg-neutral-800/20 rounded-lg animate-pulse" />
})

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ScrollAnimations />
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Freelance />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}
