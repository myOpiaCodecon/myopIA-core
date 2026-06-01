import { Link } from 'react-router-dom'
import logoUrl from '../../assets/logo.svg'
import { PLANS } from '../../data/plans'
import { usePlan } from '../../contexts/PlanContext'
import type { PlanId } from '../../data/plans'

const APPS = [
  {
    path: '/windows',
    name: 'Windows',
    desc: 'Simulador de Windows 11 no navegador',
    icon: (
      <svg viewBox="0 0 88 88" className="w-8 h-8 sm:w-10 sm:h-10" fill="white">
        <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349-.011 41.34-47.318-6.678-.066-34.739z"/>
      </svg>
    ),
    gradient: 'from-[#0078d4] to-[#004e8c]',
  },
  {
    path: '/browser',
    name: 'Myoopia',
    desc: 'Clone de alta fidelidade do Google',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="white">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    ),
    gradient: 'from-[#4285F4] to-[#1a5dc8]',
  },
  {
    path: '/youtube',
    name: 'MyoTube',
    desc: 'Clone do YouTube com vídeos reais',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="white">
        <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>
      </svg>
    ),
    gradient: 'from-[#FF0000] to-[#b00000]',
  },
  {
    path: '/captcha',
    name: 'reCAPTCHA',
    desc: 'Clone do desafio de imagens do Google',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10" fill="white">
        <path d="M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 00-8 8 8 8 0 008 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18a6 6 0 01-6-6 6 6 0 016-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
      </svg>
    ),
    gradient: 'from-[#34a853] to-[#1e7a38]',
  },
]

const PLAN_ICONS: Record<PlanId, string> = {
  free: '🕶️',
  pro: '💎',
  enterprise: '🏢',
}

const TEAM = [
  {
    name: 'Gustavo Silva',
    web: 'https://www.gustavogonzaga.dev/',
    linkedin: 'https://www.linkedin.com/in/gustavo-gs/',
    github: 'https://github.com/GSGustavo',
  },
  {
    name: 'Davi Dias',
    web: null,
    linkedin: 'https://www.linkedin.com/in/davifernandodias/?locale=pt',
    github: 'https://github.com/davifernandodias',
  },
  {
    name: 'Fabrício Santos',
    web: "https://www.fabriciosantos.dev.br/",
    linkedin: 'https://www.linkedin.com/in/fabricio-ss/',
    github: 'https://github.com/Fabricio-Antonio',
  },
]

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const IconDevpost = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61H6.002zm1.593 4.084h4.811c3.173 0 5.545 1.899 5.545 6.31 0 4.411-2.372 6.31-5.545 6.31H7.595V5.694zm2.538 2.38v7.86h2.273c1.811 0 3.007-1.1 3.007-3.93 0-2.83-1.196-3.93-3.007-3.93H10.133z"/>
  </svg>
)

const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
)

export default function Home() {
  const { planId, setPlan } = usePlan()

  return (
    <div
      className="h-screen overflow-y-auto flex flex-col items-center px-4 pt-8 pb-8 sm:px-8 sm:pt-10 sm:pb-12 gap-6 sm:gap-8"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2744 100%)' }}
    >
      {/* Achievement Banner */}
      <div
        className="w-full max-w-[480px] rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(192,150,0,0.12) 0%, rgba(192,150,0,0.06) 100%)',
          border: '1.5px solid rgba(192,150,0,0.45)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: 'linear-gradient(135deg, rgba(192,150,0,0.22) 0%, rgba(192,150,0,0.08) 100%)', borderBottom: '1px solid rgba(192,150,0,0.2)' }}
        >
          <div style={{ color: '#e8c840', flexShrink: 0 }}>
            <IconTrophy />
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontWeight: 800, fontSize: 14, color: '#e8c840', lineHeight: 1.2 }}>
              🥈 2º Lugar — Codecon Universe
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
              O hackathon de ideias inúteis
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href="https://devpost.com/software/claude-brothers"
              target="_blank"
              rel="noopener noreferrer"
              title="Ver no Devpost"
              className="flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-150 hover:scale-105"
              style={{ background: 'rgba(192,150,0,0.18)', color: '#e8c840', fontSize: 10, fontWeight: 600, border: '1px solid rgba(192,150,0,0.3)', textDecoration: 'none' }}
            >
              <IconDevpost />
              <span>Devpost</span>
            </a>
          </div>
        </div>

        {/* Team */}
        <div className="px-4 py-3">
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, fontWeight: 600 }}>
            Equipe Claude Brothers
          </div>
          <div className="flex flex-col gap-2">
            {TEAM.map(member => (
              <div key={member.name} className="flex items-center gap-2.5">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#e8c840' }}
                />
                <span style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 600, flex: 1 }}>
                  {member.name}
                </span>
                <div className="flex items-center gap-1.5">
                  {member.web && (
                    <a
                      href={member.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Site pessoal"
                      className="flex items-center justify-center w-6 h-6 rounded-md transition-all duration-150 hover:scale-110"
                      style={{ color: '#94a3b8', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <IconGlobe />
                    </a>
                  )}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="flex items-center justify-center w-6 h-6 rounded-md transition-all duration-150 hover:scale-110"
                    style={{ color: '#0ea5e9', background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}
                  >
                    <IconLinkedIn />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    className="flex items-center justify-center w-6 h-6 rounded-md transition-all duration-150 hover:scale-110"
                    style={{ color: '#94a3b8', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <IconGitHub />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://eventos.codecon.dev/eventos/codecon-universe-26"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 mt-3 transition-opacity duration-150 hover:opacity-80"
            style={{ fontSize: 10, color: '#64748b', textDecoration: 'none' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 flex-shrink-0">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            eventos.codecon.dev · Codecon Universe 2026
          </a>
        </div>
      </div>

      {/* Logo + title */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
        <div
          className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <img
            src={logoUrl}
            alt="MyOpia logo"
            className="h-12 sm:h-16 w-auto"
            style={{ filter: 'invert(1) brightness(1.1)' }}
          />
        </div>
        <div>
          <h1
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
          >
            MyOpia
          </h1>
          <p className="text-slate-400 mt-1.5 sm:mt-2 text-[13px] sm:text-[15px]">
            O primeiro simulador de miopia extrema para web
          </p>
        </div>
      </div>

      {/* App grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[480px]">
        {APPS.map(app => (
          <Link
            key={app.path}
            to={app.path}
            className={`bg-gradient-to-br ${app.gradient} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col gap-2 sm:gap-4 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 active:scale-[0.98]`}
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="opacity-90">{app.icon}</div>
            <div>
              <p className="font-bold text-white text-[14px] sm:text-[17px] leading-tight">{app.name}</p>
              <p className="text-white/70 text-[11px] sm:text-[12px] mt-0.5 leading-snug">{app.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Planos */}
      <div className="w-full max-w-[760px] flex flex-col gap-3 sm:gap-4">
        <h2
          className="text-center text-white/60 text-[11px] sm:text-[12px] uppercase tracking-widest"
          style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
        >
          Escolha seu nível de sofrimento
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PLANS.map(plan => {
            const active = planId === plan.id
            return (
              <button
                key={plan.id}
                onClick={() => setPlan(plan.id)}
                className="text-left cursor-pointer relative rounded-2xl p-4 transition-all duration-200"
                style={{
                  background: active
                    ? `linear-gradient(135deg, ${plan.accent}22, ${plan.accent}11)`
                    : 'rgba(255,255,255,0.04)',
                  border: active
                    ? `1.5px solid ${plan.accent}`
                    : '1.5px solid rgba(255,255,255,0.08)',
                }}
              >
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 12,
                      fontSize: 10,
                      fontWeight: 700,
                      color: plan.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Ativo
                  </div>
                )}

                {/* Header: horizontal on mobile, vertical on desktop */}
                <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-0 mb-3 sm:mb-0">
                  <div style={{ fontSize: 22, flexShrink: 0 }} className="sm:mb-1.5">
                    {PLAN_ICONS[plan.id]}
                  </div>
                  <div className="flex items-baseline gap-2 sm:block min-w-0">
                    <div
                      style={{
                        fontFamily: 'Roboto, Arial, sans-serif',
                        fontWeight: 700,
                        fontSize: 16,
                        color: active ? plan.accent : '#f1f5f9',
                      }}
                    >
                      {plan.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#64748b',
                        fontFamily: 'Roboto, Arial, sans-serif',
                      }}
                      className="sm:mt-0.5 sm:mb-2.5"
                    >
                      {plan.price}
                    </div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 11,
                        color: active ? '#cbd5e1' : '#475569',
                        display: 'flex',
                        gap: 5,
                        alignItems: 'flex-start',
                        fontFamily: 'Roboto, Arial, sans-serif',
                        lineHeight: 1.4,
                      }}
                    >
                      <span style={{ color: plan.accent, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <p className="text-slate-600 text-[12px] text-center pb-2 sm:pb-0">
        Claude Brothers · CodeCon 2025
      </p>
    </div>
  )
}
