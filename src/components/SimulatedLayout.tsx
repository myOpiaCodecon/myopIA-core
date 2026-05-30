import { useState, useEffect, useCallback } from 'react'
import BlurOverlay from './BlurOverlay'
import Glasses from './Glasses'

interface Props {
  children: React.ReactNode
}

export default function SimulatedLayout({ children }: Props) {
  const [pos, setPos] = useState(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }))
  const [dragging, setDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y })
  }, [pos])

  useEffect(() => {
    if (!dragging) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y })
    }
    const onUp = () => setDragging(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, dragOffset])

  return (
    <>
      {children}

      {/* Transparent capture layer prevents iframes from stealing mousemove during drag */}
      {dragging && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1999, cursor: 'grabbing' }} />
      )}

      <BlurOverlay glassesPos={pos} />
      <Glasses pos={pos} onMouseDown={handleMouseDown} dragging={dragging} />
    </>
  )
}
