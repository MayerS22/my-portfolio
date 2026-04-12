'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        el.classList.add('visible')
      })
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    })

    // Wait for hydration to fully complete before observing
    const initTimer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach((el) => {
        observer.observe(el)
      })
    }, 150)

    return () => {
      clearTimeout(initTimer)
      observer.disconnect()
    }
  }, [])

  return null
}
