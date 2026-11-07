'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Award } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap'

export interface Credential {
  title: string
  issuer: string
  date: string
  image: string
  certificateImage?: string
  description?: string
}

type Filter = 'all' | 'certification' | 'course'
type Item = Credential & { type: 'certification' | 'course' }

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'certification', label: 'Certifications' },
  { value: 'course', label: 'Courses' },
]

const yearOf = (date: string) => date.trim().slice(-4)

/**
 * Credentials ledger: a sticky summary (counts, issuers, filter) beside a year-grouped list.
 * Rows draw their hairline and slide in as they enter; a row with a certificate opens it.
 */
export default function Credentials({
  certifications,
  courses,
  onOpen,
}: {
  certifications: Credential[]
  courses: Credential[]
  onOpen: (image: string, title: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('all')

  const all = useMemo<Item[]>(() => [
    ...certifications.map((c) => ({ ...c, type: 'certification' as const })),
    ...courses.map((c) => ({ ...c, type: 'course' as const })),
  ], [certifications, courses])

  const issuers = useMemo(() => {
    const map = new Map<string, string>()
    all.forEach((i) => { if (!map.has(i.issuer)) map.set(i.issuer, i.image) })
    return Array.from(map, ([name, image]) => ({ name, image }))
  }, [all])

  // Group the filtered list by year, newest first (stable order within a year).
  const years = useMemo(() => {
    const items = filter === 'all' ? all : all.filter((i) => i.type === filter)
    const map = new Map<string, Item[]>()
    items.forEach((i) => {
      const y = yearOf(i.date)
      if (!map.has(y)) map.set(y, [])
      map.get(y)!.push(i)
    })
    return Array.from(map, ([year, list]) => ({ year, list })).sort((a, b) => Number(b.year) - Number(a.year))
  }, [all, filter])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-cred-row]')
      gsap.set(rows, { opacity: 0, x: 40 })
      gsap.set('[data-cred-line]', { scaleX: 0 })
      ScrollTrigger.batch(rows, {
        start: 'top 92%',
        onEnter: (batch) => {
          gsap.to(batch, { opacity: 1, x: 0, duration: 0.9, stagger: 0.06, overwrite: true })
          gsap.to(batch.map((r) => r.querySelector('[data-cred-line]')), { scaleX: 1, duration: 1.2, stagger: 0.06, ease: 'expo.inOut' })
        },
      })
      gsap.utils.toArray<HTMLElement>('[data-cred-year]').forEach((el) => {
        gsap.from(el, {
          yPercent: 60, opacity: 0, duration: 1,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.from('[data-cred-panel] > *', {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.08,
        scrollTrigger: { trigger: '[data-cred-panel]', start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    })
  }, { scope: ref, dependencies: [filter], revertOnUpdate: true })

  const counts = {
    certification: certifications.length,
    course: courses.length,
    issuers: issuers.length,
  }

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* Summary panel */}
      <aside className="lg:col-span-4">
        <div data-cred-panel className="lg:sticky lg:top-28">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
              <Award size={16} />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Credentials</h3>
          </div>

          <dl className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden mb-8" style={{ background: 'var(--card-border)' }}>
            {[
              { label: 'Certs', value: counts.certification },
              { label: 'Courses', value: counts.course },
              { label: 'Issuers', value: counts.issuers },
            ].map((s) => (
              <div key={s.label} className="p-4" style={{ background: 'var(--bg-secondary)' }}>
                <dd className="heading-display text-3xl tabular-nums" style={{ color: 'var(--text-primary)' }}>{String(s.value).padStart(2, '0')}</dd>
                <dt className="eyebrow mt-1">{s.label}</dt>
              </div>
            ))}
          </dl>

          {/* Filter: segmented control */}
          <div role="group" aria-label="Filter credentials" className="inline-flex p-1 rounded-full mb-8" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
            {FILTERS.map((f) => {
              const active = filter === f.value
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  aria-pressed={active}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={active ? { background: 'var(--accent-gradient)' } : { color: 'var(--text-secondary)' }}
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          {/* Issuer strip */}
          <p className="eyebrow mb-3">Issued by</p>
          <ul className="flex flex-wrap gap-2">
            {issuers.map((i) => (
              <li key={i.name} title={i.name} className="w-10 h-10 rounded-full overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
                <Image src={i.image} alt={i.name} width={40} height={40} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-300" />
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Ledger */}
      <div className="lg:col-span-8 space-y-14">
        {years.map(({ year, list }) => (
          <section key={year} aria-label={`${year} credentials`}>
            <div className="overflow-hidden mb-2">
              <h4
                data-cred-year
                className="heading-display leading-none tabular-nums"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'transparent', WebkitTextStroke: '1px var(--text-muted)' }}
              >
                {year}
              </h4>
            </div>

            <ul>
              {list.map((item) => {
                const viewable = Boolean(item.certificateImage)
                const Row = viewable ? 'button' : 'div'
                return (
                  <li key={item.title} data-cred-row className="relative">
                    <span data-cred-line className="absolute left-0 right-0 bottom-0 h-px origin-left" style={{ background: 'var(--card-border)' }} />
                    <Row
                      {...(viewable
                        ? { type: 'button' as const, onClick: () => onOpen(item.certificateImage!, item.title), 'aria-label': `View certificate: ${item.title}`, 'data-cursor': 'View' }
                        : {})}
                      className="group w-full text-left grid grid-cols-[auto_1fr_auto] sm:grid-cols-[4.5rem_auto_1fr_auto] items-center gap-4 py-5 px-2 -mx-2 rounded-xl transition-colors hover:bg-[color:var(--glass-bg)]"
                    >
                      <span className="hidden sm:block font-mono text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
                        {item.date.length > 4 ? item.date.replace(/\s*\d{4}$/, '') : '—'}
                      </span>
                      <Image src={item.image} alt="" width={40} height={40} className="w-10 h-10 rounded-lg object-cover" style={{ border: '1px solid var(--card-border)' }} loading="lazy" />
                      <span className="min-w-0">
                        <span className="block font-display text-base sm:text-lg font-semibold leading-snug transition-transform duration-500 group-hover:translate-x-1.5" style={{ color: 'var(--text-primary)' }}>
                          {item.title}
                        </span>
                        <span className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                          {item.issuer}
                          <span className="w-1 h-1 rounded-full" style={{ background: item.type === 'certification' ? 'var(--accent-primary)' : 'var(--text-muted)' }} />
                          {item.type === 'certification' ? 'Certification' : 'Course'}
                        </span>
                      </span>
                      {viewable ? (
                        <span
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45"
                          style={{ border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
                        >
                          <ArrowUpRight size={16} />
                        </span>
                      ) : (
                        <span className="w-10" />
                      )}
                    </Row>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
