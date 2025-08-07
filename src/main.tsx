import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UiEnhancementsWrapper from './ui/UiEnhancementsWrapper'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UiEnhancementsWrapper />
  </StrictMode>,
)
