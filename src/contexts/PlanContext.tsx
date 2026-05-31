import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { PlanId } from '../data/plans'

interface PlanContextValue {
  planId: PlanId
  setPlan: (id: PlanId) => void
  contactLens: boolean
  setContactLens: (v: boolean) => void
}

const PlanContext = createContext<PlanContextValue>({
  planId: 'free',
  setPlan: () => {},
  contactLens: false,
  setContactLens: () => {},
})

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanId] = useState<PlanId>(() => {
    return (localStorage.getItem('myopia-plan') as PlanId) ?? 'free'
  })

  const [contactLens, setContactLensState] = useState<boolean>(() => {
    const plan = (localStorage.getItem('myopia-plan') as PlanId) ?? 'free'
    return plan === 'enterprise' && localStorage.getItem('myopia-contact-lens') === 'true'
  })

  const setPlan = (id: PlanId) => {
    setPlanId(id)
    localStorage.setItem('myopia-plan', id)
    if (id !== 'enterprise') {
      setContactLensState(false)
      localStorage.removeItem('myopia-contact-lens')
    }
  }

  const setContactLens = useCallback((v: boolean) => {
    setContactLensState(v)
    localStorage.setItem('myopia-contact-lens', v ? 'true' : 'false')
  }, [])

  return (
    <PlanContext.Provider value={{ planId, setPlan, contactLens, setContactLens }}>
      {children}
    </PlanContext.Provider>
  )
}

export const usePlan = () => useContext(PlanContext)
