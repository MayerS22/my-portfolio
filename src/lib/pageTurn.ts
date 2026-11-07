'use client'

/**
 * turnTo('#skills'): navigate to a chapter. If the ink-wipe overlay is mounted (and motion is
 * allowed) it plays the page-turn; otherwise it falls back to a plain smooth scroll.
 */
type Handler = (href: string) => void
let handler: Handler | null = null

export function registerPageTurn(h: Handler | null) {
  handler = h
}

export function turnTo(href: string) {
  if (handler) return handler(href)
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export const CHAPTER_TITLES: Record<string, { numeral: string; title: string }> = {
  '#home': { numeral: 'Prologue', title: 'A Developer’s Journal' },
  '#about': { numeral: 'Chapter I', title: 'Dear Diary' },
  '#skills': { numeral: 'Chapter II', title: 'The Library' },
  '#experience': { numeral: 'Chapter III', title: 'The Journey' },
  '#freelance': { numeral: 'Chapter IV', title: 'A Commission' },
  '#projects': { numeral: 'Chapter V', title: 'Selected Work' },
  '#contact': { numeral: 'Epilogue', title: 'Write to Me' },
}

/** Deterministic wobbly circle: an ink blot outline in a -100..100 box. */
export function blobPath(seed = 0, points = 56) {
  const pts: [number, number][] = []
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2
    const r = 78 + Math.sin(a * 3 + seed) * 7 + Math.sin(a * 7 + seed * 2.1) * 4 + Math.sin(a * 13 + seed * 0.7) * 2.5
    pts.push([Math.cos(a) * r, Math.sin(a) * r])
  }
  // Smooth closed path through the points (Catmull-Rom → cubic Bézier)
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % points]
    const p3 = pts[(i + 2) % points]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d + 'Z'
}
