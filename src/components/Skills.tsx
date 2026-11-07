'use client'

import { useMemo, useRef, useState } from 'react'
import { BookOpen } from 'lucide-react'
import SectionHeading from './scroll/SectionHeading'
import Hourglass from './book/Hourglass'
import { projects } from '@/data/projects'
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap'
import { useLenis } from '@/providers/SmoothScrollProvider'
import { play } from '@/lib/sound'

const shelves = [
  { title: 'Frontend', numeral: 'I', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux'] },
  { title: 'Backend', numeral: 'II', skills: ['Node.js', 'Nest.js', 'Express.js', 'Python', 'REST APIs', 'GraphQL', 'Socket.io', 'Firebase'] },
  { title: 'Data, Cloud & AI', numeral: 'III', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Google Cloud', 'Docker', 'OpenAI API', 'Gemini API', 'CI/CD'] },
]

/** Leather bindings: [base, highlight] */
const BINDINGS = [
  ['#5c1f1a', '#8a3a2c'], // oxblood
  ['#1d3a2b', '#355e45'], // forest
  ['#1b2a45', '#344a70'], // navy
  ['#6b4320', '#946232'], // tan
  ['#2a2320', '#4a3d36'], // ebony
  ['#46284a', '#6a4170'], // plum
  ['#7a5626', '#a67a3a'], // ochre
  ['#3a1d14', '#5e3424'], // chestnut
]

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

/** Aliases so "Google Cloud" matches "GCP", "OpenAI API" matches "OpenAI", etc. */
const ALIASES: Record<string, string[]> = {
  googlecloud: ['gcp', 'googlecloud'],
  openaiapi: ['openai', 'openaiapi', 'aiapis'],
  geminiapi: ['gemini', 'geminiapi', 'aiapis'],
  restapis: ['restapis', 'restapi'],
  react: ['react', 'reactnative'],
}

type Book = { name: string; shelf: number; vol: number; w: number; h: number; binding: string[]; bands: number; usedIn: string[] }

function useLibrary(): Book[][] {
  return useMemo(() => shelves.map((shelf, si) => shelf.skills.map((name, vi) => {
    const n = hash(name)
    const keys = ALIASES[norm(name)] ?? [norm(name)]
    const usedIn = projects.filter((p) => p.technologies.some((t) => keys.includes(norm(t)))).map((p) => p.title)
    return {
      name,
      shelf: si,
      vol: vi + 1,
      w: 0.86 + ((n >> 3) % 7) * 0.06, // 0.86 – 1.22 × spine width
      h: 0.76 + ((n >> 6) % 9) * 0.03, // 76% – 100% of shelf height
      binding: BINDINGS[(n + si * 3) % BINDINGS.length],
      bands: 1 + ((n >> 9) % 3),
      usedIn,
    }
  })), [])
}

/**
 * Chapter II. The skills are a library: three shelves of leather-bound volumes. Books drop onto
 * their shelves when the case scrolls into view, sway with scroll velocity, slide forward on hover,
 * and pulling one out opens it on the reading stand with where Mayer has actually used it.
 */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const standRef = useRef<HTMLDivElement>(null)
  const library = useLibrary()
  const [selected, setSelected] = useState<Book>(library[0][1])
  const lenis = useLenis()

  // On phones the stand sits below the case: glide down so the opened book is seen.
  const choose = (book: Book) => {
    setSelected(book)
    play('thud')
    setTimeout(() => play('page', 0.7), 120)
    if (window.innerWidth < 1024 && standRef.current) {
      if (lenis) lenis.scrollTo(standRef.current, { offset: -90, duration: 1.1 })
      else standRef.current.scrollIntoView({ block: 'start' })
    }
  }

  // Books land on the shelves; the whole case sways with scroll speed
  useGSAP(() => {
    const mm = gsap.matchMedia()
    const q = gsap.utils.selector(sectionRef)

    mm.add(MQ.motion, () => {
      q('[data-shelf]').forEach((shelf) => {
        const books = shelf.querySelectorAll('[data-book-drop]')
        gsap.set(books, { yPercent: -160, opacity: 0, rotation: () => gsap.utils.random(-25, 25) })
        ScrollTrigger.create({
          trigger: shelf,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(books, { yPercent: 0, opacity: 1, rotation: 0, duration: 1.1, stagger: { each: 0.06, from: 'random' }, ease: 'bounce.out' })
          },
        })
        gsap.from(shelf.querySelector('[data-shelf-board]'), {
          scaleX: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: shelf, start: 'top 88%', once: true },
        })
      })

      // Velocity sway: books are hinged at the bottom; fast scrolling makes them lean.
      // Each spine gets its own quickTo on `rotation` (a transform, so compositor-only), rather than a
      // CSS variable on the section, which would restyle every element inside it on every frame.
      const section = sectionRef.current!
      const spines = q('[data-spine]')
      const tos = spines.map((el, i) => {
        const factor = 0.6 + (i % 3) * 0.25
        const to = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'elastic.out(1, 0.35)' })
        return (v: number) => to(v * factor)
      })
      let current = 0
      let settle: gsap.core.Tween | undefined
      const swayTo = (v: number) => {
        if (Math.abs(v - current) < 0.4) return
        current = v
        tos.forEach((t) => t(v))
      }
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          swayTo(Math.round(gsap.utils.clamp(-6, 6, self.getVelocity() / -250)))
          settle?.kill()
          settle = gsap.delayedCall(0.15, () => swayTo(0))
        },
      })

      // Hourglass bookend drains as you read the shelves
      gsap.fromTo(q('[data-shelf-hourglass] svg'), { '--p': 0 }, {
        '--p': 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 40%', scrub: true },
      })
    })
  }, { scope: sectionRef })

  // Opening a new book on the stand: the page turns in, the title inks on
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      gsap.timeline()
        .fromTo('[data-stand-page]', { rotationY: -110, opacity: 0.3 }, { rotationY: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
        .fromTo('[data-stand-title]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.25)
        .fromTo('[data-stand-line]', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 }, 0.4)
        .fromTo('[data-stand-ink]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.5)
    })
  }, { scope: standRef, dependencies: [selected.name] })

  const shelf = shelves[selected.shelf]

  return (
    <section id="skills" ref={sectionRef} className="section relative overflow-clip">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        <SectionHeading
          index="03"
          eyebrow="What I work with"
          title="The"
          accent="Library"
          intro="Every tool is a volume I keep coming back to. Pull one off the shelf."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── Bookcase ── */}
          <div className="lg:col-span-8">
            <div
              className="relative rounded-md p-3 sm:p-5 pb-2"
              style={{
                background: 'linear-gradient(180deg, #2a1a0f, #1c1109)',
                boxShadow: 'inset 0 0 0 1px rgba(226,180,104,0.15), 0 40px 80px -30px rgba(0,0,0,0.8)',
              }}
            >
              {/* Crown moulding */}
              <div className="absolute -top-3 -inset-x-2 h-4 rounded-sm" style={{ background: 'linear-gradient(180deg, #5a3a20, #3a2412)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} />

              {library.map((books, si) => (
                <div key={shelves[si].title} data-shelf className="relative pt-6 sm:pt-8">
                  {/* Back panel of this bay */}
                  <div className="absolute inset-x-0 top-0 bottom-3 rounded-sm" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(226,170,90,0.12), transparent 70%), #120b06', boxShadow: 'inset 0 12px 24px rgba(0,0,0,0.7)' }} />

                  {/* Brass label */}
                  <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-0.5 rounded-sm font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] whitespace-nowrap" style={{ background: 'linear-gradient(180deg, #e8c27c, #a87a3a)', color: '#2a1a0c', boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    Shelf {shelves[si].numeral} · {shelves[si].title}
                  </div>

                  {/* Books */}
                  <div
                    className="relative flex items-end gap-[3px] sm:gap-1 px-2 sm:px-4"
                    style={{ height: 'clamp(150px, 17vw, 236px)', ['--spine' as string]: 'clamp(24px, 4.3vw, 66px)' }}
                    role="group"
                    aria-label={`${shelves[si].title} shelf`}
                  >
                    {books.map((book) => (
                      <Spine key={book.name} book={book} active={selected.name === book.name} onSelect={() => choose(book)} />
                    ))}
                    {/* Bookend */}
                    {si === 0 ? (
                      <div data-shelf-hourglass className="ml-auto pl-3 self-end shrink-0">
                        <Hourglass className="w-8 sm:w-10 h-auto" />
                      </div>
                    ) : (
                      <div className="ml-auto self-end shrink-0 w-3 sm:w-4 rounded-t-sm" style={{ height: '46%', background: 'linear-gradient(90deg, #8a5c28, #f0cd8a, #8a5c28)' }} aria-hidden />
                    )}
                  </div>

                  {/* Shelf board */}
                  <div data-shelf-board className="relative h-3 sm:h-3.5 rounded-sm origin-left" style={{ background: 'linear-gradient(180deg, #7a5230, #4a2e18 60%, #2a190c)', boxShadow: '0 8px 14px -4px rgba(0,0,0,0.8)' }} />
                </div>
              ))}

              {/* Plinth */}
              <div className="mt-2 h-3 rounded-sm" style={{ background: 'linear-gradient(180deg, #4a2e18, #2a190c)' }} />
            </div>
            <p className="mt-4 eyebrow flex items-center gap-2">
              <BookOpen size={13} style={{ color: 'var(--accent-primary)' }} />
              {library.flat().length} volumes · tap a spine to read it
            </p>
          </div>

          {/* ── Reading stand ── */}
          <div className="lg:col-span-4 lg:self-stretch">
            <div ref={standRef} className="lg:sticky lg:top-28" style={{ perspective: '1400px' }} aria-live="polite">
              <article
                data-stand-page
                className="paper relative rounded-[4px] px-7 py-8 sm:px-8 sm:py-10 origin-left"
                style={{ boxShadow: '0 30px 60px -25px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(90,60,25,0.15)' }}
              >
                <div className="page-gutter" />
                {/* Ribbon bookmark */}
                <span aria-hidden className="absolute -top-1 right-8 w-4 h-16" style={{ background: selected.binding[1], clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)' }} />

                <p data-stand-line className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 pr-10">
                  Shelf {shelf.numeral} · {shelf.title} · Vol. {selected.vol} of {shelf.skills.length}
                </p>
                <h3 data-stand-title className="font-serif font-semibold leading-[0.95] mt-6 mb-3" style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)', color: 'var(--paper-ink)' }}>
                  {selected.name}
                </h3>
                <svg viewBox="0 0 200 16" className="w-32 mb-6" aria-hidden>
                  <path data-stand-ink pathLength={1} className="ink-stroke" d="M2 10 C 40 2, 70 14, 110 8 S 170 4, 198 9" fill="none" stroke="#7a4f22" strokeWidth="2" strokeLinecap="round" />
                </svg>

                {selected.usedIn.length > 0 ? (
                  <>
                    <p data-stand-line className="serif-italic text-lg leading-snug mb-4">
                      Bound into {selected.usedIn.length} {selected.usedIn.length === 1 ? 'project' : 'projects'} so far:
                    </p>
                    <ul className="space-y-2 mb-2">
                      {selected.usedIn.map((title, i) => (
                        <li data-stand-line key={title} className="flex items-baseline gap-3 font-serif text-base border-b pb-2" style={{ borderColor: 'var(--paper-line)' }}>
                          <span className="font-mono text-[10px] opacity-50 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                          <a href="#projects" className="hover:underline underline-offset-4">{title}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p data-stand-line className="serif-italic text-lg leading-snug">
                    Part of the everyday toolkit, the kind of volume that lives open on the desk.
                  </p>
                )}

                <div data-stand-line className="mt-8 flex items-center justify-between font-serif text-xs opacity-60">
                  <span className="serif-italic">From the library of Mayer Frieg</span>
                  <span className="tabular-nums">{selected.shelf + 1}.{selected.vol}</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Spine({ book, active, onSelect }: { book: Book; active: boolean; onSelect: () => void }) {
  const [base, hi] = book.binding
  return (
    <div data-book-drop className="relative shrink-0 self-end" style={{ height: `${book.h * 100}%`, width: `calc(var(--spine) * ${book.w})` }}>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        aria-label={`${book.name}, volume ${book.vol}`}
        data-cursor="Read"
        data-spine
        className="group absolute inset-0 rounded-t-[3px] rounded-b-[1px] origin-bottom transition-[translate,box-shadow,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 focus-visible:-translate-y-3 aria-pressed:-translate-y-5"
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,0.45) 0%, ${hi} 18%, ${base} 55%, rgba(0,0,0,0.5) 100%)`,
          boxShadow: active
            ? '0 0 0 1px rgba(240,205,138,0.8), 0 12px 30px -6px rgba(226,170,90,0.55)'
            : 'inset 0 0 0 1px rgba(0,0,0,0.3), 2px 0 4px rgba(0,0,0,0.4)',
        }}
      >
        {/* Gilt bands */}
        {Array.from({ length: book.bands }).map((_, i) => (
          <span key={`t${i}`} aria-hidden className="absolute inset-x-[10%] h-[2px]" style={{ top: `${6 + i * 4}%`, background: 'linear-gradient(90deg, #8a5c28, #f0cd8a, #8a5c28)', opacity: 0.85 }} />
        ))}
        {Array.from({ length: book.bands }).map((_, i) => (
          <span key={`b${i}`} aria-hidden className="absolute inset-x-[10%] h-[2px]" style={{ bottom: `${6 + i * 4}%`, background: 'linear-gradient(90deg, #8a5c28, #f0cd8a, #8a5c28)', opacity: 0.85 }} />
        ))}
        {/* Title, set along the spine */}
        <span
          className="absolute inset-x-0 top-[20%] bottom-[20%] flex items-center justify-center font-serif font-semibold whitespace-nowrap gilt-text"
          style={{ writingMode: 'vertical-rl', fontSize: 'clamp(10px, 1.15vw, 16px)', letterSpacing: '0.04em' }}
        >
          {book.name}
        </span>
        {/* Volume number */}
        <span aria-hidden className="absolute inset-x-0 bottom-[1.5%] text-center font-mono text-[7px] sm:text-[8px]" style={{ color: 'rgba(240,205,138,0.6)' }}>
          {book.vol}
        </span>
        {/* Sheen on hover */}
        <span aria-hidden className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(255,235,200,0.18) 50%, transparent 70%)' }} />
      </button>
    </div>
  )
}
