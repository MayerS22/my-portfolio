'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useGSAP } from '@gsap/react'

// Register once, client-side only. Safe to import from any 'use client' module.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP)
  gsap.defaults({ ease: 'expo.out' })
  // Mobile URL-bar show/hide shouldn't re-measure every trigger.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

/** Media queries shared by every scroll-driven effect (use with gsap.matchMedia). */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktopMotion: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobileMotion: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  /** Desktop with a real mouse — cursor & hover-driven effects. */
  pointerMotion: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const

export { gsap, ScrollTrigger, SplitText, useGSAP }
