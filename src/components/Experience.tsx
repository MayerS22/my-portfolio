'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { Calendar, MapPin, Building, GraduationCap, Award, Briefcase, Eye, X } from 'lucide-react'
import Image from 'next/image'

const Experience = () => {
  const experiences = [
    { title: 'Software Engineer', company: 'QueenSoft', location: 'Egypt', period: 'July. 2025 – Present', description: 'Full Stack Developer building scalable web applications.', technologies: ['Next.js', 'Nest.js', 'PostgreSQL', 'TypeScript', 'React', 'Node.js'], image: '/images/QueenSoft.jpg' },
    { title: 'Administrative Assistant', company: 'CMF', location: 'Egypt', period: 'Aug. 2023 – Present', description: 'Supporting foundation operations through data management and event coordination.', technologies: ['Microsoft Office', 'Data Entry', 'Report Generation'], image: '/images/CMF.jpg' },
    { title: 'Microsoft Student Partner', company: 'Microsoft Tech Club', location: 'Egypt', period: 'Oct 2022 – Oct 2023', description: 'Led technical workshops and mentored students in Microsoft technologies.', technologies: ['Azure', 'Power Platform', 'Power BI', 'GitHub', 'Leadership'], image: '/images/MSP.jpg' },
    { title: 'Database Administrator', company: 'CMF', location: 'Egypt', period: 'Sept 2022 – Feb 2023', description: 'Designed and implemented database system using Microsoft Access.', technologies: ['Access', 'Database Design', 'SQL', 'Data Modeling'], image: '/images/CMF.jpg' }
  ]

  const education = [{ title: 'Bachelor of Computer and Information Science', institution: 'Ain Shams University', location: 'Egypt', period: 'Sept 2021 - July 2025', description: 'GPA: 3.005', image: '/images/CS.jpg' }]

  const certifications = [
    { title: 'Android Internship', issuer: 'Banque Misr', date: 'Aug. 2024', image: '/images/BM.jpg', certificateImage: '/images/Certifcation/BM.jpg' },
    { title: 'Data Engineering Training', issuer: 'Potenia', date: 'Aug. 2023', image: '/images/POTENTIA.jpg', certificateImage: '/images/Certifcation/Potenia.png' },
    { title: 'Flutter Training', issuer: 'Support', date: 'Aug. 2023', image: '/images/Support.jpg', certificateImage: '/images/Certifcation/Fluttersupport.jpg' },
    { title: 'Software Engineering Training', issuer: 'ALX', date: 'Feb. 2023', image: '/images/ALX.jpg' }
  ]

  const courses = [
    { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: '2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/AI Fluency Framework & Foundations course.png', description: 'Mastered AI collaboration principles including delegation, clear communication, critical evaluation, and responsible use. Strengthened foundation in human-AI collaboration toward AI Engineering.' },
    { title: 'Git & GitHub Bootcamp', issuer: 'Udemy', date: 'Aug 2025', image: '/images/Udemy.jpg', certificateImage: '/images/Certifcation/GitCourse.jpg' },
    { title: 'Nest.js Complete Guide', issuer: 'Udemy', date: 'Jun 2025', image: '/images/Udemy.jpg', certificateImage: '/images/Certifcation/The Complete Developer\'s Guide in Nest.jpg' },
    { title: 'Freelancer Toolkit', issuer: 'E-Youth | ITIDA', date: 'Mar. 2025', image: '/images/ITIDA.jpg' },
    { title: 'Flutter Course', issuer: 'Udemy', date: 'Sept. 2023', image: '/images/Udemy.jpg' },
    { title: 'Python 3 Guide', issuer: 'Udemy', date: 'July. 2023', image: '/images/Udemy.jpg', certificateImage: '/images/Certifcation/Python.jpg' }
  ]

  const [selectedCertificate, setSelectedCertificate] = useState<{ image: string; title: string } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback((image: string, title: string) => {
    setSelectedCertificate({ image, title })
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedCertificate(null)
  }, [])

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal])

  // Body scroll lock
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <section id="experience" ref={useRef(null)} className="py-16 sm:py-20 bg-neutral-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            Experience & <span className="text-green-700">Education</span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            My professional journey and academic background
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <div>
              <div className="flex items-center mb-6">
                <GraduationCap className="text-green-700 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-neutral-900">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="card border-l-4 border-l-green-600 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <Image src={edu.image} alt="" width={56} height={56} className="w-14 h-14 sm:w-12 sm:h-12 object-cover rounded-lg" loading="lazy" />
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">{edu.title}</h4>
                        <div className="flex gap-3 text-sm text-neutral-600 mb-2">
                          <Building size={14} /><span>{edu.institution}</span>
                          <MapPin size={14} /><span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-neutral-600 mb-3">
                          <Calendar size={14} /><span>{edu.period}</span>
                        </div>
                        <p className="text-neutral-800 text-sm">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <Briefcase className="text-green-700 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-neutral-900">Work Experience</h3>
              </div>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="card border-l-4 border-l-green-600 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <Image src={exp.image} alt="" width={56} height={56} className="w-14 h-14 sm:w-12 sm:h-12 object-cover rounded-lg" loading="lazy" />
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">{exp.title}</h4>
                        <div className="flex gap-3 text-sm text-neutral-600 mb-2">
                          <Building size={14} /><span>{exp.company}</span>
                          <MapPin size={14} /><span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-neutral-600 mb-3">
                          <Calendar size={14} /><span>{exp.period}</span>
                        </div>
                        <p className="text-neutral-800 text-sm mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-green-100 text-neutral-800 text-xs rounded-full">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <div className="flex items-center mb-6">
                <Award className="text-green-700 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-neutral-900">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="card p-4">
                    <div className="flex items-start gap-3">
                      <Image src={cert.image} alt="" width={48} height={48} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-neutral-900 text-sm">{cert.title}</h4>
                        <p className="text-neutral-600 text-xs">{cert.issuer} • {cert.date}</p>
                      </div>
                      {cert.certificateImage && (
                        <button
                          onClick={() => openModal(cert.certificateImage, cert.title)}
                          className="p-3 text-neutral-500 hover:text-green-700 flex-shrink-0 touch-target"
                          aria-label="View certificate"
                        >
                          <Eye size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <GraduationCap className="text-green-700 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-neutral-900">Courses</h3>
              </div>
              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div key={index} className="card p-4">
                    <div className="flex items-start gap-3">
                      {course.image && (
                        <Image src={course.image} alt="" width={48} height={48} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" loading="lazy" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-neutral-900 text-sm">{course.title}</h4>
                        <p className="text-neutral-600 text-xs">{course.issuer} • {course.date}</p>
                      </div>
                      {course.certificateImage && (
                        <button
                          onClick={() => openModal(course.certificateImage, course.title)}
                          className="p-3 text-neutral-500 hover:text-green-700 flex-shrink-0 touch-target"
                          aria-label="View certificate"
                        >
                          <Eye size={20} />
                        </button>
                      )}
                    </div>
                    {course.description && (
                      <p className="text-neutral-700 text-xs mt-2 line-clamp-2">{course.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedCertificate && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
          <button onClick={closeModal} className="absolute top-4 right-4 z-[10000] p-2 bg-white hover:bg-gray-200 rounded-full">
            <X size={24} />
          </button>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] bg-gray-100 p-4">
              <Image
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Experience
