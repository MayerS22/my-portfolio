'use client'

import { useEffect, useRef, useState } from 'react'

type SplitTextProps = {
  text: string
  className?: string
  charDelay?: number
}

export default function SplitText({ text, className = '', charDelay = 50 }: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s ease ${i * charDelay}ms, transform 0.5s ease ${i * charDelay}ms`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}
