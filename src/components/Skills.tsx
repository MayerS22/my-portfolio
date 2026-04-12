'use client'

import { useEffect, useRef, useState } from 'react'
import SplitText from './SplitText'

const Skills = () => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const skillCategories = [
    { title: "Frontend", skills: ["React", "HTML5", "CSS3", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "Redux"] },
    { title: "Backend", skills: ["Node.js", "Python", "C++", "Express.js", "Firebase", "Nest.js", "REST APIs", "GraphQL"] },
    { title: "Database & Cloud", skills: ["SQL", "Power BI", "Data Engineering", "PostgreSQL", "MongoDB", "Cloud Services"] }
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            <SplitText text="My" charDelay={40} />{' '}
            <span className="text-green-700"><SplitText text="Skills" charDelay={40} /></span>
          </h2>
          <p className="text-neutral-700 text-lg max-w-3xl mx-auto" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
          }}>
            A comprehensive toolkit of technologies and frameworks
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="card p-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${0.4 + index * 0.15}s, transform 0.6s ease ${0.4 + index * 0.15}s`
              }}
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{category.title}</h3>
              <div className="h-1 w-16 bg-green-600 rounded-full mb-4" />
              <div className="grid grid-cols-2 gap-2">
                {category.skills.map((skill, i) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-neutral-200 rounded-lg text-center"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'scale(1)' : 'scale(0.9)',
                      transition: `opacity 0.4s ease ${0.6 + index * 0.15 + i * 0.04}s, transform 0.4s ease ${0.6 + index * 0.15 + i * 0.04}s`
                    }}
                  >
                    <span className="text-neutral-800 text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden space-y-4">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="card p-5 sm:p-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(25px)',
                transition: `opacity 0.6s ease ${0.4 + index * 0.15}s, transform 0.6s ease ${0.4 + index * 0.15}s`
              }}
            >
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{category.title}</h3>
              <div className="h-1 w-16 bg-green-600 rounded-full mb-4" />
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="px-3 py-2 bg-neutral-200 rounded-lg text-sm"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'scale(1)' : 'scale(0.9)',
                      transition: `opacity 0.4s ease ${0.6 + index * 0.15 + i * 0.04}s, transform 0.4s ease ${0.6 + index * 0.15 + i * 0.04}s`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
