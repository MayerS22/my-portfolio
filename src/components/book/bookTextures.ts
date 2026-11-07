'use client'

/**
 * Canvas-drawn textures for the 3D journal. Everything is generated at runtime with the site's
 * own fonts (Fraunces / Caveat / Geist Mono), so there are no image assets to download.
 */
export const TEX_W = 1024
export const TEX_H = 1434

export const TAGLINE =
  'I build scalable web & mobile products with clean code, thoughtful interfaces, and systems that last. Every project is a new chapter.'

/** Ink text layout on the right page, shared with the reveal shader (in UV space, 0..1). */
export const INK = { left: 0.11, top: 0.2, lineH: 0.058, width: 0.78, lines: 0 }

const canvas = (w = TEX_W, h = TEX_H) => {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return [c, c.getContext('2d')!] as const
}

function speckle(ctx: CanvasRenderingContext2D, w: number, h: number, count: number, color: string, max = 2) {
  ctx.fillStyle = color
  for (let i = 0; i < count; i++) {
    ctx.globalAlpha = Math.random() * 0.25
    const r = Math.random() * max
    ctx.fillRect(Math.random() * w, Math.random() * h, r, r)
  }
  ctx.globalAlpha = 1
}

function vignette(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, strength = 0.35) {
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75)
  g.addColorStop(0, 'rgba(0,0,0,0)')
  g.addColorStop(1, color.replace('A', String(strength)))
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

const gilt = (ctx: CanvasRenderingContext2D, y0: number, y1: number) => {
  const g = ctx.createLinearGradient(0, y0, 0, y1)
  g.addColorStop(0, '#f6e7c8')
  g.addColorStop(0.5, '#e2b468')
  g.addColorStop(1, '#a8743a')
  return g
}

export function paper(lined: boolean) {
  const [c, ctx] = canvas()
  ctx.fillStyle = '#efe2c6'
  ctx.fillRect(0, 0, TEX_W, TEX_H)
  speckle(ctx, TEX_W, TEX_H, 9000, '#7a5a30', 1.6)
  if (lined) {
    ctx.strokeStyle = 'rgba(42,29,18,0.12)'
    ctx.lineWidth = 2
    for (let y = TEX_H * INK.top + TEX_H * INK.lineH * 0.82; y < TEX_H * 0.9; y += TEX_H * INK.lineH) {
      ctx.beginPath(); ctx.moveTo(TEX_W * 0.08, y); ctx.lineTo(TEX_W * 0.92, y); ctx.stroke()
    }
  }
  vignette(ctx, TEX_W, TEX_H, 'rgba(120,80,30,A)', 0.32)
  return c
}

/** Right-hand page: base paper (folio, label) — the ink text lives in a separate mask texture. */
export function rightPage() {
  const c = paper(true)
  const ctx = c.getContext('2d')!
  ctx.fillStyle = 'rgba(42,29,18,0.6)'
  ctx.font = '500 26px "Geist Mono", monospace'
  ctx.fillText('P R O L O G U E', TEX_W * INK.left, TEX_H * 0.12)
  ctx.font = 'italic 34px Fraunces, Georgia, serif'
  ctx.textAlign = 'right'
  ctx.fillText('i', TEX_W * 0.9, TEX_H * 0.94)
  // gutter shadow along the spine (left edge)
  const g = ctx.createLinearGradient(0, 0, TEX_W * 0.16, 0)
  g.addColorStop(0, 'rgba(90,60,25,0.4)')
  g.addColorStop(1, 'rgba(90,60,25,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, TEX_W * 0.16, TEX_H)
  return c
}

/** Ink layer for the right page: white = ink. Word-wrapped Caveat handwriting + signature. */
export function inkMask() {
  const [c, ctx] = canvas()
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, TEX_W, TEX_H)
  ctx.fillStyle = '#fff'
  const size = Math.round(TEX_H * INK.lineH * 0.78)
  ctx.font = `600 ${size}px Caveat, "Segoe Print", cursive`
  const maxW = TEX_W * INK.width
  const words = TAGLINE.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w } else line = test
  }
  if (line) lines.push(line)
  lines.push('')
  lines.push('— Mayer Frieg')
  lines.forEach((l, i) => {
    const y = TEX_H * (INK.top + INK.lineH * (i + 0.72))
    ctx.textAlign = i === lines.length - 1 ? 'right' : 'left'
    ctx.fillText(l, i === lines.length - 1 ? TEX_W * (INK.left + INK.width) : TEX_W * INK.left, y)
  })
  INK.lines = lines.length
  return c
}

export function leather() {
  const [c, ctx] = canvas()
  ctx.fillStyle = '#4a2c18'
  ctx.fillRect(0, 0, TEX_W, TEX_H)
  speckle(ctx, TEX_W, TEX_H, 26000, '#000', 3)
  speckle(ctx, TEX_W, TEX_H, 6000, '#c8925a', 2)
  const hl = ctx.createRadialGradient(TEX_W * 0.3, TEX_H * 0.2, 0, TEX_W * 0.3, TEX_H * 0.2, TEX_W)
  hl.addColorStop(0, 'rgba(255,220,160,0.14)')
  hl.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = hl
  ctx.fillRect(0, 0, TEX_W, TEX_H)
  vignette(ctx, TEX_W, TEX_H, 'rgba(0,0,0,A)', 0.5)
  return c
}

export function coverFront() {
  const c = leather()
  const ctx = c.getContext('2d')!
  // Gilt frame
  ctx.strokeStyle = gilt(ctx, 0, TEX_H)
  ctx.lineWidth = 5
  ctx.strokeRect(TEX_W * 0.08, TEX_H * 0.06, TEX_W * 0.84, TEX_H * 0.88)
  ctx.lineWidth = 2
  ctx.strokeRect(TEX_W * 0.1, TEX_H * 0.075, TEX_W * 0.8, TEX_H * 0.85)
  // Spine shading
  const sp = ctx.createLinearGradient(0, 0, TEX_W * 0.1, 0)
  sp.addColorStop(0, 'rgba(0,0,0,0.55)')
  sp.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = sp
  ctx.fillRect(0, 0, TEX_W * 0.1, TEX_H)
  // Clock emblem
  const cx = TEX_W / 2
  const cy = TEX_H * 0.27
  ctx.strokeStyle = gilt(ctx, cy - 70, cy + 70)
  ctx.lineWidth = 5
  ctx.beginPath(); ctx.arc(cx, cy, 64, 0, Math.PI * 2); ctx.stroke()
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2); ctx.stroke()
  ctx.lineWidth = 6; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - 38); ctx.moveTo(cx, cy); ctx.lineTo(cx + 26, cy + 14); ctx.stroke()
  // Title
  ctx.textAlign = 'center'
  ctx.fillStyle = gilt(ctx, TEX_H * 0.38, TEX_H * 0.62)
  ctx.font = '600 190px Fraunces, Georgia, serif'
  ctx.fillText('Mayer', cx, TEX_H * 0.5)
  ctx.font = 'italic 600 190px Fraunces, Georgia, serif'
  ctx.fillText('Frieg', cx, TEX_H * 0.62)
  ctx.fillRect(cx - 170, TEX_H * 0.69, 340, 3)
  ctx.font = '500 34px "Geist Mono", monospace'
  ctx.fillText('A  D E V E L O P E R ’ S  J O U R N A L', cx, TEX_H * 0.75)
  ctx.font = 'italic 52px Fraunces, Georgia, serif'
  ctx.fillText('Vol. I', cx, TEX_H * 0.83)
  return c
}

/** Endpaper on the inside of the cover: deep marbled pattern. */
export function endpaper() {
  const [c, ctx] = canvas()
  ctx.fillStyle = '#2a1a10'
  ctx.fillRect(0, 0, TEX_W, TEX_H)
  for (let i = 0; i < 260; i++) {
    const x = Math.random() * TEX_W
    const y = Math.random() * TEX_H
    const r = 20 + Math.random() * 90
    ctx.strokeStyle = i % 3 ? 'rgba(214,168,92,0.18)' : 'rgba(120,40,30,0.3)'
    ctx.lineWidth = 2 + Math.random() * 4
    ctx.beginPath()
    ctx.ellipse(x, y, r, r * (0.4 + Math.random() * 0.6), Math.random() * Math.PI, 0, Math.PI * 2)
    ctx.stroke()
  }
  vignette(ctx, TEX_W, TEX_H, 'rgba(0,0,0,A)', 0.55)
  return c
}

/** Frontispiece: the back of the last turned leaf, with the ex-libris portrait. Drawn mirrored. */
export function exLibris(photo: HTMLImageElement | null) {
  const c = paper(false)
  const ctx = c.getContext('2d')!
  ctx.save()
  // Back faces render with mirrored UVs; pre-mirror so it reads correctly
  ctx.translate(TEX_W, 0)
  ctx.scale(-1, 1)
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(42,29,18,0.6)'
  ctx.font = '500 28px "Geist Mono", monospace'
  ctx.fillText('E X   L I B R I S', TEX_W / 2, TEX_H * 0.12)
  // Photo plate
  const pw = TEX_W * 0.62
  const ph = pw * 1.25
  const py = TEX_H * 0.17
  ctx.save()
  ctx.translate(TEX_W / 2, py + ph / 2)
  ctx.rotate(-0.035)
  ctx.shadowColor = 'rgba(60,35,10,0.5)'
  ctx.shadowBlur = 30
  ctx.shadowOffsetY = 14
  ctx.fillStyle = '#fffaf0'
  ctx.fillRect(-pw / 2 - 22, -ph / 2 - 22, pw + 44, ph + 44)
  ctx.shadowColor = 'transparent'
  if (photo) {
    const ir = photo.width / photo.height
    const tr = pw / ph
    const sy = 0
    let sw = photo.width, sh = photo.height, sx = 0
    if (ir > tr) { sw = photo.height * tr; sx = (photo.width - sw) / 2 } else { sh = photo.width / tr }
    ctx.filter = 'sepia(0.35) contrast(1.05)'
    ctx.drawImage(photo, sx, sy, sw, sh, -pw / 2, -ph / 2, pw, ph)
    ctx.filter = 'none'
  } else {
    ctx.fillStyle = '#d8c6a2'
    ctx.fillRect(-pw / 2, -ph / 2, pw, ph)
  }
  ctx.restore()
  ctx.fillStyle = '#2a1d12'
  ctx.font = 'italic 600 82px Fraunces, Georgia, serif'
  ctx.fillText('Mayer Frieg', TEX_W / 2, py + ph + 150)
  ctx.fillStyle = 'rgba(42,29,18,0.6)'
  ctx.font = '500 26px "Geist Mono", monospace'
  ctx.fillText('C A I R O   ·   M M X X V', TEX_W / 2, py + ph + 205)
  ctx.restore()
  return c
}

/** Page-edge stripes for the sides of the text block. */
export function pageEdges() {
  const [c, ctx] = canvas(512, 64)
  for (let y = 0; y < 64; y += 2) {
    ctx.fillStyle = y % 4 ? '#e6d4b0' : '#cdb68a'
    ctx.fillRect(0, y, 512, 2)
  }
  return c
}

export function flameSprite() {
  const [c, ctx] = canvas(128, 256)
  const g = ctx.createRadialGradient(64, 170, 4, 64, 150, 120)
  g.addColorStop(0, 'rgba(255,250,220,1)')
  g.addColorStop(0.15, 'rgba(255,214,140,0.95)')
  g.addColorStop(0.4, 'rgba(255,150,60,0.45)')
  g.addColorStop(1, 'rgba(255,120,40,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.moveTo(64, 10)
  ctx.bezierCurveTo(110, 120, 104, 220, 64, 240)
  ctx.bezierCurveTo(24, 220, 18, 120, 64, 10)
  ctx.fill()
  return c
}

export function glowSprite() {
  const [c, ctx] = canvas(64, 64)
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,230,180,1)')
  g.addColorStop(0.3, 'rgba(255,200,120,0.5)')
  g.addColorStop(1, 'rgba(255,200,120,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return c
}
