'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left scroll-progress"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
      }}
    />
  )
}
