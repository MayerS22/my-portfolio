'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MQ } from '@/lib/gsap'

/**
 * Mouse-follower (desktop, fine pointer, motion allowed only). A small dot tracks the pointer
 * exactly, a ring trails it; the ring grows over links/buttons and expands into a labelled
 * disc over anything with `data-cursor="Label"` (e.g. project cards → "View").
 * The native cursor stays visible — this is decoration, not a replacement.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.pointerMotion, () => {
      const root = ref.current!
      const dot = root.querySelector<HTMLElement>('[data-c-dot]')!
      const ring = root.querySelector<HTMLElement>('[data-c-ring]')!
      const label = root.querySelector<HTMLElement>('[data-c-label]')!
      gsap.set(root, { autoAlpha: 1 })

      const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' })
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' })

      const onMove = (e: PointerEvent) => {
        dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY)
      }

      const onOver = (e: PointerEvent) => {
        const target = e.target as Element
        const labelled = target.closest<HTMLElement>('[data-cursor]')
        const interactive = target.closest('a, button, [role="button"], input, textarea, select')
        if (labelled) {
          label.textContent = labelled.dataset.cursor ?? ''
          gsap.to(ring, { scale: 3.4, backgroundColor: 'var(--accent-primary)', borderColor: 'transparent', duration: 0.45, ease: 'expo.out' })
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 })
          gsap.to(dot, { scale: 0, duration: 0.2 })
        } else if (interactive) {
          gsap.to(ring, { scale: 1.9, backgroundColor: 'transparent', borderColor: 'var(--accent-primary)', duration: 0.4, ease: 'expo.out' })
          gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 })
          gsap.to(dot, { scale: 1.6, duration: 0.2 })
        } else {
          gsap.to(ring, { scale: 1, backgroundColor: 'transparent', borderColor: 'var(--text-muted)', duration: 0.4, ease: 'expo.out' })
          gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 })
          gsap.to(dot, { scale: 1, duration: 0.2 })
        }
      }

      const onLeave = () => gsap.to(root, { autoAlpha: 0, duration: 0.2 })
      const onEnter = () => gsap.to(root, { autoAlpha: 1, duration: 0.2 })
      const onDown = () => gsap.to(ring, { scale: '-=0.3', duration: 0.15, yoyo: true, repeat: 1 })

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerover', onOver)
      window.addEventListener('pointerdown', onDown)
      document.documentElement.addEventListener('pointerleave', onLeave)
      document.documentElement.addEventListener('pointerenter', onEnter)
      return () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerover', onOver)
        window.removeEventListener('pointerdown', onDown)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        document.documentElement.removeEventListener('pointerenter', onEnter)
      }
    })
  })

  return (
    <div ref={ref} className="invisible fixed inset-0 pointer-events-none z-[9999]" aria-hidden>
      <div
        data-c-ring
        className="absolute left-0 top-0 -ml-5 -mt-5 w-10 h-10 rounded-full border flex items-center justify-center"
        style={{ borderColor: 'var(--text-muted)' }}
      >
        <span
          data-c-label
          className="font-mono uppercase tracking-[0.12em] text-[4px] font-semibold opacity-0 scale-50"
          style={{ color: 'var(--accent-ink)' }}
        />
      </div>
      {/* Quill: the nib (bottom-left of the svg) sits exactly on the pointer */}
      <div data-c-dot className="absolute left-0 top-0 -mt-[26px] w-[26px] h-[26px] origin-bottom-left">
        <svg viewBox="0 0 26 26" className="w-full h-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
          <path d="M1 25 L5 17 C 9 9, 16 3, 25 1 C 23 9, 17 16, 9 21 Z" fill="var(--accent-primary)" opacity="0.95" />
          <path d="M1 25 L 18 8" stroke="var(--bg-primary)" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
          <path d="M11 15 l3 1 M14 12 l3 1 M17 9 l3 1" stroke="var(--bg-primary)" strokeWidth="0.6" opacity="0.5" />
        </svg>
      </div>
    </div>
  )
}
