import { useState } from 'preact/hooks'
import { Wifi, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { useWiFiConfig } from '../hooks/useWiFiConfig'
import { useWiFiScan, getSignalStrength, type WiFiNetwork } from '../hooks/useWiFiScan'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { cn } from '../lib/utils'
import { Separator } from './ui/separator'

export function CaptivePortal() {
  const { config } = useWiFiConfig()
  const { networks, scanning, error, rescan } = useWiFiScan(config.currentSSID)
  const [expandedNetwork, setExpandedNetwork] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Check if previously configured network is available
  const previousNetwork = config.currentSSID
    ? networks.find(net => net.ssid === config.currentSSID)
    : null

  const handleConnect = async (network: WiFiNetwork) => {
    if (!network) return

    setConnecting(true)
    try {
      // TODO: Implement actual connection logic
      console.log('Connecting to:', network.ssid, 'with password:', password)
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      // TODO: Call connection endpoint
    } catch (error) {
      console.error('Connection failed:', error)
    } finally {
      setConnecting(false)
    }
  }

  const handleToggleExpand = (network: WiFiNetwork) => {
    if (expandedNetwork === network.ssid) {
      setExpandedNetwork(null)
      setPassword('')
      setShowPassword(false)
    } else {
      setExpandedNetwork(network.ssid)
      setPassword('')
      setShowPassword(false)
    }
  }

  const renderWifiIcon = (rssi: number) => {
    const strength = getSignalStrength(rssi)
    const color = strength === 'excellent' || strength === 'good'
      ? 'text-green-600'
      : strength === 'fair'
        ? 'text-yellow-500'
        : 'text-red-500'

    return (
      <div className="group relative">
        <Wifi
          className={cn(`w-5 h-5 transition-colors`, color)}
        />
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {strength}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WiFi Configuration</h1>
          <p className="text-gray-600">Connect your ESP32 to a WiFi network</p>
        </div>

        {/* Previous Network Warning */}
        {config.wifiConfigured && !config.wifiConnected && config.currentSSID && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Previously configured network unavailable</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Your saved network "{config.currentSSID}" may be out of range or its password might have changed.
              {!previousNetwork && " It's not currently visible in the available networks."}
            </AlertDescription>
          </Alert>
        )}

        {/* WiFi Networks List */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {config.wifiConfigured && !config.wifiConnected && config.currentSSID
                  ? 'Scan Results'
                  : 'Available Networks'
                }
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => rescan()}
                disabled={scanning}
              >
                {scanning ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Scanning...
                  </div>
                ) : (
                  'Rescan'
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>Error: {error}</AlertDescription>
              </Alert>
            )}

            {networks.length === 0 && !scanning ? (
              <div className="text-center py-8 text-gray-500">
                <Wifi className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No WiFi networks found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {networks.map((network) => {
                  return (
                    <>
                      <div
                        key={network.ssid}
                        className={`border rounded-lg overflow-hidden transition-all duration-200 ${expandedNetwork === network.ssid
                          ? 'border-blue-100 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          } ${previousNetwork?.ssid === network.ssid ? 'ring-2 ring-yellow-100' : ''}`}
                      >
                        <button
                          type="button"
                          className="w-full p-3 cursor-pointer transition-colors outline-none text-left"
                          onClick={() => handleToggleExpand(network)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{network.ssid}</span>
                                  {previousNetwork?.ssid === network.ssid && (
                                    <Badge variant="outline" className="border-yellow-400 text-yellow-700 bg-yellow-50">
                                      Previously saved
                                    </Badge>
                                  )}
                                  {network.encryption === 'Open' ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                      Open
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">
                                      {network.encryption}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {renderWifiIcon(network.rssi)}
                            </div>
                          </div>
                        </button>

                        {/* Expanded Content - Password Input */}
                        {expandedNetwork === network.ssid && (
                          <div className="border-t border-gray-200 bg-gray-50 p-4">
                            <div className={cn("mb-4", network.encryption === 'Open' ? 'hidden' : '')}>
                              <div className="relative">
                                <input
                                  id={`password-${network.ssid}`}
                                  type={showPassword ? 'text' : 'password'}
                                  value={expandedNetwork === network.ssid ? password : ''}
                                  onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                                  placeholder="Enter WiFi password"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                  ) : (
                                    <Eye className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <Button
                                onClick={() => handleConnect(network)}
                                disabled={connecting || (network.encryption !== 'Open' && !password)}
                                className="flex-1"
                              >
                                {connecting ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Connecting...
                                  </div>
                                ) : (
                                  'Connect'
                                )}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Divider - if previous network is saved */}
                      {previousNetwork?.ssid === network.ssid && <Separator />}
                    </>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}