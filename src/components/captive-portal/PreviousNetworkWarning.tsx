import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

interface PreviousNetworkWarningProps {
  currentSSID?: string
  previousNetwork: boolean
}

export function PreviousNetworkWarning({ currentSSID, previousNetwork }: PreviousNetworkWarningProps) {
  if (!currentSSID) return null

  return (
    <Alert className="mb-6 border-yellow-200 bg-yellow-50">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-800">Previously configured network unavailable</AlertTitle>
      <AlertDescription className="text-yellow-700">
        Your saved network "{currentSSID}" may be out of range or its password might have changed.
        {!previousNetwork && " It's not currently visible in the available networks."}
      </AlertDescription>
    </Alert>
  )
}