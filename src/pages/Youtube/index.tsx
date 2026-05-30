import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Icons ───────────────────────────────────────────────────────────────────

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)

const SearchIcon = ({ color = '#606060' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill={color}>
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

const MicIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#0f0f0f">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
  </svg>
)

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
)

const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d={active
      ? 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
      : 'M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z'
    } />
  </svg>
)

const ShortsIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M10 14.65v-5.3L15 12zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.23-2.53-5.06-1.56L6 6.94c-1.29.68-2.06 2.03-2 3.48.06 1.3.75 2.45 1.38 3.34L6 14.34V10c0-1.66 1.34-3 3-3h5.87l-4.41 2.32 1.2.5L10 10.94c-1.84.96-2.53 3.23-1.56 5.06.97 1.83 3.23 2.53 5.06 1.56l8.5-4.5c1.29-.68 2.06-2.03 2-3.48-.06-1.3-.75-2.45-1.38-3.34l-.85 4.09z" />
  </svg>
)

const SubscriptionsIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
)

const LibraryIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
  </svg>
)

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
  </svg>
)

const TrendingIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
)

const MusicNoteIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
)

const GamingIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5S19.33 12 18.5 12z" />
  </svg>
)

const NewsIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
  </svg>
)

const SportsIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83z" />
  </svg>
)

const DotsIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#606060">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)

// ─── Data ────────────────────────────────────────────────────────────────────

interface Video {
  id: string
  title: string
  channel: string
  initial: string
  avatarColor: string
  views: string
  posted: string
  duration: string
}

const VIDEOS: Video[] = [
  { id: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You (Official Music Video)', channel: 'Ed Sheeran', initial: 'E', avatarColor: '#f06c00', views: '6,1 bilhões de visualizações', posted: 'há 7 anos', duration: '4:23' },
  { id: 'ktvTqknDobU', title: 'Luis Fonsi - Despacito ft. Daddy Yankee', channel: 'Luis Fonsi', initial: 'L', avatarColor: '#c62828', views: '8,3 bilhões de visualizações', posted: 'há 7 anos', duration: '4:42' },
  // { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)', channel: 'Rick Astley', initial: 'R', avatarColor: '#0288d1', views: '1,5 bilhão de visualizações', posted: 'há 15 anos', duration: '3:33' },
  { id: 'ELv6IPkML2s', title: 'Maratona Sésamo 2007', channel: 'Vila Sésamo', initial: 'VS', avatarColor: '#0288d1', views: '1,5 milhões de visualizações', posted: 'há 6 anos', duration: '3:20:59' },
  { id: '9bZkp7q19f0', title: 'PSY - GANGNAM STYLE(강남스타일) M/V', channel: 'officialpsy', initial: 'P', avatarColor: '#e91e63', views: '5,1 bilhões de visualizações', posted: 'há 12 anos', duration: '4:12' },
  { id: 'RgKAFK5djSk', title: 'Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack', channel: 'Wiz Khalifa', initial: 'W', avatarColor: '#7c4dff', views: '6,0 bilhões de visualizações', posted: 'há 9 anos', duration: '3:56' },
  { id: 'OPf0YbXqDm0', title: 'Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars', channel: 'MarkRonsonVEVO', initial: 'M', avatarColor: '#f4511e', views: '5,1 bilhões de visualizações', posted: 'há 9 anos', duration: '4:00' },
  { id: 'YQHsXMglC9A', title: 'Adele - Hello (Official Music Video)', channel: 'Adele', initial: 'A', avatarColor: '#546e7a', views: '3,5 bilhões de visualizações', posted: 'há 8 anos', duration: '6:07' },
  { id: 'nfWlot6h_JM', title: 'Taylor Swift - Shake It Off', channel: 'Taylor Swift', initial: 'T', avatarColor: '#d81b60', views: '3,8 bilhões de visualizações', posted: 'há 10 anos', duration: '3:39' },
  { id: 'hT_nvWreIhg', title: 'OneRepublic - Counting Stars (Official Music Video)', channel: 'OneRepublic', initial: 'O', avatarColor: '#0288d1', views: '3,8 bilhões de visualizações', posted: 'há 11 anos', duration: '4:17' },
  { id: 'CevxZvSJLk8', title: 'Katy Perry - Roar (Official Music Video)', channel: 'Katy Perry', initial: 'K', avatarColor: '#ff6f00', views: '4,2 bilhões de visualizações', posted: 'há 11 anos', duration: '3:43' },
  { id: 'kffacxfA7G4', title: 'Justin Bieber - Baby ft. Ludacris', channel: 'Justin Bieber', initial: 'J', avatarColor: '#1565c0', views: '2,9 bilhões de visualizações', posted: 'há 14 anos', duration: '3:36' },
  { id: 'ZbZSe6N_BXs', title: 'Pharrell Williams - Happy (Official Music Video from "Despicable Me 2")', channel: 'Pharrell Williams', initial: 'P', avatarColor: '#f9a825', views: '1,4 bilhão de visualizações', posted: 'há 10 anos', duration: '3:53' },
  { id: '09R8_2nJtjg', title: 'Maroon 5 - Sugar (Official Music Video)', channel: 'Maroon5VEVO', initial: 'M', avatarColor: '#ad1457', views: '4,0 bilhões de visualizações', posted: 'há 9 anos', duration: '3:55' },
  { id: 'PT2_F-1esPk', title: 'The Chainsmokers - Closer (Lyric) ft. Halsey', channel: 'The Chainsmokers', initial: 'T', avatarColor: '#00838f', views: '3,6 bilhões de visualizações', posted: 'há 8 anos', duration: '4:05' },
  { id: 'fRh_vgS2dFE', title: 'Justin Bieber - Sorry (PURPOSE : The Movement)', channel: 'Justin Bieber', initial: 'J', avatarColor: '#1565c0', views: '3,5 bilhões de visualizações', posted: 'há 8 anos', duration: '3:14' },
  { id: 'e-ORhEE9VVg', title: 'Shakira - Waka Waka (This Time for Africa) (The Official 2010 FIFA World Cup™ Song)', channel: 'Shakira', initial: 'S', avatarColor: '#ff8f00', views: '3,9 bilhões de visualizações', posted: 'há 14 anos', duration: '3:33' },
]

const FILTER_CHIPS = ['All', 'Music', 'Pop music', 'Live', 'Gaming', 'Comedy', 'Soccer', 'Recently uploaded', 'New to you']

const SIDEBAR_MAIN = [
  { icon: <HomeIcon active />, label: 'Home', active: true },
  { icon: <ShortsIcon />, label: 'Shorts' },
  { icon: <SubscriptionsIcon />, label: 'Subscriptions' },
]

const SIDEBAR_LIBRARY = [
  { icon: <LibraryIcon />, label: 'Library' },
  { icon: <HistoryIcon />, label: 'History' },
]

const SIDEBAR_EXPLORE = [
  { icon: <TrendingIcon />, label: 'Trending' },
  { icon: <MusicNoteIcon />, label: 'Music' },
  { icon: <GamingIcon />, label: 'Gaming' },
  { icon: <NewsIcon />, label: 'News' },
  { icon: <SportsIcon />, label: 'Sports' },
]

// ─── VideoCard ────────────────────────────────────────────────────────────────

const RICKROLL_ID = 'ELv6IPkML2s'

function VideoCard({ video }: { video: Video }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (video.id === RICKROLL_ID) {
      navigate('/youtube/watch')
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <div className="group cursor-pointer" onClick={handleCardClick}>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-[#e5e5e5] rounded-xl overflow-hidden mb-3">
        {!imgError ? (
          <img
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#272727]">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="#606060">
              <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
        )}
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[12px] font-medium px-1.5 py-[2px] rounded-[4px]">
          {video.duration}
        </div>
      </div>

      {/* Card info */}
      <div className="flex gap-3 relative">
        {/* Channel avatar */}
        <div
          className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[14px] font-bold mt-[2px]"
          style={{ backgroundColor: video.avatarColor }}
        >
          {video.initial}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pr-6">
          <h3
            className="text-[14px] font-medium text-[#0f0f0f] leading-[20px] mb-[2px]"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.title}
          </h3>
          <p className="text-[12px] text-[#606060] hover:text-[#0f0f0f] transition-colors mt-[2px]">
            {video.channel}
          </p>
          <p className="text-[12px] text-[#606060]">
            {video.views} · {video.posted}
          </p>
        </div>

        {/* Three-dot menu */}
        <div className="absolute top-0 right-0">
          <button
            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-[#e5e5e5] transition-all"
            onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
          >
            <DotsIcon />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 z-10 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)] py-2 min-w-[220px]">
              {['Save to Watch later', 'Save to playlist', 'Share', 'Not interested', 'Don\'t recommend channel'].map(opt => (
                <button
                  key={opt}
                  className="w-full text-left px-4 py-2 text-[14px] text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                  onClick={e => { e.stopPropagation(); setMenuOpen(false) }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── SidebarItem ──────────────────────────────────────────────────────────────

function SidebarItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`w-full flex items-center gap-6 px-6 py-2.5 rounded-xl text-[14px] font-medium transition-colors text-black ${
        active ? 'bg-[#f2f2f2] font-semibold' : 'hover:bg-[#f2f2f2]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function SidebarItemMini({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`w-full flex flex-col items-center gap-1 py-4 px-2 rounded-xl text-[10px] font-medium transition-colors ${
        active ? 'bg-[#f2f2f2]' : 'hover:bg-[#f2f2f2]'
      }`}
    >
      {icon}
      <span className="text-[10px] text-[#0f0f0f]">{label}</span>
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Youtube() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeChip, setActiveChip] = useState('All')

  const sidebarWidth = sidebarOpen ? 240 : 72

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white flex items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors"
          >
            <MenuIcon />
          </button>
          {/* Logo */}
          <div className="flex items-center gap-1 select-none">
            <div className="flex items-center justify-center bg-[#FF0000] rounded-lg w-9 h-[25px]">
              <svg viewBox="0 0 18 14" width="18" height="14">
                <polygon points="5,1 5,13 15,7" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: '19px', fontWeight: 700, letterSpacing: '-0.5px', color: '#0f0f0f' }}>
              MyoTube
            </span>
          </div>
        </div>

        {/* Center: search bar (non-functional) */}
        <div className="flex items-center gap-3 flex-1 max-w-[640px] mx-4">
          <form onSubmit={e => e.preventDefault()} className="flex flex-1">
            <div className="flex flex-1 items-center border border-[#ccc] rounded-l-full px-5 py-[7px] focus-within:border-[#1c62b9] focus-within:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] bg-white">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none text-[16px] text-[#0f0f0f] bg-transparent placeholder-[#909090]"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-[64px] bg-[#f8f8f8] border border-l-0 border-[#ccc] rounded-r-full hover:bg-[#e8e8e8] transition-colors"
            >
              <SearchIcon />
            </button>
          </form>
          <button className="w-10 h-10 rounded-full bg-[#f2f2f2] flex items-center justify-center hover:bg-[#e5e5e5] transition-colors flex-shrink-0">
            <MicIcon />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors">
            <UploadIcon />
          </button>
          <button className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors">
            <BellIcon />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#065fd4] text-white flex items-center justify-center text-[13px] font-bold ml-2">
            M
          </button>
        </div>
      </header>

      {/* ── Sidebar ── */}
      <aside
        className="fixed top-14 left-0 bottom-0 bg-white overflow-y-auto z-40 transition-[width] duration-200"
        style={{ width: sidebarWidth }}
      >
        {sidebarOpen ? (
          <nav className="py-3">
            {SIDEBAR_MAIN.map(item => (
              <SidebarItem key={item.label} icon={item.icon} label={item.label} active={item.active} />
            ))}

            <div className="my-3 border-t border-[#e5e5e5]" />

            {SIDEBAR_LIBRARY.map(item => (
              <SidebarItem key={item.label} icon={item.icon} label={item.label} />
            ))}

            <div className="my-3 border-t border-[#e5e5e5]" />

            <div className="px-6 py-2 text-[16px] font-semibold text-[#0f0f0f]">Explore</div>
            {SIDEBAR_EXPLORE.map(item => (
              <SidebarItem key={item.label} icon={item.icon} label={item.label} />
            ))}

            <div className="my-3 border-t border-[#e5e5e5]" />

            <div className="px-6 py-4 flex flex-wrap gap-x-2 gap-y-1">
              {['About', 'Press', 'Copyright', 'Contact us', 'Creators', 'Advertise', 'Developers', 'Terms', 'Privacy', 'Policy & Safety'].map(link => (
                <a key={link} href="#" className="text-[12px] text-[#606060] hover:text-[#0f0f0f]">{link}</a>
              ))}
              <p className="w-full text-[12px] text-[#606060] mt-2">© 2025 MyoTube</p>
            </div>
          </nav>
        ) : (
          <nav className="py-3">
            {[
              { icon: <HomeIcon active />, label: 'Home', active: true },
              { icon: <ShortsIcon />, label: 'Shorts' },
              { icon: <SubscriptionsIcon />, label: 'Subscriptions' },
              { icon: <LibraryIcon />, label: 'Library' },
            ].map(item => (
              <SidebarItemMini key={item.label} icon={item.icon} label={item.label} active={item.active} />
            ))}
          </nav>
        )}
      </aside>

      {/* ── Main Content ── */}
      <main
        className="pt-14 transition-[margin-left] duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Filter chips */}
        <div className="sticky top-14 z-30 bg-white px-6 py-3 border-b border-[#e5e5e5]">
          <div
            className="flex gap-3 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >
            {FILTER_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`flex-shrink-0 px-3 py-[5px] rounded-lg text-[14px] font-medium transition-colors ${
                  chip === activeChip
                    ? 'bg-[#0f0f0f] text-white'
                    : 'bg-[#f2f2f2] text-[#0f0f0f] hover:bg-[#e5e5e5]'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Video grid */}
        <div className="px-6 pt-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {VIDEOS.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
