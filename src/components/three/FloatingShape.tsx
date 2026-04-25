'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'

interface FloatingShapeProps {
  color?: string
}

export default function FloatingShape({ color = '#6366f1' }: FloatingShapeProps) {
  const meshRef = useRef<import('three').Mesh>(null)
  const prefersReducedMotion = useReducedMotion()

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    meshRef.current.rotation.y += 0.003
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
  })

  return (
    <mesh ref={meshRef} scale={1.8}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color={color}
        speed={prefersReducedMotion ? 0 : 2}
        distort={prefersReducedMotion ? 0 : 0.3}
        radius={1}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}
