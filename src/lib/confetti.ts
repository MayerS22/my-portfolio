export function confettiBurst(originX: number, originY: number) {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.inset = '0'
  canvas.style.zIndex = '99999'
  canvas.style.pointerEvents = 'none'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')!
  const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#f1f5f9', '#818cf8']

  const particles = Array.from({ length: 50 }, () => ({
    x: originX,
    y: originY,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.5) * 14 - 6,
    size: Math.random() * 6 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 1,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
  }))

  let frame: number
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false

    for (const p of particles) {
      if (p.life <= 0) continue
      alive = true
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.4
      p.life -= 0.015
      p.rotation += p.rotationSpeed

      ctx.save()
      ctx.globalAlpha = p.life
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
      ctx.restore()
    }

    if (alive) {
      frame = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(frame)
      canvas.remove()
    }
  }

  animate()
}
