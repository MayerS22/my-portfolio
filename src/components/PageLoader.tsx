'use client'

import { useState, useEffect, type ReactNode } from 'react'

export default function PageLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Wait only for DOM readiness, not an artificial delay
    const timer = requestAnimationFrame(() => setLoading(false))
    return () => cancelAnimationFrame(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Mayer{' '}
            <span className="text-gradient">Frieg</span>
          </h1>
          <div className="h-0.5 mt-3 mx-auto bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: 120 }} />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
