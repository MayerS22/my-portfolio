'use client'

import { play } from './sound'

/**
 * A 25-minute focus session (the Pomodoro habit Mayer lives by). One shared timer that the margin
 * hourglass and the command palette both drive. Subscribers get { running, remaining, total } each second.
 */
export type FocusState = { running: boolean; remaining: number; total: number; done: boolean }

const TOTAL = 25 * 60
let state: FocusState = { running: false, remaining: TOTAL, total: TOTAL, done: false }
let endAt = 0
let timer: ReturnType<typeof setInterval> | null = null
const subs = new Set<(s: FocusState) => void>()

const emit = () => subs.forEach((s) => s(state))

function tick() {
  const remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000))
  state = { ...state, remaining }
  if (remaining === 0) {
    stopFocus(true)
    return
  }
  emit()
}

export function startFocus() {
  endAt = Date.now() + TOTAL * 1000
  state = { running: true, remaining: TOTAL, total: TOTAL, done: false }
  if (timer) clearInterval(timer)
  timer = setInterval(tick, 1000)
  play('tick')
  emit()
}

export function stopFocus(completed = false) {
  if (timer) clearInterval(timer)
  timer = null
  state = { running: false, remaining: TOTAL, total: TOTAL, done: completed }
  if (completed) play('chime')
  emit()
}

export function toggleFocus() {
  if (state.running) stopFocus()
  else startFocus()
}

export function getFocus() { return state }

export function onFocus(cb: (s: FocusState) => void) {
  subs.add(cb)
  return () => { subs.delete(cb) }
}

export const fmtClock = (secs: number) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
