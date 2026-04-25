'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
  distance?: number
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.4'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  const rawX = useTransform(scrollYProgress, [0, 1], [
    direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    0,
  ])

  const rawY = useTransform(scrollYProgress, [0, 1], [
    direction === 'up' ? distance : 0,
    0,
  ])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, x: rawX, y: rawY, transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  )
}
