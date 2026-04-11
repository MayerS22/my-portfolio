import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight scroll animation hook using Intersection Observer
 * Much more performant than Framer Motion for simple scroll animations
 */
export function useScrollAnimate(threshold = 0.1, rootMargin = '0px') {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element) // Only animate once
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
