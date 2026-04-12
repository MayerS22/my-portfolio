'use client'

import { Mail, Phone, MapPin, Github, Linkedin, Eye } from 'lucide-react'
import TextReveal from './TextReveal'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'mayerfrieg@outlook.com', href: 'mailto:mayerfrieg@outlook.com' },
  { icon: Phone, label: 'Phone', value: '+20 188 244 283', href: 'tel:+20188244283' },
  { icon: MapPin, label: 'Location', value: 'Cairo, Egypt', href: null },
]

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-neutral-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            <TextReveal delay={0}>Get In</TextReveal>{' '}
            <span className="text-green-700"><TextReveal delay={100}>Touch</TextReveal></span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            <TextReveal delay={200}>Have a project in mind? Let&apos;s talk.</TextReveal>
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          {/* Contact details — simple list */}
          <div className="space-y-5 mb-10 scroll-animate">
            {contactInfo.map((item) => {
              const Wrapper = item.href ? 'a' : 'div'
              const props = item.href ? { href: item.href } : {}
              return (
                <Wrapper key={item.label} {...props} className={`flex items-center justify-center gap-3 text-neutral-800 ${item.href ? 'hover:text-green-700 transition-colors' : ''}`}>
                  <item.icon size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-base">{item.value}</span>
                </Wrapper>
              )
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 scroll-animate delay-100">
            <a
              href="/images/Cv/Mayer Soliman CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-3.5 rounded-lg font-semibold transition-colors touch-target"
            >
              <Eye size={18} />
              View CV
            </a>
            <a
              href="mailto:mayerfrieg@outlook.com"
              className="inline-flex items-center justify-center gap-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 px-7 py-3.5 rounded-lg font-semibold transition-colors touch-target"
            >
              <Mail size={18} />
              Send Email
            </a>
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-3 scroll-animate delay-200">
            <a href="https://github.com/MayerS22" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-colors touch-target" aria-label="GitHub">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/mayer-frieg-7a0368226/" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-colors touch-target" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
