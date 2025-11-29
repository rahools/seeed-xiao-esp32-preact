import { useWiFiConfig } from "../../hooks/useWiFiConfig";
import { useWiFiScan } from "../../hooks/useWiFiScan";

import { CaptivePortalHeader } from "./CaptivePortalHeader";
import { NetworkListSection } from "./NetworkListSection";
import { PreviousNetworkWarning } from "./PreviousNetworkWarning";

export function CaptivePortal() {
    const { config } = useWiFiConfig();
    const { networks } = useWiFiScan(
        config.currentSSID,
    );

    // Check if previously configured network is available
    const previousNetwork = config.currentSSID
        ? networks.find((net) => net.ssid === config.currentSSID)
        : null;

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
                />
            </div>
        </div>
    );
}
