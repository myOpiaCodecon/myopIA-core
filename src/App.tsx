import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BrowserHome from './pages/Browser/Home'
import BrowserSearch from './pages/Browser/Search'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
