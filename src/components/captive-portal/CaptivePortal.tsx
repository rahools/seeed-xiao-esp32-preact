import { useState } from "preact/hooks";
import { useWiFiConfig } from "../../hooks/useWiFiConfig";
import { useWiFiScan } from "../../hooks/useWiFiScan";

import { CaptivePortalHeader } from "./CaptivePortalHeader";
import { NetworkListSection } from "./NetworkListSection";
import { PreviousNetworkWarning } from "./PreviousNetworkWarning";
import { RebootCountdown } from "./RebootCountdown";

export function CaptivePortal() {
    const [showRebootCountdown, setShowRebootCountdown] = useState(false);
    const { config } = useWiFiConfig();
    const { networks } = useWiFiScan(
        config.currentSSID,
    );

    // Check if previously configured network is available
    const previousNetwork = config.currentSSID
        ? networks.find((net) => net.ssid === config.currentSSID)
        : null;

    const handleConnectionSuccess = () => {
        setShowRebootCountdown(true);
    };

    const handleCountdownComplete = () => {
        window.location.reload();
    };

    if (showRebootCountdown) {
        return (
            <div className="min-h-svh bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
                <RebootCountdown onComplete={handleCountdownComplete} />
            </div>
        );
    }

    return (
        <div className="min-h-svh bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-2xl mx-auto">
                <CaptivePortalHeader />

                <PreviousNetworkWarning
                    currentSSID={config.currentSSID}
                    previousNetwork={!!previousNetwork}
                />

                <NetworkListSection
                    networks={networks}
                    previousNetwork={previousNetwork}
                    onConnectionSuccess={handleConnectionSuccess}
                />
            </div>
        </div>
    );
}
