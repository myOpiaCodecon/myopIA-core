import { useState, useEffect, useRef, useCallback } from 'react'

const GRAVITY    = 0.5
const FRICTION   = 0.90   // multiplicador horizontal por frame
const BOUNCE_Y   = 0.35   // coeficiente de quique no chão/teto
const BOUNCE_X   = 0.45   // coeficiente de quique nas paredes
const MAX_V      = 20     // velocidade máxima de soltura (px/frame)

// Metade das dimensões do SVG do óculos (280 × 100)
const HALF_W = 140
const HALF_H = 50

const getBounds = () => ({
  minX: HALF_W,
  maxX: window.innerWidth  - HALF_W,
  minY: HALF_H,
  maxY: window.innerHeight - HALF_H,
})

export interface GlassesPos {
  x: number
  y: number
  rotation: number
}

export function useGlassesPhysics() {
  // Estado mutável mantido em ref — evita closures stale no loop de física
  const phys = useRef({
    x: window.innerWidth  / 2,
    y: window.innerHeight - HALF_H,
    vx: 0,
    vy: 0,
    rotation: 0,
    isFalling: false,
  })

  const [pos, setPos] = useState<GlassesPos>({
    x: phys.current.x,
    y: phys.current.y,
    rotation: 0,
  })
  const [isDragging, setIsDragging] = useState(false)

  const rafRef        = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  // Histórico de posições para calcular velocidade no soltar
  const posHistRef    = useRef<{ x: number; y: number; t: number }[]>([])

  const stopPhysics = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  // Tick de física em ref para não ter problema de closure stale em RAF
  const tickRef = useRef<() => void>(() => {})
  tickRef.current = () => {
    const p = phys.current
    const b = getBounds()

    p.vy += GRAVITY
    p.vx *= FRICTION
    p.x  += p.vx
    p.y  += p.vy
    p.rotation += p.vx * 0.4   // rotação proporcional à velocidade horizontal

    // Chão
    if (p.y >= b.maxY) {
      p.y  = b.maxY
      p.vy = -Math.abs(p.vy) * BOUNCE_Y
      p.rotation *= 0.6         // amortecer rotação no impacto
      if (Math.abs(p.vy) < 1.5) {
        p.vy = 0
        p.vx *= 0.4
      }
    }

    // Teto
    if (p.y <= b.minY) {
      p.y  = b.minY
      p.vy = Math.abs(p.vy) * BOUNCE_Y
    }

    // Parede esquerda
    if (p.x <= b.minX) {
      p.x  = b.minX
      p.vx = Math.abs(p.vx) * BOUNCE_X
    }

    // Parede direita
    if (p.x >= b.maxX) {
      p.x  = b.maxX
      p.vx = -Math.abs(p.vx) * BOUNCE_X
    }

    // Verificar se assentou no chão
    const settled =
      p.y  >= b.maxY - 0.5 &&
      Math.abs(p.vy) < 0.5  &&
      Math.abs(p.vx) < 0.3

    if (settled) {
      p.vy = 0
      p.vx = 0
      p.isFalling = false
      p.rotation *= 0.8
      if (Math.abs(p.rotation) < 0.5) p.rotation = 0
    }

    setPos({ x: p.x, y: p.y, rotation: p.rotation })

    if (p.isFalling) {
      rafRef.current = requestAnimationFrame(() => tickRef.current())
    }
  }

  const startFalling = useCallback((vx: number, vy: number) => {
    stopPhysics()
    // Limitar velocidade inicial para evitar teleporte para fora da tela
    phys.current.vx = Math.max(-MAX_V, Math.min(MAX_V, vx))
    phys.current.vy = Math.max(-MAX_V, Math.min(MAX_V, vy))
    phys.current.isFalling = true
    rafRef.current = requestAnimationFrame(() => tickRef.current())
  }, [stopPhysics])

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    stopPhysics()
    phys.current.isFalling = false
    isDraggingRef.current = true
    setIsDragging(true)
    dragOffsetRef.current = {
      x: e.clientX - phys.current.x,
      y: e.clientY - phys.current.y,
    }
    posHistRef.current = [{ x: phys.current.x, y: phys.current.y, t: performance.now() }]
  }, [stopPhysics])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return

      const b = getBounds()
      const newX = Math.max(b.minX, Math.min(b.maxX, e.clientX - dragOffsetRef.current.x))
      const newY = Math.max(b.minY, Math.min(b.maxY, e.clientY - dragOffsetRef.current.y))

      phys.current.x = newX
      phys.current.y = newY

      // Manter janela de 80ms para calcular velocidade no soltar
      const now = performance.now()
      posHistRef.current.push({ x: newX, y: newY, t: now })
      const cutoff = now - 80
      posHistRef.current = posHistRef.current.filter(p => p.t >= cutoff)

      setPos({ x: newX, y: newY, rotation: phys.current.rotation })
    }

    const onUp = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      setIsDragging(false)

      // Calcular velocidade a partir do histórico (px por frame a 60fps)
      const hist = posHistRef.current
      let vx = 0
      let vy = 0
      if (hist.length >= 2) {
        const oldest = hist[0]
        const newest = hist[hist.length - 1]
        const dtMs = newest.t - oldest.t
        if (dtMs > 0) {
          const dtFrames = dtMs / (1000 / 60)
          vx = (newest.x - oldest.x) / dtFrames
          vy = (newest.y - oldest.y) / dtFrames
        }
      }

      startFalling(vx, vy)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [startFalling])

  // Limpar RAF ao desmontar
  useEffect(() => () => { stopPhysics() }, [stopPhysics])

  return { pos, isDragging, onMouseDown }
}
