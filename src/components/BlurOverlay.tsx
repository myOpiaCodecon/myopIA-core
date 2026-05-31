import type { GlassesPos } from '../hooks/useGlassesPhysics'
import type { GlassesSkin, FrameShape } from '../data/skins'

interface Props {
  glassesPos: GlassesPos
  blurAmount?: number
  dirt?: number
  skin: GlassesSkin
}

const LENS_OFFSET = 75

// Shapes em coordenadas do SVG dos óculos (viewBox 0 0 280 100)
function LensShapes({ shape }: { shape: FrameShape }) {
  if (shape === 'square')
    return <>
      <rect x="24"  y="9"  width="82" height="82" rx="8"/>
      <rect x="174" y="9"  width="82" height="82" rx="8"/>
    </>
  if (shape === 'rect')
    return <>
      <rect x="17"  y="18" width="96" height="64" rx="5"/>
      <rect x="167" y="18" width="96" height="64" rx="5"/>
    </>
  if (shape === 'cateye')
    return <>
      <path d="M12,12 Q40,10 65,16 Q90,18 104,30 Q112,42 112,52 Q110,76 65,82 Q24,82 14,60 Q10,38 12,12Z"/>
      <path d="M268,12 Q240,10 215,16 Q190,18 176,30 Q168,42 168,52 Q170,76 215,82 Q256,82 266,60 Q270,38 268,12Z"/>
    </>
  if (shape === 'aviador')
    return <>
      <ellipse cx="65"  cy="50" rx="44" ry="50"/>
      <ellipse cx="215" cy="50" rx="44" ry="50"/>
    </>
  if (shape === 'stark')
    return <>
      <rect x="22"  y="20" width="86" height="60" rx="22"/>
      <rect x="172" y="20" width="86" height="60" rx="22"/>
    </>
  // round (default)
  return <>
    <circle cx="65"  cy="50" r="48"/>
    <circle cx="215" cy="50" r="48"/>
  </>
}

export default function BlurOverlay({ glassesPos, blurAmount = 6, dirt = 0, skin }: Props) {
  const { x, y, rotation } = glassesPos
  const shape   = skin.shape ?? 'round'
  // Espelha o transform CSS dos óculos: translate(-50%,-50%) rotate(r)
  // → translate(x-140, y-50) rotate(r, 140, 50)
  const transform = `translate(${x - 140},${y - 50}) rotate(${rotation},140,50)`

  // Centros das lentes em tela (para gradiente de sujeira)
  const rad    = rotation * (Math.PI / 180)
  const cosA   = Math.cos(rad)
  const sinA   = Math.sin(rad)
  const leftX  = x - LENS_OFFSET * cosA
  const leftY  = y - LENS_OFFSET * sinA
  const rightX = x + LENS_OFFSET * cosA
  const rightY = y + LENS_OFFSET * sinA

  return (
    <>
      {/* ── Definições SVG de máscara ── */}
      <svg
        aria-hidden
        style={{
          position: 'fixed', inset: 0,
          width: '100vw', height: '100vh',
          overflow: 'hidden', pointerEvents: 'none',
          zIndex: 1999,
        }}
      >
        <defs>
          {/* Máscara de exclusão: branco fora das lentes, preto dentro */}
          <mask id="blur-exclude-mask" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="white"/>
            <g transform={transform} fill="black">
              <LensShapes shape={shape}/>
            </g>
          </mask>

          {/* Máscara de inclusão: preto fora, branco dentro das lentes */}
          <mask id="blur-include-mask" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="black"/>
            <g transform={transform} fill="white">
              <LensShapes shape={shape}/>
            </g>
          </mask>
        </defs>
      </svg>

      {/* ── Blur fora das lentes ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          mask: 'url(#blur-exclude-mask)',
          WebkitMask: 'url(#blur-exclude-mask)',
          pointerEvents: 'none',
        } as React.CSSProperties}
      />

      {/* ── Blur de sujeira dentro das lentes ── */}
      {dirt > 0.05 && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 2001,
            backdropFilter: `blur(${dirt * 6}px)`,
            WebkitBackdropFilter: `blur(${dirt * 6}px)`,
            mask: 'url(#blur-include-mask)',
            WebkitMask: 'url(#blur-include-mask)',
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
      )}

      {/* ── Cor de sujeira dentro das lentes ── */}
      {dirt > 0.05 && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 2002,
            background: [
              `radial-gradient(circle 42px at ${leftX}px ${leftY}px,
                rgba(90,55,20,${dirt * 0.55}) 10%,
                rgba(90,55,20,${dirt * 0.25}) 60%,
                transparent 100%)`,
              `radial-gradient(circle 42px at ${rightX}px ${rightY}px,
                rgba(90,55,20,${dirt * 0.55}) 10%,
                rgba(90,55,20,${dirt * 0.25}) 60%,
                transparent 100%)`,
            ].join(', '),
            mask: 'url(#blur-include-mask)',
            WebkitMask: 'url(#blur-include-mask)',
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
      )}
    </>
  )
}
