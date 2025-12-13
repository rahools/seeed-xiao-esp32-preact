import { useWifiConfig } from "@hooks/use-wifi-config";
import { useWifiConnect } from "@hooks/use-wifi-connect";
import { useWifiScan } from "@hooks/use-wifi-scan";
import { useState } from "preact/hooks";
import { RebootCountdown } from "../reboot-countdown";
import { PreviousWifiUnreachableWarning } from "./previous-wifi-unreachable-warning";
import { WifiList } from "./wifi-list";

interface WifiSettingsProps {
    onConnectionSuccess?: () => void;
}

export function WifiSettings({ onConnectionSuccess }: WifiSettingsProps) {
    const [showRebootCountdown, setShowRebootCountdown] = useState(false);
    const { config } = useWifiConfig();
    const { networks } = useWifiScan(config.currentSSID);

    // Check if previously configured network is available
    const previousNetwork = config.currentSSID
        ? networks.find((net) => net.ssid === config.currentSSID)
        : null;

    const handleCountdownComplete = () => {
        window.location.reload();
    };

    // Watch for connection success and show countdown
    const { isSuccess } = useWifiConnect();

    if (isSuccess && !showRebootCountdown) {
        setShowRebootCountdown(true);
        setTimeout(() => {
            onConnectionSuccess?.();
        }, 100);
    }

    // Show reboot countdown after successful connection
    if (showRebootCountdown) {
        return (
            <div className="min-h-svh bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
                <RebootCountdown onComplete={handleCountdownComplete} />
            </div>
        );
    }

    // Show main captive portal interface
    return (
        <div className="min-h-svh bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8 pt-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        WiFi Configuration
                    </h1>
                    <p className="text-gray-600">
                        Connect your ESP32 to a WiFi network
                    </p>
                </div>

                <PreviousWifiUnreachableWarning
                    currentSSID={config.currentSSID}
                    previousNetwork={!!previousNetwork}
                    wifiConnected={config.wifiConnected}
                />

                <WifiList
                    networks={networks}
                    previousNetwork={previousNetwork}
                    wifiConnected={config.wifiConnected}
                    currentSSID={config.currentSSID}
                />
            </div>
        </div>
    );
}
