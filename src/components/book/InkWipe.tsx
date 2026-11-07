'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useLenis } from '@/providers/SmoothScrollProvider'
import { registerPageTurn, CHAPTER_TITLES, blobPath } from '@/lib/pageTurn'
import { play } from '@/lib/sound'

const GOLD = blobPath(1.3)
const PAPER = blobPath(4.1)

/**
 * The page-turn between chapters: an ink blot blooms from where you clicked, parchment floods
 * the screen with the chapter's title written on it, the page jumps, and the blot recedes.
 * Only transforms and opacity are animated, so it stays smooth.
 */
export default function InkWipe() {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis
  const [label, setLabel] = useState(CHAPTER_TITLES['#home'])
  const busy = useRef(false)
  const origin = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const onDown = (e: PointerEvent) => { origin.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } }
    window.addEventListener('pointerdown', onDown, { passive: true })

    const jump = (href: string) => {
      const l = lenisRef.current
      if (l) l.scrollTo(href, { immediate: true, force: true })
      else document.querySelector(href)?.scrollIntoView()
    }

    registerPageTurn((href) => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || busy.current) { jump(href); return }
      busy.current = true
      setLabel(CHAPTER_TITLES[href] ?? { numeral: '', title: '' })

      const root = ref.current!
      const blots = root.querySelectorAll<SVGSVGElement>('[data-blot]')
      const { x, y } = origin.current
      const W = window.innerWidth
      const H = window.innerHeight
      const ox = x * W
      const oy = y * H
      // Scale so the blot (radius ~70px at scale 1) covers the farthest corner
      const far = Math.max(Math.hypot(ox, oy), Math.hypot(W - ox, oy), Math.hypot(ox, H - oy), Math.hypot(W - ox, H - oy))
      const cover = (far / 66) * 1.08

      gsap.set(root, { autoAlpha: 1 })
      gsap.set(blots, { x: ox - 80, y: oy - 80, scale: 0, rotation: () => gsap.utils.random(-30, 30) })
      play('page')
      gsap.timeline({ onComplete: () => { busy.current = false } })
        .to(blots, { scale: cover, duration: 0.6, ease: 'power3.in', stagger: 0.07 })
        .fromTo('[data-wipe-label] > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' }, 0.5)
        .add(() => jump(href), 0.72)
        .to('[data-wipe-label] > *', { y: -16, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in' }, 1.05)
        .to([...blots].reverse(), { scale: 0, duration: 0.6, ease: 'power3.inOut', stagger: 0.06 }, 1.15)
        .set(root, { autoAlpha: 0 })
    })

    return () => {
      registerPageTurn(null)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return (
    <div ref={ref} className="fixed inset-0 z-[9000] pointer-events-none invisible overflow-hidden" aria-hidden>
      <svg data-blot viewBox="-100 -100 200 200" className="absolute left-0 top-0 w-[160px] h-[160px] origin-center will-change-transform" style={{ transform: 'scale(0)' }}>
        <path d={GOLD} fill="#b07f3c" />
      </svg>
      <svg data-blot viewBox="-100 -100 200 200" className="absolute left-0 top-0 w-[160px] h-[160px] origin-center will-change-transform" style={{ transform: 'scale(0)' }}>
        <path d={PAPER} fill="var(--paper)" />
      </svg>
      <div data-wipe-label className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ color: 'var(--paper-ink)' }}>
        <span className="serif-italic text-2xl sm:text-3xl opacity-0">{label.numeral}</span>
        <span className="font-serif font-semibold leading-none mt-3 opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>{label.title}</span>
        <span className="mt-6 h-px w-24 opacity-0" style={{ background: '#7a4f22' }} />
      </div>
    </div>
  )
}
