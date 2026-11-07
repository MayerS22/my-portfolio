'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

/**
 * Lenis smooth scroll driven by GSAP's ticker so every ScrollTrigger stays
 * frame-perfectly in sync with the smoothed scroll position.
 * Skipped entirely under prefers-reduced-motion (native scroll, triggers still work).
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

  // Page height changes (lazy sections, images, filters) shift every trigger below — re-measure.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    let lastHeight = document.body.scrollHeight
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight
      if (h === lastHeight) return
      lastHeight = h
      clearTimeout(t)
      t = setTimeout(() => ScrollTrigger.refresh(), 200)
    })
    ro.observe(document.body)
    return () => { clearTimeout(t); ro.disconnect() }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    setLenisInstance(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  )
}
