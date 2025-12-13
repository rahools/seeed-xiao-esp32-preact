import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { AlertTriangle } from "lucide-react";

interface PreviousWifiUnreachableWarningProps {
    currentSSID?: string;
    previousNetwork: boolean;
    wifiConnected?: boolean;
}

export function PreviousWifiUnreachableWarning({
    currentSSID,
    previousNetwork,
    wifiConnected,
}: PreviousWifiUnreachableWarningProps) {
    if (!currentSSID) return null;

    // Don't show any warning if we're currently connected to this network
    if (wifiConnected) return null;

    // Don't show "out of range" warning if we're currently connected to this network
    // As connected networks might not appear in WiFi scan results
    const showOutOfRangeWarning = !previousNetwork && !wifiConnected;

    return (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">
                Previously configured network unavailable
            </AlertTitle>
            <AlertDescription className="text-yellow-700">
                Your saved network "{currentSSID}" may be out of range or its
                password might have changed.
                {showOutOfRangeWarning &&
                    " It's not currently visible in the available networks."}
            </AlertDescription>
        </Alert>
    );
}
