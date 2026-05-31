import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PlanProvider } from './contexts/PlanContext.tsx'
import { SkinProvider } from './contexts/SkinContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlanProvider>
      <SkinProvider>
        <App />
      </SkinProvider>
    </PlanProvider>
  </StrictMode>,
)
