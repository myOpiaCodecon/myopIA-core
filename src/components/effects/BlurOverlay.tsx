import { useEffect, useRef } from 'react'
import { useGlassesStore } from '../../store/glassesStore'

/**
 * Layer 2: cobre a tela inteira com blur.
 * Tem um "buraco" transparente na posição das lentes do óculos,
 * controlado por CSS custom properties atualizadas via DOM direto (sem re-render).
 *
 * As variáveis são escritas em #blur-overlay-root pelo LensMask (Fase 2).
 * Por enquanto (Fase 1) exibe blur uniforme para validar a camada visual.
 */
export function BlurOverlay() {
  const blurIntensity = useGlassesStore((s) => s.blurIntensity)
  const ref = useRef<HTMLDivElement>(null)

  // Expõe o elemento para o LensMask atualizar a mask via DOM direto
  useEffect(() => {
    if (ref.current) {
      ref.current.id = 'blur-overlay-root'
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        // Fase 1: blur uniforme. Fase 2: mask-image com buraco na lente.
        backdropFilter: `blur(${blurIntensity}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity}px)`,
        // Mask inicial sem buraco — LensMask vai sobrescrever via DOM
        maskImage:
          'radial-gradient(ellipse var(--lens-w, 0px) var(--lens-h, 0px) at var(--lens-x, -999px) var(--lens-y, -999px), transparent 80%, black 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse var(--lens-w, 0px) var(--lens-h, 0px) at var(--lens-x, -999px) var(--lens-y, -999px), transparent 80%, black 100%)',
        // Não captura eventos — o óculos e o desktop precisam receber cliques
        pointerEvents: 'none',
      }}
    />
  )
}
