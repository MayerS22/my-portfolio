'use client'

import { useRef } from 'react'
import { Mail, Github, Linkedin, ArrowRight, MapPin, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import MagneticButton from '@/components/motion/MagneticButton'
import { gsap, SplitText, useGSAP, MQ } from '@/lib/gsap'

const socials = [
  { href: 'https://github.com/MayerS22', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:mayerfrieg@outlook.com', icon: Mail, label: 'Email' },
]

const TAGLINE =
  'Building scalable web & mobile experiences with modern technologies — clean code, thoughtful interfaces, and systems that last.'

/**
 * Chapter 01. Desktop: the hero pins and the scroll plays a timeline — the name splits apart,
 * the portrait recedes, and the tagline takes the stage word by word. Mobile: a stacked intro.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Load-in (all sizes, motion allowed)
    mm.add(MQ.motion, () => {
      gsap.timeline({ delay: 0.15 })
        .from('[data-hero-line] > span', { yPercent: 115, duration: 1.2, stagger: 0.12 })
        .fromTo('[data-hero-photo]',
          { clipPath: 'inset(100% 0% 0% 0% round 20px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1.3, ease: 'expo.inOut' }, 0)
        .from('[data-hero-photo] img', { scale: 1.35, duration: 1.6 }, 0)
        .from('[data-hero-fade]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.5)
    })

    // Pinned scroll story (desktop)
    mm.add(MQ.desktopMotion, () => {
      const split = SplitText.create('[data-hero-statement]', { type: 'words' })
      gsap.set(split.words, { opacity: 0.08 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl.to('[data-hero-line="1"]', { xPercent: -45, opacity: 0.12, duration: 0.6 }, 0)
        .to('[data-hero-line="2"]', { xPercent: 45, opacity: 0.12, duration: 0.6 }, 0)
        .to('[data-hero-bottom]', { y: -40, opacity: 0, duration: 0.3 }, 0)
        .to('[data-hero-meta]', { opacity: 0, duration: 0.25 }, 0)
        .to('[data-hero-photo]', { scale: 0.55, rotate: -6, yPercent: -10, opacity: 0, duration: 0.55 }, 0.1)
        .fromTo('[data-hero-statement-wrap]', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.35)
        .to(split.words, { opacity: 1, stagger: 0.02, duration: 0.1 }, 0.45)

      return () => split.revert()
    })

    // Mouse parallax: layers drift at different depths toward the pointer.
    mm.add(MQ.pointerMotion, () => {
      const layers = [
        { el: '[data-hero-photo]', x: 26, y: 18, r: 3 },
        { el: '[data-hero-line="1"] > span', x: -18, y: -8, r: 0 },
        { el: '[data-hero-line="2"] > span', x: 22, y: 10, r: 0 },
      ].map((l) => ({
        ...l,
        qx: gsap.quickTo(l.el, 'x', { duration: 1.1, ease: 'power3' }),
        qy: gsap.quickTo(l.el, 'y', { duration: 1.1, ease: 'power3' }),
        qr: gsap.quickTo(l.el, 'rotationY', { duration: 1.1, ease: 'power3' }),
      }))
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        layers.forEach((l) => { l.qx(nx * l.x * 2); l.qy(ny * l.y * 2); l.qr(nx * l.r * 2) })
      }
      const section = sectionRef.current!
      section.addEventListener('pointermove', onMove)
      return () => section.removeEventListener('pointermove', onMove)
    })
  }, { scope: sectionRef })

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden lg:motion-safe:h-[100svh] lg:motion-safe:min-h-[680px]"
    >
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="relative z-10 h-full w-full max-w-[90rem] mx-auto px-6 lg:px-10 pt-28 pb-14 lg:pt-24 lg:pb-10 flex flex-col justify-between gap-10">
        {/* Meta row */}
        <div data-hero-meta className="flex items-center justify-between gap-4">
          <div data-hero-fade className="inline-flex items-center gap-2.5 eyebrow" style={{ color: 'var(--text-secondary)' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: 'var(--live)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--live)' }} />
            </span>
            Available for new opportunities
          </div>
          <div data-hero-fade className="hidden sm:flex items-center gap-2 eyebrow">
            <MapPin size={13} style={{ color: 'var(--accent-primary)' }} />
            Cairo, Egypt
          </div>
        </div>

        {/* Name — split lines */}
        <h1
          className="heading-display leading-[0.85] relative"
          style={{ color: 'var(--text-primary)', fontSize: 'clamp(3.75rem, 14.5vw, 15rem)' }}
          aria-label="Mayer Frieg"
        >
          <span data-hero-line="1" className="block overflow-hidden">
            <span className="block">Mayer</span>
          </span>
          <span data-hero-line="2" className="block overflow-hidden lg:text-right">
            <span className="block text-gradient">Frieg</span>
          </span>
        </h1>

        {/* Portrait: in-flow on mobile, centred between the name lines on desktop */}
        <div
          data-hero-photo
          className="relative w-full max-w-[320px] aspect-[4/5] rounded-[20px] overflow-hidden mx-auto lg:absolute lg:left-[56%] lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[clamp(200px,17vw,300px)] z-20"
          style={{ boxShadow: '0 40px 80px -30px color-mix(in srgb, var(--accent-primary) 45%, transparent)' }}
        >
          <Image src="/Me.jpeg" alt="Portrait of Mayer Frieg" fill priority className="object-cover object-top" sizes="(max-width: 1024px) 320px, 17vw" />
          <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)' }} />
        </div>

        {/* Bottom row */}
        <div data-hero-bottom className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div data-hero-fade className="max-w-md space-y-3">
            <p className="font-display text-xl sm:text-2xl font-medium" style={{ color: 'var(--text-primary)' }}>
              Software Engineer – Full Stack
            </p>
            <p className="text-base leading-relaxed lg:motion-safe:hidden" style={{ color: 'var(--text-muted)' }}>
              {TAGLINE}
            </p>
          </div>

          <div data-hero-fade className="flex flex-col sm:flex-row sm:items-center gap-4 lg:justify-end">
            <MagneticButton
              href="#projects"
              className="px-7 py-3.5 rounded-full font-semibold text-white flex items-center justify-center gap-2 text-sm"
              style={{ background: 'var(--accent-gradient)' }}
            >
              View My Work <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="px-7 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 text-sm"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
            >
              Get In Touch
            </MagneticButton>
            <div className="flex items-center gap-2 sm:ml-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="p-3 rounded-full transition-all hover:-translate-y-0.5 hover:text-[color:var(--accent-primary)] touch-target flex items-center justify-center"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statement layer — revealed by the pinned scroll (desktop only) */}
      <div
        data-hero-statement-wrap
        className="invisible absolute inset-0 z-30 hidden lg:motion-safe:flex flex-col items-center justify-center px-10 pointer-events-none"
      >
        <span className="eyebrow mb-8" style={{ color: 'var(--accent-primary)' }}>What I do</span>
        <p
          data-hero-statement
          className="font-display font-semibold text-center max-w-5xl leading-[1.08] tracking-tight"
          style={{ color: 'var(--text-primary)', fontSize: 'clamp(2rem, 4.2vw, 4.25rem)' }}
        >
          {TAGLINE}
        </p>
        <span className="eyebrow mt-10 flex items-center gap-2">
          Keep scrolling <ArrowDown size={13} className="animate-bounce" />
        </span>
      </div>
    </section>
  )
}
