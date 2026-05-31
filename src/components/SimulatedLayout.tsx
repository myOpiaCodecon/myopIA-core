import { useEffect, useRef } from 'react'
import { usePlan } from '../contexts/PlanContext'
import { PLANS } from '../data/plans'
import { useGlassesPhysics } from '../hooks/useGlassesPhysics'
import { useLensCondition } from '../hooks/useLensCondition'
import { useRain } from '../hooks/useRain'
import { useRainSounds } from '../hooks/useRainSounds'
import BlurOverlay from './BlurOverlay'
import Glasses from './Glasses'
import ConfigPanel from './ConfigPanel'
import RainCanvas from './RainCanvas'
import WiperAnimation from './WiperAnimation'
import HandCleanAnimation from './HandCleanAnimation'

interface Props {
  children: React.ReactNode
}

export default function SimulatedLayout({ children }: Props) {
  const { planId } = usePlan()
  const plan = PLANS.find(p => p.id === planId)!

  const { pos, isDragging, isBroken, onMouseDown, repair } = useGlassesPhysics(plan.canBreak)
  const { dirt, isHandCleaning, onLensMouseMove } = useLensCondition()
  const { isRaining, isWiperActive } = useRain()
  useRainSounds(isRaining, isWiperActive)

  const posRef = useRef(pos)
  posRef.current = pos

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      onLensMouseMove(e.clientX, e.clientY, posRef.current)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [onLensMouseMove])

  return (
    <>
      {children}

      {isDragging && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1999, cursor: 'grabbing' }} />
      )}

      <RainCanvas active={isRaining} />
      <BlurOverlay glassesPos={pos} dirt={dirt} />
      <WiperAnimation pos={pos} active={isWiperActive} />
      <HandCleanAnimation pos={pos} active={isHandCleaning} />
      <Glasses pos={pos} onMouseDown={onMouseDown} dragging={isDragging} isBroken={isBroken} />
      <ConfigPanel isBroken={isBroken} onRepair={repair} />

      {isRaining && (
        <div style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 3001,
          padding: '6px 14px', borderRadius: 999,
          background: 'rgba(15,30,60,0.8)',
          color: '#93c5fd', fontSize: 12, fontWeight: 600,
          fontFamily: 'system-ui, sans-serif',
          border: '1px solid rgba(147,197,253,0.3)',
        }}>
          🌧️ {isWiperActive ? 'limpando...' : 'chovendo'}
        </div>
      )}
    </>
  )
}
