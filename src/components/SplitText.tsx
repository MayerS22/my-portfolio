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

  // Split by word instead of per-character — far fewer animated elements
  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{
            duration: 0.35,
            delay: i * (charDelay / 1000),
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}
