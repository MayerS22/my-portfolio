'use client'

/**
 * Tiny synthesized sound kit: no audio files, everything is generated with Web Audio.
 * Off by default; the choice persists in localStorage. Every call is a no-op while muted,
 * before the first user gesture, or when Web Audio is unavailable.
 */
type SoundName = 'page' | 'scratch' | 'tick' | 'thud' | 'chime' | 'seal'

const KEY = 'mf-sound'
let ctx: AudioContext | null = null
let enabled = false
let loaded = false
const listeners = new Set<(on: boolean) => void>()
const last: Partial<Record<SoundName, number>> = {}

function load() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  try { enabled = localStorage.getItem(KEY) === '1' } catch {}
}

export function isSoundOn() { load(); return enabled }

export function setSound(on: boolean) {
  load()
  enabled = on
  try { localStorage.setItem(KEY, on ? '1' : '0') } catch {}
  if (on) ensureCtx()
  listeners.forEach((l) => l(on))
  if (on) play('chime')
}

export function onSoundChange(cb: (on: boolean) => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

function ensureCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

function noiseBuffer(c: AudioContext, seconds: number) {
  const buf = c.createBuffer(1, Math.max(1, Math.floor(c.sampleRate * seconds)), c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  return buf
}

/** Rate-limits each sound so scrubbing back and forth never machine-guns it. */
const GAP: Record<SoundName, number> = { page: 220, scratch: 140, tick: 60, thud: 90, chime: 400, seal: 300 }

export function play(name: SoundName, volume = 1) {
  load()
  if (!enabled) return
  const now = performance.now()
  if (now - (last[name] ?? 0) < GAP[name]) return
  last[name] = now
  const c = ensureCtx()
  if (!c) return
  const t = c.currentTime
  const out = c.createGain()
  out.gain.value = 0.55 * volume
  out.connect(c.destination)

  if (name === 'page' || name === 'scratch' || name === 'seal') {
    // Paper: shaped noise through a filter sweep
    const len = name === 'page' ? 0.42 : name === 'seal' ? 0.18 : 0.12
    const src = c.createBufferSource()
    src.buffer = noiseBuffer(c, len)
    const f = c.createBiquadFilter()
    f.type = name === 'scratch' ? 'highpass' : 'bandpass'
    f.Q.value = name === 'page' ? 0.8 : 2.5
    f.frequency.setValueAtTime(name === 'page' ? 900 : name === 'seal' ? 500 : 3800, t)
    if (name === 'page') f.frequency.exponentialRampToValueAtTime(3200, t + len)
    const g = c.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(name === 'page' ? 0.5 : 0.25, t + len * 0.25)
    g.gain.exponentialRampToValueAtTime(0.0001, t + len)
    src.connect(f).connect(g).connect(out)
    src.start(t)
    src.stop(t + len + 0.02)
    return
  }

  // Tonal sounds
  const osc = c.createOscillator()
  const g = c.createGain()
  if (name === 'tick') {
    osc.type = 'square'
    osc.frequency.setValueAtTime(2400, t)
    g.gain.setValueAtTime(0.08, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
    osc.connect(g).connect(out)
    osc.start(t); osc.stop(t + 0.04)
  } else if (name === 'thud') {
    osc.type = 'sine'
    osc.frequency.setValueAtTime(180, t)
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.12)
    g.gain.setValueAtTime(0.35, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
    osc.connect(g).connect(out)
    osc.start(t); osc.stop(t + 0.18)
  } else {
    // chime: two soft bell partials
    ;[880, 1320].forEach((freq, i) => {
      const o = c.createOscillator()
      const gg = c.createGain()
      o.type = 'sine'
      o.frequency.value = freq
      gg.gain.setValueAtTime(0.0001, t)
      gg.gain.exponentialRampToValueAtTime(i ? 0.08 : 0.16, t + 0.02)
      gg.gain.exponentialRampToValueAtTime(0.0001, t + 1.2)
      o.connect(gg).connect(out)
      o.start(t); o.stop(t + 1.25)
    })
  }
}
