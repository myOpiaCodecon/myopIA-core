import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlan } from '../../contexts/PlanContext'
import { useSkin } from '../../contexts/SkinContext'

interface Mission {
  id: string
  icon: string
  title: string
  desc: string
  check: () => boolean
  reward: string
}

function useMissions(): Mission[] {
  const { planId } = usePlan()

  return [
    {
      id: 'visit-browser',
      icon: '🌐',
      title: 'Primeiro Olhar',
      desc: 'Visite o navegador Myoopia',
      check: () => !!localStorage.getItem('myopia-visited-browser'),
      reward: 'Explorador da web turva',
    },
    {
      id: 'visit-youtube',
      icon: '🎬',
      title: 'Cinéfilo Miopão',
      desc: 'Assista algo no MyoTube',
      check: () => !!localStorage.getItem('myopia-visited-youtube'),
      reward: 'Espectador de pixels borrados',
    },
    {
      id: 'visit-windows',
      icon: '🪟',
      title: 'Janeleiro',
      desc: 'Explore o Windows simulado',
      check: () => !!localStorage.getItem('myopia-visited-windows'),
      reward: 'Usuário confuso de sistema',
    },
    {
      id: 'visit-captcha',
      icon: '🤖',
      title: 'Não Sou Robô',
      desc: 'Enfrente o desafio reCAPTCHA com miopia',
      check: () => !!localStorage.getItem('myopia-visited-captcha'),
      reward: 'Humano suspeito',
    },
    {
      id: 'visit-otica',
      icon: '👓',
      title: 'Cliente VIP',
      desc: 'Visite a Ótica MyopIA',
      check: () => !!localStorage.getItem('myopia-visited-otica'),
      reward: 'Comprador compulsivo de armações',
    },
    {
      id: 'upgrade-plan',
      icon: '💎',
      title: 'Miopão PRO',
      desc: 'Assine o plano PRO ou Enterprise',
      check: () => planId === 'pro' || planId === 'enterprise',
      reward: 'Sofrimento premium desbloqueado',
    },
    {
      id: 'repair-glasses',
      icon: '🔧',
      title: 'Acidentado em Série',
      desc: 'Solicite um conserto de óculos',
      check: () => !!localStorage.getItem('myopia-ever-repaired'),
      reward: 'Destruidor profissional de óculos',
    },
  ]
}

export default function MissoesPage() {
  const navigate = useNavigate()
  const { buySkin, purchasedSkinIds } = useSkin()
  const missions = useMissions()
  const completed = missions.filter(m => m.check())
  const total = missions.length
  const progress = completed.length / total
  const allDone = completed.length === total

  useEffect(() => {
    if (allDone && !purchasedSkinIds.includes('tony-stark')) {
      buySkin('tony-stark')
    }
  }, [allDone, purchasedSkinIds, buySkin])

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(160deg, #0a0f1e 0%, #0f172a 100%)',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '16px 24px',
        background: 'rgba(10,15,30,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 999, padding: '7px 14px',
            color: '#94a3b8', fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ← Voltar
        </button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>🎯 Missões</div>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 1 }}>Desafios do miopão aventureiro</div>
        </div>
      </header>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px 20px 56px' }}>

        {/* Progresso geral */}
        <div style={{
          background: allDone
            ? 'rgba(34,197,94,0.08)'
            : 'rgba(99,102,241,0.08)',
          border: `1px solid ${allDone ? 'rgba(34,197,94,0.3)' : 'rgba(99,102,241,0.2)'}`,
          borderRadius: 16,
          padding: '20px 22px',
          marginBottom: 28,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: allDone ? '#4ade80' : '#a5b4fc' }}>
              {allDone ? '🏆 Todas as missões concluídas!' : 'Progresso geral'}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: allDone ? '#4ade80' : '#818cf8' }}>
              {completed.length}/{total}
            </div>
          </div>
          <div style={{
            height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: allDone
                ? 'linear-gradient(90deg, #4ade80, #22c55e)'
                : 'linear-gradient(90deg, #818cf8, #6366f1)',
              borderRadius: 999,
              transition: 'width 0.4s ease',
            }} />
          </div>
          {allDone && (
            <div style={{ marginTop: 12, fontSize: 13, color: '#86efac', lineHeight: 1.5 }}>
              Parabéns! Você conquistou o título de <strong>Miopão Completo</strong>. Sua miopia não tem limites.
            </div>
          )}
        </div>

        {/* Lista de missões */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {missions.map(mission => {
            const done = mission.check()
            return (
              <div
                key={mission.id}
                style={{
                  background: done ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${done ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 14,
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                {/* Ícone + check */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: done ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${done ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                  position: 'relative',
                }}>
                  {mission.icon}
                  {done && (
                    <div style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 18, height: 18, borderRadius: '50%',
                      background: '#22c55e',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, color: '#0f172a',
                    }}>
                      ✓
                    </div>
                  )}
                </div>

                {/* Texto */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 700,
                    color: done ? '#e2e8f0' : '#64748b',
                    marginBottom: 2,
                  }}>
                    {mission.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#475569' }}>
                    {mission.desc}
                  </div>
                  {done && (
                    <div style={{
                      marginTop: 6, fontSize: 11, fontWeight: 600,
                      color: '#4ade80',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <span>🏅</span> {mission.reward}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div style={{
                  flexShrink: 0,
                  fontSize: 11, fontWeight: 700,
                  padding: '4px 10px', borderRadius: 999,
                  background: done ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                  color: done ? '#4ade80' : '#334155',
                  border: `1px solid ${done ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.06em',
                }}>
                  {done ? 'Feito' : 'Pendente'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Dica */}
        <div style={{
          marginTop: 32, padding: '14px 18px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          fontSize: 12, color: '#334155', textAlign: 'center', lineHeight: 1.6,
        }}>
          💡 As missões são registradas automaticamente conforme você explora o MyopIA.
        </div>
      </div>
    </div>
  )
}
