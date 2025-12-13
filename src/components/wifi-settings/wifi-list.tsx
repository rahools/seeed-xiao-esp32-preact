import { useWifiConfig } from "@hooks/use-wifi-config";
import type { WifiNetwork } from "@hooks/use-wifi-scan";
import { useWifiScan } from "@hooks/use-wifi-scan";
import { Alert, AlertDescription } from "@ui/alert";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { AlertTriangle, Wifi } from "lucide-react";
import { useState } from "react";
import { WifiItem } from "./wifi-item";

interface WifiListProps {
    networks: WifiNetwork[];
    previousNetwork: WifiNetwork | null | undefined;
    wifiConnected?: boolean;
    currentSSID?: string;
}

export function WifiList({
    networks,
    previousNetwork,
    wifiConnected,
    currentSSID,
}: WifiListProps) {
    const { config } = useWifiConfig();
    const { scanning, error, rescan } = useWifiScan(config.currentSSID);
    const [expandedNetwork, setExpandedNetwork] = useState<string | null>(null);

    const handleToggleExpand = (network: WifiNetwork) => {
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
                        {scanning ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                Scanning...
                            </div>
                        ) : (
                            "Rescan"
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
                    <EmptyState />
                ) : (
                    <div className="space-y-2">
                        {networks.map((network) => (
                            <WifiItem
                                key={network.ssid}
                                network={network}
                                isExpanded={expandedNetwork === network.ssid}
                                isPreviousNetwork={
                                    previousNetwork?.ssid === network.ssid
                                }
                                onToggleExpand={handleToggleExpand}
                                wifiConnected={wifiConnected}
                                currentSSID={currentSSID}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-8 text-gray-500">
            <Wifi className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No WiFi networks found</p>
        </div>
    );
}
