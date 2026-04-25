'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollScaleRevealProps {
  children: ReactNode
  className?: string
  rotateX?: number
}

export default function ScrollScaleReveal({ children, className, rotateX: rotateXAmount = 8 }: ScrollScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.3'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const rotateX = useTransform(scrollYProgress, [0, 1], [rotateXAmount, 0])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, scale, rotateX, perspective: 800, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}
