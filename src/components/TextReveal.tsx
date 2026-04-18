'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface TextRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function TextReveal({ children, delay = 0, className }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <span ref={ref} className={className} style={{ overflow: 'hidden', display: 'inline-block' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
