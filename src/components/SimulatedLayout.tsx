import { useGlassesPhysics } from '../hooks/useGlassesPhysics'
import BlurOverlay from './BlurOverlay'
import Glasses from './Glasses'

interface Props {
  children: React.ReactNode
}

export default function SimulatedLayout({ children }: Props) {
  const { pos, isDragging, onMouseDown } = useGlassesPhysics()

  return (
    <>
      {children}

      {/* Overlay transparente durante o drag impede que iframes (Win11) roubem eventos de mouse */}
      {isDragging && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1999, cursor: 'grabbing' }} />
      )}

      <BlurOverlay glassesPos={pos} />
      <Glasses pos={pos} onMouseDown={onMouseDown} dragging={isDragging} />
    </>
  )
}
