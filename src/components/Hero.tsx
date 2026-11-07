'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Mail, Github, Linkedin, ArrowRight, MapPin, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import MagneticButton from '@/components/motion/MagneticButton'
import Hourglass from '@/components/book/Hourglass'
import { gsap, SplitText, useGSAP, MQ } from '@/lib/gsap'
import { onBookOpened } from '@/lib/loader'
import { play } from '@/lib/sound'
import type { BookState } from '@/components/book/Book3D'

// three.js only downloads on desktops that will actually use it
const Book3D = dynamic(() => import('@/components/book/Book3D'), { ssr: false })

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

const socials = [
  { href: 'https://github.com/MayerS22', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:mayerfrieg@outlook.com', icon: Mail, label: 'Email' },
]

const TAGLINE =
  'I build scalable web & mobile products with clean code, thoughtful interfaces, and systems that last. Every project is a new chapter.'

/**
 * Prologue. A leather-bound journal and a brass hourglass sit on a candle-lit desk.
 * Desktop: the hero pins; scrolling pulls the book to centre stage, the cover swings open,
 * pages flutter past, the tagline inks itself onto the page and the hourglass drains.
 * Mobile / reduced motion: a stacked intro where the book opens once on load.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bookState = useRef<BookState>({ open: 0, pages: 0, focus: 0, ink: 0, mx: 0, my: 0 })
  const [use3D, setUse3D] = useState(false)

  // Desktop + motion + WebGL → the real 3D journal; otherwise the CSS book stays
  useEffect(() => {
    if (window.matchMedia(MQ.desktopMotion).matches && webglAvailable()) setUse3D(true)
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const q = gsap.utils.selector(sectionRef)

    // Load-in, after the BookLoader has opened (all sizes, motion allowed)
    mm.add(MQ.motion, () => {
      gsap.set(q('[data-hero-line] > span'), { yPercent: 115 })
      gsap.set(q('[data-hero-fade]'), { y: 24, opacity: 0 })
      gsap.set(q('[data-desk]'), { y: 80, opacity: 0, rotationX: 20 })
      let intro: gsap.core.Timeline | undefined
      const off = onBookOpened(() => {
        intro = gsap.timeline({ delay: 0.25 })
          .to(q('[data-hero-line] > span'), { yPercent: 0, duration: 1.3, stagger: 0.12 })
          .to(q('[data-desk]'), { y: 0, opacity: 1, rotationX: 0, duration: 1.6, ease: 'expo.out' }, 0.1)
          .to(q('[data-hero-fade]'), { y: 0, opacity: 1, duration: 0.9, stagger: 0.07 }, 0.45)
          .from(q('[data-hero-hourglass]'), { rotation: -180, duration: 1.4, ease: 'back.out(1.4)' }, 0.3)
      })
      return () => { off(); intro?.kill() }
    })

    // Idle life: the book breathes, the glow flickers (motion allowed)
    mm.add(MQ.motion, () => {
      gsap.to(q('[data-book-float]'), { y: -10, rotation: 0.6, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    })

    // Pinned scroll story (desktop)
    mm.add(MQ.desktopMotion, () => {
      if (use3D) {
        const bs = bookState.current
        Object.assign(bs, { open: 0, pages: 0, focus: 0, ink: 0 })
        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=170%', pin: true, scrub: 1, anticipatePin: 1 },
        })
          // Act 1: the writer steps aside; the camera glides over the desk
          .to(q('[data-hero-copy]'), { xPercent: -30, autoAlpha: 0, duration: 0.3 }, 0)
          .to(q('[data-hero-meta]'), { autoAlpha: 0, duration: 0.2 }, 0)
          .to(bs, { focus: 1, duration: 0.42, ease: 'power1.inOut' }, 0)
          // Act 2: the cover swings open, the leaves turn
          .to(bs, { open: 1, duration: 0.3, ease: 'power1.inOut' }, 0.26)
          .call(() => play('page'), undefined, 0.3)
          .to(bs, { pages: 1, duration: 0.34 }, 0.34)
          .call(() => play('page', 0.6), undefined, 0.5)
          // Act 3: the prologue writes itself
          .to(bs, { ink: 1, duration: 0.3 }, 0.62)
          .call(() => play('scratch', 0.6), undefined, 0.64)
          .fromTo(q('[data-scroll-cue]'), { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.92)
        return
      }
      const split = SplitText.create(q('[data-book-words]'), { type: 'words' })
      gsap.set(split.words, { opacity: 0, y: 8 })
      gsap.set(q('[data-ink-line]'), { strokeDashoffset: 1 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=170%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl
        // Act 1: the writer steps aside; the book comes to centre stage
        .to(q('[data-hero-copy]'), { xPercent: -30, autoAlpha: 0, duration: 0.3 }, 0)
        .to(q('[data-hero-meta]'), { autoAlpha: 0, duration: 0.2 }, 0)
        .to(q('[data-desk]'), { x: () => -(window.innerWidth * 0.22), duration: 0.35 }, 0)
        .to(q('[data-book]'), { rotationY: 0, rotationX: 4, rotationZ: 0, scale: 1.18, xPercent: 50, duration: 0.35 }, 0)
        .to(q('[data-hero-hourglass-wrap]'), { x: () => window.innerWidth * 0.2, y: -40, scale: 0.8, duration: 0.35 }, 0)
        // Act 2: the cover swings open, pages flutter
        .to(q('[data-book-cover]'), { rotationY: -172, duration: 0.3, ease: 'power1.inOut' }, 0.3)
        .call(() => play('page'), undefined, 0.32)
        .to(q('[data-book-leaf]'), { rotationY: (i) => -179 + i * 1.2, duration: 0.22, stagger: 0.035, ease: 'power1.inOut' }, 0.36)
        .to(q('[data-cover-shadow]'), { opacity: 0, duration: 0.2 }, 0.32)
        // Act 3: the tagline writes itself; ink flourish
        .to(split.words, { opacity: 1, y: 0, stagger: 0.012, duration: 0.06 }, 0.58)
        .to(q('[data-ink-line]'), { strokeDashoffset: 0, duration: 0.15 }, 0.82)
        .from(q('[data-page-meta]'), { opacity: 0, duration: 0.1 }, 0.55)
        .fromTo(q('[data-scroll-cue]'), { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.92)
        // Time passes the whole way through
        .fromTo(q('[data-hero-hourglass] svg'), { '--p': 0 }, { '--p': 1, duration: 1 }, 0)

      return () => split.revert()
    })

    // Mobile: the book opens on its own once, shortly after load
    mm.add(MQ.mobileMotion, () => {
      gsap.set(q('[data-book]'), { rotationY: 0, rotationX: 0, rotationZ: 0, xPercent: 50 })
      let tl: gsap.core.Timeline | undefined
      const off = onBookOpened(() => {
        tl = gsap.timeline({ delay: 1.1 })
          .to(q('[data-book-cover]'), { rotationY: -172, duration: 1.4, ease: 'power3.inOut' })
          .to(q('[data-book-leaf]'), { rotationY: (i) => -179 + i * 1.2, duration: 1, stagger: 0.12, ease: 'power2.inOut' }, 0.25)
          .to(q('[data-cover-shadow]'), { opacity: 0, duration: 0.6 }, 0.2)
          .to(q('[data-ink-line]'), { strokeDashoffset: 0, duration: 0.8 }, 1.1)
          .to(q('[data-hero-hourglass] svg'), { '--p': 1, duration: 20, ease: 'none' }, 0)
      })
      return () => { off(); tl?.kill() }
    })

    // Reduced motion: present the book already open
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(q('[data-book]'), { rotationY: 0, rotationX: 0, rotationZ: 0, xPercent: 50 })
      gsap.set(q('[data-book-cover]'), { rotationY: -172 })
      gsap.set(q('[data-book-leaf]'), { rotationY: -178 })
      gsap.set(q('[data-cover-shadow]'), { opacity: 0 })
      gsap.set(q('[data-ink-line]'), { strokeDashoffset: 0 })
    })

    // Mouse parallax: the desk tilts toward the pointer
    mm.add(MQ.pointerMotion, () => {
      const desk = q('[data-desk-tilt]')[0]
      const rx = gsap.quickTo(desk, 'rotationX', { duration: 1.2, ease: 'power3' })
      const ry = gsap.quickTo(desk, 'rotationY', { duration: 1.2, ease: 'power3' })
      const lx = gsap.quickTo(q('[data-hero-line="1"] > span'), 'x', { duration: 1.1, ease: 'power3' })
      const lx2 = gsap.quickTo(q('[data-hero-line="2"] > span'), 'x', { duration: 1.1, ease: 'power3' })
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        ry(nx * 14); rx(-ny * 10); lx(nx * -24); lx2(nx * 30)
        bookState.current.mx = nx
        bookState.current.my = ny
      }
      const section = sectionRef.current!
      section.addEventListener('pointermove', onMove)
      return () => section.removeEventListener('pointermove', onMove)
    })
  }, { scope: sectionRef, dependencies: [use3D], revertOnUpdate: true })

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden lg:motion-safe:h-[100svh] lg:motion-safe:min-h-[720px]"
    >
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />
      {use3D && (
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <Book3D state={bookState} onFail={() => setUse3D(false)} />
        </div>
      )}
      {/* Candle pool of light */}
      <div className="absolute pointer-events-none glow-flicker rounded-full desk-glow left-[45%] top-[10%] w-[70vw] h-[80vh] lg:left-[48%]" />

      <div className="relative z-10 h-full w-full max-w-[90rem] mx-auto px-6 lg:px-10 pt-28 pb-14 lg:pt-24 lg:pb-10 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Meta row */}
        <div data-hero-meta className="lg:col-span-12 flex items-center justify-between gap-4 lg:absolute lg:top-24 lg:inset-x-10">
          <div data-hero-fade className="inline-flex items-center gap-2.5 eyebrow" style={{ color: 'var(--text-secondary)' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: 'var(--live)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--live)' }} />
            </span>
            Available for new chapters
          </div>
          <div data-hero-fade className="hidden sm:flex items-center gap-2 eyebrow">
            <MapPin size={13} style={{ color: 'var(--accent-primary)' }} />
            Cairo, Egypt
          </div>
        </div>

        {/* Copy */}
        <div data-hero-copy className="lg:col-span-6 relative z-20">
          <p data-hero-fade className="eyebrow mb-6" style={{ color: 'var(--accent-primary)' }}>
            Prologue · A developer&apos;s journal
          </p>
          <h1
            className="heading-display leading-[0.86]"
            style={{ color: 'var(--text-primary)', fontSize: 'clamp(4rem, 11vw, 11.5rem)' }}
            aria-label="Mayer Frieg"
          >
            <span data-hero-line="1" className="block overflow-hidden">
              <span className="block">Mayer</span>
            </span>
            <span data-hero-line="2" className="block overflow-hidden pl-[0.6em] pb-[0.24em] -mb-[0.12em] pr-[0.12em]">
              <span className="block text-gradient serif-italic">Frieg</span>
            </span>
          </h1>

          <div data-hero-fade className="mt-8 flex items-center gap-4">
            <span className="h-px w-12" style={{ background: 'var(--accent-primary)' }} />
            <p className="font-serif text-xl sm:text-2xl" style={{ color: 'var(--text-secondary)' }}>
              Software Engineer <span className="serif-italic" style={{ color: 'var(--accent-primary)' }}>— Full Stack</span>
            </p>
          </div>
          <p data-hero-fade className="mt-5 max-w-md text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Reader, planner, builder. I treat time like a resource and code like a craft.
          </p>

          <div data-hero-fade className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <MagneticButton
              href="#projects"
              className="px-7 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 text-sm"
              style={{ background: 'var(--accent-gradient)' }}
            >
              Read My Work <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="px-7 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 text-sm"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
            >
              Write to Me
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

        {/* Desk: book + hourglass (CSS version; replaced by the WebGL journal on capable desktops) */}
        <div className={`lg:col-span-6 relative z-10 flex justify-center ${use3D ? 'invisible' : ''}`} style={{ perspective: '1600px' }}>
          <div data-desk className="relative w-full flex justify-center items-end pb-10 sm:pb-14 lg:pb-0">
            <div data-desk-tilt className="relative flex items-end justify-center gap-6 sm:gap-10" style={{ transformStyle: 'preserve-3d' }}>
              <div data-book-float className="book-stage relative">
                <div className="desk-shadow absolute left-[-10%] right-[-60%] -bottom-8 h-10 rounded-full" />
                <Book />
              </div>
              <div data-hero-hourglass-wrap className="relative hidden sm:block self-end">
                <div className="desk-shadow absolute -inset-x-4 -bottom-3 h-6 rounded-full" />
                <div data-hero-hourglass>
                  <Hourglass className="w-[clamp(60px,6vw,96px)] h-auto relative" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue at the end of the pinned story (desktop) */}
      <div data-scroll-cue className="hidden lg:motion-safe:flex absolute bottom-8 inset-x-0 justify-center opacity-0 pointer-events-none">
        <span className="eyebrow flex items-center gap-2">Turn the page <ArrowDown size={13} className="animate-bounce" /></span>
      </div>
    </section>
  )
}

/** The journal itself: leather cover (outside: title; inside: ex-libris portrait), leaves, page. */
function Book() {
  return (
    <div
      data-book
      className="book"
      style={{ transform: 'rotateY(-28deg) rotateX(12deg) rotateZ(-2deg)' }}
    >
      <div className="book-back" />

      {/* Text block — the first right-hand page */}
      <div className="book-block paper overflow-hidden">
        <div className="page-gutter" />
        <div className="absolute inset-0 flex flex-col px-[11%] pt-[12%] pb-[9%]">
          <p data-page-meta className="font-mono text-[clamp(7px,0.6vw,10px)] tracking-[0.25em] uppercase opacity-60">Prologue</p>
          <p
            data-book-words
            className="serif-italic mt-[8%] leading-[1.32]"
            style={{ fontSize: 'calc(var(--bw) * 0.061)', color: 'var(--paper-ink)' }}
          >
            {TAGLINE}
          </p>
          <svg viewBox="0 0 200 30" className="mt-auto w-2/3" aria-hidden>
            <path
              data-ink-line
              className="ink-stroke"
              pathLength={1}
              d="M4 18 C 30 4, 52 28, 80 16 S 130 6, 150 18 S 186 22, 196 10"
              fill="none"
              stroke="#5a3a1c"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
          <div data-page-meta className="flex justify-between items-end mt-2 font-serif text-[clamp(8px,0.7vw,11px)] opacity-70">
            <span className="serif-italic">— Mayer Frieg</span>
            <span>i</span>
          </div>
        </div>
      </div>

      {/* Leaves that flutter past */}
      {[0, 1, 2].map((i) => (
        <div key={i} data-book-leaf className="book-leaf" style={{ transform: `translateZ(${1 + i * 0.6}px)` }}>
          <div className="book-face paper-plain"><div className="page-gutter" /></div>
          <div className="book-face book-face--back paper-plain"><div className="page-gutter page-gutter--right" /></div>
        </div>
      ))}

      {/* Cover */}
      <div data-book-cover className="book-cover" style={{ transform: 'translateZ(3.5px)' }}>
        {/* Outside */}
        <div className="book-face leather">
          <div className="book-spine-shade" />
          <div className="gilt-frame" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[14%]">
            <svg viewBox="0 0 40 40" className="w-[16%] mb-[10%] opacity-90" aria-hidden>
              <circle cx="20" cy="20" r="17" fill="none" stroke="#e2b468" strokeWidth="1.2" />
              <circle cx="20" cy="20" r="13" fill="none" stroke="#e2b468" strokeWidth="0.6" opacity="0.6" />
              <path d="M20 9 V20 L27 24" stroke="#e2b468" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
            <p className="font-serif font-semibold gilt-text leading-[0.95]" style={{ fontSize: 'calc(var(--bw) * 0.15)' }}>
              Mayer
              <br />
              <span className="serif-italic">Frieg</span>
            </p>
            <span className="block h-px w-1/2 my-[9%]" style={{ background: 'rgba(226,180,104,0.6)' }} />
            <p className="font-mono uppercase tracking-[0.3em] gilt-text" style={{ fontSize: 'calc(var(--bw) * 0.032)' }}>
              A Developer&apos;s Journal
            </p>
            <p className="font-serif gilt-text mt-[6%] serif-italic" style={{ fontSize: 'calc(var(--bw) * 0.04)' }}>
              Vol. I
            </p>
          </div>
          <div data-cover-shadow className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(115deg, rgba(255,230,180,0.08), transparent 40%, rgba(0,0,0,0.25))' }} />
        </div>

        {/* Inside: ex libris with portrait */}
        <div className="book-face book-face--back paper-plain">
          <div className="page-gutter page-gutter--right" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[13%] text-center">
            <p className="font-mono uppercase tracking-[0.3em] opacity-60" style={{ fontSize: 'calc(var(--bw) * 0.03)' }}>Ex Libris</p>
            <div className="relative w-[70%] aspect-[4/5] mt-[8%] p-[4%] bg-[#fffaf0] shadow-[0_10px_25px_-10px_rgba(60,35,10,0.6)] rotate-[-2deg]">
              <div className="relative w-full h-full overflow-hidden">
                <Image src="/Me.jpeg" alt="Portrait of Mayer Frieg" fill priority className="object-cover object-top sepia-[0.35]" sizes="(max-width: 1024px) 40vw, 15vw" />
              </div>
            </div>
            <p className="serif-italic mt-[9%]" style={{ fontSize: 'calc(var(--bw) * 0.07)' }}>Mayer Frieg</p>
            <p className="font-mono uppercase tracking-[0.2em] opacity-60 mt-[3%]" style={{ fontSize: 'calc(var(--bw) * 0.028)' }}>Cairo · MMXXV</p>
          </div>
        </div>
      </div>
    </div>
  )
}
