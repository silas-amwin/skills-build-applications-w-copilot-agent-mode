import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { getApiBase } from './apiConfig'

const apiBase = getApiBase()
if (apiBase === '/api') {
  // If VITE_CODESPACE_NAME is not set we'll use the safe relative fallback.
  // This helps avoid building URLs like https://undefined-8000.app.github.dev
  // and works for local dev where the backend is served from the same origin.
  // (No user-visible change required.)
  console.info('VITE_CODESPACE_NAME not set — using relative API fallback "/api"')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
