'use client'

import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

const Contact = () => {

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'mayerfrieg@gmail.com',
      link: 'mailto:mayerfrieg@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+20188244283',
      link: 'tel:+20188244283'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Cairo, Egypt',
      link: '#'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      url: 'https://github.com/MayerS22',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/',
      label: 'LinkedIn'
    }
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden animated-bg">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static floating orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Let&apos;s discuss your next project or just say hello. I&apos;m always open to new opportunities!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-12">
            {/* Contact Info Cards */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.link}
                    className="flex flex-col items-center gap-4 p-6 rounded-xl glass-card hover:glow transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{info.title}</h4>
                      <p className="text-gray-400">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Follow Me</h3>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 glass-card rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:glow transition-all duration-300 relative z-20"
                  >
                    <social.icon size={28} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="relative z-5">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-md mx-auto">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/documents/Mayer Soliman.pdf';
                    link.download = 'Mayer Soliman.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold hover:glow transition-all duration-300 relative z-10"
                >
                  Download Resume
                </button>
                
                <button
                  onClick={() => window.open('mailto:mayerfrieg@gmail.com')}
                  className="p-4 glass-card rounded-lg text-white font-semibold hover:glow transition-all duration-300 relative z-10"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
