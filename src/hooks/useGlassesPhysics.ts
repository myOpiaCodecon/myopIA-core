import { useState, useEffect, useRef, useCallback } from 'react'

const GRAVITY         = 0.5
const FRICTION        = 0.90
const BOUNCE_Y        = 0.35
const BOUNCE_X        = 0.45
const MAX_V           = 20
const BREAK_THRESHOLD = 18   // px/frame de velocidade vertical no impacto

const HALF_W = 140
const HALF_H = 50

const STORAGE_BROKEN = 'myopia-broken'

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

export function useGlassesPhysics(canBreak: boolean) {
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
  const [isBroken, setIsBroken] = useState(() => {
    return localStorage.getItem(STORAGE_BROKEN) === 'true'
  })

  const rafRef        = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const posHistRef    = useRef<{ x: number; y: number; t: number }[]>([])

  const stopPhysics = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const repair = useCallback(() => {
    phys.current.isFalling = false
    localStorage.removeItem(STORAGE_BROKEN)
    setIsBroken(false)
  }, [])

  const tickRef = useRef<() => void>(() => {})
  tickRef.current = () => {
    const p = phys.current
    const b = getBounds()

    p.vy += GRAVITY
    p.vx *= FRICTION
    p.x  += p.vx
    p.y  += p.vy
    p.rotation += p.vx * 0.4

    // Chão
    if (p.y >= b.maxY) {
      const impactVy = Math.abs(p.vy)

      if (canBreak && impactVy > BREAK_THRESHOLD) {
        p.y        = b.maxY
        p.vx       = 0
        p.vy       = 0
        p.isFalling = false
        localStorage.setItem(STORAGE_BROKEN, 'true')
        setIsBroken(true)
        setPos({ x: p.x, y: p.y, rotation: p.rotation })
        return  // para o loop sem agendar próximo frame
      }

      p.y  = b.maxY
      p.vy = -Math.abs(p.vy) * BOUNCE_Y
      p.rotation *= 0.6
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
    phys.current.vx = Math.max(-MAX_V, Math.min(MAX_V, vx))
    phys.current.vy = Math.max(-MAX_V, Math.min(MAX_V, vy))
    phys.current.isFalling = true
    rafRef.current = requestAnimationFrame(() => tickRef.current())
  }, [stopPhysics])

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (phys.current.isFalling) return  // impede pegar durante queda
    e.preventDefault()
    stopPhysics()
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

  useEffect(() => () => { stopPhysics() }, [stopPhysics])

  return { pos, isDragging, isBroken, onMouseDown, repair }
}
