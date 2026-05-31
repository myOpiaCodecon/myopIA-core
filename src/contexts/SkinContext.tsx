import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { SkinId } from '../data/skins'

interface SkinContextValue {
  equippedSkinId: SkinId
  purchasedSkinIds: SkinId[]
  previewSkinId: SkinId | null
  activeSkinId: SkinId
  equipSkin: (id: SkinId) => void
  buySkin: (id: SkinId) => void
  startPreview: (id: SkinId) => void
  cancelPreview: () => void
}

const SkinContext = createContext<SkinContextValue>({} as SkinContextValue)

export function SkinProvider({ children }: { children: ReactNode }) {
  const [equippedSkinId, setEquippedSkinId] = useState<SkinId>(() =>
    (localStorage.getItem('myopia-skin-equipped') as SkinId) ?? 'classic'
  )
  const [purchasedSkinIds, setPurchasedSkinIds] = useState<SkinId[]>(() => {
    try {
      const v = localStorage.getItem('myopia-skin-purchased')
      return v ? (JSON.parse(v) as SkinId[]) : ['classic']
    } catch {
      return ['classic']
    }
  })
  const [previewSkinId, setPreviewSkinId] = useState<SkinId | null>(null)

  const activeSkinId = previewSkinId ?? equippedSkinId

  const equipSkin = useCallback((id: SkinId) => {
    setEquippedSkinId(id)
    localStorage.setItem('myopia-skin-equipped', id)
  }, [])

  const buySkin = useCallback((id: SkinId) => {
    setPurchasedSkinIds(prev => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      localStorage.setItem('myopia-skin-purchased', JSON.stringify(next))
      return next
    })
    setEquippedSkinId(id)
    localStorage.setItem('myopia-skin-equipped', id)
    setPreviewSkinId(null)
  }, [])

  const startPreview = useCallback((id: SkinId) => {
    setPreviewSkinId(id)
  }, [])

  const cancelPreview = useCallback(() => {
    setPreviewSkinId(null)
  }, [])

  return (
    <SkinContext.Provider value={{
      equippedSkinId,
      purchasedSkinIds,
      previewSkinId,
      activeSkinId,
      equipSkin,
      buySkin,
      startPreview,
      cancelPreview,
    }}>
      {children}
    </SkinContext.Provider>
  )
}

export const useSkin = () => useContext(SkinContext)
