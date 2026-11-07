'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import BookLoader from '@/components/book/BookLoader'
import VelocityMarquee from '@/components/scroll/VelocityMarquee'
import CustomCursor from '@/components/scroll/CustomCursor'
import Interlude from '@/components/book/Interlude'
import Atmosphere from '@/components/book/Atmosphere'
import InkWipe from '@/components/book/InkWipe'
import SmoothScrollProvider from '@/providers/SmoothScrollProvider'

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
      <SmoothScrollProvider>
        <>
        <BookLoader />
          <main id="main" className="min-h-screen relative">
            <CommandPalette />
            <CustomCursor />
            <Atmosphere />
            <InkWipe />
            <ScrollProgress />
            <Header />
            <Hero />
            <VelocityMarquee items={['Read', 'Plan', 'Build', 'Ship', 'Reflect', 'Repeat']} />
            <div className="section-bg-alt"><About /></div>
            <Interlude
              folio="12"
              motif="clock"
              quote="It is not that we have a short time to live, but that we waste a lot of it."
              highlight="waste"
              author="Seneca · On the Shortness of Life"
            />
            <Skills />
            <Divider />
            <div className="section-bg-alt"><Experience /></div>
            <Interlude
              folio="48"
              motif="book"
              quote="A room without books is like a body without a soul."
              highlight="books"
              author="Cicero"
            />
            <Freelance />
            <Divider />
            <div className="section-bg-alt"><Projects /></div>
            <Interlude
              folio="96"
              motif="candle"
              quote="Lost time is never found again."
              highlight="time"
              author="Benjamin Franklin"
            />
            <VelocityMarquee outline direction={-1} items={['Open to work', 'Your next chapter', 'Cairo, Egypt', 'Let’s build']} />
            <div className="section-bg-alt"><Contact /></div>
            <Footer />
            <BackToTop />
          </main>
        </>
      </SmoothScrollProvider>
    </ThemeProvider>
  )
}
