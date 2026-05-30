interface Props {
  pos: { x: number; y: number }
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
  dragging: boolean
}

export default function Glasses({ pos, onMouseDown, dragging }: Props) {
  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 2001,
        transform: 'translate(-50%, -50%)',
        cursor: dragging ? 'grabbing' : 'grab',
        pointerEvents: 'all',
        userSelect: 'none',
        touchAction: 'none',
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
      }}
    >
      {/* viewBox 280x100 — left lens: cx=65 cy=50 r=48, right lens: cx=215 cy=50 r=48
          Div centered via transform(-50%,-50%), so lens centers in screen coords are:
          left=(pos.x-75, pos.y)  right=(pos.x+75, pos.y)  — matches BlurOverlay constants */}
      <svg width="280" height="100" viewBox="0 0 280 100" fill="none">
        <circle cx="65"  cy="50" r="48" stroke="#1a1a1a" strokeWidth="3.5" fill="rgba(180,220,255,0.04)" />
        <circle cx="215" cy="50" r="48" stroke="#1a1a1a" strokeWidth="3.5" fill="rgba(180,220,255,0.04)" />
        <path d="M113 50 Q140 36 167 50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
        <line x1="17"  y1="50" x2="0"   y2="46" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="263" y1="50" x2="280" y2="46" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
