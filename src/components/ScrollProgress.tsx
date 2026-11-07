'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      },
    )
  })

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left scroll-progress"
      style={{ transform: 'scaleX(0)', background: 'var(--accent-gradient)' }}
    />
  )
}
