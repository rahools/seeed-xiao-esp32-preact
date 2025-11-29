import { Wifi } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="text-center py-8 text-gray-500">
      <Wifi className="w-12 h-12 mx-auto mb-3 text-gray-300" />
      <p>No WiFi networks found</p>
    </div>
  )
}