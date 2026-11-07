'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import ProjectDetailModal, { Project } from './ProjectDetailModal'
import { projects } from '@/data/projects'
import SectionHeading from './scroll/SectionHeading'
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap'


/** Shown as large case-study rows; everything else lives in the index list. */
const FEATURED_IDS = [1, 2]
const CATEGORIES = ['All', 'Full-Stack', 'Mobile', 'Frontend'] as const

const hasLink = (url?: string) => Boolean(url && url !== '#')

/** Library call-number prefixes for the card catalogue. */
const CALL: Record<string, string> = { 'Full-Stack': 'FS', Mobile: 'MB', Frontend: 'FE' }

/**
 * Chapter 06. Featured work as alternating case-study rows (image wipes open, drifts with
 * the scroll), then a filterable index — on desktop, hovering a row floats its preview
 * image after the cursor.
 */
export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const [hovered, setHovered] = useState<Project | null>(null)

  const openProjectModal = useCallback((project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  const closeProjectModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }, [])

  const featured = useMemo(() => projects.filter((p) => FEATURED_IDS.includes(p.id)), [])
  const rest = useMemo(() => {
    const others = projects.filter((p) => !FEATURED_IDS.includes(p.id))
    return activeCategory === 'All' ? others : others.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  // Featured rows: image frame wipes open on enter, image drifts inside it (scrub), copy rises.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      gsap.utils.toArray<HTMLElement>('[data-feat]').forEach((row) => {
        const frame = row.querySelector('[data-feat-frame]')
        const img = row.querySelector('[data-feat-img]')
        // Calm entrance: the frame fades up into place once, no 3D
        gsap.from(frame, {
          y: 60, opacity: 0, scale: 0.96, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
        gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
          yPercent: 5, scale: 1.04, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.from(row.querySelectorAll('[data-feat-copy] > *'), {
          y: 40, opacity: 0, duration: 1, stagger: 0.08,
          scrollTrigger: { trigger: row, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
      })
    })
  }, { scope: ref })

  // Index rows: re-created on filter change so new rows get their own reveal.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-idx-row]')
      gsap.set(rows, { opacity: 0, y: 30 })
      // Cards rise out of the drawer, tipping up from flat, one after another
      gsap.set(rows, { y: 90, rotationX: -55, transformOrigin: '50% 100%' })
      ScrollTrigger.batch(rows, {
        start: 'top 96%',
        onEnter: (batch) => {
          gsap.to(batch, { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.08, ease: 'back.out(1.4)', overwrite: true })
        },
      })
    })
  }, { scope: ref, dependencies: [activeCategory], revertOnUpdate: true })

  // Floating preview that trails the cursor over the index (desktop pointer only).
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.pointerMotion, () => {
      const preview = previewRef.current!
      const list = ref.current!.querySelector<HTMLElement>('[data-idx-list]')!
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' })
      const rTo = gsap.quickTo(preview, 'rotation', { duration: 0.8, ease: 'power3' })
      let lastX = 0
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX); yTo(e.clientY)
        rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6))
        lastX = e.clientX
      }
      const show = () => gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'expo.out' })
      const hide = () => gsap.to(preview, { autoAlpha: 0, scale: 0.6, duration: 0.35, ease: 'power3.in' })
      list.addEventListener('pointermove', onMove)
      list.addEventListener('pointerenter', show)
      list.addEventListener('pointerleave', hide)
      return () => {
        list.removeEventListener('pointermove', onMove)
        list.removeEventListener('pointerenter', show)
        list.removeEventListener('pointerleave', hide)
      }
    })
  }, { scope: ref })

  return (
    <section id="projects" ref={ref} className="section relative">
      <div className="container-content">
        <SectionHeading index="06" eyebrow="Selected work" title="Featured" accent="Projects" intro="The chapters I'm proudest of: real products, shipped and in use." />

        {/* ── Featured case studies ── */}
        <div className="space-y-24 sm:space-y-32 mb-28 sm:mb-36">
          {featured.map((project, i) => {
            const flip = i % 2 === 1
            return (
              <article key={project.id} data-feat className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <button
                  type="button"
                  data-feat-frame
                  data-cursor="Open"
                  onClick={() => openProjectModal(project)}
                  className={`group relative block w-full aspect-[16/10] overflow-hidden rounded-3xl lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
                  style={{ background: 'var(--bg-tertiary)' }}
                  aria-label={`Open ${project.title} details`}
                >
                  <Image
                    data-feat-img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  {/* Palette duotone: tints the screenshot to the accent hue; lifts on hover/focus */}
                  <span
                    aria-hidden
                    className="absolute inset-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-0 group-focus-visible:opacity-0"
                    style={{ background: 'var(--accent-primary)' }}
                  />
                </button>

                <div data-feat-copy className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-sm tabular-nums" style={{ color: 'var(--accent-primary)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-10" style={{ background: 'var(--card-border)' }} />
                    <span className="eyebrow">{project.category}</span>
                  </div>
                  <h3 className="heading-display mb-5" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-3">
                    {hasLink(project.liveUrl) && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:-translate-y-0.5"
                        style={{ background: 'var(--accent-gradient)' }}
                      >
                        Visit live <ArrowUpRight size={15} />
                      </a>
                    )}
                    {hasLink(project.githubUrl) && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                        style={{ border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                      >
                        <Github size={15} /> Code
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => openProjectModal(project)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                      style={{ border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ── The card catalogue ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-3" style={{ color: 'var(--accent-primary)' }}>More work</p>
            <h3 className="heading-display text-3xl sm:text-5xl" style={{ color: 'var(--text-primary)' }}>
              The Card <span className="serif-italic text-gradient">Catalogue</span>{' '}
              <span className="font-mono text-base align-top" style={{ color: 'var(--text-muted)' }}>({String(rest.length).padStart(2, '0')})</span>
            </h3>
          </div>
          {/* Drawer tabs */}
          <div role="group" aria-label="Filter projects" className="flex flex-wrap items-end gap-1.5 self-start sm:self-end">
            {CATEGORIES.map((category) => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={active}
                  className="relative px-3 sm:px-4 pt-2 pb-2.5 rounded-t-lg font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all duration-300"
                  style={active
                    ? { background: 'var(--paper)', color: 'var(--paper-ink)', transform: 'translateY(-4px)', boxShadow: '0 -6px 14px -6px rgba(0,0,0,0.6)' }
                    : { background: 'color-mix(in srgb, var(--paper) 14%, transparent)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)', borderBottom: 'none' }}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative">
          <ul data-idx-list className="relative space-y-[-6px] px-1 sm:px-4 pb-10" style={{ perspective: '1600px' }}>
            {rest.map((project, i) => (
              <li key={project.id} data-idx-row className="relative" style={{ zIndex: i + 1 }}>
                <div
                  role="button"
                  tabIndex={0}
                  data-cursor="View"
                  onClick={() => openProjectModal(project)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal(project) } }}
                  onPointerEnter={() => setHovered(project)}
                  aria-label={`Open ${project.title} details`}
                  className="group paper relative block rounded-[4px] cursor-pointer outline-none transition-[translate,rotate,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-4 hover:rotate-[-0.6deg] focus-visible:-translate-y-4"
                  style={{ boxShadow: '0 -1px 0 rgba(90,60,25,0.15), 0 10px 22px -12px rgba(0,0,0,0.75)', color: 'var(--paper-ink)' }}
                >
                  {/* Red header rule, like a real index card */}
                  <span aria-hidden className="hidden lg:block absolute inset-x-0 top-[38px] h-px" style={{ background: 'rgba(170,40,30,0.45)' }} />
                  <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1.7fr_1fr_8rem_auto] items-center gap-4 lg:gap-6 px-4 sm:px-6 pt-3 pb-5">
                    {/* Call number */}
                    <span className="hidden lg:block absolute left-6 top-3 font-mono text-[11px] tracking-[0.12em] opacity-70">
                      {CALL[project.category] ?? 'MS'}·{String(project.id).padStart(3, '0')}
                    </span>
                    {/* Mobile thumbnail */}
                    <span className="lg:hidden relative w-14 h-14 overflow-hidden bg-white p-1 rotate-[-2deg]" style={{ boxShadow: '0 4px 10px -4px rgba(60,35,10,0.6)' }}>
                      <span className="relative block w-full h-full overflow-hidden">
                        <Image src={project.image} alt="" fill className="object-cover sepia-[0.3]" sizes="56px" />
                      </span>
                    </span>
                    <span className="min-w-0 lg:pt-6">
                      <span className="lg:hidden block font-mono text-[10px] tracking-[0.12em] opacity-60 mb-1">
                        {CALL[project.category] ?? 'MS'}·{String(project.id).padStart(3, '0')}
                      </span>
                      <span
                        className="block font-serif font-semibold leading-tight transition-transform duration-500 group-hover:translate-x-2"
                        style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2.2rem)' }}
                      >
                        {project.title}
                      </span>
                      <span className="block serif-italic text-sm opacity-70 mt-1 truncate">{project.description}</span>
                    </span>
                    <span className="hidden lg:block font-mono text-xs opacity-70 truncate lg:pt-6">
                      {project.technologies.slice(0, 3).join(' · ')}
                    </span>
                    {/* Rubber stamp */}
                    <span className="hidden lg:flex justify-center lg:pt-6">
                      <span
                        className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] rotate-[-7deg] transition-transform duration-500 group-hover:rotate-[-2deg] group-hover:scale-110"
                        style={{ color: '#a3291f', border: '2px solid rgba(163,41,31,0.75)', borderRadius: 3, opacity: 0.85, mixBlendMode: 'multiply' }}
                      >
                        {project.category}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 lg:pt-6">
                      {hasLink(project.githubUrl) && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(42,29,18,0.08)]"
                          style={{ border: '1px solid rgba(42,29,18,0.3)' }}
                          aria-label={`${project.title} source code on GitHub`}
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {hasLink(project.liveUrl) && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(42,29,18,0.08)]"
                          style={{ border: '1px solid rgba(42,29,18,0.3)' }}
                          aria-label={`${project.title} live site`}
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45"
                        style={{ background: '#2a1d12', color: '#f5ead6' }}
                      >
                        <ArrowUpRight size={16} />
                      </span>
                    </span>
                  </div>
                  {/* Punch hole */}
                  <span aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-3 h-3 rounded-full" style={{ background: 'var(--bg-primary)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' }} />
                </div>
              </li>
            ))}
          </ul>

          {/* Drawer front: the cards stand inside it */}
          <div
            aria-hidden
            className="relative -mt-14 z-[30] h-24 sm:h-28 rounded-[6px] flex items-center justify-center gap-6 sm:gap-10"
            style={{ background: 'linear-gradient(180deg, #5a3a20, #3a2412 70%, #2a190c)', boxShadow: 'inset 0 2px 0 rgba(255,220,160,0.15), 0 30px 50px -20px rgba(0,0,0,0.9)' }}
          >
            {/* Brass label holder */}
            <span className="px-5 py-2 rounded-sm font-serif serif-italic text-sm sm:text-base" style={{ background: 'linear-gradient(180deg, #f0cd8a, #a87a3a)', color: '#2a1a0c', boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(90,55,20,0.35)' }}>
              Projects · A–Z
            </span>
            {/* Pull handle */}
            <span className="w-20 sm:w-28 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #f0cd8a, #8a5c28)', boxShadow: '0 4px 6px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </div>

      {/* Cursor-following preview (desktop): a photo clipped to the card */}
      <div
        ref={previewRef}
        aria-hidden
        className="invisible fixed left-0 top-0 z-40 pointer-events-none -ml-[150px] -mt-[110px] w-[300px] h-[220px] p-2.5 pb-8 bg-[#fffaf0] scale-50"
        style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7)' }}
      >
        <span className="relative block w-full h-full overflow-hidden" style={{ background: 'var(--paper-2)' }}>
          {hovered && <Image key={hovered.id} src={hovered.image} alt="" fill className="object-cover object-top sepia-[0.25]" sizes="300px" />}
        </span>
        {hovered && <span className="absolute bottom-1.5 inset-x-0 text-center font-hand text-lg" style={{ color: '#22314f' }}>{hovered.title}</span>}
        {/* Paper clip */}
        <svg viewBox="0 0 24 60" className="absolute -top-5 left-6 w-5 h-12" aria-hidden>
          <path d="M8 40 V12 a6 6 0 0 1 12 0 V46 a9 9 0 0 1 -18 0 V18" fill="none" stroke="#b8b0a0" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
    </section>
  )
}
