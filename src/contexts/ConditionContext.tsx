import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { ConditionId } from '../data/conditions'

interface ConditionState {
  enabled: boolean
  severity: number  // 0–100
}

type ConditionsMap = Record<ConditionId, ConditionState>

interface ConditionContextValue {
  conditions: ConditionsMap
  toggle: (id: ConditionId) => void
  setSeverity: (id: ConditionId, value: number) => void
}

const defaults: ConditionsMap = {
  hyperopia: { enabled: false, severity: 50 },
  glaucoma:  { enabled: false, severity: 50 },
  cataract:  { enabled: false, severity: 50 },
}

function load(): ConditionsMap {
  try {
    const raw = localStorage.getItem('myopia-conditions')
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults
  } catch {
    return defaults
  }
}

const ConditionContext = createContext<ConditionContextValue>({} as ConditionContextValue)

export function ConditionProvider({ children }: { children: ReactNode }) {
  const [conditions, setConditions] = useState<ConditionsMap>(load)

  const update = useCallback((next: ConditionsMap) => {
    setConditions(next)
    localStorage.setItem('myopia-conditions', JSON.stringify(next))
  }, [])

  const toggle = useCallback((id: ConditionId) => {
    setConditions(prev => {
      const next = { ...prev, [id]: { ...prev[id], enabled: !prev[id].enabled } }
      localStorage.setItem('myopia-conditions', JSON.stringify(next))
      return next
    })
  }, [])

  const setSeverity = useCallback((id: ConditionId, value: number) => {
    setConditions(prev => {
      const next = { ...prev, [id]: { ...prev[id], severity: value } }
      localStorage.setItem('myopia-conditions', JSON.stringify(next))
      return next
    })
  }, [update])

  return (
    <ConditionContext.Provider value={{ conditions, toggle, setSeverity }}>
      {children}
    </ConditionContext.Provider>
  )
}

export const useCondition = () => useContext(ConditionContext)
