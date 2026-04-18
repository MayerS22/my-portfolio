'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import ThemeProvider from '@/components/ThemeProvider'
import PageLoader from '@/components/PageLoader'

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false, loading: () => null })
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false, loading: () => null })
const Experience = dynamic(() => import('@/components/Experience'), { loading: () => <div className="h-96 rounded-lg animate-pulse" style={{ background: 'var(--bg-secondary)' }} /> })
const Projects = dynamic(() => import('@/components/Projects'), { loading: () => <div className="h-96 rounded-lg animate-pulse" style={{ background: 'var(--bg-secondary)' }} /> })
const Freelance = dynamic(() => import('@/components/Freelance'), { loading: () => <div className="h-96 rounded-lg animate-pulse" style={{ background: 'var(--bg-secondary)' }} /> })
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false, loading: () => null })


function Divider() {
  return <div className="section-divider" />
}

export default function Home() {
  return (
    <ThemeProvider>
      <PageLoader>
        <main id="main" className="min-h-screen relative">
          <CommandPalette />
          <ScrollProgress />
          <Header />
          <Hero />
          <Divider />
          <div className="section-bg-alt"><About /></div>
          <Divider />
          <Skills />
          <Divider />
          <div className="section-bg-alt"><Experience /></div>
          <Divider />
          <Freelance />
          <Divider />
          <div className="section-bg-alt"><Projects /></div>
          <Divider />
          <div className="section-bg-alt"><Contact /></div>
          <BackToTop />
        </main>
      </PageLoader>
    </ThemeProvider>
  )
}
