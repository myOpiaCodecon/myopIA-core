import { createContext, useContext, useState, type ReactNode } from 'react'
import type { PlanId } from '../data/plans'

interface PlanContextValue {
  planId: PlanId
  setPlan: (id: PlanId) => void
}

const PlanContext = createContext<PlanContextValue>({
  planId: 'free',
  setPlan: () => {},
})

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanId] = useState<PlanId>(() => {
    return (localStorage.getItem('myopia-plan') as PlanId) ?? 'free'
  })

  const setPlan = (id: PlanId) => {
    setPlanId(id)
    localStorage.setItem('myopia-plan', id)
  }

  return (
    <PlanContext.Provider value={{ planId, setPlan }}>
      {children}
    </PlanContext.Provider>
  )
}

export const usePlan = () => useContext(PlanContext)
