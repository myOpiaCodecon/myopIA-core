import type { ReactNode } from 'react'

/**
 * Slot para o conteúdo do desktop (responsabilidade do Gustavo).
 * Fica na Layer 1 — nítido, por baixo do blur overlay e dos óculos.
 *
 * Temporariamente usa o iframe win11.blueedge.me como placeholder.
 * Quando o Gustavo terminar, substituir o <Win11Iframe /> por <DesktopContent />.
 *
 * Uso após merge:
 *   <DesktopSlot>
 *     <DesktopContent />
 *   </DesktopSlot>
 */
interface DesktopSlotProps {
  children?: ReactNode
}

export function DesktopSlot({ children }: DesktopSlotProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {children ?? <Win11Iframe />}
    </div>
  )
}

function Win11Iframe() {
  return (
    <iframe
      src="https://win11.blueedge.me/"
      title="Windows 11 Desktop"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        display: 'block',
      }}
      // permite interação normal com o iframe
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
    />
  )
}
