import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import './App.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { initSessionBridge } from './lib/session-bridge.js'

initSessionBridge(import.meta.env.VITE_ADMIN_URL || "http://localhost:5174")

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
