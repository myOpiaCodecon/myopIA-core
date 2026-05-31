import type { GlassesPos } from '../hooks/useGlassesPhysics'

interface Props {
  pos: GlassesPos
  active: boolean
}

export default function HandCleanAnimation({ pos, active }: Props) {
  if (!active) return null

  // A mão entra da direita, limpa lente direita, lente esquerda, sai pela direita
  // Keyframes em index.css: hand-clean (2.6s)
  // O grupo começa posicionado no centro da lente direita (215, 50)
  // e os keyframes movem entre as lentes usando translate()

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 2005,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="280" height="100" viewBox="0 0 280 100"
        fill="none" style={{ overflow: 'visible' }}
      >
        {/* Grupo da mão — anima entre as lentes e sai */}
        <g style={{
          animation: 'hand-clean 2.6s ease-in-out both',
        }}>
          {/* Pano/flanela */}
          <ellipse cx="215" cy="72" rx="26" ry="18" fill="#d4a96a" />
          <ellipse cx="215" cy="72" rx="22" ry="14" fill="#c49058" />
          {/* Textura do pano */}
          <line x1="200" y1="67" x2="230" y2="67" stroke="#b07840" strokeWidth="1.2" opacity="0.6" />
          <line x1="202" y1="73" x2="228" y2="73" stroke="#b07840" strokeWidth="1.2" opacity="0.6" />
          <line x1="200" y1="79" x2="230" y2="79" stroke="#b07840" strokeWidth="1.2" opacity="0.6" />
          <line x1="208" y1="60" x2="208" y2="84" stroke="#b07840" strokeWidth="1"   opacity="0.4" />
          <line x1="222" y1="60" x2="222" y2="84" stroke="#b07840" strokeWidth="1"   opacity="0.4" />

          {/* Palma */}
          <rect x="201" y="48" width="28" height="20" rx="7" fill="#ffc999" />
          {/* Dedos */}
          <rect x="204" y="30" width="8" height="20" rx="4" fill="#ffc999" />
          <rect x="213" y="26" width="8" height="24" rx="4" fill="#ffc999" />
          <rect x="222" y="28" width="8" height="22" rx="4" fill="#ffc999" />
          <rect x="231" y="32" width="7" height="18" rx="4" fill="#ffc999" />
          {/* Vincos dos nós dos dedos */}
          <line x1="208" y1="44" x2="208" y2="48" stroke="#e8a87c" strokeWidth="1.2" />
          <line x1="217" y1="44" x2="217" y2="48" stroke="#e8a87c" strokeWidth="1.2" />
          <line x1="226" y1="44" x2="226" y2="48" stroke="#e8a87c" strokeWidth="1.2" />
          <line x1="234" y1="45" x2="234" y2="48" stroke="#e8a87c" strokeWidth="1.2" />
          {/* Unhas */}
          <rect x="205.5" y="30" width="5" height="5" rx="2" fill="#ffb8a0" opacity="0.7" />
          <rect x="214.5" y="26" width="5" height="5" rx="2" fill="#ffb8a0" opacity="0.7" />
          <rect x="223.5" y="28" width="5" height="5" rx="2" fill="#ffb8a0" opacity="0.7" />
          <rect x="232" y="32" width="4.5" height="5" rx="2" fill="#ffb8a0" opacity="0.7" />
        </g>

        {/* Partículas de sujeira saindo (aparecem durante a limpeza) */}
        {[
          { cx: 180, cy: 30, delay: '0.4s', dx: -18, dy: -20 },
          { cx: 250, cy: 25, delay: '0.6s', dx:  16, dy: -22 },
          { cx: 170, cy: 55, delay: '0.8s', dx: -22, dy: -12 },
          { cx: 60,  cy: 30, delay: '1.5s', dx: -16, dy: -20 },
          { cx: 100, cy: 40, delay: '1.7s', dx:  14, dy: -18 },
        ].map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="4"
            fill={i % 2 === 0 ? '#8b6020' : '#a07030'}
            style={{
              animation: `dirt-fly 0.5s ease-out ${d.delay} both`,
              '--dx': `${d.dx}px`,
              '--dy': `${d.dy}px`,
            } as React.CSSProperties}
          />
        ))}

        {/* Estrelinhas de "limpinho" (aparecem no final) */}
        {['✨', '⭐', '✨'].map((s, i) => (
          <text key={i}
            x={[75, 140, 205][i]} y={20}
            textAnchor="middle" fontSize="14"
            style={{
              animation: `sparkle-pop 0.4s ease-out both`,
              animationDelay: `${2.0 + i * 0.15}s`,
            }}
          >
            {s}
          </text>
        ))}
      </svg>
    </div>
  )
}
