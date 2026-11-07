'use client'

import { forwardRef, useId, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface HourglassProps {
  className?: string
  style?: CSSProperties
  /** Starting fill (0 = all sand on top, 1 = all sand at the bottom). Animate `--p` with GSAP. */
  progress?: number
  /** Hide the falling grain stream (e.g. when fully drained). */
  still?: boolean
}

/**
 * Brass-and-glass hourglass. The sand levels are pure CSS, driven by the `--p` custom
 * property on the <svg>, so any GSAP tween / ScrollTrigger can drain it:
 *   gsap.to(el, { '--p': 1, scrollTrigger: { scrub: true } })
 */
const Hourglass = forwardRef<SVGSVGElement, HourglassProps>(function Hourglass({ className, style, progress = 0, still = false }, ref) {
  const id = useId().replace(/:/g, '')
  const top = `hg-top-${id}`
  const bottom = `hg-bot-${id}`
  const glass = `hg-glass-${id}`
  const brass = `hg-brass-${id}`
  const sand = `hg-sand-${id}`

  return (
    <svg
      ref={ref}
      viewBox="0 0 60 100"
      className={cn('hourglass', className)}
      style={{ ['--p' as string]: progress, ...style }}
      aria-hidden
    >
      <defs>
        <linearGradient id={brass} x1="0" x2="1">
          <stop offset="0" stopColor="#7a5224" />
          <stop offset="0.45" stopColor="#f0cd8a" />
          <stop offset="1" stopColor="#8a5c28" />
        </linearGradient>
        <linearGradient id={glass} x1="0" x2="1">
          <stop offset="0" stopColor="rgba(255,240,210,0.05)" />
          <stop offset="0.3" stopColor="rgba(255,240,210,0.22)" />
          <stop offset="1" stopColor="rgba(255,240,210,0.04)" />
        </linearGradient>
        <linearGradient id={sand} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f2c97e" />
          <stop offset="1" stopColor="#c48a3e" />
        </linearGradient>
        {/* Bulb interiors: sand is clipped to these */}
        <clipPath id={top}>
          <path d="M12 12 H48 C48 30 34 40 31.2 48.5 H28.8 C26 40 12 30 12 12 Z" />
        </clipPath>
        <clipPath id={bottom}>
          <path d="M28.8 51.5 H31.2 C34 60 48 70 48 88 H12 C12 70 26 60 28.8 51.5 Z" />
        </clipPath>
      </defs>

      {/* Sand */}
      <g clipPath={`url(#${top})`}>
        <rect className="sand-top" x="10" y="18" width="40" height="34" fill={`url(#${sand})`} />
      </g>
      <g clipPath={`url(#${bottom})`}>
        <path className="sand-bottom" d="M10 66 Q30 58 50 66 V92 H10 Z" fill={`url(#${sand})`} />
      </g>
      {!still && (
        <line className="sand-stream" x1="30" y1="48" x2="30" y2="86" stroke="#f2c97e" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
      )}

      {/* Glass */}
      <path
        d="M12 10 H48 C48 30 34 41 32 50 C34 59 48 70 48 90 H12 C12 70 26 59 28 50 C26 41 12 30 12 10 Z"
        fill={`url(#${glass})`}
        stroke="rgba(255,236,200,0.45)"
        strokeWidth="0.8"
      />
      <path d="M16 16 C17 26 22 33 25 38" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Brass frame */}
      <rect x="4" y="3" width="52" height="7" rx="2" fill={`url(#${brass})`} />
      <rect x="4" y="90" width="52" height="7" rx="2" fill={`url(#${brass})`} />
      <rect x="7" y="10" width="2.6" height="80" rx="1.2" fill={`url(#${brass})`} />
      <rect x="50.4" y="10" width="2.6" height="80" rx="1.2" fill={`url(#${brass})`} />
    </svg>
  )
})

export default Hourglass
