interface Props {
  glassesPos: { x: number; y: number }
  blurAmount?: number
}

const LENS_H_OFFSET = 75
const LENS_RADIUS = 49

export default function BlurOverlay({ glassesPos, blurAmount = 6 }: Props) {
  const { x, y } = glassesPos

  const mask = [
    `radial-gradient(circle ${LENS_RADIUS}px at ${x - LENS_H_OFFSET}px ${y}px, black 99%, transparent 100%)`,
    `radial-gradient(circle ${LENS_RADIUS}px at ${x + LENS_H_OFFSET}px ${y}px, black 99%, transparent 100%)`,
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
