'use client'

import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { ExternalLink, Eye, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import SectionHeading from './scroll/SectionHeading'
import AnimatedModal from './motion/AnimatedModal'
import Hourglass from './book/Hourglass'
import { gsap, useGSAP, MQ } from '@/lib/gsap'
import { play } from '@/lib/sound'

export interface FreelanceProject {
  id: number
  title: string
  client: string
  description: string
  image: string
  images: string[]
  technologies: string[]
  duration: string
  months: number
  liveUrl: string
  githubUrl: string
  category: string
}

const VOLS = ['I', 'II', 'III']
const TOTAL_MONTHS = 9
/** Leather tones for the volumes and their share of the time bar. */
const SEG = ['#8a3a2c', '#355e45', '#344a70']
const WAX = 'radial-gradient(circle at 35% 30%, #c0463a, #8e1f18 55%, #5a100c)'
const WAX_EDGE = '47% 53% 50% 50% / 52% 46% 54% 48%'

/**
 * Chapter IV. The SafetyZone commission. A sealed letter arrives: the wax seal cracks, the flap
 * opens and the brief slides out. A single bar shows where the nine months went, filling as you
 * read. Then the three deliverables are bound as a trilogy: paper spreads that stack, each
 * tipping back like a turned page as the next volume lands on top.
 */
export default function Freelance() {
  const ref = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<FreelanceProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const deliverables = useMemo<FreelanceProject[]>(() => [
    {
      id: 1, title: "Consumer Website", client: "SafetyZone",
      description: "Modern consumer-facing website with real-time safety reporting, emergency services integration, and responsive design.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
      duration: "2 months", months: 2, liveUrl: "https://safetyzoone.com/", githubUrl: "#", category: "Web"
    },
    {
      id: 2, title: "Consumer App", client: "SafetyZone",
      description: "Mobile app with real-time safety reporting, emergency services, incident tracking, and direct communication with civil defense.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/safetyZoneConsumer/0.png", "/images/safetyZoneConsumer/1.png", "/images/safetyZoneConsumer/2.png", "/images/safetyZoneConsumer/3.png", "/images/safetyZoneConsumer/4.png", "/images/safetyZoneConsumer/5.png"],
      technologies: ["Flutter", "Firebase", "Dart", "REST APIs"],
      duration: "3 months", months: 3, liveUrl: "#", githubUrl: "#", category: "Mobile"
    },
    {
      id: 3, title: "Provider App", client: "SafetyZone",
      description: "Provider-facing mobile app with real-time incident management, emergency response coordination, and dispatch center communication.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/SaftyZoneprovider/HomePage.png", "/images/SaftyZoneprovider/BasicInfo.png", "/images/SaftyZoneprovider/chats.png", "/images/SaftyZoneprovider/Offers.png", "/images/SaftyZoneprovider/PendingScreen.png"],
      technologies: ["Flutter", "Firebase", "Dart", "Socket.io"],
      duration: "4 months", months: 4, liveUrl: "#", githubUrl: "#", category: "Mobile"
    }
  ], [])

  const openModal = useCallback((project: FreelanceProject) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }, [])

  const goToNextImage = useCallback(() => {
    setSelectedProject((p) => {
      if (!p) return p
      setCurrentImageIndex((prev) => (prev + 1) % p.images.length)
      return p
    })
  }, [])

  const goToPrevImage = useCallback(() => {
    setSelectedProject((p) => {
      if (!p) return p
      setCurrentImageIndex((prev) => (prev - 1 + p.images.length) % p.images.length)
      return p
    })
  }, [])

  // Carousel arrow-key nav (Escape + overlay handled by AnimatedModal)
  useEffect(() => {
    if (!isModalOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNextImage()
      if (e.key === 'ArrowLeft') goToPrevImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isModalOpen, goToNextImage, goToPrevImage])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const q = gsap.utils.selector(ref)

    // ── The commission letter (md+, motion): seal cracks, flap opens, letter slides out ──
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const env = q('[data-envelope]')[0]
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: env, start: 'top 75%', end: 'top 5%', scrub: 1 },
      })
        .call(() => play('seal'), undefined, 0.02)
        .fromTo(q('[data-seal-l]'), { x: 0, rotation: 0, opacity: 1 }, { x: -40, y: 30, rotation: -35, opacity: 0, duration: 0.2 }, 0)
        .fromTo(q('[data-seal-r]'), { x: 0, rotation: 0, opacity: 1 }, { x: 40, y: 34, rotation: 30, opacity: 0, duration: 0.2 }, 0)
        .fromTo(q('[data-flap]'), { rotationX: 0, zIndex: 30 }, { rotationX: 180, duration: 0.3, ease: 'power1.inOut' }, 0.12)
        .set(q('[data-flap]'), { zIndex: 5 }, 0.28)
        .fromTo(q('[data-letter]'), { yPercent: 62 }, { yPercent: 0, duration: 0.5, ease: 'power2.out' }, 0.38)
        .fromTo(q('[data-letter-line]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.15 }, 0.6)
    })

    // ── Where the time went: segments fill, hourglass drains ──
    mm.add(MQ.motion, () => {
      const bar = q('[data-timebar]')[0]
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: bar, start: 'top 85%', end: 'top 40%', scrub: 0.8 },
      })
      q('[data-seg]').forEach((seg, i) => {
        tl.fromTo(seg, { scaleX: 0 }, { scaleX: 1, duration: deliverables[i].months }, '>')
      })
      tl.fromTo(q('[data-seg-label]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 1.5, duration: 1 }, 0)
        .fromTo(q('[data-timebar-glass] svg'), { '--p': 0 }, { '--p': 1, duration: TOTAL_MONTHS }, 0)
        .fromTo(q('[data-month]'), { opacity: 0.15 }, { opacity: 1, stagger: 1, duration: 0.5 }, 0)
    })

    // ── The trilogy: volumes stack; the one beneath tips back like a turned page (desktop) ──
    mm.add(MQ.desktopMotion, () => {
      const cards = q('[data-fl-card]')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        const st = { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true }
        gsap.to(card.querySelector('[data-fl-inner]'), {
          scale: 0.9,
          rotationX: 14,
          transformPerspective: 1400,
          ease: 'none',
          scrollTrigger: st,
        })
        // Dimming via an overlay's opacity (compositor-only) instead of a brightness filter
        gsap.fromTo(card.querySelector('[data-fl-dim]'), { opacity: 0 }, { opacity: 0.55, ease: 'none', scrollTrigger: st })
      })
    })

    mm.add(MQ.motion, () => {
      q('[data-fl-img]').forEach((img) => {
        gsap.fromTo(img, { yPercent: -6, scale: 1.15 }, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      q('[data-fl-card]').forEach((card) => {
        gsap.from(card.querySelector('[data-fl-inner]'), {
          y: 100, rotationX: -25, transformPerspective: 1400, opacity: 0, duration: 1.1,
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.from(q('[data-wax-cta]'), {
        scale: 2.4, rotation: -40, opacity: 0, duration: 0.9, ease: 'back.out(2.2)',
        scrollTrigger: { trigger: q('[data-fl-cta]')[0], start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    })
  }, { scope: ref })

  let offset = 0

  return (
    <section id="freelance" ref={ref} className="section relative overflow-clip">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        <SectionHeading
          index="05"
          eyebrow="Client work"
          title="A"
          accent="Commission"
          intro="Real products, real clients, from first brief to launch."
        />

        <div className="max-w-6xl mx-auto">
          {/* ── The commission letter ── */}
          <div data-envelope className="relative mx-auto max-w-3xl md:h-[620px] mb-20 sm:mb-28">
            {/* Envelope back */}
            <div aria-hidden className="hidden md:block absolute inset-x-0 bottom-0 h-[330px] rounded-[6px]" style={{ background: 'linear-gradient(180deg, #b8956a, #a07c52)', boxShadow: '0 50px 80px -30px rgba(0,0,0,0.85)' }} />

            {/* Letter (clipped at the envelope's bottom edge so it can hide inside the pocket) */}
            <div className="relative md:absolute md:inset-0 md:overflow-hidden z-10">
            <article
              data-letter
              className="paper relative md:absolute md:inset-x-[6%] md:bottom-6 md:h-[500px] md:-translate-y-[78px] rounded-[3px] px-7 py-8 sm:px-12 sm:py-10 z-10"
              style={{ boxShadow: '0 10px 30px -10px rgba(40,25,10,0.55)' }}
            >
              <div data-letter-line className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">A letter of commission</p>
                  <p className="serif-italic text-lg mt-1">To: Mayer Frieg</p>
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-white" style={{ boxShadow: '0 0 0 1px var(--paper-line)' }}>
                  <Image src="/images/SaftyZoneprovider/SaftyZone.png" alt="SafetyZone logo" width={48} height={48} className="object-contain p-1" />
                </div>
              </div>
              <h3 data-letter-line className="font-serif font-semibold leading-[1.02] mb-4" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)', color: 'var(--paper-ink)' }}>
                SafetyZone: a safety &amp; <span className="serif-italic">emergency</span> platform
              </h3>
              <p data-letter-line className="text-[15px] sm:text-base leading-relaxed mb-5 max-w-xl" style={{ color: '#4a3826' }}>
                A multi-platform product suite (a website, a consumer app and a provider app) delivering real-time safety
                reporting, emergency services and dispatch coordination. Three deliverables, one connected experience.
              </p>
              <div data-letter-line className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="font-hand text-2xl ink-blue">~9 months · 3 volumes</span>
                <a
                  href="https://safetyzoone.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full transition-transform hover:-translate-y-0.5"
                  style={{ background: '#2a1d12', color: '#f5ead6' }}
                >
                  <ExternalLink size={14} /> Visit safetyzoone.com
                </a>
              </div>
            </article>
            </div>

            {/* Front pocket (covers the lower letter) */}
            <div aria-hidden className="hidden md:block absolute inset-x-0 bottom-0 h-[330px] z-20 pointer-events-none">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #c9a87a, #b38f63)', clipPath: 'polygon(0 22%, 50% 62%, 100% 22%, 100% 100%, 0 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(200deg, rgba(0,0,0,0.12), transparent 40%)', clipPath: 'polygon(0 22%, 50% 62%, 100% 22%, 100% 100%, 0 100%)' }} />
              <span className="absolute left-8 bottom-6 font-hand text-2xl" style={{ color: '#5a3e1e' }}>To Mayer, Cairo</span>
              <span className="absolute right-8 bottom-6 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: '#6a4c28' }}>By hand · Priority</span>
            </div>

            {/* Flap */}
            <div
              data-flap
              aria-hidden
              className="hidden md:block absolute inset-x-0 h-[180px] origin-top pointer-events-none"
              style={{ bottom: 330 - 180, transformStyle: 'preserve-3d', zIndex: 5, transform: 'rotateX(180deg)' }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #c4a274, #a8865a)', clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }} />
              {/* Inside face: flipped twice (own + parent), so its shape is drawn as it appears when open: tip up */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #8e6b42, #a8865a)', clipPath: 'polygon(0 100%, 100% 100%, 50% 0)', transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }} />
            </div>

            {/* Wax seal, cracks in two */}
            <div aria-hidden className="hidden md:block absolute left-1/2 -translate-x-1/2 z-40 pointer-events-none" style={{ bottom: 330 - 180 - 30 }}>
              {(['l', 'r'] as const).map((side) => (
                <div
                  key={side}
                  {...{ [`data-seal-${side}`]: true }}
                  className="absolute -translate-x-1/2 w-16 h-16 flex items-center justify-center font-serif text-xl font-bold opacity-0"
                  style={{
                    background: WAX,
                    borderRadius: WAX_EDGE,
                    color: 'rgba(255,200,180,0.55)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 -3px 6px rgba(0,0,0,0.35)',
                    clipPath: side === 'l' ? 'polygon(0 0, 54% 0, 44% 40%, 56% 62%, 46% 100%, 0 100%)' : 'polygon(54% 0, 100% 0, 100% 100%, 46% 100%, 56% 62%, 44% 40%)',
                  }}
                >
                  SZ
                </div>
              ))}
            </div>
          </div>

          {/* ── Where the time went ── */}
          <div data-timebar className="mb-24 sm:mb-32">
            <div className="flex items-end justify-between gap-6 mb-5">
              <div>
                <p className="eyebrow mb-2" style={{ color: 'var(--accent-primary)' }}>Where the time went</p>
                <p className="font-serif text-2xl sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
                  Nine months, <span className="serif-italic text-gradient">three volumes</span>
                </p>
              </div>
              <div data-timebar-glass className="shrink-0">
                <Hourglass className="w-9 sm:w-11 h-auto" />
              </div>
            </div>

            {/* Month ruler */}
            <div className="grid mb-2" style={{ gridTemplateColumns: `repeat(${TOTAL_MONTHS}, 1fr)` }}>
              {Array.from({ length: TOTAL_MONTHS }).map((_, i) => (
                <span key={i} data-month className="font-mono text-[10px] tabular-nums border-l pl-1.5 pb-1" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-hair)' }}>
                  {i + 1}
                </span>
              ))}
            </div>
            {/* Bar */}
            <div className="relative flex h-14 sm:h-16 rounded-md overflow-hidden" style={{ background: 'var(--bg-tertiary)', boxShadow: 'inset 0 0 0 1px var(--border-hair)' }}>
              {deliverables.map((d, i) => (
                <div key={d.id} className="relative h-full" style={{ width: `${(d.months / TOTAL_MONTHS) * 100}%` }}>
                  <div
                    data-seg
                    className="absolute inset-0 origin-left"
                    style={{ background: `linear-gradient(180deg, ${SEG[i]}, color-mix(in srgb, ${SEG[i]} 70%, black))`, boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.4)' }}
                  >
                    <span className="absolute inset-x-[8%] top-2 h-px" style={{ background: 'linear-gradient(90deg, transparent, #f0cd8a, transparent)', opacity: 0.6 }} />
                    <span className="absolute inset-x-[8%] bottom-2 h-px" style={{ background: 'linear-gradient(90deg, transparent, #f0cd8a, transparent)', opacity: 0.6 }} />
                  </div>
                  <span data-seg-label className="absolute inset-0 flex items-center justify-center gap-2 px-2 text-center font-serif text-[11px] sm:text-sm gilt-text whitespace-nowrap overflow-hidden">
                    <span className="hidden sm:inline">Vol. {VOLS[i]} ·</span> {d.title} · {d.months} mo
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>Each bar is that deliverable&apos;s share of the engagement.</p>
          </div>

          {/* ── The trilogy: stacking volumes ── */}
          <div className="space-y-10 lg:space-y-[12vh]">
            {deliverables.map((project, index) => {
              offset += project.months
              return (
                <div
                  key={project.id}
                  data-fl-card
                  className="lg:sticky"
                  style={{ top: `calc(6.5rem + ${index * 1.75}rem)` }}
                >
                  <article
                    data-fl-inner
                    className="relative grid grid-cols-1 md:grid-cols-2 rounded-[6px] origin-top will-change-transform"
                    style={{ boxShadow: `0 0 0 8px ${SEG[index]}, 0 0 0 9px rgba(0,0,0,0.4), 0 -20px 60px -20px rgba(0,0,0,0.7)` }}
                  >
                    <span data-fl-dim aria-hidden className="absolute inset-0 z-20 rounded-[6px] pointer-events-none" style={{ background: '#000', opacity: 0 }} />
                    {/* Left page: the mounted plate */}
                    <div className="paper-plain relative p-6 sm:p-10 flex items-center justify-center rounded-l-[6px] md:rounded-r-none rounded-r-[6px] md:min-h-[460px]">
                      <div className="page-gutter page-gutter--right hidden md:block" />
                      <div className="relative w-full aspect-[4/3] bg-[#fffaf0] p-2.5 sm:p-3 rotate-[-1.5deg]" style={{ boxShadow: '0 14px 30px -12px rgba(60,35,10,0.6)' }}>
                        <div className="relative w-full h-full overflow-hidden">
                          <Image
                            data-fl-img
                            src={project.images[1] || project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 45vw"
                          />
                        </div>
                        {/* Photo corners */}
                        {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos) => (
                          <span key={pos} aria-hidden className={`absolute ${pos} w-5 h-5`} style={{ background: '#2a1d12', clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                        ))}
                      </div>
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 serif-italic text-xs opacity-60" style={{ color: 'var(--paper-ink)' }}>
                        Plate {VOLS[index]}
                      </span>
                    </div>

                    {/* Right page: the text */}
                    <div className="paper relative p-7 sm:p-10 flex flex-col rounded-r-[6px] md:rounded-l-none rounded-l-[6px]" style={{ color: 'var(--paper-ink)' }}>
                      <div className="page-gutter hidden md:block" />
                      <div className="flex items-center justify-between mb-6 font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
                        <span>Vol. {VOLS[index]} · {project.category}</span>
                        <span>Months {offset - project.months + 1}–{offset}</span>
                      </div>
                      <p className="serif-italic text-lg mb-1 opacity-70">{project.client}</p>
                      <h3 className="font-serif font-semibold leading-none mb-5" style={{ fontSize: 'clamp(2.2rem, 3.6vw, 3.2rem)' }}>
                        {project.title}
                      </h3>
                      <p className="text-[15px] sm:text-base leading-relaxed mb-6" style={{ color: '#4a3826' }}>
                        {project.description}
                      </p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mb-8">
                        {project.technologies.map((tech) => (
                          <li key={tech} className="font-mono text-[11px] uppercase tracking-wider" style={{ color: '#6a4c28' }}>
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center gap-2 mt-auto">
                        {project.images.length > 1 && (
                          <button
                            onClick={() => openModal(project)}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors touch-target"
                            style={{ border: '1px solid rgba(42,29,18,0.35)', color: '#2a1d12' }}
                          >
                            <Eye size={14} /> View the plates
                          </button>
                        )}
                        {project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full touch-target"
                            style={{ background: '#2a1d12', color: '#f5ead6' }}
                          >
                            <ExternalLink size={14} /> Live
                          </a>
                        )}
                        <span className="ml-auto font-serif text-sm opacity-60">— {index + 1} —</span>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>

          {/* CTA: wax seal */}
          <div data-fl-cta className="text-center mt-24">
            <p className="serif-italic text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>Have a story that needs writing?</p>
            <a href="#contact" className="group inline-flex items-center gap-4">
              <span
                data-wax-cta
                className="w-16 h-16 flex items-center justify-center font-serif text-2xl font-bold transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110"
                style={{ background: WAX, borderRadius: WAX_EDGE, color: 'rgba(255,205,185,0.7)', boxShadow: '0 6px 16px rgba(0,0,0,0.5), inset 0 -3px 6px rgba(0,0,0,0.35)' }}
              >
                M
              </span>
              <span className="font-serif text-xl sm:text-2xl border-b pb-1 transition-colors" style={{ color: 'var(--text-primary)', borderColor: 'var(--accent-primary)' }}>
                Commission the next volume
              </span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent-primary)' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel modal (reuses AnimatedModal for overlay / Escape / body-lock) */}
      <AnimatedModal isOpen={isModalOpen} onClose={closeModal} className="max-w-5xl">
        {selectedProject && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
            <div className="relative h-[50vh] sm:h-[65vh]" style={{ background: 'var(--bg-tertiary)' }}>
              <Image src={selectedProject.images[currentImageIndex] || selectedProject.image} alt={selectedProject.title} fill className="object-contain" priority sizes="100vw" />
              {selectedProject.images.length > 1 && (
                <>
                  <button onClick={goToPrevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 glass rounded-full touch-target z-10" style={{ color: 'var(--text-primary)' }} aria-label="Previous image"><ChevronLeft size={22} /></button>
                  <button onClick={goToNextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 glass rounded-full touch-target z-10" style={{ color: 'var(--text-primary)' }} aria-label="Next image"><ChevronRight size={22} /></button>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full z-10">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{currentImageIndex + 1} / {selectedProject.images.length}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto pb-1 z-10 no-scrollbar">
                    {selectedProject.images.map((image, i) => (
                      <button key={i} onClick={() => setCurrentImageIndex(i)} className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden touch-target" style={{ border: i === currentImageIndex ? '2px solid var(--accent-primary)' : '2px solid rgba(255,255,255,0.25)' }} aria-label={`View image ${i + 1}`} aria-current={i === currentImageIndex ? 'true' : undefined}>
                        <Image src={image} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="56px" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="p-5 text-center">
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{selectedProject.client} &bull; {selectedProject.duration}</p>
            </div>
          </div>
        )}
      </AnimatedModal>
    </section>
  )
}
