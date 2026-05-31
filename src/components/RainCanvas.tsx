import { useEffect, useRef } from 'react'

interface Drop {
  x: number; y: number
  length: number; speed: number
  opacity: number; width: number
}

const ANGLE = 0.25

export default function RainCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  const rafRef    = useRef(0)

  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    let drops: Drop[] = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      drops = Array.from({ length: 280 }, () => ({
        x:       Math.random() * (window.innerWidth  + 300) - 150,
        y:       Math.random() * window.innerHeight,
        length:  20 + Math.random() * 35,
        speed:   14 + Math.random() * 20,
        opacity: 0.5 + Math.random() * 0.45,
        width:   0.9 + Math.random() * 1.6,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (activeRef.current) {
        drops.forEach(d => {
          ctx.beginPath()
          ctx.moveTo(d.x, d.y)
          ctx.lineTo(d.x + d.length * ANGLE, d.y + d.length)
          ctx.strokeStyle = `rgba(174,214,241,${d.opacity})`
          ctx.lineWidth   = d.width
          ctx.stroke()
          d.y += d.speed
          d.x += d.speed * ANGLE
          if (d.y > canvas.height + d.length) {
            d.y = -d.length - Math.random() * 100
            d.x = Math.random() * (canvas.width + 300) - 150
          }
        })
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Escurecimento de tempestade */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1997,
        background: 'rgba(8,18,45,0.3)',
        pointerEvents: 'none',
        opacity: active ? 1 : 0,
        transition: 'opacity 2.5s ease',
      }} />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 1998,
          pointerEvents: 'none',
          opacity: active ? 1 : 0,
          transition: 'opacity 2.5s ease',
        }}
      />
    </>
  )
}
