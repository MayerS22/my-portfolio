'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useScroll, useTransform, useSpring } from 'framer-motion'

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return [ref, isVisible] as const
}

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    
    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  return scrollY
}

// Advanced scroll trigger hook with Framer Motion
export const useAdvancedScrollTrigger = (options = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    ...options 
  })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return {
    ref,
    isInView,
    scrollYProgress,
    y: springY,
    opacity: springOpacity,
    scale: springScale
  }
}

// Hook for staggered animations
export const useStaggeredAnimation = (delay = 0.1) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return {
    ref,
    isInView,
    staggerChildren: delay,
    delayChildren: delay
  }
}

// Hook for scroll-based progress
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])
  
  return scrollProgress
}
