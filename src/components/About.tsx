'use client'

import { Code, Users, Zap, Target, Briefcase } from 'lucide-react'
import TextReveal from './TextReveal'

const About = () => {
  const stats = [
    { icon: Code, value: "1+", label: "Years Experience" },
    { icon: Users, value: "7+", label: "Featured Projects" },
    { icon: Briefcase, value: "3", label: "Live Freelance" },
    { icon: Zap, value: "100%", label: "Client Satisfaction" },
    { icon: Target, value: "24/7", label: "Support Available" },
  ]

  return (
    <section id="about" className="py-16 sm:py-20 bg-neutral-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            <TextReveal delay={0}>About</TextReveal>{' '}
            <span className="text-green-700"><TextReveal delay={100}>Me</TextReveal></span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            <TextReveal delay={200}>Passionate Full-Stack Developer with expertise in modern web technologies</TextReveal>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 scroll-animate">
              Turning Ideas Into Digital Reality
            </h3>
            <div className="space-y-4 text-neutral-800 leading-relaxed">
              <p>I am a passionate Full-Stack Developer who thrives on continuous learning and creative problem-solving.
                I specialize in building complete web applications from frontend to backend.</p>
              <p>I specialize in building modern, scalable full-stack web applications. From responsive frontend interfaces
                to robust backend systems, I create complete solutions.</p>
              <p>When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the developer community.</p>
            </div>
          </div>

          <div className="card p-8">
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
              {["Modern React & Next.js", "Backend APIs with Node.js & Python", "Database Design & Cloud Infrastructure", "UI/UX Design", "Performance Optimization"].map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  <span className="text-neutral-800">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`card p-6 text-center scroll-animate delay-${(index + 1) * 100}`}>
              <stat.icon className="w-10 h-10 sm:w-8 sm:h-8 text-green-700 mx-auto mb-3" />
              <div className="text-3xl sm:text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
