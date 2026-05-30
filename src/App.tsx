import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BrowserHome from './pages/Browser/Home'
import BrowserSearch from './pages/Browser/Search'
import Youtube from './pages/Youtube'
import YoutubeWatch from './pages/Youtube/Watch'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center w-screen h-screen">
              <h1 className="text-4xl font-bold tracking-tight">MyOpia 👓</h1>
            </div>
          }
        />
        <Route path="/browser" element={<BrowserHome />} />
        <Route path="/browser/search" element={<BrowserSearch />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/youtube/watch" element={<YoutubeWatch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
