'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Code, Users, Zap, Target, Briefcase } from 'lucide-react'
import SplitText from './SplitText'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <div ref={ref}>{count}{suffix}</div>
}

const About = () => {
  const [bioVisible, setBioVisible] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setBioVisible(true), 600)
          setTimeout(() => setCardVisible(true), 400)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Code, value: 1, suffix: '+', label: 'Years Experience' },
    { icon: Users, value: 7, suffix: '+', label: 'Featured Projects' },
    { icon: Briefcase, value: 3, suffix: '', label: 'Live Freelance' },
    { icon: Zap, value: 100, suffix: '%', label: 'Client Satisfaction' },
    { icon: Target, value: 24, suffix: '/7', label: 'Support Available' },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            <SplitText text="About" charDelay={40} />{' '}
            <span className="text-green-700"><SplitText text="Me" charDelay={40} /></span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto" style={{
            opacity: bioVisible ? 1 : 0,
            transform: bioVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
          }}>
            Passionate Full-Stack Developer with expertise in modern web technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <div className="space-y-6" style={{
            opacity: bioVisible ? 1 : 0,
            transform: bioVisible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Turning Ideas Into Digital Reality
            </h3>
            <div className="space-y-4 text-neutral-800 leading-relaxed">
              <p style={{
                opacity: bioVisible ? 1 : 0,
                transform: bioVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s'
              }}>
                I am a passionate Full-Stack Developer who thrives on continuous learning and creative problem-solving.
                I specialize in building complete web applications from frontend to backend.
              </p>
              <p style={{
                opacity: bioVisible ? 1 : 0,
                transform: bioVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s'
              }}>
                I specialize in building modern, scalable full-stack web applications. From responsive frontend interfaces
                to robust backend systems, I create complete solutions.
              </p>
              <p style={{
                opacity: bioVisible ? 1 : 0,
                transform: bioVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s'
              }}>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          {/* Focus card */}
          <div className="card p-8" style={{
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-neutral-900">Full-Stack Development</h4>
                <p className="text-neutral-600">End-to-end solutions</p>
              </div>
            </div>
            <div className="space-y-3">
              {["Modern React & Next.js", "Backend APIs with Node.js & Python", "Database Design & Cloud Infrastructure", "UI/UX Design", "Performance Optimization"].map((skill, i) => (
                <div
                  key={skill}
                  style={{
                    opacity: cardVisible ? 1 : 0,
                    transform: cardVisible ? 'translateX(0)' : 'translateX(15px)',
                    transition: `opacity 0.5s ease ${0.4 + i * 0.08}s, transform 0.5s ease ${0.4 + i * 0.08}s`
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  <span className="text-neutral-800">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats with animated counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="card p-6 text-center"
              style={{
                opacity: bioVisible ? 1 : 0,
                transform: bioVisible ? 'translateY(0)' : 'translateY(25px)',
                transition: `opacity 0.6s ease ${0.5 + index * 0.1}s, transform 0.6s ease ${0.5 + index * 0.1}s`
              }}
            >
              <stat.icon className="w-10 h-10 sm:w-8 sm:h-8 text-green-700 mx-auto mb-3" />
              <div className="text-3xl sm:text-2xl font-bold text-neutral-900 mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
