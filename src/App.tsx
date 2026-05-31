import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BrowserHome from './pages/Browser/Home'
import BrowserSearch from './pages/Browser/Search'
import Youtube from './pages/Youtube'
import YoutubeWatch from './pages/Youtube/Watch'
import Windows from './pages/Windows'
import Captcha from './pages/captcha'
import OticaPage from './pages/Otica'
import SimulatedLayout from './components/SimulatedLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/windows" element={<SimulatedLayout><Windows /></SimulatedLayout>} />
        <Route path="/browser" element={<SimulatedLayout><BrowserHome /></SimulatedLayout>} />
        <Route path="/browser/search" element={<SimulatedLayout><BrowserSearch /></SimulatedLayout>} />
        <Route path="/youtube" element={<SimulatedLayout><Youtube /></SimulatedLayout>} />
        <Route path="/youtube/watch" element={<SimulatedLayout><YoutubeWatch /></SimulatedLayout>} />
        <Route path="/captcha" element={<SimulatedLayout><Captcha /></SimulatedLayout>} />
        <Route path="/otica" element={<SimulatedLayout><OticaPage /></SimulatedLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
