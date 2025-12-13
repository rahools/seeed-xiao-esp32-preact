import type { WifiNetwork } from "@hooks/use-wifi-scan";
import { Badge } from "@ui/badge";
import { Separator } from "@ui/separator";
import { WifiIcon } from "./wifi-icon";
import { WifiPasswordForm } from "./wifi-password-form";

interface WifiItemProps {
    network: WifiNetwork;
    isExpanded: boolean;
    isPreviousNetwork: boolean;
    onToggleExpand: (network: WifiNetwork) => void;
    wifiConnected?: boolean;
    currentSSID?: string;
}

export function WifiItem({
    network,
    isExpanded,
    isPreviousNetwork,
    onToggleExpand,
    wifiConnected,
    currentSSID,
}: WifiItemProps) {
    const isCurrentlyConnected = wifiConnected && network.ssid === currentSSID;
    return (
        <>
            <div
                key={network.ssid}
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                    isExpanded && isCurrentlyConnected
                        ? "border-green-100 bg-green-50"
                        : isExpanded
                          ? "border-blue-100 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                } ${
                    isCurrentlyConnected
                        ? "ring-2 ring-green-100"
                        : isPreviousNetwork
                          ? "ring-2 ring-yellow-100"
                          : ""
                }`}
            >
                <button
                    type="button"
                    className={`w-full p-3 cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-offset-2 text-left ${
                        isCurrentlyConnected
                            ? "focus:ring-green-500"
                            : "focus:ring-blue-500"
                    }`}
                    onClick={() => onToggleExpand(network)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">
                                        {network.ssid}
                                    </span>
                                    {isCurrentlyConnected && (
                                        <Badge
                                            variant="outline"
                                            className="border-green-400 text-green-700 bg-green-50"
                                        >
                                            Connected
                                        </Badge>
                                    )}
                                    {!isCurrentlyConnected &&
                                        isPreviousNetwork && (
                                            <Badge
                                                variant="outline"
                                                className="border-yellow-400 text-yellow-700 bg-yellow-50"
                                            >
                                                Previously saved
                                            </Badge>
                                        )}
                                    {network.encryption === "Open" ? (
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-100 text-green-800 border-green-200"
                                        >
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
                            <WifiIcon
                                rssi={network.rssi}
                                isPreviousNetwork={isPreviousNetwork}
                            />
                        </div>
                    </div>
                </button>

                {isExpanded && (
                    <WifiPasswordForm
                        network={network}
                        onCancel={() => onToggleExpand(network)}
                    />
                )}
            </div>
            {(isCurrentlyConnected || isPreviousNetwork) && (
                <Separator className="my-4" />
            )}
        </>
    );
}
