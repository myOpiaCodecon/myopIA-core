import { useState, useEffect, useRef } from 'react'

export function useRain() {
  const [isRaining, setIsRaining] = useState(false)
  const [isWiperActive, setIsWiperActive] = useState(false)
  const rainingRef  = useRef(false)
  const wipeLoopRef = useRef(false)

  // Agenda ciclos de chuva aleatórios
  useEffect(() => {
    let rainTimeout: ReturnType<typeof setTimeout>
    let stopTimeout: ReturnType<typeof setTimeout>

    const startRain = () => {
      rainingRef.current = true
      setIsRaining(true)
      const duration = 20_000 + Math.random() * 20_000 // 20–40s chovendo
      stopTimeout = setTimeout(() => {
        rainingRef.current = false
        setIsRaining(false)
        rainTimeout = setTimeout(startRain, 30_000 + Math.random() * 30_000) // 30–60s de seca
      }, duration)
    }

    // Primeira chuva começa cedo para testar (8–15s após carregar)
    rainTimeout = setTimeout(startRain, 8_000 + Math.random() * 7_000)

    return () => {
      clearTimeout(rainTimeout)
      clearTimeout(stopTimeout)
    }
  }, [])

  // Limpador automático enquanto chove: 10s ligado → 3s desligado → repete
  useEffect(() => {
    if (!isRaining) {
      wipeLoopRef.current = false
      setIsWiperActive(false)
      return
    }

    wipeLoopRef.current = true
    let onTimer: ReturnType<typeof setTimeout>
    let offTimer: ReturnType<typeof setTimeout>

    const cycle = () => {
      if (!wipeLoopRef.current) return
      setIsWiperActive(true)
      onTimer = setTimeout(() => {
        if (!wipeLoopRef.current) return
        setIsWiperActive(false)
        offTimer = setTimeout(() => {
          if (!wipeLoopRef.current || !rainingRef.current) return
          cycle()
        }, 3_000)
      }, 10_000)
    }

    cycle()

    return () => {
      wipeLoopRef.current = false
      clearTimeout(onTimer)
      clearTimeout(offTimer)
    }
  }, [isRaining])

  return { isRaining, isWiperActive }
}
