import { useQuery } from '@tanstack/react-query'

export interface WiFiConfig {
  wifiConfigured: boolean
  wifiConnected: boolean
  currentSSID?: string
}

export function useWiFiConfig() {
  const { data, isLoading, error, refetch } = useQuery<WiFiConfig>({
    queryKey: ['wifi-config'],
    queryFn: async () => {
      const response = await fetch('/config')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    }
  })

  const config = data || {
    wifiConfigured: false,
    wifiConnected: false,
    currentSSID: undefined
  }

  return { 
    config, 
    loading: isLoading, 
    error: error instanceof Error ? error.message : error ? 'Failed to fetch WiFi config' : null, 
    refetch 
  }
}