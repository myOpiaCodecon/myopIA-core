import type { GlassesPos } from '../hooks/useGlassesPhysics'

interface Props {
  glassesPos: GlassesPos
  blurAmount?: number
  dirt?: number
}

const LENS_H_OFFSET = 75
const LENS_RADIUS   = 49

export default function BlurOverlay({ glassesPos, blurAmount = 6, dirt = 0 }: Props) {
  const { x, y, rotation } = glassesPos

  const rad    = rotation * (Math.PI / 180)
  const cosA   = Math.cos(rad)
  const sinA   = Math.sin(rad)
  const leftX  = x + (-LENS_H_OFFSET) * cosA
  const leftY  = y + (-LENS_H_OFFSET) * sinA
  const rightX = x + LENS_H_OFFSET * cosA
  const rightY = y + LENS_H_OFFSET * sinA

  // Máscara de EXCLUSÃO: blur em tudo EXCETO as lentes
  const excludeMask = [
    `radial-gradient(circle ${LENS_RADIUS}px at ${leftX}px ${leftY}px, black 99%, transparent 100%)`,
    `radial-gradient(circle ${LENS_RADIUS}px at ${rightX}px ${rightY}px, black 99%, transparent 100%)`,
    'linear-gradient(black, black)',
  ].join(', ')

  // Máscara de INCLUSÃO: mostra apenas dentro das lentes (union de dois círculos)
  const includeMask = [
    `radial-gradient(circle ${LENS_RADIUS}px at ${leftX}px ${leftY}px, black 99%, transparent 100%)`,
    `radial-gradient(circle ${LENS_RADIUS}px at ${rightX}px ${rightY}px, black 99%, transparent 100%)`,
  ].join(', ')

  return (
    <>
      {/* Camada de blur do entorno — não toca as lentes, sem sepia */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          maskImage: excludeMask,
          WebkitMaskImage: excludeMask,
          maskComposite: 'exclude' as React.CSSProperties['maskComposite'],
          WebkitMaskComposite: 'destination-out',
          pointerEvents: 'none',
        } as React.CSSProperties}
      />

      {/* Blur extra DENTRO das lentes — cresce com sujeira */}
      {dirt > 0.05 && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2001,
            backdropFilter: `blur(${dirt * 6}px)`,
            WebkitBackdropFilter: `blur(${dirt * 6}px)`,
            maskImage: includeMask,
            WebkitMaskImage: includeMask,
            maskComposite: 'add' as React.CSSProperties['maskComposite'],
            WebkitMaskComposite: 'source-over',
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
      )}

      {/* Borra marrom DENTRO das lentes — restrita pelas máscaras */}
      {dirt > 0.05 && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2002,
            background: [
              `radial-gradient(circle ${LENS_RADIUS * 0.85}px at ${leftX}px ${leftY}px,
                rgba(90,55,20,${dirt * 0.55}) 10%,
                rgba(90,55,20,${dirt * 0.25}) 60%,
                transparent 100%)`,
              `radial-gradient(circle ${LENS_RADIUS * 0.85}px at ${rightX}px ${rightY}px,
                rgba(90,55,20,${dirt * 0.55}) 10%,
                rgba(90,55,20,${dirt * 0.25}) 60%,
                transparent 100%)`,
            ].join(', '),
            maskImage: includeMask,
            WebkitMaskImage: includeMask,
            maskComposite: 'add' as React.CSSProperties['maskComposite'],
            WebkitMaskComposite: 'source-over',
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
      )}
    </>
  )
}
