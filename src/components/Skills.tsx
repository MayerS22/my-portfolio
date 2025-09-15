'use client'

const Skills = () => {

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
    <section id="skills" className="py-20 relative overflow-hidden animated-bg">
      {/* Simplified Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I use to bring ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="group relative"
            >
              {/* Card with vibrant border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative p-8 rounded-2xl glass-card hover:glow transition-all duration-300 shadow-2xl">
                {/* Category header with icon */}
                <div className="flex items-center justify-center mb-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mr-4 shadow-lg glass`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
                
                {/* Skills grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="p-3 rounded-xl glass-card hover:glow transition-all duration-300 text-center"
                    >
                      <span className="text-white font-semibold text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Development Approach */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Development <span className="text-gradient">Approach</span>
            </h3>
            <p className="text-gray-400 text-lg">
              My philosophy for creating exceptional software solutions
            </p>
          </div>

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
            ].map((highlight) => (
              <div
                key={highlight.title}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${highlight.gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-8 rounded-2xl glass-card hover:glow transition-all duration-300 text-center shadow-2xl">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${highlight.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 glass`}>
                    <span className="text-3xl">{highlight.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{highlight.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
