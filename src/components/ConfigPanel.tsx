import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlan } from '../contexts/PlanContext'
import { useSkin } from '../contexts/SkinContext'
import { PLANS } from '../data/plans'

const STORAGE_REPAIR_START = 'myopia-repair-start'

interface Props {
  isBroken: boolean
  onRepair: () => void
}

function formatCountdown(ms: number) {
  if (ms <= 0) return '0:00:00'
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1000)
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function ConfigPanel({ isBroken, onRepair }: Props) {
  const navigate = useNavigate()
  const { planId } = usePlan()
  const plan = PLANS.find(p => p.id === planId)!
  const { previewSkinId } = useSkin()

  const [repairStart, setRepairStart] = useState<number | null>(() => {
    const v = localStorage.getItem(STORAGE_REPAIR_START)
    return v ? parseInt(v) : null
  })
  const [now, setNow] = useState(Date.now())
  const [open, setOpen] = useState(false)

  // Tick de countdown
  useEffect(() => {
    if (!repairStart) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [repairStart])

  // Verifica se o conserto terminou
  useEffect(() => {
    if (!repairStart || !plan.repairTimeMs) return
    if (now - repairStart >= plan.repairTimeMs) {
      localStorage.removeItem(STORAGE_REPAIR_START)
      setRepairStart(null)
      onRepair()
    }
  }, [now, repairStart, plan.repairTimeMs, onRepair])

  // Cancela o agendamento de conserto se os óculos forem reparados externamente
  useEffect(() => {
    if (!isBroken) {
      localStorage.removeItem(STORAGE_REPAIR_START)
      setRepairStart(null)
    }
  }, [isBroken])

  const requestRepair = () => {
    localStorage.setItem('myopia-ever-repaired', '1')
    if (plan.repairTimeMs === 0) {
      // Pro: instantâneo
      onRepair()
      return
    }
    // Free: agendar conserto com 4 horas
    const start = Date.now()
    localStorage.setItem(STORAGE_REPAIR_START, String(start))
    setRepairStart(start)
  }

  const remainingMs = repairStart && plan.repairTimeMs
    ? Math.max(0, plan.repairTimeMs - (now - repairStart))
    : null

  const isRepairing = repairStart !== null && isBroken

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 3000,
        fontFamily: 'Roboto, Arial, sans-serif',
      }}
    >
      {/* Painel expandido */}
      {open && (
        <div
          style={{
            marginBottom: 10,
            background: 'rgba(15,23,42,0.92)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            padding: '16px 18px',
            minWidth: 230,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            color: '#fff',
          }}
        >
          {/* Plano ativo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: plan.accent,
                boxShadow: `0 0 6px ${plan.accent}`,
              }}
            />
            <span style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Plano {plan.name}
            </span>
          </div>

          {/* Status dos óculos */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: '#cbd5e1' }}>Status dos óculos</span>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: isBroken ? '#f87171' : '#4ade80',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{isBroken ? '💔' : '✅'}</span>
              {isBroken ? 'Quebrado' : 'Intacto'}
            </div>
          </div>

          {/* Seção de conserto */}
          {isBroken && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
              {isRepairing ? (
                <>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>
                    Conserto em andamento…
                  </div>
                  <div
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      fontSize: 22,
                      fontWeight: 700,
                      color: plan.accent,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {formatCountdown(remainingMs ?? 0)}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>
                    {plan.repairTimeMs === 0
                      ? 'Conserto instantâneo disponível.'
                      : 'Conserto disponível em 4 horas.'}
                  </div>
                  <button
                    onClick={requestRepair}
                    style={{
                      width: '100%',
                      padding: '8px 0',
                      borderRadius: 8,
                      border: 'none',
                      background: plan.accent,
                      color: '#0f172a',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    {plan.repairTimeMs === 0 ? '⚡ Consertar agora' : '🔧 Solicitar conserto'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
        {/* Botão Missões */}
        <button
          onClick={() => navigate('/missoes')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(15,23,42,0.88)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <span>🎯</span>
          <span>Missões</span>
        </button>

        {/* Botão Ótica */}
        <button
          onClick={() => navigate('/otica', { state: { from: window.location.pathname } })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(15,23,42,0.88)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <span>👓</span>
          <span>Ótica</span>
          {previewSkinId && (
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#a78bfa',
              boxShadow: '0 0 6px #a78bfa',
            }} />
          )}
        </button>

        {/* Botão Config */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(15,23,42,0.88)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <span>⚙️</span>
          <span style={{ color: plan.accent }}>{plan.name}</span>
          {isBroken && (
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#f87171', boxShadow: '0 0 6px #f87171',
            }} />
          )}
        </button>
      </div>

    </div>
  )
}
