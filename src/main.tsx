import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ReactLenis } from 'lenis/react'
import App from './App.tsx'
import './index.css' // <-- If this is missing, no styles will load!

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ReactLenis root options={{ lerp: 0.07, duration: 1.2, smoothWheel: true }}>
        <App />
      </ReactLenis>
    </HelmetProvider>
  </StrictMode>,
)