'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { staggerItem } from '@/lib/animations'

interface StaggerGridProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}

export default function StaggerGrid({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0.1,
}: StaggerGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { staggerItem as StaggerItem }
export { staggerItem }
