import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const G_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#EA4335', '#FBBC05']
const G_CHARS = 'Myoopia'.split('')

function Logo() {
  return (
    <Link to="/browser" className="flex-shrink-0">
      <span className="text-[30px] leading-none" style={{ fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 400 }}>
        {G_CHARS.map((c, i) => (
          <span key={i} style={{ color: G_COLORS[i] }}>{c}</span>
        ))}
      </span>
    </Link>
  )
}

const SearchSVG = ({ color = '#9aa0a6' }: { color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path fill={color} d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

const MicSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
    <path fill="#4285F4" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path fill="#34A853" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
)

const LensSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
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

interface SearchResult {
  id: number
  favBg: string
  favText: string
  site: string
  getTitle: (q: string) => string
  getDisplayUrl: (q: string) => string
  getSnippet: (q: string) => string
  date?: string
}

const RESULTS: SearchResult[] = [
  {
    id: 1,
    favBg: '#757575',
    favText: 'W',
    site: 'Wikipédia',
    getTitle: q => `${q} — Wikipédia, a enciclopédia livre`,
    getDisplayUrl: q => `pt.wikipedia.org › wiki › ${q}`,
    getSnippet: q =>
      `${q} é um conceito amplamente estudado com aplicações em diversas áreas do conhecimento. Desde sua origem, ${q} tem sido objeto de intensas pesquisas científicas e análises filosóficas, impactando diretamente a forma como compreendemos o mundo ao nosso redor.`,
  },
  {
    id: 2,
    favBg: '#1a73e8',
    favText: '◆',
    site: 'Site Oficial',
    getTitle: q => `${q} — Site Oficial · Explore, Descubra, Conecte-se`,
    getDisplayUrl: q => `www.${q.toLowerCase().replace(/\s+/g, '')}.com`,
    getSnippet: q =>
      `Portal oficial dedicado a ${q}. Encontre informações atualizadas, recursos exclusivos e tudo que você precisa saber sobre ${q}. Cadastre-se gratuitamente e tenha acesso completo a todo nosso conteúdo.`,
  },
  {
    id: 3,
    favBg: '#FF0000',
    favText: '▶',
    site: 'YouTube',
    getTitle: q => `${q} - Vídeos no YouTube`,
    getDisplayUrl: q => `www.youtube.com › results?search_query=${q}`,
    getSnippet: q =>
      `Assista aos melhores vídeos sobre ${q} no YouTube. Tutoriais, análises, documentários e muito mais criados por especialistas e criadores de conteúdo de todo o mundo sobre ${q}.`,
  },
  {
    id: 4,
    favBg: '#FF4500',
    favText: 'r',
    site: 'Reddit',
    getTitle: q => `r/${q.replace(/\s+/g, '')} · A maior comunidade de ${q}`,
    getDisplayUrl: q => `www.reddit.com › r › ${q.replace(/\s+/g, '')}`,
    getSnippet: q =>
      `Subreddit dedicado a ${q} com 847K membros ativos. Participe das discussões mais interessantes sobre ${q}, tire suas dúvidas e compartilhe experiências com a maior comunidade online sobre o assunto.`,
  },
  {
    id: 5,
    favBg: '#003087',
    favText: 'B',
    site: 'Britannica',
    getTitle: q => `${q} | Definition, History & Facts | Britannica`,
    getDisplayUrl: q => `www.britannica.com › topic › ${q}`,
    getSnippet: q =>
      `Saiba tudo sobre ${q}: definição, história e fatos relevantes. A Encyclopædia Britannica apresenta uma visão abrangente e academicamente rigorosa sobre ${q}, cobrindo desde suas origens até os desenvolvimentos mais recentes.`,
    date: '12 de mar. de 2024',
  },
  {
    id: 6,
    favBg: '#cc0000',
    favText: 'G',
    site: 'G1 – Globo',
    getTitle: q => `${q}: notícias, análises e todas as últimas informações — G1`,
    getDisplayUrl: q => `g1.globo.com › ${q.toLowerCase().replace(/\s+/g, '-')}`,
    getSnippet: q =>
      `Acompanhe as últimas notícias sobre ${q} no G1. Reportagens especiais, análises de especialistas e cobertura jornalística completa sobre ${q} direto do maior portal de notícias do Brasil.`,
    date: '2 horas atrás',
  },
  {
    id: 7,
    favBg: '#FF9900',
    favText: 'a',
    site: 'Amazon',
    getTitle: q => `${q}: Amazon.com.br — Produtos, Livros e muito mais`,
    getDisplayUrl: q => `www.amazon.com.br › s?k=${q}`,
    getSnippet: q =>
      `Encontre os melhores produtos relacionados a ${q} na Amazon. Preços imbatíveis, frete grátis em itens elegíveis e entrega rápida. Compre ${q} com garantia Amazon e facilidade de pagamento.`,
  },
  {
    id: 8,
    favBg: '#00AB6C',
    favText: 'M',
    site: 'Medium',
    getTitle: q => `O guia definitivo sobre ${q} em 2025 | Medium`,
    getDisplayUrl: q => `medium.com › @especialista › guia-${q.toLowerCase().replace(/\s+/g, '-')}`,
    getSnippet: q =>
      `O artigo mais completo e atualizado sobre ${q}: desde os fundamentos até as aplicações mais avançadas. Se você quer entender ${q} de uma vez por todas, este é o guia que vai transformar sua visão sobre o assunto.`,
    date: '15 de jan. de 2025',
  },
]

const TABS = ['All', 'Images', 'Videos', 'Shopping', 'News', 'Maps', 'More']

const getRelated = (q: string) => [
  `${q} definição`,
  `${q} exemplos práticos`,
  `${q} história e origem`,
  `${q} significado`,
  `benefícios de ${q}`,
  `tipos de ${q}`,
  `como usar ${q}`,
  `${q} para iniciantes`,
]

export default function BrowserSearch() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const [inputValue, setInputValue] = useState(q)
  const navigate = useNavigate()

  useEffect(() => {
    setInputValue(q)
  }, [q])

  const doSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const val = inputValue.trim()
    if (val) navigate(`/browser/search?q=${encodeURIComponent(val)}`)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {/* Header */}
      <header className="flex items-center px-4 py-2 gap-4 bg-white border-b border-[#ebebeb] sticky top-0 z-10">
        <Logo />

        <form onSubmit={doSearch} className="flex-1 max-w-[692px]">
          <div className="flex items-center rounded-[24px] border border-[#dfe1e5] px-4 py-[6px] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] focus-within:shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:border-white focus-within:border-white transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 outline-none text-[16px] text-[#202124] bg-transparent py-[4px]"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue('')}
                className="p-1 mr-2 flex-shrink-0 flex items-center"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#70757a">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
            <div className="flex items-center gap-3 pl-3 border-l border-[#dfe1e5]">
              <button type="button" className="flex items-center hover:opacity-70">
                <MicSVG />
              </button>
              <button type="button" className="flex items-center hover:opacity-70">
                <LensSVG />
              </button>
              <button type="submit" className="flex items-center hover:opacity-70">
                <SearchSVG color="#4285F4" />
              </button>
            </div>
          </div>
        </form>

        <div className="flex items-center gap-2 ml-auto">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e8eaed] transition-colors">
            <AppsSVG />
          </button>
          <button className="px-5 py-[9px] bg-[#1a73e8] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#1765cc] transition-colors">
            Sign in
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex items-center pl-[160px] text-[13px] border-b border-[#ebebeb]">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`flex items-center gap-[6px] px-4 py-3 border-b-[3px] transition-colors ${
              i === 0
                ? 'text-[#1a73e8] border-[#1a73e8]'
                : 'text-[#70757a] border-transparent hover:text-[#202124] hover:bg-[#f8f9fa]'
            }`}
          >
            {i === 0 && (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            )}
            {tab}
          </button>
        ))}
        <button className="px-4 py-3 text-[#70757a] border-b-[3px] border-transparent hover:text-[#202124] hover:bg-[#f8f9fa] ml-auto mr-4">
          Tools
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 pl-[160px] pr-8 py-5">
        <div className="max-w-[652px]">
          {/* Stats */}
          <p className="text-[14px] text-[#70757a] mb-5">
            Cerca de 2.840.000.000 resultados (0,42 segundos)
          </p>

          {/* Results list */}
          <div className="space-y-7">
            {RESULTS.map(result => (
              <article key={result.id}>
                {/* Favicon + site + url */}
                <div className="flex items-center gap-2 mb-[3px]">
                  <div
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-white flex-shrink-0 text-[11px] font-bold"
                    style={{ backgroundColor: result.favBg }}
                  >
                    {result.favText}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[14px] text-[#202124]">{result.site}</span>
                    <span className="text-[12px] text-[#70757a]">{result.getDisplayUrl(q)}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-1">
                  <a
                    href="#"
                    className="text-[20px] leading-[1.3] text-[#1a0dab] hover:underline"
                    onClick={e => e.preventDefault()}
                  >
                    {result.getTitle(q)}
                  </a>
                </h3>

                {/* Snippet */}
                <p className="mt-1 text-[14px] text-[#4d5156] leading-[1.58]">
                  {result.date && (
                    <span className="text-[#70757a]">{result.date} — </span>
                  )}
                  {result.getSnippet(q)}
                </p>
              </article>
            ))}
          </div>

          {/* Related searches */}
          <section className="mt-10">
            <h2 className="text-[18px] text-[#202124] font-normal mb-4">Related searches</h2>
            <div className="grid grid-cols-2 gap-3">
              {getRelated(q).map((term, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/browser/search?q=${encodeURIComponent(term)}`)}
                  className="flex items-center gap-3 px-5 py-3 rounded-[24px] border border-[#dfe1e5] text-[14px] text-[#202124] hover:bg-[#f8f9fa] transition-colors text-left"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#70757a" className="flex-shrink-0">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 mt-10 pb-10">
            <span className="text-[28px] leading-none mr-3" style={{ fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 400 }}>
              {G_CHARS.map((c, i) => (
                <span key={i} style={{ color: G_COLORS[i] }}>{c}</span>
              ))}
            </span>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => (
              <button
                key={page}
                className={`w-9 h-9 rounded-full text-[14px] transition-colors ${
                  page === 1
                    ? 'bg-[#1a73e8] text-white font-medium'
                    : 'text-[#1a0dab] hover:bg-[#f8f9fa]'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="ml-2 flex items-center text-[14px] text-[#1a0dab] hover:underline gap-1">
              Next
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f2f2f2] border-t border-[#dadce0] text-[14px] text-[#70757a]">
        <div className="text-center py-[14px] border-b border-[#dadce0]">Brazil</div>
        <div className="flex justify-between px-6 py-[15px]">
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Send feedback</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
