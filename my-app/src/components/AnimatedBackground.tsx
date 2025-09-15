'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

interface AnimatedBackgroundProps {
  particleCount?: number
  connectionDistance?: number
  showConnections?: boolean
  showParticles?: boolean
  showGrid?: boolean
  className?: string
}

export default function AnimatedBackground({
  particleCount = 50,
  connectionDistance = 150,
  showConnections = true,
  showParticles = true,
  showGrid = false,
  className = ''
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 })

  // Initialize particles
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const newParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
      })
    }
    setParticles(newParticles)
  }, [particleCount])

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mouse tracking
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY

          // Mouse interaction
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 100
            newX -= (dx / distance) * force * 0.5
            newY -= (dy / distance) * force * 0.5
          }

          // Boundary check
          if (newX < 0 || newX > dimensions.width) particle.speedX *= -1
          if (newY < 0 || newY > dimensions.height) particle.speedY *= -1

          return {
            ...particle,
            x: Math.max(0, Math.min(dimensions.width, newX)),
            y: Math.max(0, Math.min(dimensions.height, newY))
          }
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    if (dimensions.width && dimensions.height) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, mousePosition, dimensions])

  // Draw connections
  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    if (!showConnections) return

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.2
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    if (!showParticles) return

    particles.forEach(particle => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity
      ctx.fill()
    })
    ctx.globalAlpha = 1
  }

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !dimensions.width || !dimensions.height) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawConnections(ctx)
      drawParticles(ctx)
    }

    draw()
  }, [particles, dimensions, showConnections, showParticles])

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      {/* Canvas for particles and connections */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -50, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.3, 0.7, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid overlay */}
      {showGrid && (
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      )}

      {/* Mouse follower */}
      <motion.div
        className="absolute w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl pointer-events-none"
        style={{
          x: useTransform(springX, (value) => value - 64),
          y: useTransform(springY, (value) => value - 64)
        }}
      />
    </div>
  )
}

// Floating elements component
interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  intensity?: number
  className?: string
}

export function FloatingElement({ 
  children, 
  delay = 0, 
  duration = 4, 
  intensity = 20,
  className = '' 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [50, -intensity, -intensity, -100],
        scale: [0.8, 1, 1, 0.8],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Matrix rain effect
export function MatrixRain({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01'
    const charArray = chars.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00d4ff'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none opacity-20 ${className}`}
    />
  )
}
