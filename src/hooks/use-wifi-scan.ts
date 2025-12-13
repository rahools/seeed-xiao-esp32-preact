import { useQuery } from "@tanstack/react-query";

export interface WifiNetwork {
    ssid: string;
    rssi: number; // Signal strength in dBm
    encryption: string;
}

export interface WifiScanResponse {
    networks: WifiNetwork[];
}

export function useWifiScan(previousSSID?: string) {
    const { data, isLoading, error, refetch } = useQuery<WifiScanResponse>({
        queryKey: ["wifi-scan"],
        queryFn: async () => {
            const response = await fetch("/api/wifi");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        },
        refetchInterval: 60_000, // Poll every 4 seconds
    });

    const networks = data?.networks || [];

    // Sort networks: previously saved first, then by signal strength
    const sortedNetworks = [...networks].sort((a, b) => {
        // If one is previously saved and other is not, prioritize the saved one
        if (previousSSID) {
            const aIsPrevious = a.ssid === previousSSID;
            const bIsPrevious = b.ssid === previousSSID;
            if (aIsPrevious && !bIsPrevious) return -1;
            if (!aIsPrevious && bIsPrevious) return 1;
        }
        // Otherwise sort by signal strength (strongest first)
        return b.rssi - a.rssi;
    });

    return {
        networks: sortedNetworks,
        scanning: isLoading,
        error:
            error instanceof Error
                ? error.message
                : error
                  ? "Unknown error"
                  : null,
        rescan: () => refetch(),
    };
}

export function getSignalStrength(
    rssi: number,
): "excellent" | "good" | "fair" | "poor" {
    if (rssi >= -50) return "excellent";
    if (rssi >= -60) return "good";
    if (rssi >= -70) return "fair";
    return "poor";
}
