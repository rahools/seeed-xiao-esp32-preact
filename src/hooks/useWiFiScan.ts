import { useState, useEffect } from 'preact/hooks'

export interface WiFiNetwork {
  ssid: string
  rssi: number // Signal strength in dBm
  encryption: string
}

export interface WiFiScanResponse {
  networks: WiFiNetwork[]
}

export function useWiFiScan(previousSSID?: string) {
  const [networks, setNetworks] = useState<WiFiNetwork[]>([])
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scanNetworks = async () => {
    try {
      setScanning(true)
      setError(null)
      const response = await fetch('/scan-wifi')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: WiFiScanResponse = await response.json()

      // Sort networks: previously saved first, then by signal strength
      const sortedNetworks = data.networks.sort((a, b) => {
        // If one is previously saved and other is not, prioritize the saved one
        if (previousSSID) {
          const aIsPrevious = a.ssid === previousSSID
          const bIsPrevious = b.ssid === previousSSID
          if (aIsPrevious && !bIsPrevious) return -1
          if (!aIsPrevious && bIsPrevious) return 1
        }
        // Otherwise sort by signal strength (strongest first)
        return b.rssi - a.rssi
      })
      setNetworks(sortedNetworks)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan networks')
    } finally {
      setScanning(false)
    }
  }

  useEffect(() => {
    scanNetworks()
  }, [previousSSID])

  return { networks, scanning, error, rescan: () => scanNetworks() }
}

export function getSignalStrength(rssi: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (rssi >= -50) return 'excellent'
  if (rssi >= -60) return 'good'
  if (rssi >= -70) return 'fair'
  return 'poor'
}