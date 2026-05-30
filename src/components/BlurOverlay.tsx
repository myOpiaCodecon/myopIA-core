import type { GlassesPos } from '../hooks/useGlassesPhysics'

interface Props {
  glassesPos: GlassesPos
  blurAmount?: number
}

const LENS_H_OFFSET = 75
const LENS_RADIUS   = 49

export default function BlurOverlay({ glassesPos, blurAmount = 6 }: Props) {
  const { x, y, rotation } = glassesPos

  // Rotacionar os centros das lentes junto com o óculos para acompanhar a física
  // CSS rotate(θdeg) é horário com y-axis para baixo: x' = x·cos θ + y·sin θ
  const rad    = rotation * (Math.PI / 180)
  const cosA   = Math.cos(rad)
  const sinA   = Math.sin(rad)
  const leftX  = x + (-LENS_H_OFFSET) * cosA
  const leftY  = y + (-LENS_H_OFFSET) * sinA   // sem offset vertical (lentes no meio)
  const rightX = x + LENS_H_OFFSET * cosA
  const rightY = y + LENS_H_OFFSET * sinA

  const mask = [
    `radial-gradient(circle ${LENS_RADIUS}px at ${leftX}px ${leftY}px, black 99%, transparent 100%)`,
    `radial-gradient(circle ${LENS_RADIUS}px at ${rightX}px ${rightY}px, black 99%, transparent 100%)`,
    'linear-gradient(black, black)',
  ].join(', ')

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        maskImage: mask,
        WebkitMaskImage: mask,
        maskComposite: 'exclude' as React.CSSProperties['maskComposite'],
        WebkitMaskComposite: 'destination-out',
        pointerEvents: 'none',
      } as React.CSSProperties}
    />
  )
}
