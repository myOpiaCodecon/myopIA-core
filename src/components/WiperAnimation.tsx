import type { GlassesPos } from '../hooks/useGlassesPhysics'

interface Props {
  pos: GlassesPos
  active: boolean
}

export default function WiperAnimation({ pos, active }: Props) {
  if (!active) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 2004,
        pointerEvents: 'none',
      }}
    >
      <svg width="280" height="120" viewBox="0 0 280 120" fill="none" style={{ overflow: 'visible' }}>
        {/* Rodo esquerdo — varre a lente esquerda (pivot no fundo) */}
        <g style={{
          transformOrigin: '65px 100px',
          animation: 'wiper-sweep-l 0.7s ease-in-out infinite',
        }}>
          <line x1="65" y1="100" x2="65" y2="12" stroke="#3a3a3a" strokeWidth="4" strokeLinecap="round" />
          <rect x="47" y="7" width="36" height="8" rx="3" fill="#5b8cff" />
          <rect x="51" y="9"  width="12" height="3" rx="1.5" fill="white" opacity="0.45" />
        </g>

        {/* Rodo direito — defasado para o efeito bêbado */}
        <g style={{
          transformOrigin: '215px 100px',
          animation: 'wiper-sweep-r 0.7s ease-in-out infinite',
          animationDelay: '0.35s',
        }}>
          <line x1="215" y1="100" x2="215" y2="12" stroke="#3a3a3a" strokeWidth="4" strokeLinecap="round" />
          <rect x="197" y="7" width="36" height="8" rx="3" fill="#5b8cff" />
          <rect x="201" y="9"  width="12" height="3" rx="1.5" fill="white" opacity="0.45" />
        </g>

        {/* Gotas de água escorrendo */}
        {[
          { cx: 55, cy: 40, delay: '0.0s' }, { cx: 72, cy: 55, delay: '0.2s' },
          { cx: 60, cy: 65, delay: '0.4s' }, { cx: 48, cy: 52, delay: '0.15s' },
          { cx: 205, cy: 40, delay: '0.1s' }, { cx: 222, cy: 55, delay: '0.3s' },
          { cx: 210, cy: 65, delay: '0.45s' }, { cx: 228, cy: 48, delay: '0.25s' },
        ].map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="2.5"
            fill="#93c5fd"
            style={{ animation: `rain-drip 1.2s ease-in infinite`, animationDelay: d.delay }}
          />
        ))}
      </svg>
    </div>
  )
}
