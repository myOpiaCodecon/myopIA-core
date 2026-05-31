import { useState, useEffect, useCallback, useRef } from 'react'
import type { GlassesPos } from './useGlassesPhysics'

const LENS_H_OFFSET = 75
const LENS_RADIUS   = 49

function isOverLens(mx: number, my: number, pos: GlassesPos) {
  const rad  = pos.rotation * (Math.PI / 180)
  const cosA = Math.cos(rad)
  const sinA = Math.sin(rad)
  const lx = pos.x - LENS_H_OFFSET * cosA
  const ly = pos.y - LENS_H_OFFSET * sinA
  const rx = pos.x + LENS_H_OFFSET * cosA
  const ry = pos.y + LENS_H_OFFSET * sinA
  return (
    (mx - lx) ** 2 + (my - ly) ** 2 <= LENS_RADIUS ** 2 ||
    (mx - rx) ** 2 + (my - ry) ** 2 <= LENS_RADIUS ** 2
  )
}

export function useLensCondition() {
  const [dirt, setDirt] = useState(0)
  const lastClothPosRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setDirt(d => Math.min(d + 1 / 120, 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const onClothMove = useCallback((mx: number, my: number, pos: GlassesPos) => {
    if (!isOverLens(mx, my, pos)) {
      lastClothPosRef.current = { x: mx, y: my }
      return
    }
    const last = lastClothPosRef.current
    const dist = last ? Math.sqrt((mx - last.x) ** 2 + (my - last.y) ** 2) : 0
    lastClothPosRef.current = { x: mx, y: my }
    if (dist > 1) {
      setDirt(d => Math.max(0, d - dist * 0.005))
    }
  }, [])

  const onClothRelease = useCallback(() => {
    lastClothPosRef.current = null
  }, [])

  return { dirt, onClothMove, onClothRelease }
}
