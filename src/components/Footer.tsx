'use client'

import { useEffect, useRef, useState } from 'react'

export default function Footer() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={ref} className="py-6">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease'
        }}
      >
        <p className="text-neutral-600 text-sm">
          Designed & Built with passion
        </p>
      </div>
    </footer>
  )
}
