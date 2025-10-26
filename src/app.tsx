import { useState } from 'preact/hooks'
import { useWiFiConfig } from './hooks/useWiFiConfig'
import { CaptivePortal } from './components/CaptivePortal'
import { Button } from './components/ui/button'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)
  const [showCaptivePortal, setShowCaptivePortal] = useState(false)
  const { config, loading, error, refetch } = useWiFiConfig()

  if (loading) {
    return (
      <div class="flex items-center justify-center min-h-screen">
        <div class="text-lg">Loading WiFi configuration...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div class="flex flex-col items-center justify-center min-h-screen gap-4">
        <div class="text-red-500">Error: {error}</div>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }

  // Show captive portal when WiFi is not connected
  if (!config.wifiConnected || showCaptivePortal) {
    return <CaptivePortal />
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank" rel="noopener noreferrer">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>

      <h1>ESP32 WiFi Manager</h1>

      {/* WiFi Status Display */}
      <div class="card">
        <h2>WiFi Status</h2>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="font-medium">WiFi Configured:</span>
            <span class={config.wifiConfigured ? 'text-green-600' : 'text-red-600'}>
              {config.wifiConfigured ? 'Yes' : 'No'}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium">WiFi Connected:</span>
            <span class={config.wifiConnected ? 'text-green-600' : 'text-red-600'}>
              {config.wifiConnected ? 'Yes' : 'No'}
            </span>
          </div>
          {config.currentSSID && (
            <div class="flex items-center gap-2">
              <span class="font-medium">Current SSID:</span>
              <span>{config.currentSSID}</span>
            </div>
          )}
        </div>
      </div>

      {/* Connected State UI */}
      <div class="card">
        <div>
          <h3>WiFi Connected Successfully</h3>
          <p>Device is connected to {config.currentSSID}</p>
          <div class="flex gap-2 mt-2">
            <Button variant="outline" onClick={() => setShowCaptivePortal(true)}>
              Change Network
            </Button>
          </div>
        </div>
      </div>

      {/* Original demo content */}
      <div class="card">
        <h3>Demo Counter</h3>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>

      <p>
        Check out{' '}
        <a
          href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          create-preact
        </a>
        , the official Preact + Vite starter
      </p>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
