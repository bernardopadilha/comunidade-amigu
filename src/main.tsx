import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './styles/global.css'
import { ThemeProvider } from './components/theme/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="comunidade-amigu" defaultTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
