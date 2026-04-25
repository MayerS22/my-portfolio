'use client'

import { Sparkles } from '@react-three/drei'

export default function Particles() {
  return (
    <Sparkles
      count={50}
      scale={8}
      size={2}
      speed={0.3}
      color="#8b5cf6"
      opacity={0.4}
    />
  )
}
