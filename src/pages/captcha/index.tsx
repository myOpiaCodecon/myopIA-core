import { useState, useEffect } from 'react'
import BackButton from '../../components/BackButton'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'loading' | 'challenge' | 'error' | 'success'

interface Tile {
  id: number
  img: string
  bg: [string, string]
  bike: boolean
}

// ─── Tiles data ───────────────────────────────────────────────────────────────

const TILES: Tile[] = [
  { id: 0, img: 'other_1.png', bg: ['#90a4ae', '#455a64'], bike: false },
  { id: 1, img: 'bike_1.png', bg: ['#a5d6a7', '#2e7d32'], bike: true  },
  { id: 2, img: 'other_2.png', bg: ['#ffe082', '#bf360c'], bike: false },
  { id: 3, img: 'bike_2.png', bg: ['#90caf9', '#0d47a1'], bike: true  },
  { id: 4, img: 'other_3.png', bg: ['#fff176', '#e65100'], bike: false },
  { id: 5, img: 'bus_1.png', bg: ['#e0e0e0', '#616161'], bike: false },
  { id: 6, img: 'bus_2.png', bg: ['#616161', '#212121'], bike: false },
  { id: 7, img: 'cross_1.png', bg: ['#bcaaa4', '#4e342e'], bike: false },
  { id: 8, img: 'bike_3.png', bg: ['#c8e6c9', '#1b5e20'], bike: true  },
]

const CORRECT = new Set(TILES.filter(t => t.bike).map(t => t.id))

// ─── Icons / SVGs ─────────────────────────────────────────────────────────────

const RecaptchaIcon = () => (
  <svg viewBox="0 0 64 64" width="38" height="38">
    <path
      d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z"
      fill="#4a90d9"
    />
    <path
      d="M32 10c-12.15 0-22 9.85-22 22s9.85 22 22 22 22-9.85 22-22S44.15 10 32 10z"
      fill="#fff"
    />
    <path
      d="M42 24l-4-4v3h-8c-3.314 0-6 2.686-6 6s2.686 6 6 6h10v-4H30c-1.105 0-2-.895-2-2s.895-2 2-2h8v3l4-4z"
      fill="#4a90d9"
    />
    <path
      d="M22 40l4 4v-3h8c3.314 0 6-2.686 6-6s-2.686-6-6-6H24v4h10c1.105 0 2 .895 2 2s-.895 2-2 2h-8v-3l-4 4z"
      fill="#4a90d9"
    />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <circle cx="12" cy="12" r="11" fill="#4caf50" />
    <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ReloadIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#5f6368">
    <path d="M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 00-8 8 8 8 0 008 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18a6 6 0 01-6-6 6 6 0 016-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>
)

const AudioIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#5f6368">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
)

const BicycleEmoji = () => (
  <span style={{ fontSize: '28px', lineHeight: 1 }}>🚲</span>
)

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div
      className="w-7 h-7 rounded-full border-[3px] border-[#e0e0e0] border-t-[#4285f4]"
      style={{ animation: 'spin 0.8s linear infinite' }}
    />
  )
}

// ─── Image Tile ───────────────────────────────────────────────────────────────

function ImageTile({
  tile,
  selected,
  onToggle,
}: {
  tile: Tile
  selected: boolean
  onToggle: () => void
}) {
  return (
    <div
      onClick={onToggle}
      className="relative cursor-pointer select-none overflow-hidden"
      style={{
        width: 150,
        height: 150,
        background: `linear-gradient(145deg, ${tile.bg[0]}, ${tile.bg[1]})`,
        outline: selected ? '3px solid #4285f4' : '1px solid #ccc',
        outlineOffset: selected ? '-3px' : '-1px',
      }}
    >
      {/* Pseudo-photo grain effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)',
        }}
      />

      <img className="w-[100%]" src={`/img/captcha/${tile.img}`} alt="" />

      {/* Selected overlay */}
      {selected && (
        <>
          <div className="absolute inset-0 bg-[#4285f4]/20 pointer-events-none" />
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#4285f4] flex items-center justify-center shadow">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}

// ─── reCAPTCHA Widget ─────────────────────────────────────────────────────────

function Widget({
  phase,
  onClick,
}: {
  phase: Phase
  onClick: () => void
}) {
  return (
    <div
      className="flex items-center justify-between bg-[#f9f9f9] rounded-[3px] px-4 py-3"
      style={{
        width: 300,
        border: '1px solid #d3d3d3',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        fontFamily: 'Roboto, Arial, sans-serif',
      }}
    >
      {/* Left: checkbox + label */}
      <div className="flex items-center gap-3">
        <button
          onClick={phase === 'idle' ? onClick : undefined}
          className="flex-shrink-0 flex items-center justify-center"
          style={{ width: 28, height: 28 }}
        >
          {phase === 'idle' && (
            <div
              className="w-6 h-6 rounded-sm border-2 border-[#c1c1c1] bg-white hover:border-[#b1b1b1] transition-colors"
              style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
            />
          )}
          {phase === 'loading' && <Spinner />}
          {(phase === 'challenge' || phase === 'error') && (
            <div className="w-6 h-6 rounded-sm border-2 border-[#c1c1c1] bg-white" />
          )}
          {phase === 'success' && <CheckIcon />}
        </button>

        <span
          className="text-[14px] text-[#000] select-none"
          style={{ fontWeight: 400, letterSpacing: '0.01em' }}
        >
          {phase === 'success' ? 'Verificação concluída' : 'Não sou um robô'}
        </span>
      </div>

      {/* Right: reCAPTCHA branding */}
      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
        <RecaptchaIcon />
        <span className="text-[8px] text-[#555] font-medium tracking-wide">reCAPTCHA</span>
        <span className="text-[7px] text-[#999]">Privacidade · Termos</span>
      </div>
    </div>
  )
}

// ─── Challenge Popup ──────────────────────────────────────────────────────────

function Challenge({
  selected,
  onToggle,
  onVerify,
  onSkip,
  error,
  shake,
}: {
  selected: Set<number>
  onToggle: (id: number) => void
  onVerify: () => void
  onSkip: () => void
  error: boolean
  shake: boolean
}) {
  const canVerify = selected.size > 0

  return (
    <div
      className="rounded-[3px] overflow-hidden"
      style={{
        width: 468,
        border: '1px solid #ccc',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        fontFamily: 'Roboto, Arial, sans-serif',
        animation: shake ? 'shake 0.45s ease' : undefined,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: '#4a4a4a' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center bg-white/10 flex-shrink-0">
            <BicycleEmoji />
          </div>
          <div>
            <p className="text-white text-[13px] leading-tight">
              Selecione todas as imagens com
            </p>
            <p className="text-white text-[16px] font-medium leading-tight">
              bicicletas
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-1 rounded hover:bg-white/10 transition-colors" title="Recarregar">
            <ReloadIcon />
          </button>
          <button className="p-1 rounded hover:bg-white/10 transition-colors" title="Áudio">
            <AudioIcon />
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-[#fff3cd] px-4 py-2 text-[12px] text-[#856404] flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#856404">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          Por favor, selecione todas as bicicletas e tente novamente.
        </div>
      )}

      {/* Image grid */}
      <div
        className="grid gap-[3px] p-[3px] bg-[#e0e0e0]"
        style={{ gridTemplateColumns: 'repeat(3, 150px)' }}
      >
        {TILES.map(tile => (
          <ImageTile
            key={tile.id}
            tile={tile}
            selected={selected.has(tile.id)}
            onToggle={() => onToggle(tile.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-[#f9f9f9]"
        style={{ borderTop: '1px solid #e0e0e0' }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2">
          <RecaptchaIcon />
          <div>
            <p className="text-[10px] text-[#4a4a4a] font-medium tracking-wide">reCAPTCHA</p>
            <p className="text-[9px] text-[#aaa]">Privacidade · Termos</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-[14px] font-medium text-[#4285f4] hover:bg-[#f0f4ff] rounded transition-colors"
          >
            IGNORAR
          </button>
          <button
            onClick={canVerify ? onVerify : undefined}
            className={`px-4 py-2 text-[14px] font-medium rounded transition-colors ${
              canVerify
                ? 'bg-[#4285f4] text-white hover:bg-[#3367d6]'
                : 'bg-[#f0f0f0] text-[#bbb] cursor-not-allowed'
            }`}
          >
            VERIFICAR
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Captcha() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  // Loading phase timeout
  useEffect(() => {
    if (phase !== 'loading') return
    const t = setTimeout(() => setPhase('challenge'), 1400)
    return () => clearTimeout(t)
  }, [phase])

  const handleCheckbox = () => {
    if (phase === 'idle') setPhase('loading')
  }

  const toggleTile = (id: number) => {
    setError(false)
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleVerify = () => {
    const isCorrect =
      CORRECT.size === selected.size &&
      [...CORRECT].every(id => selected.has(id))

    if (isCorrect) {
      setPhase('success')
    } else {
      setError(true)
      setShake(true)
      setSelected(new Set())
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleSkip = () => {
    setSelected(new Set())
    setError(false)
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15%      { transform: translateX(-7px); }
          30%      { transform: translateX(7px); }
          45%      { transform: translateX(-5px); }
          60%      { transform: translateX(5px); }
          75%      { transform: translateX(-3px); }
          90%      { transform: translateX(3px); }
        }
        @keyframes pop-in {
          from { opacity: 0; transform: scale(0.95) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        @keyframes check-in {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center gap-8"
        style={{ background: 'linear-gradient(135deg, #e8eaf6 0%, #f5f5f5 100%)', fontFamily: 'Roboto, Arial, sans-serif' }}
      >
        {/* Page label */}
        <p className="text-[13px] text-[#888] tracking-wide uppercase select-none">
          Verificação de segurança
        </p>

        {/* Stacked: challenge above widget */}
        <div className="flex flex-col items-center gap-2">
          {(phase === 'challenge' || phase === 'error') && (
            <div style={{ animation: 'pop-in 0.2s ease' }}>
              <Challenge
                selected={selected}
                onToggle={toggleTile}
                onVerify={handleVerify}
                onSkip={handleSkip}
                error={error}
                shake={shake}
              />
            </div>
          )}

          <Widget phase={phase} onClick={handleCheckbox} />
        </div>

        {/* Success message */}
        {phase === 'success' && (
          <div
            className="flex items-center gap-2 bg-white px-5 py-3 rounded-lg shadow text-[14px] text-[#2e7d32]"
            style={{ animation: 'pop-in 0.3s ease', border: '1px solid #c8e6c9' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#4caf50">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            Você não é um robô. Acesso autorizado.
          </div>
        )}
      </div>
      <BackButton />
    </>
  )
}
