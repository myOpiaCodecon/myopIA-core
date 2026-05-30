import { useState } from 'react'
import { Link } from 'react-router-dom'

// ─── Icons ───────────────────────────────────────────────────────────────────

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#0f0f0f">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#606060">
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

const ThumbUpIcon = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? '#0f0f0f' : '#0f0f0f'}>
    <path d={filled
      ? 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z'
      : 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10zm-2 0l-3 7H9V9l4.34-4.34L12 9h9v1z'
    } />
  </svg>
)

const ThumbDownIcon = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#0f0f0f">
    <path d={filled
      ? 'M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z'
      : 'M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L12 15H3v-2l3-7h9v9zm4-12v12h-2V3h2z'
    } />
  </svg>
)

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#0f0f0f">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
)

const SaveIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#0f0f0f">
    <path d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z" />
  </svg>
)

const DotsIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#0f0f0f">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)

const CheckBadge = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#606060">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

// ─── Data ────────────────────────────────────────────────────────────────────

const VIDEO_ID = 'dQw4w9WgXcQ'

const VIDEO_INFO = {
  title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
  channel: 'Rick Astley',
  channelInitial: 'R',
  channelColor: '#0288d1',
  subscribers: '4,1 mi de inscritos',
  views: '1.537.824.812 visualizações',
  date: '25 de out. de 2009',
  likes: '16 mi',
  description: `Rick Astley's official music video for "Never Gonna Give You Up"

Subscribe to the official Rick Astley YouTube channel: http://www.youtube.com/user/RickAstleyVEVO

"Never Gonna Give You Up" was a global smash on its release in July 1987, topping the charts in 25 countries including Rick's native UK and the US Billboard Hot 100. It also won the Brit Award for Best British Single in 1988. Stock Aitken and Waterman wrote and produced the track for Astley's debut single and it was such a massive hit that it was nearly impossible for him to follow up.

Amazingly, "Never Gonna Give You Up" was actually made before Astley's voice had even fully matured — and yet this did not stop the song from being an incredible international hit.

#NeverGonnaGiveYouUp #RickAstley #OfficialMusicVideo`,
}

const COMMENTS = [
  {
    author: 'Rickroll Enjoyer',
    initial: 'R',
    color: '#c62828',
    time: 'há 2 anos',
    likes: '284 mil',
    text: '2025 and this still never gets old 🎵',
    replies: 4200,
  },
  {
    author: 'Philosophy Guy',
    initial: 'P',
    color: '#1565c0',
    time: 'há 3 anos',
    likes: '152 mil',
    text: 'The fact that this video has 1.5 billion views means more than 1.5 billion people were never gonna give Rick up.',
    replies: 2891,
  },
  {
    author: 'Internet Historian',
    initial: 'I',
    color: '#388e3c',
    time: 'há 1 ano',
    likes: '98 mil',
    text: "Legend says if you search \"never gonna give you up\" on YouTube, you'll find exactly what you were looking for.",
    replies: 1043,
  },
  {
    author: 'MusicLover1987',
    initial: 'M',
    color: '#f57c00',
    time: 'há 4 anos',
    likes: '72 mil',
    text: 'This song is proof that good music is timeless. 38 years later and it still slaps.',
    replies: 876,
  },
  {
    author: 'Anonymous User',
    initial: 'A',
    color: '#7c4dff',
    time: 'há 6 meses',
    likes: '61 mil',
    text: "My grandma heard this song for the first time and said \"this young man really seems committed to the relationship.\" She's not wrong.",
    replies: 543,
  },
  {
    author: 'Cultural Analyst',
    initial: 'C',
    color: '#0097a7',
    time: 'há 1 ano',
    likes: '45 mil',
    text: "Fun fact: Rick Astley has never actually given anyone up. A true man of his word.",
    replies: 320,
  },
]

const RELATED = [
  { id: 'OPf0YbXqDm0', title: 'Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars', channel: 'MarkRonsonVEVO', views: '5,1 bi de visualizações', duration: '4:00' },
  { id: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You (Official Music Video)', channel: 'Ed Sheeran', views: '6,1 bi de visualizações', duration: '4:23' },
  { id: '9bZkp7q19f0', title: 'PSY - GANGNAM STYLE(강남스타일) M/V', channel: 'officialpsy', views: '5,1 bi de visualizações', duration: '4:12' },
  { id: 'ktvTqknDobU', title: 'Luis Fonsi - Despacito ft. Daddy Yankee', channel: 'Luis Fonsi', views: '8,3 bi de visualizações', duration: '4:42' },
  { id: 'YQHsXMglC9A', title: 'Adele - Hello (Official Music Video)', channel: 'Adele', views: '3,5 bi de visualizações', duration: '6:07' },
  { id: 'hT_nvWreIhg', title: 'OneRepublic - Counting Stars (Official Music Video)', channel: 'OneRepublic', views: '3,8 bi de visualizações', duration: '4:17' },
  { id: 'CevxZvSJLk8', title: 'Katy Perry - Roar (Official Music Video)', channel: 'Katy Perry', views: '4,2 bi de visualizações', duration: '3:43' },
  { id: 'nfWlot6h_JM', title: 'Taylor Swift - Shake It Off', channel: 'Taylor Swift', views: '3,8 bi de visualizações', duration: '3:39' },
  { id: 'ZbZSe6N_BXs', title: 'Pharrell Williams - Happy (Official Music Video)', channel: 'Pharrell Williams', views: '1,4 bi de visualizações', duration: '3:53' },
  { id: '09R8_2nJtjg', title: 'Maroon 5 - Sugar (Official Music Video)', channel: 'Maroon5VEVO', views: '4,0 bi de visualizações', duration: '3:55' },
]

// ─── Related Video Item ───────────────────────────────────────────────────────

function RelatedItem({ video }: { video: typeof RELATED[0] }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex gap-2 cursor-pointer group">
      <div className="relative flex-shrink-0 w-[168px] h-[94px] rounded-xl overflow-hidden bg-[#e5e5e5]">
        {!imgError ? (
          <img
            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#272727] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#606060">
              <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
        )}
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[11px] font-medium px-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex-1 min-w-0 pr-6 relative">
        <h3
          className="text-[14px] font-medium text-[#0f0f0f] leading-snug mb-1 group-hover:text-[#065fd4]"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {video.title}
        </h3>
        <p className="text-[12px] text-[#606060]">{video.channel}</p>
        <p className="text-[12px] text-[#606060]">{video.views}</p>
        <button className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-[#e5e5e5] transition-all">
          <DotsIcon />
        </button>
      </div>
    </div>
  )
}

// ─── Comment Item ─────────────────────────────────────────────────────────────

function CommentItem({ comment }: { comment: typeof COMMENTS[0] }) {
  const [liked, setLiked] = useState(false)
  return (
    <div className="flex gap-3">
      <div
        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[15px] font-bold"
        style={{ backgroundColor: comment.color }}
      >
        {comment.initial}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-medium text-[#0f0f0f]">@{comment.author.replace(/\s/g, '')}</span>
          <span className="text-[12px] text-[#606060]">{comment.time}</span>
        </div>
        <p className="text-[14px] text-[#0f0f0f] mb-2 leading-snug">{comment.text}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLiked(v => !v)}
            className="flex items-center gap-1 text-[12px] text-[#606060] hover:text-[#0f0f0f] transition-colors"
          >
            <ThumbUpIcon filled={liked} />
            <span>{comment.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-[12px] text-[#606060] hover:text-[#0f0f0f] transition-colors">
            <ThumbDownIcon />
          </button>
          <button className="text-[12px] font-medium text-[#606060] hover:text-[#0f0f0f] transition-colors ml-1">
            Reply
          </button>
        </div>
        {comment.replies > 0 && (
          <button className="mt-2 flex items-center gap-1 text-[14px] font-medium text-[#065fd4] hover:bg-[#def1ff] px-3 py-2 rounded-full transition-colors">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#065fd4">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
            {comment.replies.toLocaleString('pt-BR')} respostas
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function YoutubeWatch() {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLike = () => { setLiked(v => !v); if (disliked) setDisliked(false) }
  const handleDislike = () => { setDisliked(v => !v); if (liked) setLiked(false) }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white flex items-center justify-between px-4">
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors"
          >
            <MenuIcon />
          </button>
          <Link to="/youtube" className="flex items-center gap-1 select-none">
            <div className="flex items-center justify-center bg-[#FF0000] rounded-lg w-9 h-[25px]">
              <svg viewBox="0 0 18 14" width="18" height="14">
                <polygon points="5,1 5,13 15,7" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: '19px', fontWeight: 700, letterSpacing: '-0.5px', color: '#0f0f0f' }}>
              MyoTube
            </span>
          </Link>
        </div>

        {/* Search (non-functional) */}
        <div className="flex items-center gap-3 flex-1 max-w-[640px] mx-4">
          <form onSubmit={e => e.preventDefault()} className="flex flex-1">
            <div className="flex flex-1 items-center border border-[#ccc] rounded-l-full px-5 py-[7px] focus-within:border-[#1c62b9] bg-white">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none text-[16px] text-[#0f0f0f] bg-transparent placeholder-[#909090]"
              />
            </div>
            <button type="submit" className="flex items-center justify-center w-[64px] bg-[#f8f8f8] border border-l-0 border-[#ccc] rounded-r-full hover:bg-[#e8e8e8] transition-colors">
              <SearchIcon />
            </button>
          </form>
          <button className="w-10 h-10 rounded-full bg-[#f2f2f2] flex items-center justify-center hover:bg-[#e5e5e5] transition-colors flex-shrink-0">
            <MicIcon />
          </button>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors"><UploadIcon /></button>
          <button className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors"><BellIcon /></button>
          <button className="w-8 h-8 rounded-full bg-[#065fd4] text-white flex items-center justify-center text-[13px] font-bold ml-2">M</button>
        </div>
      </header>

      {/* ── Page body ── */}
      <div className="pt-14 flex gap-6 px-6 py-4 max-w-[1600px] mx-auto">

        {/* ── Primary column ── */}
        <div className="flex-1 min-w-0">

          {/* Video player */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title={VIDEO_INFO.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Title */}
          <h1 className="text-[20px] font-bold text-[#0f0f0f] mt-4 leading-snug">
            {VIDEO_INFO.title}
          </h1>

          {/* Channel + actions row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            {/* Channel info */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[15px] font-bold flex-shrink-0"
                style={{ backgroundColor: VIDEO_INFO.channelColor }}
              >
                {VIDEO_INFO.channelInitial}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-medium text-[#0f0f0f]">{VIDEO_INFO.channel}</span>
                  <CheckBadge />
                </div>
                <span className="text-[12px] text-[#606060]">{VIDEO_INFO.subscribers}</span>
              </div>
              <button
                onClick={() => setSubscribed(v => !v)}
                className={`ml-2 px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                  subscribed
                    ? 'bg-[#f2f2f2] text-[#0f0f0f]'
                    : 'bg-[#0f0f0f] text-white hover:bg-[#272727]'
                }`}
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {/* Like / Dislike pill */}
              <div className="flex items-center rounded-full bg-[#f2f2f2] overflow-hidden">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 transition-colors hover:bg-[#e5e5e5] ${liked ? 'font-semibold' : ''}`}
                >
                  <ThumbUpIcon filled={liked} />
                  <span className="text-[14px] font-medium">{liked ? '16,1 mi' : VIDEO_INFO.likes}</span>
                </button>
                <div className="w-px h-5 bg-[#d9d9d9]" />
                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-2 px-4 py-2 transition-colors hover:bg-[#e5e5e5] ${disliked ? 'font-semibold' : ''}`}
                >
                  <ThumbDownIcon filled={disliked} />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] transition-colors">
                <ShareIcon />
                <span className="text-[14px] font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] transition-colors">
                <SaveIcon />
                <span className="text-[14px] font-medium">Save</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] transition-colors">
                <DotsIcon />
              </button>
            </div>
          </div>

          {/* Description */}
          <div
            className="mt-4 bg-[#f2f2f2] rounded-xl p-4 cursor-pointer"
            onClick={() => setDescExpanded(v => !v)}
          >
            <div className="flex items-center gap-4 mb-2 text-[14px] font-medium text-[#0f0f0f]">
              <span>{VIDEO_INFO.views}</span>
              <span>{VIDEO_INFO.date}</span>
              <span className="text-[#065fd4]">#NeverGonnaGiveYouUp</span>
              <span className="text-[#065fd4]">#RickAstley</span>
            </div>
            <div
              className="text-[14px] text-[#0f0f0f] leading-relaxed whitespace-pre-wrap"
              style={!descExpanded ? {
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              } : {}}
            >
              {VIDEO_INFO.description}
            </div>
            <button className="mt-2 text-[14px] font-medium text-[#0f0f0f] hover:text-[#065fd4] transition-colors">
              {descExpanded ? 'Show less' : 'Show more'}
            </button>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <div className="flex items-center gap-8 mb-6">
              <h2 className="text-[16px] font-medium text-[#0f0f0f]">
                {(1537824812).toLocaleString('pt-BR')} comentários
              </h2>
              <button className="flex items-center gap-1 text-[14px] font-medium text-[#0f0f0f]">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#0f0f0f">
                  <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
                </svg>
                Sort by
              </button>
            </div>

            {/* Add comment input */}
            <div className="flex gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#065fd4] text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                M
              </div>
              <div className="flex-1 border-b border-[#d9d9d9] focus-within:border-[#0f0f0f] pb-1 transition-colors">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full outline-none text-[14px] text-[#0f0f0f] bg-transparent placeholder-[#909090]"
                />
              </div>
            </div>

            {/* Comment list */}
            <div className="space-y-6">
              {COMMENTS.map((c, i) => (
                <CommentItem key={i} comment={c} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Secondary column (related videos) ── */}
        {sidebarOpen && (
          <aside className="w-[400px] flex-shrink-0">
            <div className="space-y-3 mt-1">
              {RELATED.map(video => (
                <RelatedItem key={video.id} video={video} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
