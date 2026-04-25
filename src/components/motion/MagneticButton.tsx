'use client'

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode, type CSSProperties } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  style?: CSSProperties
}

export default function MagneticButton({ children, className, href, onClick, style }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = (e: MouseEvent) => {
    if (prefersReducedMotion) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (prefersReducedMotion) {
    const Tag = href ? 'a' : 'button'
    return (
      <Tag
        href={href}
        onClick={onClick}
        className={className}
        style={style}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Tag>
    )
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      href={href}
      onClick={onClick}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={href?.startsWith('#') ? { scale: 1.04 } : undefined}
      whileTap={href?.startsWith('#') ? { scale: 0.97 } : undefined}
    >
      {children}
    </Component>
  )
}
