'use client'

import { useEffect, useRef } from 'react'
import { useLenis } from '@/providers/SmoothScrollProvider'

type Mote = { x: number; y: number; z: number; vx: number; vy: number; r: number; phase: number }
type Pt = { x: number; y: number; t: number }

/**
 * Candle-lit air: golden dust motes drift through the whole page on one canvas. They lean toward
 * the cursor, swirl around it, and stream with scroll speed (nearer motes move more, for depth).
 * On fine pointers, the cursor also leaves a short trail of gilt ink that fades as it dries.
 * One requestAnimationFrame loop, paused while the tab is hidden; nothing renders under reduced motion.
 */
export default function Atmosphere() {
  const ref = useRef<HTMLCanvasElement>(null)
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let motes: Mote[] = []

    // Pre-rendered glow sprite: drawImage is far cheaper than shadowBlur per particle
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 32
    const sctx = sprite.getContext('2d')!
    const grad = sctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    grad.addColorStop(0, 'rgba(255,226,170,1)')
    grad.addColorStop(0.25, 'rgba(240,196,120,0.55)')
    grad.addColorStop(1, 'rgba(240,196,120,0)')
    sctx.fillStyle = grad
    sctx.fillRect(0, 0, 32, 32)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, (w * h) / 16000))
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.15,
        r: 3 + Math.random() * 7,
        phase: Math.random() * Math.PI * 2,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: -9999, y: -9999, active: false }
    const trail: Pt[] = []
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true
      if (fine) trail.push({ x: e.clientX, y: e.clientY, t: performance.now() })
    }
    const onLeave = () => { mouse.active = false }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    let raf = 0
    let last = performance.now()
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(48, now - last) / 16.67
      last = now
      ctx.clearRect(0, 0, w, h)

      const light = document.documentElement.dataset.theme === 'light'
      const vel = lenisRef.current?.velocity ?? 0

      // ── Dust ──
      ctx.globalCompositeOperation = light ? 'source-over' : 'lighter'
      for (const m of motes) {
        // Cursor: soft pull plus a gentle swirl
        if (mouse.active) {
          const dx = mouse.x - m.x
          const dy = mouse.y - m.y
          const d2 = dx * dx + dy * dy
          if (d2 < 200 * 200) {
            const d = Math.sqrt(d2) || 1
            const f = (1 - d / 200) * 0.06 * m.z
            m.vx += (dx / d) * f * 0.4 - (dy / d) * f
            m.vy += (dy / d) * f * 0.4 + (dx / d) * f
          }
        }
        m.vx *= 0.97
        m.vy = m.vy * 0.97 + (-0.08 * m.z) * 0.03
        m.x += (m.vx + Math.sin(now * 0.0004 + m.phase) * 0.08) * dt
        m.y += (m.vy - vel * 0.35 * m.z) * dt
        if (m.y < -20) { m.y = h + 20; m.x = Math.random() * w }
        if (m.y > h + 20) { m.y = -20; m.x = Math.random() * w }
        if (m.x < -20) m.x = w + 20
        if (m.x > w + 20) m.x = -20
        const tw = 0.55 + 0.45 * Math.sin(now * 0.0015 + m.phase * 3)
        ctx.globalAlpha = (light ? 0.18 : 0.42) * tw * m.z
        const s = m.r * m.z
        ctx.drawImage(sprite, m.x - s, m.y - s, s * 2, s * 2)
      }

      // ── Gilt ink trail ──
      ctx.globalCompositeOperation = 'source-over'
      while (trail.length && now - trail[0].t > 520) trail.shift()
      if (trail.length > 2) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1]
          const b = trail[i]
          const life = 1 - (now - b.t) / 520
          ctx.globalAlpha = Math.max(0, life) * (light ? 0.5 : 0.7)
          ctx.strokeStyle = light ? '#6b4520' : '#e2b468'
          ctx.lineWidth = 0.6 + life * 2.4
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }

    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) } }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    start()

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="fixed inset-0 z-[45] pointer-events-none" />
}
