'use client'

import { Code, Users, Zap, Target } from 'lucide-react'

const About = () => {

  const stats = [
    { icon: Code, value: "1+", label: "Years Experience" },
    { icon: Users, value: "30+", label: "Projects Completed" },
    { icon: Zap, value: "100%", label: "Client Satisfaction" },
    { icon: Target, value: "24/7", label: "Support Available" },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden animated-bg">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static floating orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Passionate Full-Stack Developer with expertise in modern web technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Turning Ideas Into Digital Reality
            </h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I am a passionate Full-Stack Developer who thrives on continuous learning and creative problem-solving. 
                I specialize in building complete web applications from frontend to backend, ensuring seamless user experiences 
                and robust server-side solutions. My approach combines technical expertise with a focus on user-centered design.
              </p>
              
              <p>
                I specialize in building modern, scalable full-stack web applications. From responsive frontend interfaces 
                to robust backend systems, I create complete solutions that deliver exceptional user experiences and powerful functionality.
                My expertise spans across web development, mobile applications, and cloud infrastructure.
              </p>
              
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with 
                the developer community. I believe in continuous learning and 
                staying ahead of industry trends.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-lg glass-card hover:glow transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            {/* Main card */}
            <div className="relative p-8 rounded-2xl glass-card hover:glow transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Full-Stack Development</h4>
                    <p className="text-gray-400">End-to-end solutions</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    "Modern React & Next.js Applications",
                    "Backend APIs with Node.js & Python",
                    "Database Design & Cloud Infrastructure",
                    "UI/UX Design Implementation",
                    "Performance Optimization & Testing"
                  ].map((skill, index) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
