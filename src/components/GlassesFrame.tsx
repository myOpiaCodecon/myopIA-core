import type { GlassesSkin } from '../data/skins'

interface Props {
  skin: GlassesSkin
  isBroken?: boolean
  width?: string | number
  height?: string | number
}

// Paths do olho de gato — asa varre para fora/cima nas extremidades
const CE_L = 'M 12,12 Q 40,10 65,16 Q 90,18 104,30 Q 112,42 112,52 Q 110,76 65,82 Q 24,82 14,60 Q 10,38 12,12 Z'
const CE_R = 'M 268,12 Q 240,10 215,16 Q 190,18 176,30 Q 168,42 168,52 Q 170,76 215,82 Q 256,82 266,60 Q 270,38 268,12 Z'

export default function GlassesFrame({ skin, isBroken = false, width = 280, height = 100 }: Props) {
  const gradId = `gf-${skin.id}`
  const useGrad = !isBroken && !!skin.colorEffect
  const stroke  = isBroken ? '#991b1b' : useGrad ? `url(#${gradId})` : skin.frameColor
  const w       = skin.frameWidth
  const shape   = skin.shape ?? 'round'

  return (
    <svg width={width} height={height} viewBox="0 0 280 100" fill="none">
      <defs>
        {skin.colorEffect === 'rainbow' && !isBroken && (
          <linearGradient id={gradId} x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#e40303"/>
            <stop offset="16%"  stopColor="#ff8c00"/>
            <stop offset="33%"  stopColor="#ffed00"/>
            <stop offset="50%"  stopColor="#008026"/>
            <stop offset="66%"  stopColor="#004dff"/>
            <stop offset="83%"  stopColor="#750787"/>
            <stop offset="100%" stopColor="#e40303"/>
          </linearGradient>
        )}
        {skin.colorEffect === 'tortoise' && !isBroken && (
          <linearGradient id={gradId} x1="0" y1="0" x2="280" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#C17F3A"/>
            <stop offset="22%"  stopColor="#7B3F10"/>
            <stop offset="45%"  stopColor="#D4922A"/>
            <stop offset="65%"  stopColor="#4A2400"/>
            <stop offset="85%"  stopColor="#B86F20"/>
            <stop offset="100%" stopColor="#7B3F10"/>
          </linearGradient>
        )}
      </defs>

      {/* ── Lentes ── */}
      {shape === 'round' && <>
        <circle cx="65"  cy="50" r="48" stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
        <circle cx="215" cy="50" r="48" stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
      </>}

      {shape === 'aviador' && <>
        <ellipse cx="65"  cy="50" rx="44" ry="50" stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
        <ellipse cx="215" cy="50" rx="44" ry="50" stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
      </>}

      {shape === 'square' && <>
        <rect x="24"  y="9" width="82" height="82" rx="8" stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
        <rect x="174" y="9" width="82" height="82" rx="8" stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
      </>}

      {shape === 'rect' && <>
        <rect x="17"  y="18" width="96" height="64" rx="5" stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
        <rect x="167" y="18" width="96" height="64" rx="5" stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
      </>}

      {shape === 'cateye' && <>
        <path d={CE_L} stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
        <path d={CE_R} stroke={stroke} strokeWidth={w} fill={skin.lensColor}/>
      </>}

      {/* ── Ponte ── */}
      {shape === 'round' && (
        <path d="M 113 50 Q 140 36 167 50" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
      )}
      {shape === 'aviador' && <>
        <path d="M 109 44 Q 140 28 171 44" stroke={stroke} strokeWidth={w}       strokeLinecap="round"/>
        <path d="M 113 54 Q 140 40 167 54" stroke={stroke} strokeWidth={w * 0.7} strokeLinecap="round"/>
      </>}
      {shape === 'square' && (
        <path d="M 106 20 Q 140 14 174 20" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
      )}
      {shape === 'rect' && (
        <path d="M 113 26 Q 140 20 167 26" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
      )}
      {shape === 'cateye' && (
        <path d="M 112 48 Q 140 40 168 48" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
      )}

      {/* ── Hastes ── */}
      {(shape === 'round' || shape === 'aviador' || shape === 'rect') && <>
        <line x1="17"  y1="50" x2="0"   y2="46" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
        <line x1="263" y1="50" x2="280" y2="46" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
      </>}
      {shape === 'square' && <>
        <line x1="24"  y1="50" x2="0"   y2="46" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
        <line x1="256" y1="50" x2="280" y2="46" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
      </>}
      {shape === 'cateye' && <>
        <line x1="13"  y1="50" x2="0"   y2="46" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
        <line x1="267" y1="50" x2="280" y2="46" stroke={stroke} strokeWidth={w} strokeLinecap="round"/>
      </>}
    </svg>
  )
}
