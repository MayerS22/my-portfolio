'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      gradient: "from-pink-500 to-purple-600",
      skills: [
        "React", "HTML5", "CSS3", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "Redux"
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      gradient: "from-blue-500 to-cyan-600",
      skills: [
        "Node.js", "Python", "C++", "Express.js", "Firebase", "Nest.js", "REST APIs", "GraphQL"
      ]
    },
    {
      title: "Database & Cloud",
      icon: "☁️",
      gradient: "from-green-500 to-emerald-600",
      skills: [
        "SQL", "Power BI", "Data Engineering", "Database Design", "Reporting", "PostgreSQL", "MongoDB", "Cloud Services"
      ]
    }
  ]

  return (
    <section id="skills" ref={ref} className="py-20 relative overflow-hidden animated-bg">
      {/* Optimized Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-500/15 to-purple-600/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-600/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1.08, 1, 1.08],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1, ease: "easeOut" }}
            >
              {/* Card with vibrant border */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
              <motion.div 
                className="relative p-8 rounded-2xl glass-card hover:glow transition-all duration-200 shadow-2xl"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Category header with icon */}
                <motion.div 
                  className="flex items-center justify-center mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + categoryIndex * 0.1, ease: "easeOut" }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mr-4 shadow-lg glass`}
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">
                    {category.title}
                  </h3>
                </motion.div>
                
                {/* Skills grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="p-3 rounded-xl glass-card hover:glow transition-all duration-200 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05, ease: "easeOut" }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <span className="text-white font-semibold text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>


        {/* Development Approach */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Development <span className="text-gradient">Approach</span>
            </h3>
            <p className="text-gray-400 text-lg">
              My philosophy for creating exceptional software solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Problem-First",
                description: "Understanding the core problem before diving into solutions",
                icon: "🎯",
                gradient: "from-red-500 to-orange-600"
              },
              {
                title: "Performance-Driven",
                description: "Optimizing for speed, accessibility, and user experience",
                icon: "⚡",
                gradient: "from-yellow-500 to-orange-600"
              },
              {
                title: "User-Centric",
                description: "Creating intuitive experiences that users love",
                icon: "👥",
                gradient: "from-blue-500 to-purple-600"
              }
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1, ease: "easeOut" }}
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${highlight.gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
                <motion.div 
                  className="relative p-8 rounded-2xl glass-card hover:glow transition-all duration-200 text-center shadow-2xl"
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${highlight.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 glass`}
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-3xl">{highlight.icon}</span>
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-4">{highlight.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{highlight.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
