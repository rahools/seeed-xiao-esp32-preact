import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useWiFiConfig } from "../../hooks/useWiFiConfig";
import type { WiFiNetwork } from "../../hooks/useWiFiScan";
import { useWiFiScan } from "../../hooks/useWiFiScan";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { EmptyState } from "./EmptyState";
import { NetworkItem } from "./NetworkItem";
import { ScanningSpinner } from "./ScanningSpinner";

interface NetworkListSectionProps {
    networks: WiFiNetwork[];
    previousNetwork: WiFiNetwork | null | undefined;
    onConnectionSuccess?: () => void;
}

export function NetworkListSection({
    networks,
    previousNetwork,
    onConnectionSuccess,
}: NetworkListSectionProps) {
    const { config } = useWiFiConfig();
    const { scanning, error, rescan } = useWiFiScan(config.currentSSID);
    const [expandedNetwork, setExpandedNetwork] = useState<string | null>(null);

    const handleToggleExpand = (network: WiFiNetwork) => {
        if (expandedNetwork === network.ssid) {
            setExpandedNetwork(null);
        } else {
            setExpandedNetwork(network.ssid);
        }
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>
                        {previousNetwork
                            ? "Scan Results"
                            : "Available Networks"}
                    </CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={rescan}
                        disabled={scanning}
                    >
                        {scanning ? <ScanningSpinner /> : "Rescan"}
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
                    <EmptyState />
                ) : (
                    <div className="space-y-2">
                        {networks.map((network) => (
                            <NetworkItem
                                key={network.ssid}
                                network={network}
                                isExpanded={expandedNetwork === network.ssid}
                                isPreviousNetwork={
                                    previousNetwork?.ssid === network.ssid
                                }
                                onToggleExpand={handleToggleExpand}
                                onConnectionSuccess={onConnectionSuccess}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
