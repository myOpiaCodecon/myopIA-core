import { useState, useEffect, useRef, useCallback } from 'react'
import type { GlassesPos } from '../hooks/useGlassesPhysics'

interface Props {
  dirt: number
  glassesPos: GlassesPos
  onClothMove: (mx: number, my: number, pos: GlassesPos) => void
  onClothRelease: () => void
}

const DIRT_THRESHOLD = 0.2

// Posição de repouso: canto inferior direito
function restPos() {
  return { x: window.innerWidth - 76, y: window.innerHeight - 64 }
}

function ClothSVG({ isHeld, dirtLevel }: { isHeld: boolean; dirtLevel: number }) {
  // Manchas no pano que aparecem conforme ele limpa
  const stains = dirtLevel > 0.05 ? [
    { cx: 28, cy: 24, r: 5,   opacity: Math.min(dirtLevel * 0.7, 0.5) },
    { cx: 62, cy: 42, r: 7,   opacity: Math.min(dirtLevel * 0.5, 0.4) },
    { cx: 44, cy: 52, r: 4,   opacity: Math.min(dirtLevel * 0.6, 0.45) },
    { cx: 72, cy: 20, r: 3.5, opacity: Math.min(dirtLevel * 0.55, 0.35) },
  ] : []

  return (
    <svg
      width="108" height="76"
      viewBox="0 0 120 84"
      fill="none"
      style={{ display: 'block', filter: isHeld ? 'drop-shadow(0 10px 24px rgba(0,0,0,0.55))' : 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))' }}
    >
      <defs>
        <linearGradient id="cc-base" x1="0" y1="0" x2="120" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6a9cf0"/>
          <stop offset="48%"  stopColor="#3a6cd8"/>
          <stop offset="100%" stopColor="#1e4ab8"/>
        </linearGradient>

        <linearGradient id="cc-shine" x1="0" y1="0" x2="0" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="white" stopOpacity="0.32"/>
          <stop offset="38%" stopColor="white" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>

        <linearGradient id="cc-fold" x1="90" y1="52" x2="116" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#8abcff" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#103890" stopOpacity="0.9"/>
        </linearGradient>

        <linearGradient id="cc-edge-l" x1="0" y1="0" x2="0" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>

        {/* Padrão de microfibra: grade fina de fios */}
        <pattern id="cc-fiber" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <line x1="0" y1="1.8" x2="6" y2="1.8" stroke="rgba(255,255,255,0.13)" strokeWidth="0.9"/>
          <line x1="0" y1="4.2" x2="6" y2="4.2" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6"/>
          <line x1="1.8" y1="0" x2="1.8" y2="6" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>
          <line x1="4.2" y1="0" x2="4.2" y2="6" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
          {/* Cruzamentos (aspecto de tecido) */}
          <rect x="1.3" y="1.3" width="1" height="1" fill="rgba(255,255,255,0.07)" rx="0.2"/>
          <rect x="3.7" y="3.7" width="1" height="1" fill="rgba(255,255,255,0.05)" rx="0.2"/>
        </pattern>

        <clipPath id="cc-clip">
          <rect x="4" y="4" width="104" height="64" rx="12"/>
        </clipPath>
      </defs>

      {/* Sombra elíptica no chão */}
      <ellipse cx="62" cy="78" rx="48" ry="8" fill="rgba(0,0,0,0.18)"/>

      {/* Corpo principal */}
      <rect x="4" y="4" width="104" height="64" rx="12" fill="url(#cc-base)"/>

      {/* Textura microfibra */}
      <rect x="4" y="4" width="104" height="64" rx="12" fill="url(#cc-fiber)" clipPath="url(#cc-clip)"/>

      {/* Manchas de sujeira (acumulam conforme limpa) */}
      {stains.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy + 4} r={s.r}
          fill={i % 2 === 0 ? '#a07030' : '#8b5a18'}
          opacity={s.opacity}
          clipPath="url(#cc-clip)"
        />
      ))}

      {/* Brilho superior */}
      <rect x="4" y="4" width="104" height="34" rx="12" fill="url(#cc-shine)" clipPath="url(#cc-clip)"/>

      {/* Reflexo lateral esquerdo */}
      <rect x="4" y="4" width="12" height="64" rx="6" fill="url(#cc-edge-l)" clipPath="url(#cc-clip)"/>

      {/* Borda escura */}
      <rect x="4" y="4" width="104" height="64" rx="12" stroke="rgba(8,24,90,0.55)" strokeWidth="1.5"/>

      {/* Costura interna pontilhada */}
      <rect x="11" y="11" width="90" height="50" rx="9" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="7 5" fill="none"/>

      {/* Dobra no canto inferior direito — efeito 3D */}
      <path d="M 90 68 L 108 50 L 108 68 Z" fill="url(#cc-fold)"/>
      <line x1="90" y1="68" x2="108" y2="50" stroke="rgba(190,215,255,0.5)" strokeWidth="1.3"/>
      <line x1="95" y1="68" x2="108" y2="55" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>

      {/* Logo óculos decorativo no centro (sutil) */}
      <g transform="translate(52, 38)" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.22">
        <ellipse cx="-16" cy="0" rx="10" ry="7"/>
        <ellipse cx="16"  cy="0" rx="10" ry="7"/>
        <line x1="-6"  y1="-1" x2="6"  y2="-1"/>
        <line x1="-26" y1="-4" x2="-36" y2="-7"/>
        <line x1="26"  y1="-4" x2="36"  y2="-7"/>
      </g>
    </svg>
  )
}

export default function CleaningCloth({ dirt, glassesPos, onClothMove, onClothRelease }: Props) {
  const [isHeld, setIsHeld]             = useState(false)
  const [mousePos, setMousePos]         = useState({ x: 0, y: 0 })
  const [droppedPos, setDroppedPos]     = useState(restPos)
  const [showSparkles, setShowSparkles] = useState(false)
  const [visible, setVisible]           = useState(false)

  const isHeldRef         = useRef(false)
  const glassePosRef      = useRef(glassesPos)
  const prevDirtRef       = useRef(dirt)
  glassePosRef.current    = glassesPos

  // Aparece/desaparece conforme o dirt
  useEffect(() => {
    if (dirt > DIRT_THRESHOLD) setVisible(true)
    // Não some quando isHeld para não sumir na mão do usuário
    if (dirt === 0 && !isHeldRef.current) {
      const t = setTimeout(() => setVisible(false), 2000)
      return () => clearTimeout(t)
    }
  }, [dirt])

  // Detecta quando terminou de limpar
  useEffect(() => {
    if (prevDirtRef.current > 0.05 && dirt <= 0.01) {
      setShowSparkles(true)
      const t = setTimeout(() => setShowSparkles(false), 2000)
      prevDirtRef.current = dirt
      return () => clearTimeout(t)
    }
    prevDirtRef.current = dirt
  }, [dirt])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isHeldRef.current = true
    setIsHeld(true)
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isHeldRef.current) return
      setMousePos({ x: e.clientX, y: e.clientY })
      onClothMove(e.clientX, e.clientY, glassePosRef.current)
    }
    const onUp = (e: MouseEvent) => {
      if (!isHeldRef.current) return
      isHeldRef.current = false
      setIsHeld(false)
      setDroppedPos({ x: e.clientX, y: e.clientY })
      onClothRelease()
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [onClothMove, onClothRelease])

  if (!visible) return null

  const cx = isHeld ? mousePos.x : droppedPos.x
  const cy = isHeld ? mousePos.y : droppedPos.y

  // Animação de atenção varia com o nível de sujeira
  let attentionAnim = 'cc-idle 2.4s ease-in-out infinite'
  if (isHeld) attentionAnim = 'none'
  else if (dirt > 0.75) attentionAnim = 'cc-urgent 0.55s ease-in-out infinite'
  else if (dirt > 0.5)  attentionAnim = 'cc-warn 1s ease-in-out infinite'

  return (
    <>
      {/* Badge de "limpe!" quando sujo mas ainda não pegaram o pano */}
      {!isHeld && dirt > 0.35 && (
        <div style={{
          position: 'fixed',
          right: 24,
          bottom: 148,
          zIndex: 3099,
          pointerEvents: 'none',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: dirt > 0.75 ? '#fca5a5' : '#fcd34d',
          textTransform: 'uppercase',
          animation: 'cc-hint 2s ease-in-out infinite',
          textShadow: '0 1px 6px rgba(0,0,0,0.7)',
        }}>
          {dirt > 0.75 ? '😩 limpe!' : '🧹 sujo'}
        </div>
      )}

      {/* O pano */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'fixed',
          left: cx,
          top: cy,
          transform: 'translate(-50%, -50%)',
          zIndex: 3100,
          cursor: isHeld ? 'grabbing' : 'grab',
          animation: attentionAnim,
          willChange: 'left, top',
        }}
      >
        <ClothSVG isHeld={isHeld} dirtLevel={1 - dirt} />

        {/* Indicador de "segure" na primeira vez que aparece */}
        {!isHeld && dirt <= DIRT_THRESHOLD + 0.15 && (
          <div style={{
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 10,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.55)',
            whiteSpace: 'nowrap',
            fontFamily: 'system-ui, sans-serif',
            pointerEvents: 'none',
          }}>
            segure e limpe
          </div>
        )}
      </div>

      {/* Sparkles quando limpeza completa */}
      {showSparkles && (
        <div style={{
          position: 'fixed',
          left: glassesPos.x,
          top: glassesPos.y,
          transform: 'translate(-50%, -50%)',
          zIndex: 3101,
          pointerEvents: 'none',
        }}>
          <svg width="280" height="100" viewBox="0 0 280 100" fill="none" style={{ overflow: 'visible' }}>
            {['✨', '⭐', '✨'].map((s, i) => (
              <text key={i} x={[65, 140, 215][i]} y={20}
                textAnchor="middle" fontSize="16"
                style={{
                  animation: 'sparkle-pop 0.45s ease-out both',
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                {s}
              </text>
            ))}
          </svg>
        </div>
      )}
    </>
  )
}
