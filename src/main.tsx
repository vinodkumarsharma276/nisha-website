import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initMotion } from './lib/motion'

initMotion()

// The app uses hash routing (#/blog) for GitHub Pages. If someone types a plain
// path like /admin or /blog, move it into the hash so the right page opens.
{
  const base = import.meta.env.BASE_URL
  const { pathname, search, hash } = window.location
  if (pathname.startsWith(base) && pathname !== base && pathname !== `${base}index.html` && !hash.startsWith('#/')) {
    const route = pathname.slice(base.length).replace(/\/+$/, '')
    window.history.replaceState(null, '', `${base}${search}#/${route}`)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
