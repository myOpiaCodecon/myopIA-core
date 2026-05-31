import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SKINS, type GlassesSkin } from '../../data/skins'
import { useSkin } from '../../contexts/SkinContext'
import GlassesFrame from '../../components/GlassesFrame'

const SECTIONS: { label: string; shape: GlassesSkin['shape'] }[] = [
  { label: 'Redondo',       shape: undefined },
  { label: 'Quadrado',      shape: 'square'  },
  { label: 'Retangular',    shape: 'rect'    },
  { label: 'Olho de Gato',  shape: 'cateye'  },
]

function SkinCard({ skin }: { skin: GlassesSkin }) {
  const { purchasedSkinIds, equippedSkinId, previewSkinId, equipSkin, buySkin, startPreview } = useSkin()

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
      borderRadius: 16,
      padding: '16px 14px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      {/* Preview */}
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '8px 4px 4px' }}>
        <GlassesFrame skin={skin} width="100%" height={70} />
      </div>

      {/* Info */}
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

      {/* Ações */}
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
              cursor: equipped ? 'default' : 'pointer',
              fontFamily: 'inherit',
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
              onClick={() => buySkin(skin.id)}
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

export default function OticaPage() {
  const navigate = useNavigate()
  const { previewSkinId, cancelPreview, buySkin } = useSkin()

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
                onClick={() => buySkin(previewSkin.id)}
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
                {skins.map(skin => <SkinCard key={skin.id} skin={skin} />)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
