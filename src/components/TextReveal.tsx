'use client'

import { useEffect, useRef, useState } from 'react'

type TextRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <span
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </span>
  )
}
