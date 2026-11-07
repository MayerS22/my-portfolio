'use client'

import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isSoundOn, onSoundChange, setSound } from '@/lib/sound'

const fmt = () =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())

const cairoParts = () => {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).formatToParts(new Date())
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0)
  return { h: get('hour') % 12, m: get('minute'), s: get('second') }
}

/** Header desk items: a live pocket-watch showing Mayer's local time in Cairo, and the sound toggle. */
export default function HeaderDesk() {
  const [time, setTime] = useState<string | null>(null)
  const [hands, setHands] = useState({ h: 0, m: 0, s: 0 })
  const [sound, setSoundState] = useState(false)

  useEffect(() => {
    const tick = () => { setTime(fmt()); setHands(cairoParts()) }
    tick()
    const id = setInterval(tick, 1000)
    setSoundState(isSoundOn())
    const off = onSoundChange(setSoundState)
    return () => { clearInterval(id); off() }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[11px] tracking-[0.14em] uppercase"
        style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
        title="Mayer's local time"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
          <line x1="12" y1="12" x2="12" y2="7" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" transform={`rotate(${hands.h * 30 + hands.m * 0.5} 12 12)`} />
          <line x1="12" y1="12" x2="12" y2="4.5" stroke="var(--accent-primary)" strokeWidth="1.3" strokeLinecap="round" transform={`rotate(${hands.m * 6} 12 12)`} />
          <line x1="12" y1="13" x2="12" y2="4" stroke="var(--text-muted)" strokeWidth="0.6" strokeLinecap="round" transform={`rotate(${hands.s * 6} 12 12)`} />
        </svg>
        <span>Cairo</span>
        <span className="tabular-nums" style={{ color: 'var(--text-primary)' }}>{time ?? '--:--'}</span>
      </div>
      <button
        onClick={() => setSound(!sound)}
        className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
        style={{ color: sound ? 'var(--accent-primary)' : 'var(--text-muted)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
        aria-label={sound ? 'Mute sound effects' : 'Turn on sound effects'}
        aria-pressed={sound}
        title={sound ? 'Sound on' : 'Sound off'}
      >
        {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>
    </div>
  )
}
