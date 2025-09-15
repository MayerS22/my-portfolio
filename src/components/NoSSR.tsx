'use client'

import { useMounted } from '@/hooks/useMounted'

interface NoSSRProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function NoSSR({ children, fallback = null }: NoSSRProps) {
  const isMounted = useMounted()
  
  if (!isMounted) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}
