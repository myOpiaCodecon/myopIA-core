import { Link } from 'react-router-dom'
import logoUrl from '../../assets/logo.svg'

const APPS = [
  {
    path: '/windows',
    name: 'Windows',
    desc: 'Simulador de Windows 11 no navegador',
    icon: (
      <svg viewBox="0 0 88 88" width="40" height="40" fill="white">
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
      <svg viewBox="0 0 24 24" width="40" height="40" fill="white">
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
      <svg viewBox="0 0 24 24" width="40" height="40" fill="white">
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
      <svg viewBox="0 0 24 24" width="40" height="40" fill="white">
        <path d="M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 00-8 8 8 8 0 008 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18a6 6 0 01-6-6 6 6 0 016-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
      </svg>
    ),
    gradient: 'from-[#34a853] to-[#1e7a38]',
  },
]

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 gap-10"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2744 100%)' }}
    >
      {/* Logo + title */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className="p-5 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <img
            src={logoUrl}
            alt="MyOpia logo"
            className="h-16 w-auto"
            style={{ filter: 'invert(1) brightness(1.1)' }}
          />
        </div>
        <div>
          <h1
            className="text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
          >
            MyOpia
          </h1>
          <p className="text-slate-400 mt-2 text-[15px]">
            O primeiro simulador de miopia extrema para web
          </p>
        </div>
      </div>

      {/* App grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-[480px]">
        {APPS.map(app => (
          <Link
            key={app.path}
            to={app.path}
            className={`bg-gradient-to-br ${app.gradient} rounded-2xl p-5 flex flex-col gap-4 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 active:scale-[0.98]`}
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="opacity-90">{app.icon}</div>
            <div>
              <p className="font-bold text-white text-[17px] leading-tight">{app.name}</p>
              <p className="text-white/70 text-[12px] mt-0.5 leading-snug">{app.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <p className="text-slate-600 text-[12px] text-center">
        Claude Brothers · CodeCon 2025
      </p>
    </div>
  )
}
