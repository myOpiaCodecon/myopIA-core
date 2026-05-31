import type { GlassesPos } from '../hooks/useGlassesPhysics'

interface Props {
  pos: GlassesPos
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
  dragging: boolean
  isBroken: boolean
}

function CrackOverlay() {
  return (
    <svg
      width="280"
      height="100"
      viewBox="0 0 280 100"
      fill="none"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {/* Rachaduras lente esquerda */}
      <g stroke="#1a1a1a" strokeWidth="1.2" opacity="0.75">
        <line x1="65" y1="50" x2="42" y2="28" />
        <line x1="65" y1="50" x2="80" y2="22" />
        <line x1="65" y1="50" x2="88" y2="58" />
        <line x1="65" y1="50" x2="44" y2="68" />
        <line x1="65" y1="50" x2="50" y2="44" />
        <line x1="42" y1="28" x2="34" y2="38" />
        <line x1="80" y1="22" x2="90" y2="34" />
      </g>
      {/* Rachaduras lente direita */}
      <g stroke="#1a1a1a" strokeWidth="1.2" opacity="0.75">
        <line x1="215" y1="50" x2="198" y2="26" />
        <line x1="215" y1="50" x2="238" y2="30" />
        <line x1="215" y1="50" x2="242" y2="62" />
        <line x1="215" y1="50" x2="192" y2="66" />
        <line x1="198" y1="26" x2="188" y2="36" />
        <line x1="238" y1="30" x2="248" y2="42" />
      </g>
    </svg>
  )
}

export default function Glasses({ pos, onMouseDown, dragging, isBroken }: Props) {
  return (
    <div
      onMouseDown={isBroken ? undefined : onMouseDown}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 2001,
        transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
        cursor: isBroken ? 'not-allowed' : dragging ? 'grabbing' : 'grab',
        pointerEvents: 'all',
        userSelect: 'none',
        touchAction: 'none',
        filter: isBroken
          ? 'drop-shadow(0 2px 8px rgba(220,38,38,0.5))'
          : 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* viewBox 280×100 — centros das lentes em (65,50) e (215,50)
            Offset de cada lente em tela: ±75px (LENS_H_OFFSET em BlurOverlay) */}
        <svg width="280" height="100" viewBox="0 0 280 100" fill="none">
          <circle
            cx="65" cy="50" r="48"
            stroke={isBroken ? '#991b1b' : '#1a1a1a'}
            strokeWidth="3.5"
            fill="rgba(180,220,255,0.04)"
          />
          <circle
            cx="215" cy="50" r="48"
            stroke={isBroken ? '#991b1b' : '#1a1a1a'}
            strokeWidth="3.5"
            fill="rgba(180,220,255,0.04)"
          />
          <path d="M113 50 Q140 36 167 50" stroke={isBroken ? '#991b1b' : '#1a1a1a'} strokeWidth="3" strokeLinecap="round" />
          <line x1="17"  y1="50" x2="0"   y2="46" stroke={isBroken ? '#991b1b' : '#1a1a1a'} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="263" y1="50" x2="280" y2="46" stroke={isBroken ? '#991b1b' : '#1a1a1a'} strokeWidth="3.5" strokeLinecap="round" />
        </svg>

        {isBroken && <CrackOverlay />}
      </div>
    </div>
  )
}
