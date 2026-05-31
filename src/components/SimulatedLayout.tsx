import { usePlan } from '../contexts/PlanContext'
import { useSkin } from '../contexts/SkinContext'
import { PLANS } from '../data/plans'
import { SKINS } from '../data/skins'
import { useGlassesPhysics } from '../hooks/useGlassesPhysics'
import { useLensCondition } from '../hooks/useLensCondition'
import { useRain } from '../hooks/useRain'
import { useRainSounds } from '../hooks/useRainSounds'
import BlurOverlay from './BlurOverlay'
import Glasses from './Glasses'
import ConfigPanel from './ConfigPanel'
import RainCanvas from './RainCanvas'
import WiperAnimation from './WiperAnimation'
import ConditionOverlay from './ConditionOverlay'
import CleaningCloth from './CleaningCloth'

interface Props {
  children: React.ReactNode
}

export default function SimulatedLayout({ children }: Props) {
  const { planId } = usePlan()
  const plan = PLANS.find(p => p.id === planId)!
  const { activeSkinId } = useSkin()
  const skin = SKINS.find(s => s.id === activeSkinId)!

  const { pos, isDragging, isBroken, onMouseDown, repair } = useGlassesPhysics(plan.canBreak)
  const { dirt, onClothMove, onClothRelease } = useLensCondition()
  const { isRaining, isWiperActive } = useRain()
  useRainSounds(isRaining, isWiperActive)

  return (
    <>
      {children}

      {isDragging && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1999, cursor: 'grabbing' }} />
      )}

      <RainCanvas active={isRaining} />
      <BlurOverlay glassesPos={pos} dirt={dirt} skin={skin} />
      <ConditionOverlay glassesPos={pos} skin={skin} />
      <WiperAnimation pos={pos} active={isWiperActive} />
      <CleaningCloth dirt={dirt} glassesPos={pos} onClothMove={onClothMove} onClothRelease={onClothRelease} />
      <Glasses pos={pos} onMouseDown={onMouseDown} dragging={isDragging} isBroken={isBroken} skin={skin} />
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
