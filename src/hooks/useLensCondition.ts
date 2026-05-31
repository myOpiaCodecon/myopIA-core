import { useState, useEffect, useCallback, useRef } from 'react'
import type { GlassesPos } from './useGlassesPhysics'

const LENS_H_OFFSET = 75
const LENS_RADIUS   = 49
const MIN_SWEEP_PX  = 30

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

function randomSwipeTarget() {
  return 3 + Math.floor(Math.random() * 5) // 3 a 7 — irritante mas possível
}

export function useLensCondition() {
  const [dirt, setDirt]               = useState(0)
  const [isHandCleaning, setIsHandCleaning] = useState(false)

  const isCleaningRef    = useRef(false)
  const lastXRef         = useRef<number | null>(null)
  const lastDirRef       = useRef<number>(0)
  const sweepStartXRef   = useRef<number>(0)
  const swipeCountRef    = useRef<number>(0)
  const requiredRef      = useRef<number>(randomSwipeTarget())

  useEffect(() => {
    const id = setInterval(() => {
      setDirt(d => Math.min(d + 1 / 120, 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const wipe = useCallback(() => {
    if (isCleaningRef.current) return
    isCleaningRef.current = true
    setIsHandCleaning(true)
    swipeCountRef.current  = 0
    requiredRef.current    = randomSwipeTarget()
    setTimeout(() => {
      setDirt(0)
      setIsHandCleaning(false)
      isCleaningRef.current = false
    }, 2600)
  }, [])

  const onLensMouseMove = useCallback((mx: number, my: number, pos: GlassesPos) => {
    if (isCleaningRef.current) return

    if (!isOverLens(mx, my, pos)) {
      lastXRef.current  = null
      lastDirRef.current = 0
      return
    }

    if (lastXRef.current === null) {
      lastXRef.current     = mx
      sweepStartXRef.current = mx
      return
    }

    const dx  = mx - lastXRef.current
    lastXRef.current = mx
    if (dx === 0) return

    const dir = dx > 0 ? 1 : -1

    if (lastDirRef.current === 0) {
      lastDirRef.current     = dir
      sweepStartXRef.current = mx
      return
    }

    if (dir !== lastDirRef.current && Math.abs(mx - sweepStartXRef.current) >= MIN_SWEEP_PX) {
      swipeCountRef.current++
      sweepStartXRef.current = mx
      lastDirRef.current     = dir

      if (swipeCountRef.current >= requiredRef.current) {
        wipe()
      }
    }
  }, [wipe])

  return { dirt, isHandCleaning, onLensMouseMove }
}
