import { usePlan } from '../contexts/PlanContext'
import { PLANS } from '../data/plans'
import { useGlassesPhysics } from '../hooks/useGlassesPhysics'
import { useLensCondition } from '../hooks/useLensCondition'
import { useRain } from '../hooks/useRain'
import { useRainSounds } from '../hooks/useRainSounds'
import BlurOverlay from './BlurOverlay'
import Glasses from './Glasses'
import ConfigPanel from './ConfigPanel'
import RainCanvas from './RainCanvas'
import WiperAnimation from './WiperAnimation'
import HandCleanAnimation from './HandCleanAnimation'

interface Props {
  children: React.ReactNode
}

export default function SimulatedLayout({ children }: Props) {
  const { planId } = usePlan()
  const plan = PLANS.find(p => p.id === planId)!

  const { pos, isDragging, isBroken, onMouseDown, repair } = useGlassesPhysics(plan.canBreak)
  const { dirt, isHandCleaning, wipe } = useLensCondition()
  const { isRaining, isWiperActive } = useRain()
  useRainSounds(isRaining, isWiperActive)

  const showWarnBtn   = dirt >= 0.4 && dirt < 0.8 && !isHandCleaning && !isBroken
  const showUrgentBtn = dirt >= 0.8 && !isHandCleaning && !isBroken

  return (
    <>
      {children}

      {isDragging && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1999, cursor: 'grabbing' }} />
      )}

      {/* Chuva */}
      <RainCanvas active={isRaining} />

      {/* Blur + sujeira nas lentes */}
      <BlurOverlay glassesPos={pos} dirt={dirt} />

      {/* Limpador automático (ativado pela chuva) */}
      <WiperAnimation pos={pos} active={isWiperActive} />

      {/* Mão com pano (limpeza manual de sujeira) */}
      <HandCleanAnimation pos={pos} active={isHandCleaning} />

      {/* Frame do óculos — acima das camadas de sujeira */}
      <Glasses pos={pos} onMouseDown={onMouseDown} dragging={isDragging} isBroken={isBroken} />

      <ConfigPanel isBroken={isBroken} onRepair={repair} />

      {/* Botão de limpeza manual — aparece com sujeira */}
      {(showWarnBtn || showUrgentBtn) && (
        <button
          onClick={wipe}
          style={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            zIndex: 3001,
            padding: '10px 20px',
            borderRadius: 999,
            border: 'none',
            background: showUrgentBtn ? '#ef4444' : '#f59e0b',
            color: '#fff',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'system-ui, sans-serif',
            animation: showUrgentBtn
              ? 'pulse-urgent 0.7s ease-in-out infinite'
              : 'pulse-warn 1.4s ease-in-out infinite',
          }}
        >
          {showUrgentBtn ? '🚨 LIMPA AS LENTE' : '🧹 Limpar lentes'}
        </button>
      )}

      {/* Indicador de chuva (debug visual) */}
      {isRaining && (
        <div style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 3001,
          padding: '6px 14px', borderRadius: 999,
          background: 'rgba(15,30,60,0.8)',
          color: '#93c5fd', fontSize: 12, fontWeight: 600,
          fontFamily: 'system-ui, sans-serif',
          border: '1px solid rgba(147,197,253,0.3)',
        }}>
          🌧️ {isWiperActive ? 'limpando...' : 'chovendo'}
        </div>
      )}
    </>
  )
}
