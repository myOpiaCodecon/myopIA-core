import { usePlan } from '../contexts/PlanContext'
import { PLANS } from '../data/plans'
import { useGlassesPhysics } from '../hooks/useGlassesPhysics'
import BlurOverlay from './BlurOverlay'
import Glasses from './Glasses'
import ConfigPanel from './ConfigPanel'

interface Props {
  children: React.ReactNode
}

export default function SimulatedLayout({ children }: Props) {
  const { planId } = usePlan()
  const plan = PLANS.find(p => p.id === planId)!

  const { pos, isDragging, isBroken, onMouseDown, repair } = useGlassesPhysics(plan.canBreak)

  return (
    <>
      {children}

      {/* Overlay transparente durante drag impede iframes (Win11) de roubar eventos */}
      {isDragging && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1999, cursor: 'grabbing' }} />
      )}

      <BlurOverlay glassesPos={pos} />
      <Glasses pos={pos} onMouseDown={onMouseDown} dragging={isDragging} isBroken={isBroken} />
      <ConfigPanel isBroken={isBroken} onRepair={repair} />
    </>
  )
}
