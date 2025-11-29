export function ScanningSpinner() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      Scanning...
    </div>
  )
}