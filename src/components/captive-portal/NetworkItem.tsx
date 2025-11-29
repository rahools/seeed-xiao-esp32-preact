import type { WiFiNetwork } from "../../hooks/useWiFiScan";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { NetworkPasswordForm } from "./NetworkPasswordForm";
import { WifiIcon } from "./WifiIcon";

interface NetworkItemProps {
    network: WiFiNetwork;
    isExpanded: boolean;
    isPreviousNetwork: boolean;
    onToggleExpand: (network: WiFiNetwork) => void;
}

export function NetworkItem({
    network,
    isExpanded,
    isPreviousNetwork,
    onToggleExpand,
}: NetworkItemProps) {
    return (
        <>
            <div
                key={network.ssid}
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                    isExpanded
                        ? "border-blue-100 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                } ${isPreviousNetwork ? "ring-2 ring-yellow-100" : ""}`}
            >
                <button
                    type="button"
                    className="w-full p-3 cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-left"
                    onClick={() => onToggleExpand(network)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">
                                        {network.ssid}
                                    </span>
                                    {isPreviousNetwork && (
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
                    <NetworkPasswordForm
                        network={network}
                        onCancel={() => onToggleExpand(network)}
                    />
                )}
            </div>
            {isPreviousNetwork && <Separator className="my-4" />}
        </>
    );
}
