'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import {
  coverFront, endpaper, exLibris, flameSprite, glowSprite, INK, inkMask, leather, pageEdges, paper, rightPage,
} from './bookTextures'

/** Values the hero's scroll timeline drives (0..1), read by the render loop every frame. */
export type BookState = { open: number; pages: number; focus: number; ink: number; mx: number; my: number }

const PW = 3 // page width (x)
const PD = 4.2 // page depth (z)
const T = 0.34 // text-block thickness
const CT = 0.07 // board thickness
const OV = 0.08 // board overhang
const LEAVES = 3
const SEGS = 24
const FLAME = new THREE.Vector3(4.4, 1.62, -0.6)

const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

/** Leaf as a strip of quads hinged at x=0; bent every frame by bendLeaf(). */
function leafGeometry() {
  const g = new THREE.BufferGeometry()
  const pos = new Float32Array((SEGS + 1) * 2 * 3)
  const uv = new Float32Array((SEGS + 1) * 2 * 2)
  const idx: number[] = []
  for (let k = 0; k <= SEGS; k++) {
    for (let r = 0; r < 2; r++) {
      const v = k * 2 + r
      uv[v * 2] = k / SEGS
      uv[v * 2 + 1] = 1 - r
    }
    if (k < SEGS) {
      const a = k * 2, b = k * 2 + 1, c = (k + 1) * 2, d = (k + 1) * 2 + 1
      idx.push(a, b, c, c, b, d)
    }
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  g.setIndex(idx)
  return g
}

/** Turn a leaf to angle theta (0 = flat right, π = flat left). The fore-edge lags, so it curls. */
function bendLeaf(g: THREE.BufferGeometry, theta: number, width: number) {
  const pos = g.attributes.position as THREE.BufferAttribute
  const lag = 0.95 * Math.sin(theta)
  const ds = width / SEGS
  let x = 0
  let y = 0
  for (let k = 0; k <= SEGS; k++) {
    if (k > 0) {
      const u = (k - 0.5) / SEGS
      const phi = theta - lag * u * u * 1.4
      x += ds * Math.cos(phi)
      y += ds * Math.sin(phi)
    }
    pos.setXYZ(k * 2, x, y, -PD / 2)
    pos.setXYZ(k * 2 + 1, x, y, PD / 2)
  }
  pos.needsUpdate = true
  g.computeVertexNormals()
  g.computeBoundingSphere()
}

async function loadAssets() {
  try {
    await Promise.all([
      document.fonts.load('600 100px Fraunces'),
      document.fonts.load('italic 600 100px Fraunces'),
      document.fonts.load('600 60px Caveat'),
      document.fonts.load('500 30px "Geist Mono"'),
    ])
  } catch {}
  const photo = await new Promise<HTMLImageElement | null>((res) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = () => res(null)
    img.src = '/Me.jpeg'
  })
  return { photo }
}

/**
 * The hero's journal, for real: leather boards, a page block, three paper leaves that bend as they
 * turn, a candle whose flame lights the scene and casts soft shadows, and dust drifting through the
 * light. The hero's scroll timeline writes into `state`; this loop eases toward it every frame.
 * Renders only while on screen and the tab is visible.
 */
export default function Book3D({ state, onReady, onFail }: {
  state: MutableRefObject<BookState>
  onReady?: () => void
  onFail?: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cb = useRef({ onReady, onFail })
  cb.current = { onReady, onFail }

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const { photo } = await loadAssets()
      if (disposed) return
      const canvas = canvasRef.current!

      let renderer: THREE.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
      } catch {
        cb.current.onFail?.()
        return
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.3

      const aniso = renderer.capabilities.getMaxAnisotropy()
      const textures: THREE.Texture[] = []
      const tex = (c: HTMLCanvasElement, srgb = true) => {
        const t = new THREE.CanvasTexture(c)
        if (srgb) t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = aniso
        textures.push(t)
        return t
      }

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)

      // ── Materials ──
      const leatherMat = new THREE.MeshStandardMaterial({ map: tex(leather()), roughness: 0.78, metalness: 0.05 })
      const frontMat = new THREE.MeshStandardMaterial({ map: tex(coverFront()), roughness: 0.6, metalness: 0.15 })
      const endMat = new THREE.MeshStandardMaterial({ map: tex(endpaper()), roughness: 0.85 })
      const edgeTex = tex(pageEdges())
      edgeTex.wrapS = edgeTex.wrapT = THREE.RepeatWrapping
      edgeTex.repeat.set(1, 3)
      const edgeMat = new THREE.MeshStandardMaterial({ map: edgeTex, roughness: 0.95 })
      const plainPaper = tex(paper(false))
      const leafFront = new THREE.MeshStandardMaterial({ map: plainPaper, roughness: 0.92, side: THREE.FrontSide })
      const leafBack = new THREE.MeshStandardMaterial({ map: plainPaper, roughness: 0.92, side: THREE.BackSide })
      const frontis = new THREE.MeshStandardMaterial({ map: tex(exLibris(photo)), roughness: 0.92, side: THREE.BackSide })

      // Right page: paper + an ink mask revealed line by line, left to right, by uReveal
      const inkTex = tex(inkMask(), false)
      const reveal = { value: 0 }
      const pageMat = new THREE.MeshStandardMaterial({ map: tex(rightPage()), roughness: 0.92 })
      pageMat.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, {
          inkMap: { value: inkTex }, uReveal: reveal,
          uTop: { value: INK.top }, uLineH: { value: INK.lineH }, uLeft: { value: INK.left }, uWidth: { value: INK.width }, uLines: { value: INK.lines },
        })
        shader.fragmentShader = shader.fragmentShader
          .replace('#include <common>', '#include <common>\nuniform sampler2D inkMap;\nuniform float uReveal, uTop, uLineH, uLeft, uWidth, uLines;')
          .replace('#include <map_fragment>', `#include <map_fragment>
          {
            float ink = texture2D(inkMap, vMapUv).r;
            float row = floor(((1.0 - vMapUv.y) - uTop) / uLineH);
            float along = (vMapUv.x - uLeft) / uWidth;
            float prog = uReveal * uLines - row;
            float vis = clamp((prog - along) * 8.0, 0.0, 1.0);
            diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.12, 0.17, 0.29), ink * vis);
          }`)
      }

      // ── Book ──
      const book = new THREE.Group()
      scene.add(book)
      const box = (w: number, h: number, d: number, mat: THREE.Material | THREE.Material[]) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
        m.castShadow = true
        m.receiveShadow = true
        return m
      }
      const back = box(PW + OV, CT, PD + OV * 2, leatherMat)
      back.position.set((PW + OV) / 2, -CT / 2, 0)
      book.add(back)
      // Block faces: +x, -x, +y (the right-hand page), -y, +z, -z
      const block = box(PW - 0.02, T, PD, [edgeMat, leatherMat, pageMat, edgeMat, edgeMat, edgeMat])
      block.position.set((PW - 0.02) / 2, T / 2, 0)
      book.add(block)
      const spine = box(CT, T + CT * 2, PD + OV * 2, leatherMat)
      spine.position.set(-CT / 2, T / 2, 0)
      book.add(spine)

      const coverPivot = new THREE.Group()
      coverPivot.position.set(0, T, 0)
      book.add(coverPivot)
      const cover = box(PW + OV, CT, PD + OV * 2, [leatherMat, leatherMat, frontMat, endMat, leatherMat, leatherMat])
      cover.position.set((PW + OV) / 2, CT / 2, 0)
      coverPivot.add(cover)

      const leaves = Array.from({ length: LEAVES }, (_, i) => {
        const g = leafGeometry()
        const group = new THREE.Group()
        group.position.set(0, T + 0.006 * (i + 1), 0)
        const front = new THREE.Mesh(g, leafFront)
        const backFace = new THREE.Mesh(g, i === LEAVES - 1 ? frontis : leafBack)
        front.castShadow = true
        front.receiveShadow = backFace.receiveShadow = true
        group.add(front, backFace)
        book.add(group)
        bendLeaf(g, 0, PW - 0.04)
        return { g, angle: 0 }
      })

      // ── Desk (shadow catcher only, so the page's own background shows through) ──
      const desk = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.55 }))
      desk.rotation.x = -Math.PI / 2
      desk.position.y = -CT
      desk.receiveShadow = true
      scene.add(desk)

      // ── Candle ──
      const candle = new THREE.Group()
      candle.position.set(FLAME.x, -CT, FLAME.z)
      scene.add(candle)
      const brass = new THREE.MeshStandardMaterial({ color: 0xc8954a, metalness: 0.85, roughness: 0.35 })
      const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.08, 40), brass)
      dish.position.y = 0.04
      dish.castShadow = true
      const wax = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.26, 1.3, 32),
        new THREE.MeshStandardMaterial({ color: 0xf1e2c4, roughness: 0.6, emissive: 0x6a3a14, emissiveIntensity: 0.25 }),
      )
      wax.position.y = 0.73
      wax.castShadow = true
      const wick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 6), new THREE.MeshBasicMaterial({ color: 0x1a1008 }))
      wick.position.y = 1.43
      candle.add(dish, wax, wick)
      const flame = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(flameSprite()), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }))
      flame.position.set(FLAME.x, FLAME.y, FLAME.z)
      flame.scale.set(0.26, 0.52, 1)
      scene.add(flame)
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(glowSprite()), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.55 }))
      halo.position.copy(FLAME)
      halo.scale.set(2.6, 2.6, 1)
      scene.add(halo)

      // ── Lights ──
      scene.add(new THREE.HemisphereLight(0xffe2b0, 0x1a0e06, 0.95))
      const key = new THREE.SpotLight(0xffb366, 70, 30, 0.95, 0.85, 1.6)
      key.position.copy(FLAME)
      key.target.position.set(0.8, 0, 0.4)
      key.castShadow = true
      key.shadow.mapSize.set(1024, 1024)
      key.shadow.bias = -0.0006
      key.shadow.radius = 5
      key.shadow.camera.near = 0.5
      key.shadow.camera.far = 20
      scene.add(key, key.target)
      const fill = new THREE.PointLight(0xffa65a, 6, 14, 2)
      fill.position.copy(FLAME)
      scene.add(fill)
      const rim = new THREE.DirectionalLight(0x8fa6ff, 0.25)
      rim.position.set(-6, 5, -4)
      scene.add(rim)

      // ── Dust drifting through the candle light ──
      const DUST = 240
      const dustPos = new Float32Array(DUST * 3)
      const dustSeed = new Float32Array(DUST)
      for (let i = 0; i < DUST; i++) {
        dustPos[i * 3] = -3 + Math.random() * 9
        dustPos[i * 3 + 1] = 0.2 + Math.random() * 4
        dustPos[i * 3 + 2] = -3 + Math.random() * 5.5
        dustSeed[i] = Math.random() * 100
      }
      const dustGeo = new THREE.BufferGeometry()
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
      const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
        size: 0.045, map: tex(glowSprite()), color: 0xffd9a0, transparent: true, opacity: 0.6,
        depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
      }))
      scene.add(dust)

      // ── Camera rig: closed (book on the right, desk view) → open (spread centred, from above) ──
      const camA = new THREE.Vector3(0.6, 6.4, 12.8)
      const tgtA = new THREE.Vector3(-0.6, 0.3, -0.2)
      const camB = new THREE.Vector3(0, 12.2, 5.6)
      const tgtB = new THREE.Vector3(0, 0, 0.35)
      const cam = new THREE.Vector3()
      const tgt = new THREE.Vector3()

      const resize = () => {
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(canvas)

      // Smoothed copies of the scroll-driven state
      const s = { open: 0, pages: 0, focus: 0, ink: 0, mx: 0, my: 0 }
      let intro = 0
      let visible = true
      let raf = 0
      let first = true
      let last = performance.now()
      const t0 = performance.now()

      const frame = (now: number) => {
        raf = 0
        if (!visible || document.hidden) return
        raf = requestAnimationFrame(frame)
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        const time = (now - t0) / 1000
        const k = 1 - Math.pow(0.0008, dt) // frame-rate independent easing
        const target = state.current
        s.open += (target.open - s.open) * k
        s.pages += (target.pages - s.pages) * k
        s.focus += (target.focus - s.focus) * k
        s.ink += (target.ink - s.ink) * k
        s.mx += (target.mx - s.mx) * k * 0.5
        s.my += (target.my - s.my) * k * 0.5
        intro = Math.min(1, intro + dt / 1.6)

        // Book settles onto the desk on first appearance
        const ie = 1 - Math.pow(1 - intro, 3)
        book.position.set(0, (1 - ie) * 1.6, 0)
        book.rotation.set(0, (1 - ie) * -0.5 + 0.12 * (1 - s.focus), (1 - ie) * 0.15)

        // Cover: a breathing tease while closed, then swings open on its hinge
        const tease = (1 - clamp01(s.open * 6)) * (0.5 + 0.5 * Math.sin(time * 1.4)) * 0.045
        coverPivot.rotation.z = smooth(clamp01(s.open)) * Math.PI * 0.99 + tease

        // Leaves: staggered turns; the last lands on top showing the ex-libris portrait
        leaves.forEach((leaf, i) => {
          const local = smooth(clamp01((s.pages - i * 0.2) / 0.6))
          const angle = local * Math.PI * (0.985 - i * 0.006)
          if (Math.abs(angle - leaf.angle) > 0.0005) {
            leaf.angle = angle
            bendLeaf(leaf.g, angle, PW - 0.04)
          }
        })
        reveal.value = s.ink

        // Candle flicker
        const flick = 0.82 + Math.sin(time * 9.3) * 0.06 + Math.sin(time * 23.1) * 0.04 + Math.sin(time * 3.7) * 0.08
        key.intensity = 70 * flick
        fill.intensity = 6 * flick
        flame.scale.set(0.26 * (0.95 + flick * 0.08), 0.52 * flick, 1)
        flame.position.x = FLAME.x + Math.sin(time * 5.1) * 0.012
        halo.material.opacity = 0.42 + flick * 0.15

        // Dust: slow rise and sway
        for (let i = 0; i < DUST; i++) {
          let y = dustPos[i * 3 + 1] + dt * (0.05 + (dustSeed[i] % 1) * 0.08)
          if (y > 4.4) y = 0.2
          dustPos[i * 3 + 1] = y
          dustPos[i * 3] += Math.sin(time * 0.5 + dustSeed[i]) * dt * 0.05
        }
        dustGeo.attributes.position.needsUpdate = true

        // Camera
        const f = smooth(clamp01(s.focus))
        cam.lerpVectors(camA, camB, f)
        tgt.lerpVectors(tgtA, tgtB, f)
        cam.x += s.mx * 0.7
        cam.y += -s.my * 0.35
        camera.position.copy(cam)
        camera.lookAt(tgt)

        renderer.render(scene, camera)
        if (first) {
          first = false
          canvas.style.opacity = '1'
          cb.current.onReady?.()
        }
      }
      const kick = () => { if (!raf && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame) } }

      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick() }, { threshold: 0 })
      io.observe(canvas)
      const onVis = () => kick()
      document.addEventListener('visibilitychange', onVis)
      kick()

      cleanup = () => {
        cancelAnimationFrame(raf)
        io.disconnect()
        ro.disconnect()
        document.removeEventListener('visibilitychange', onVis)
        scene.traverse((o) => {
          const m = o as THREE.Mesh
          m.geometry?.dispose?.()
          const mat = m.material as THREE.Material | THREE.Material[] | undefined
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
          else mat?.dispose?.()
        })
        textures.forEach((t) => t.dispose())
        renderer.dispose()
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [state])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full transition-opacity duration-1000"
      style={{ opacity: 0 }}
    />
  )
}
