'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote: "Placeholder — Mayer will provide real testimonials from clients and colleagues.",
    author: "Coming Soon",
    role: "Client",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-clamp-section font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Client <span className="text-gradient">Testimonials</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="overflow-hidden rounded-2xl card p-8 sm:p-10 min-h-[200px] flex items-center justify-center">
            <Quote size={40} className="absolute top-6 left-6 opacity-10 text-accent" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="text-lg sm:text-xl mb-6 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gradient">{testimonials[current].author}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <>
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={prev} className="p-2 rounded-lg transition-colors hover:text-accent" style={{ color: 'var(--text-muted)' }} aria-label="Previous testimonial">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{
                        background: i === current ? 'var(--accent-primary)' : 'var(--glass-bg)',
                        transform: i === current ? 'scale(1.3)' : 'scale(1)',
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="p-2 rounded-lg transition-colors hover:text-accent" style={{ color: 'var(--text-muted)' }} aria-label="Next testimonial">
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
