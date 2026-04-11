'use client'

const Skills = () => {
  const skillCategories = [
    { title: "Frontend", skills: ["React", "HTML5", "CSS3", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "Redux"] },
    { title: "Backend", skills: ["Node.js", "Python", "C++", "Express.js", "Firebase", "Nest.js", "REST APIs", "GraphQL"] },
    { title: "Database & Cloud", skills: ["SQL", "Power BI", "Data Engineering", "PostgreSQL", "MongoDB", "Cloud Services"] }
  ]

  return (
    <section id="skills" className="py-16 sm:py-20 bg-neutral-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            My <span className="text-green-700">Skills</span>
          </h2>
          <p className="text-neutral-700 text-lg max-w-3xl mx-auto">
            A comprehensive toolkit of technologies and frameworks
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div key={category.title} className={`card p-6 scroll-animate delay-${(index + 1) * 100}`}>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{category.title}</h3>
              <div className="h-1 w-16 bg-green-600 rounded-full mb-4" />
              <div className="grid grid-cols-2 gap-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="px-3 py-2 bg-neutral-200 rounded-lg text-center">
                    <span className="text-neutral-800 text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden horizontal-scroll -mx-4 px-4">
          <div className="flex gap-4 pb-4">
            {skillCategories.map((category) => (
              <div key={category.title} className="card p-5 sm:p-6 min-w-[260px] sm:min-w-[280px]">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{category.title}</h3>
                <div className="h-1 w-16 bg-green-600 rounded-full mb-4" />
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="px-3 py-2 bg-neutral-200 rounded-lg text-sm">{skill}</span>
                  ))}
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
