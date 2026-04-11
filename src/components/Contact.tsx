'use client'

import { Mail, Phone, MapPin, Github, Linkedin, Eye } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-neutral-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-clamp-section font-bold mb-4 text-neutral-900">
            Get In <span className="text-green-700">Touch</span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">Let&apos;s discuss your next project</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <a href="mailto:mayerfrieg@outlook.com" className="card p-6 text-center hover:border-green-600">
              <div className="w-14 h-14 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 sm:w-6 sm:h-6 text-green-700" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-1">Email</h4>
              <p className="text-neutral-600 text-sm">mayerfrieg@outlook.com</p>
            </a>
            <a href="tel:+20188244283" className="card p-6 text-center hover:border-green-600">
              <div className="w-14 h-14 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 sm:w-6 sm:h-6 text-green-700" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-1">Phone</h4>
              <p className="text-neutral-600 text-sm">+20 188 244 283</p>
            </a>
            <div className="card p-6 text-center">
              <div className="w-14 h-14 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 sm:w-6 sm:h-6 text-green-700" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-1">Location</h4>
              <p className="text-neutral-600 text-sm">Cairo, Egypt</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-neutral-900 mb-6 text-center">Follow Me</h3>
            <div className="flex justify-center gap-4">
              <a href="https://github.com/MayerS22" target="_blank" rel="noopener noreferrer" className="w-14 h-14 sm:w-12 sm:h-12 card flex items-center justify-center hover:border-green-600 touch-target">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/mayer-frieg-7a0368226/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 sm:w-12 sm:h-12 card flex items-center justify-center hover:border-green-600 touch-target">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <a
              href="/images/Cv/Mayer Soliman CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 touch-target"
            >
              <Eye size={20} />
              View CV
            </a>
            <a href="mailto:mayerfrieg@outlook.com" className="flex-1 px-6 py-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 touch-target">
              <Mail size={20} />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
