'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export default function MagneticButton({ children, className, href, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      href={href}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Component>
  )
}
