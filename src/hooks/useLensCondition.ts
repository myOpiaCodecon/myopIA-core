import { useState, useEffect, useCallback } from 'react'

export function useLensCondition() {
  const [dirt, setDirt] = useState(0)
  const [isHandCleaning, setIsHandCleaning] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setDirt(d => Math.min(d + 1 / 120, 1)) // satura em 120s (2 min)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const wipe = useCallback(() => {
    if (isHandCleaning) return
    setIsHandCleaning(true)
    setTimeout(() => {
      setDirt(0)
      setIsHandCleaning(false)
    }, 2600)
  }, [isHandCleaning])

  return { dirt, isHandCleaning, wipe }
}
