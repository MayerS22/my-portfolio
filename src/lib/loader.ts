'use client'

/**
 * Tiny handshake between the opening BookLoader and anything that should start its intro
 * only once the book has opened (e.g. the hero load-in). If no loader runs, callbacks fire
 * on the next frame.
 */
type W = Window & { __bookOpened?: boolean; __bookLoaderActive?: boolean }

export const BOOK_OPENED = 'book:opened'

export function markLoaderActive() {
  if (typeof window !== 'undefined') (window as W).__bookLoaderActive = true
}

export function markBookOpened() {
  if (typeof window === 'undefined') return
  const w = window as W
  w.__bookOpened = true
  w.__bookLoaderActive = false
  window.dispatchEvent(new Event(BOOK_OPENED))
}

/** Run `cb` once the book is open. Returns a cleanup function. */
export function onBookOpened(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const w = window as W
  if (w.__bookOpened || !w.__bookLoaderActive) {
    const raf = requestAnimationFrame(cb)
    return () => cancelAnimationFrame(raf)
  }
  const handler = () => cb()
  window.addEventListener(BOOK_OPENED, handler, { once: true })
  return () => window.removeEventListener(BOOK_OPENED, handler)
}
