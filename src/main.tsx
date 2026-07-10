import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import { TRPCProvider } from "@/providers/trpc"
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// If Clerk key is missing, show a helpful error instead of black screen
if (!PUBLISHABLE_KEY) {
  createRoot(document.getElementById('root')!).render(
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0F',
      color: '#F5E6D3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#E11D48', marginBottom: '1rem' }}>⚠️ Missing Clerk Key</h1>
      <p style={{ maxWidth: '600px', lineHeight: 1.6, marginBottom: '1rem' }}>
        The <code>VITE_CLERK_PUBLISHABLE_KEY</code> environment variable is missing.
      </p>
      <p style={{ maxWidth: '600px', lineHeight: 1.6, marginBottom: '2rem', color: '#888' }}>
        To fix this, add your Clerk Publishable Key to Netlify:
        <br /><br />
        <strong>Site Settings → Environment Variables → Add:</strong>
        <br />
        <code style={{ background: '#1E1E2D', padding: '4px 8px', borderRadius: '4px' }}>
          VITE_CLERK_PUBLISHABLE_KEY = pk_test_... or pk_live_...
        </code>
        <br /><br />
        Then trigger a new deploy.
      </p>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        Find your key at: clerk.com → Your App → API Keys → Publishable Key
      </p>
    </div>
  )
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
          <TRPCProvider>
            <App />
          </TRPCProvider>
        </BrowserRouter>
      </ClerkProvider>
    </StrictMode>,
  )
}
