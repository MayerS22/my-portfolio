'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface MotionSectionProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  once?: boolean
}

export default function MotionSection({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  once = true,
}: MotionSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
