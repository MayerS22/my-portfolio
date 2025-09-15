'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  threshold?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
  threshold = 0.1,
  once = true
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    margin: "-100px",
    amount: threshold 
  })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 }
      case 'down':
        return { y: -distance, opacity: 0 }
      case 'left':
        return { x: distance, opacity: 0 }
      case 'right':
        return { x: -distance, opacity: 0 }
      case 'scale':
        return { scale: 0.8, opacity: 0 }
      case 'rotate':
        return { rotate: -10, scale: 0.9, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const getAnimateTransform = () => {
    switch (direction) {
      case 'up':
        return { y: 0, opacity: 1 }
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
        return { x: 0, opacity: 1 }
      case 'right':
        return { x: 0, opacity: 1 }
      case 'scale':
        return { scale: 1, opacity: 1 }
      case 'rotate':
        return { rotate: 0, scale: 1, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialTransform()}
      animate={isInView ? getAnimateTransform() : getInitialTransform()}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
      style={{
        y: direction === 'up' || direction === 'down' ? y : undefined,
        opacity: direction === 'scale' ? opacity : undefined,
        scale: direction === 'scale' ? scale : undefined
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered reveal for multiple children
interface StaggeredRevealProps {
  children: React.ReactNode[]
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  delay?: number
  staggerDelay?: number
  duration?: number
  distance?: number
  className?: string
}

export function StaggeredReveal({
  children,
  direction = 'up',
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.6,
  distance = 50,
  className = ''
}: StaggeredRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 }
      case 'down':
        return { y: -distance, opacity: 0 }
      case 'left':
        return { x: distance, opacity: 0 }
      case 'right':
        return { x: -distance, opacity: 0 }
      case 'scale':
        return { scale: 0.8, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const getAnimateTransform = () => {
    switch (direction) {
      case 'up':
        return { y: 0, opacity: 1 }
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
        return { x: 0, opacity: 1 }
      case 'right':
        return { x: 0, opacity: 1 }
      case 'scale':
        return { scale: 1, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={getInitialTransform()}
          animate={isInView ? getAnimateTransform() : getInitialTransform()}
          transition={{
            duration,
            delay: delay + (index * staggerDelay),
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// Magnetic hover effect component
interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    ref.current.style.transform = `translate(${distanceX}px, ${distanceY}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      className={`magnetic transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

// Floating animation component
interface FloatingProps {
  children: React.ReactNode
  intensity?: number
  duration?: number
  className?: string
}

export function Floating({ children, intensity = 10, duration = 3, className = '' }: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Glitch effect component
interface GlitchProps {
  children: React.ReactNode
  intensity?: number
  className?: string
}

export function Glitch({ children, intensity = 0.1, className = '' }: GlitchProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < intensity) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [intensity])

  return (
    <motion.div
      className={className}
      animate={isGlitching ? {
        x: [0, -2, 2, -2, 0],
        y: [0, 1, -1, 1, 0],
        skewX: [0, 1, -1, 0]
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

