import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const G_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#EA4335', '#FBBC05']
const G_CHARS = 'Myoopia'.split('')

function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={className} style={{ fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 400 }}>
      {G_CHARS.map((c, i) => (
        <span key={i} style={{ color: G_COLORS[i] }}>{c}</span>
      ))}
    </span>
  )
}

const SearchSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path fill="#9aa0a6" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

const MicSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
    <path fill="#4285F4" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path fill="#34A853" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
)

const LensSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
    <rect x="2" y="2" width="9" height="9" rx="2" fill="#EA4335" />
    <rect x="13" y="2" width="9" height="9" rx="2" fill="#4285F4" />
    <rect x="2" y="13" width="9" height="9" rx="2" fill="#34A853" />
    <rect x="13" y="13" width="9" height="9" rx="2" fill="#FBBC05" />
  </svg>
)

const AppsSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#5f6368">
    <circle cx="5"  cy="5"  r="1.8" /><circle cx="12" cy="5"  r="1.8" /><circle cx="19" cy="5"  r="1.8" />
    <circle cx="5"  cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" />
    <circle cx="5"  cy="19" r="1.8" /><circle cx="12" cy="19" r="1.8" /><circle cx="19" cy="19" r="1.8" />
  </svg>
)

export default function BrowserHome() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const doSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = query.trim()
    if (q) navigate(`/browser/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {/* Header */}
      <header className="flex justify-end items-center px-4 py-3 gap-1">
        <a href="#" className="px-3 py-2 text-[13px] text-[#202124] hover:underline">Gmail</a>
        <a href="#" className="px-3 py-2 text-[13px] text-[#202124] hover:underline">Images</a>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e8eaed] transition-colors">
          <AppsSVG />
        </button>
        <button className="ml-2 px-5 py-[9px] bg-[#1a73e8] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#1765cc] hover:shadow-md transition-all">
          Sign in
        </button>
      </header>

      {/* Center */}
      <main className="flex-1 flex flex-col items-center justify-center" style={{ paddingBottom: 130 }}>
        <Logo className="text-[90px] leading-none" />

        <form onSubmit={doSearch} className="w-full max-w-[584px] px-4 mt-8">
          {/* Search bar */}
          <div className="flex items-center rounded-[24px] border border-[#dfe1e5] px-4 py-[10px] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] focus-within:shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:border-white focus-within:border-white transition-all cursor-text">
            <span className="mr-3 flex-shrink-0">
              <SearchSVG />
            </span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              className="flex-1 outline-none text-[16px] text-[#202124] bg-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="flex-shrink-0 p-1 mr-2 flex items-center"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#70757a">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
            <div className="flex items-center gap-3 pl-4 border-l border-[#dfe1e5]">
              <button type="button" className="hover:opacity-70 flex items-center" title="Pesquisa por voz">
                <MicSVG />
              </button>
              <button type="button" className="hover:opacity-70 flex items-center" title="Pesquisa por imagem">
                <LensSVG />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-7">
            <button
              type="submit"
              className="px-4 py-[10px] text-[14px] text-[#3c4043] bg-[#f8f9fa] border border-[#f8f9fa] rounded hover:border-[#dadce0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all select-none"
            >
              Myoopia Search
            </button>
            <button
              type="button"
              className="px-4 py-[10px] text-[14px] text-[#3c4043] bg-[#f8f9fa] border border-[#f8f9fa] rounded hover:border-[#dadce0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all select-none"
            >
              I'm Feeling Lucky
            </button>
          </div>
        </form>

        <p className="mt-7 text-[13px] text-[#70757a]">
          Myoopia available in:{' '}
          <a href="#" className="text-[#1a0dab] hover:underline">Português</a>
          {' · '}
          <a href="#" className="text-[#1a0dab] hover:underline">Español</a>
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-[#f2f2f2] border-t border-[#dadce0] text-[14px] text-[#70757a]">
        <div className="flex justify-between px-6 py-[15px]">
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Advertising</a>
            <a href="#" className="hover:underline">Business</a>
            <a href="#" className="hover:underline">How Search works</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Settings</a>
          </div>
        </div>
      </footer>
      <BackButton />
    </div>
  )
}
