'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { markBookOpened, markLoaderActive } from '@/lib/loader'
import Hourglass from './Hourglass'

const SEEN_KEY = 'mf-book-opened'

/**
 * First-visit intro: a closed leather book fills the screen, the hourglass turns over and
 * drains, then the two boards swing open in 3D to reveal the site underneath.
 * The page itself is rendered (and server-rendered) underneath the whole time.
 * Skipped under reduced motion and on repeat visits in the same session.
 */
export default function BookLoader() {
  const ref = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useLayoutEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1' } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (seen || reduced) {
      setDone(true)
      markBookOpened()
      return
    }
    markLoaderActive()
    document.documentElement.style.overflow = 'hidden'

    const root = ref.current!
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try { sessionStorage.setItem(SEEN_KEY, '1') } catch {}
          document.documentElement.style.overflow = ''
          setDone(true)
        },
      })
      tl.from('[data-l-title] > span', { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out' })
        .from('[data-l-sub]', { opacity: 0, y: 10, duration: 0.6 }, 0.3)
        .from('[data-l-glass]', { scale: 0.6, opacity: 0, duration: 0.7, ease: 'back.out(2)' }, 0.1)
        .to('[data-l-glass]', { rotation: 180, duration: 0.6, ease: 'power3.inOut' }, 0.7)
        .set('[data-l-glass]', { rotation: 0 })
        .fromTo('[data-l-glass] svg', { '--p': 0 }, { '--p': 1, duration: 0.9, ease: 'none' }, 1.3)
        .to('[data-l-count]', { innerText: 100, snap: { innerText: 1 }, duration: 1.4, ease: 'power1.inOut' }, 0.8)
        .to('[data-l-content]', { opacity: 0, scale: 0.94, duration: 0.45, ease: 'power2.in' }, 2.15)
        .add(() => markBookOpened(), 2.45)
        .to('[data-l-left]', { rotationY: -100, duration: 1.15, ease: 'power3.inOut' }, 2.45)
        .to('[data-l-right]', { rotationY: 100, duration: 1.15, ease: 'power3.inOut' }, 2.45)
        .to('[data-l-shade]', { opacity: 0, duration: 0.8 }, 2.6)
    }, root)

    return () => {
      ctx.revert()
      document.documentElement.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <div ref={ref} className="page-loader fixed inset-0 z-[99999] pointer-events-auto" style={{ perspective: '2200px' }} aria-hidden>
      <div data-l-shade className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} />
      {/* The two boards of the cover */}
      <div data-l-left className="leather absolute inset-y-0 left-0 w-1/2" style={{ transformOrigin: 'left center' }}>
        <div className="absolute inset-y-0 right-0 w-10" style={{ background: 'linear-gradient(270deg, rgba(0,0,0,0.5), transparent)' }} />
      </div>
      <div data-l-right className="leather absolute inset-y-0 right-0 w-1/2" style={{ transformOrigin: 'right center' }}>
        <div className="absolute inset-y-0 left-0 w-10" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.5), transparent)' }} />
      </div>

      <div data-l-content className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="gilt-frame !inset-[4%] sm:!inset-[6%]" />
        <div data-l-glass className="mb-8">
          <Hourglass className="w-12 h-20" />
        </div>
        <h1 data-l-title className="font-serif text-5xl sm:text-7xl font-semibold leading-none overflow-hidden pb-2">
          <span className="inline-block gilt-text">Mayer</span>{' '}
          <span className="inline-block gilt-text serif-italic">Frieg</span>
        </h1>
        <p data-l-sub className="eyebrow mt-5" style={{ color: '#e2b468' }}>
          A Developer&apos;s Journal · Vol. I
        </p>
        <p className="font-mono text-xs mt-10 tabular-nums" style={{ color: 'rgba(240,215,170,0.6)' }}>
          Opening the book… <span data-l-count>0</span>%
        </p>
      </div>
    </div>
  )
}
