import type { GlassesPos } from '../hooks/useGlassesPhysics'
import type { GlassesSkin } from '../data/skins'
import { useCondition } from '../contexts/ConditionContext'

interface Props {
  glassesPos: GlassesPos
  skin: GlassesSkin
}

export default function ConditionOverlay({ glassesPos: _pos, skin: _skin }: Props) {
  const { conditions } = useCondition()
  const { hyperopia, glaucoma, cataract } = conditions

  const mask = 'url(#blur-exclude-mask)'

  return (
    <>
      {/* ── Hipermetropia: blur progressivo fora das lentes ── */}
      {hyperopia.enabled && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2004,
          backdropFilter: `blur(${(hyperopia.severity / 100) * 12}px)`,
          WebkitBackdropFilter: `blur(${(hyperopia.severity / 100) * 12}px)`,
          mask, WebkitMask: mask,
          pointerEvents: 'none',
        } as React.CSSProperties}/>
      )}

      {/* ── Glaucoma: escurece a visão periférica progressivamente ── */}
      {glaucoma.enabled && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2005,
          background: `rgba(0,0,0,${(glaucoma.severity / 100) * 0.88})`,
          mask, WebkitMask: mask,
          pointerEvents: 'none',
        } as React.CSSProperties}/>
      )}

      {/* ── Catarata: névoa amarelada + contraste/brilho reduzidos ── */}
      {cataract.enabled && (
        <>
          <div style={{
            position: 'fixed', inset: 0, zIndex: 2006,
            backdropFilter: `blur(${(cataract.severity / 100) * 5}px) saturate(${1 - (cataract.severity / 100) * 0.55}) brightness(${1 - (cataract.severity / 100) * 0.2})`,
            WebkitBackdropFilter: `blur(${(cataract.severity / 100) * 5}px) saturate(${1 - (cataract.severity / 100) * 0.55}) brightness(${1 - (cataract.severity / 100) * 0.2})`,
            mask, WebkitMask: mask,
            pointerEvents: 'none',
          } as React.CSSProperties}/>
          <div style={{
            position: 'fixed', inset: 0, zIndex: 2006,
            background: `rgba(240,225,170,${(cataract.severity / 100) * 0.4})`,
            mask, WebkitMask: mask,
            pointerEvents: 'none',
          } as React.CSSProperties}/>
        </>
      )}
    </>
  )
}
