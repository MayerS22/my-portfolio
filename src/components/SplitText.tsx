'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface SplitTextProps {
  text: string
  charDelay?: number
  className?: string
}

export default function SplitText({ text, charDelay = 30, className }: SplitTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: i * (charDelay / 1000),
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
