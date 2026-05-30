import { useEffect } from 'react'
import { DesktopSlot } from './components/desktop/DesktopSlot'
import { BlurOverlay } from './components/effects/BlurOverlay'
import { GlassesScene } from './components/glasses/GlassesScene'
import { ControlSidebar } from './components/sidebar/ControlSidebar'
import { soundManager } from './sounds/soundManager'

export default function App() {
  useEffect(() => {
    soundManager.init()
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0 }}>
      {/* Layer 1 — desktop nítido (Gustavo monta aqui) */}
      <DesktopSlot />

      {/* Layer 2 — blur fullscreen com buraco na posição da lente */}
      <BlurOverlay />

      {/* Layer 3 — óculos 3D arrastável (Three.js / R3F) */}
      <GlassesScene />

      {/* UI — sidebar de controles */}
      <ControlSidebar />
    </div>
  )
}
