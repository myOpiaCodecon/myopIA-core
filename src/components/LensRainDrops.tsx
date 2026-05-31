import type { GlassesPos } from '../hooks/useGlassesPhysics'

interface Props {
  pos: GlassesPos
  raining: boolean
  wiping: boolean
}

// Gotas pré-calculadas dentro da lente esquerda (cx=65, cy=50, r=47)
const DROPS_L = [
  { x: 58, y: 24, r: 3.8, d: 0.0 }, { x: 44, y: 40, r: 2.8, d: 0.5 },
  { x: 79, y: 35, r: 4.2, d: 0.9 }, { x: 52, y: 55, r: 2.4, d: 1.3 },
  { x: 73, y: 50, r: 3.4, d: 0.4 }, { x: 38, y: 53, r: 2.6, d: 1.6 },
  { x: 85, y: 60, r: 2.2, d: 0.8 }, { x: 57, y: 67, r: 3.6, d: 0.2 },
  { x: 46, y: 30, r: 2.2, d: 1.8 }, { x: 75, y: 26, r: 2.8, d: 0.7 },
  { x: 64, y: 62, r: 3.0, d: 1.1 }, { x: 32, y: 47, r: 2.0, d: 1.4 },
]

// Lente direita: mesmas posições + 150px no X
const DROPS_R = DROPS_L.map(d => ({ ...d, x: d.x + 150 }))

export default function LensRainDrops({ pos, raining, wiping }: Props) {
  if (!raining) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 2003,
        pointerEvents: 'none',
      }}
    >
      <svg width="280" height="100" viewBox="0 0 280 100" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          {/* ClipPaths garantem que as gotas fiquem só dentro das lentes */}
          <clipPath id="clip-left-lens">
            <circle cx="65" cy="50" r="46" />
          </clipPath>
          <clipPath id="clip-right-lens">
            <circle cx="215" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* Gotas na lente esquerda */}
        <g clipPath="url(#clip-left-lens)">
          {DROPS_L.map((d, i) => (
            <g key={i} style={{
              animation: wiping
                ? `drop-wipe 0.35s ease-in ${i * 0.03}s both`
                : `drop-appear 0.5s ease-out ${d.d}s both`,
            }}>
              {/* Corpo da gota */}
              <ellipse cx={d.x} cy={d.y} rx={d.r} ry={d.r * 1.5}
                fill="rgba(190, 230, 255, 0.65)" />
              {/* Reflexo interno */}
              <ellipse cx={d.x - d.r * 0.3} cy={d.y - d.r * 0.3} rx={d.r * 0.35} ry={d.r * 0.45}
                fill="rgba(255, 255, 255, 0.55)" />
              {/* Fio de água escorrendo */}
              <line
                x1={d.x} y1={d.y + d.r * 1.5}
                x2={d.x} y2={d.y + d.r * 1.5 + d.r * 2.2}
                stroke="rgba(180, 220, 255, 0.4)" strokeWidth="1.2" strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        {/* Gotas na lente direita */}
        <g clipPath="url(#clip-right-lens)">
          {DROPS_R.map((d, i) => (
            <g key={i} style={{
              animation: wiping
                ? `drop-wipe 0.35s ease-in ${i * 0.03}s both`
                : `drop-appear 0.5s ease-out ${d.d}s both`,
            }}>
              <ellipse cx={d.x} cy={d.y} rx={d.r} ry={d.r * 1.5}
                fill="rgba(190, 230, 255, 0.65)" />
              <ellipse cx={d.x - d.r * 0.3} cy={d.y - d.r * 0.3} rx={d.r * 0.35} ry={d.r * 0.45}
                fill="rgba(255, 255, 255, 0.55)" />
              <line
                x1={d.x} y1={d.y + d.r * 1.5}
                x2={d.x} y2={d.y + d.r * 1.5 + d.r * 2.2}
                stroke="rgba(180, 220, 255, 0.4)" strokeWidth="1.2" strokeLinecap="round"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
