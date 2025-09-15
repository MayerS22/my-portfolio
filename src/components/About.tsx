'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Users, Zap, Target } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const stats = [
    { icon: Code, value: "1+", label: "Years Experience" },
    { icon: Users, value: "30+", label: "Projects Completed" },
    { icon: Zap, value: "100%", label: "Client Satisfaction" },
    { icon: Target, value: "24/7", label: "Support Available" },
  ]

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden animated-bg">
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.05, 1, 1.05],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
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
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Passionate Full-Stack Developer with expertise in modern web technologies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Turning Ideas Into Digital Reality
            </motion.h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                I am a passionate Full-Stack Developer who thrives on continuous learning and creative problem-solving. 
                I specialize in building complete web applications from frontend to backend, ensuring seamless user experiences 
                and robust server-side solutions. My approach combines technical expertise with a focus on user-centered design.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              >
                I specialize in building modern, scalable full-stack web applications. From responsive frontend interfaces 
                to robust backend systems, I create complete solutions that deliver exceptional user experiences and powerful functionality.
                My expertise spans across web development, mobile applications, and cloud infrastructure.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              >
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with 
                the developer community. I believe in continuous learning and 
                staying ahead of industry trends.
              </motion.p>
            </div>

            {/* Enhanced Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-xl glass-card hover:glow transition-all duration-200 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className="w-10 h-10 text-cyan-400 mx-auto mb-3 group-hover:text-purple-400 transition-colors duration-200" />
                  </motion.div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            {/* Enhanced Main card */}
            <motion.div 
              className="relative p-8 rounded-2xl glass-card hover:glow transition-all duration-200"
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Code className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Full-Stack Development</h4>
                    <p className="text-gray-400">End-to-end solutions</p>
                  </div>
                </motion.div>

                <div className="space-y-4">
                  {[
                    "Modern React & Next.js Applications",
                    "Backend APIs with Node.js & Python",
                    "Database Design & Cloud Infrastructure",
                    "UI/UX Design Implementation",
                    "Performance Optimization & Testing"
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="flex items-center gap-3 group"
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1, ease: "easeOut" }}
                      whileHover={{ x: 8 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-cyan-400 rounded-full group-hover:bg-purple-400 transition-colors duration-200"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-200">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
