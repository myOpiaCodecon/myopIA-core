import { Link } from 'react-router-dom'

export default function BackButton() {
  return (
    <Link
      to="/"
      className="fixed bottom-6 left-6 z-[9999] flex items-center gap-2 bg-white text-slate-700 text-[13px] font-medium px-4 py-[10px] rounded-full transition-all duration-200 hover:scale-105 hover:shadow-xl select-none"
      style={{
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
      Home
    </Link>
  )
}
