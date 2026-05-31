import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SKINS, type GlassesSkin } from '../../data/skins'
import { CONDITIONS } from '../../data/conditions'
import { useSkin } from '../../contexts/SkinContext'
import { useCondition } from '../../contexts/ConditionContext'
import { usePlan } from '../../contexts/PlanContext'
import GlassesFrame from '../../components/GlassesFrame'

const SECTIONS: { label: string; shape: GlassesSkin['shape'] }[] = [
  { label: 'Redondo',           shape: undefined },
  { label: 'Quadrado',          shape: 'square'  },
  { label: 'Retangular',        shape: 'rect'    },
  { label: 'Olho de Gato',      shape: 'cateye'  },
  { label: 'Coleção Especial',  shape: 'stark'   },
]

// ── Modal PIX ─────────────────────────────────────────────────────────────────
function PixModal({ skin, onCancel }: {
  skin: GlassesSkin
  onCancel: () => void
}) {
  return (
    <div
      onClick={onCancel}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(10,18,38,0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: '32px 28px',
          width: 'min(90vw, 380px)',
          color: '#fff',
          textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Ícone */}
        <div style={{ fontSize: 48, marginBottom: 16 }}>💸</div>

        {/* Título */}
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.01em' }}>
          Finalizar compra
        </div>

        {/* Preview da armação */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 12, padding: '10px 8px 6px',
          marginBottom: 20,
        }}>
          <GlassesFrame skin={skin} width="100%" height={60} />
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginTop: 6 }}>
            {skin.name}
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#4ade80', marginTop: 2 }}>
            R$ {skin.price!.toFixed(2).replace('.', ',')}
          </div>
        </div>

        {/* Mensagem PIX */}
        <div style={{
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: 12,
          padding: '14px 16px',
          marginBottom: 24,
          fontSize: 14,
          lineHeight: 1.6,
          color: '#d1fae5',
          textAlign: 'left',
        }}>
          Faça o PIX para <strong style={{ color: '#4ade80' }}>Fabrício Santos</strong>.
          <br/>
          Assim que o pagamento for confirmado sua armação será liberada.
        </div>

        {/* Ações */}
        <button
          onClick={onCancel}
          style={{
            padding: '11px 0', borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent',
            color: '#94a3b8', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  )
}

// ── Card de skin ──────────────────────────────────────────────────────────────
function SkinCard({ skin, onRequestBuy }: { skin: GlassesSkin; onRequestBuy: (id: GlassesSkin['id']) => void }) {
  const { purchasedSkinIds, equippedSkinId, previewSkinId, equipSkin, startPreview } = useSkin()

  const owned      = purchasedSkinIds.includes(skin.id)
  const equipped   = equippedSkinId === skin.id
  const previewing = previewSkinId === skin.id

  return (
    <div style={{
      background: equipped
        ? 'rgba(99,102,241,0.1)'
        : previewing
          ? 'rgba(139,92,246,0.1)'
          : 'rgba(255,255,255,0.03)',
      border: `1px solid ${
        equipped   ? 'rgba(99,102,241,0.45)' :
        previewing ? 'rgba(139,92,246,0.4)'  :
                     'rgba(255,255,255,0.08)'
      }`,
      borderRadius: 16, padding: '16px 14px 14px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '8px 4px 4px' }}>
        <GlassesFrame skin={skin} width="100%" height={70} />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{skin.name}</span>
        {equipped && (
          <span style={{ fontSize: 10, fontWeight: 700, color: '#818cf8', background: 'rgba(99,102,241,0.2)', padding: '2px 7px', borderRadius: 999, whiteSpace: 'nowrap' }}>
            equipado
          </span>
        )}
        {previewing && !equipped && (
          <span style={{ fontSize: 10, fontWeight: 700, color: '#c084fc', background: 'rgba(139,92,246,0.2)', padding: '2px 7px', borderRadius: 999, whiteSpace: 'nowrap' }}>
            em prévia
          </span>
        )}
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: skin.price === null ? '#4ade80' : '#94a3b8' }}>
        {skin.price === null ? 'Gratuito' : `R$ ${skin.price.toFixed(2).replace('.', ',')}`}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
        {owned ? (
          <button
            disabled={equipped}
            onClick={() => equipSkin(skin.id)}
            style={{
              padding: '8px 0', borderRadius: 10, border: 'none',
              background: equipped ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.65)',
              color: equipped ? '#818cf8' : '#fff',
              fontSize: 13, fontWeight: 700,
              cursor: equipped ? 'default' : 'pointer', fontFamily: 'inherit',
            }}
          >
            {equipped ? '✓ Equipado' : 'Equipar'}
          </button>
        ) : (
          <>
            <button
              onClick={() => startPreview(skin.id)}
              style={{
                padding: '8px 0', borderRadius: 10,
                border: `1px solid ${previewing ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.12)'}`,
                background: previewing ? 'rgba(139,92,246,0.2)' : 'transparent',
                color: previewing ? '#c084fc' : '#94a3b8',
                fontSize: 13, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {previewing ? '👁️ Em prévia' : 'Experimentar'}
            </button>
            <button
              onClick={() => onRequestBuy(skin.id)}
              style={{
                padding: '8px 0', borderRadius: 10, border: 'none',
                background: '#4f46e5', color: '#fff',
                fontSize: 13, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Comprar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Seção de doenças (PRO) ────────────────────────────────────────────────────
function ConditionsSection() {
  const { conditions, toggle, setSeverity } = useCondition()

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#475569', marginBottom: 14,
      }}>
        Simulação de Doenças
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CONDITIONS.map(cond => {
          const state = conditions[cond.id]
          return (
            <div
              key={cond.id}
              style={{
                background: state.enabled ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${state.enabled ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 14,
                padding: '14px 16px',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: state.enabled ? 14 : 0 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: state.enabled ? '#e2e8f0' : '#64748b' }}>
                    {cond.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                    {cond.description}
                  </div>
                </div>

                {/* Toggle */}
                <div
                  onClick={() => toggle(cond.id)}
                  style={{
                    width: 44, height: 24, borderRadius: 999, cursor: 'pointer',
                    background: state.enabled ? '#6366f1' : 'rgba(255,255,255,0.1)',
                    position: 'relative', flexShrink: 0, transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 3,
                    left: state.enabled ? 23 : 3,
                    width: 18, height: 18, borderRadius: '50%',
                    background: '#fff', transition: 'left 0.2s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}/>
                </div>
              </div>

              {/* Slider de grau */}
              {state.enabled && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>Grau</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc' }}>
                      {state.severity <= 33 ? 'Leve' : state.severity <= 66 ? 'Moderado' : 'Severo'}
                      {' '}({state.severity}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1} max={100}
                    value={state.severity}
                    onChange={e => setSeverity(cond.id, Number(e.target.value))}
                    style={{
                      width: '100%', accentColor: '#6366f1',
                      height: 4, cursor: 'pointer',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    {['Leve', 'Moderado', 'Severo'].map(l => (
                      <span key={l} style={{ fontSize: 10, color: '#334155' }}>{l}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function OticaPage() {
  const navigate = useNavigate()
  const { planId } = usePlan()
  const isPro = planId === 'pro' || planId === 'enterprise'
  const { previewSkinId, cancelPreview, buySkin } = useSkin()

  const [payingSkinId, setPayingSkinId] = useState<GlassesSkin['id'] | null>(null)
  const payingSkin = payingSkinId ? SKINS.find(s => s.id === payingSkinId) ?? null : null

  useEffect(() => () => cancelPreview(), [cancelPreview])

  const previewSkin = previewSkinId ? SKINS.find(s => s.id === previewSkinId) : null

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(160deg, #0a0f1e 0%, #0f172a 100%)',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Modal PIX */}
      {payingSkin && (
        <PixModal
          skin={payingSkin}
          onCancel={() => setPayingSkinId(null)}
        />
      )}

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
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>👓 Ótica MyopIA</div>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 1 }}>Armações premium para sua miopia</div>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px 56px' }}>

        {/* Banner de prévia ativa */}
        {previewSkin && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.35)',
            borderRadius: 12, padding: '12px 16px', marginBottom: 28,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>👁️</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc' }}>
                  Prévia ativa: {previewSkin.name}
                </div>
                <div style={{ fontSize: 12, color: '#6366f1', marginTop: 2 }}>
                  Os óculos acima estão mostrando esta armação
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setPayingSkinId(previewSkin.id)}
                style={{ padding: '7px 14px', borderRadius: 8, border: 'none', background: '#4f46e5', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                Comprar
              </button>
              <button
                onClick={cancelPreview}
                style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#64748b', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Simulação de doenças — PRO */}
        {isPro && <ConditionsSection />}

        {/* Aviso para plano Free */}
        {!isPro && (
          <div style={{
            background: 'rgba(99,102,241,0.06)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 14, padding: '14px 18px',
            marginBottom: 36,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 22 }}>🔒</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>
                Simulação de Doenças — PRO
              </div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                Assine o plano PRO para simular Astigmatismo, Hipermetropia, Glaucoma e Catarata.
              </div>
            </div>
          </div>
        )}

        {/* Seções por forma */}
        {SECTIONS.map(({ label, shape }) => {
          const skins = SKINS.filter(s => (s.shape ?? 'round') === (shape ?? 'round'))
          return (
            <div key={label} style={{ marginBottom: 36 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#475569', marginBottom: 14,
              }}>
                {label}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 14,
              }}>
                {skins.map(skin => (
                  <SkinCard key={skin.id} skin={skin} onRequestBuy={setPayingSkinId} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
