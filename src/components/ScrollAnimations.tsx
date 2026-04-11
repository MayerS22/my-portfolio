'use client'

import { useEffect } from 'react'

/**
 * Lightweight scroll animation provider
 * Uses IntersectionObserver API - much more performant than Framer Motion
 */
export default function ScrollAnimations() {
  useEffect(() => {
    // Only run on client side, skip during SSR
    if (typeof window === 'undefined') return

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        el.classList.add('visible')
      })
      return
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.add('visible')
          // Stop observing after animation for better performance
          observer.unobserve(el)
        }
      })
    }, observerOptions)

    // Observe all elements with scroll-animate class
    const animatedElements = document.querySelectorAll('.scroll-animate')
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return null
}
