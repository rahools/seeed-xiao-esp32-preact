import { useState, useEffect } from 'preact/hooks'

export interface WiFiConfig {
  wifiConfigured: boolean
  wifiConnected: boolean
  currentSSID?: string
}

export function useWiFiConfig() {
  const [config, setConfig] = useState<WiFiConfig>({
    wifiConfigured: false,
    wifiConnected: false,
    currentSSID: undefined
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConfig = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/config')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setConfig(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch WiFi config')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  return { config, loading, error, refetch: fetchConfig }
}