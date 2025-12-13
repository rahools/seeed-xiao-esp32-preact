import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { WelcomePage } from "../components/welcome-page";
import { WifiConnected } from "../components/wifi-connected";
import { WifiUnconnected } from "../components/wifi-unconnected";
import { useWifiConfig } from "../hooks/use-wifi-config";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const navigate = useNavigate();
    const { config, loading, error } = useWifiConfig();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading WiFi configuration...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-red-500">Error: {error}</div>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    // State 1: No network configured
    if (!config.wifiConfigured) {
        return <WelcomePage />;
    }

    // State 2: Connected to network
    if (config.wifiConnected) {
        return (
            <WifiConnected
                ssid={config.currentSSID}
                onDisconnect={() => navigate({ to: "/wifi-settings" })}
            />
        );
    }

    // State 3: Network configured but can't connect
    return (
        <WifiUnconnected
            ssid={config.currentSSID}
            onRetry={() => navigate({ to: "/wifi-settings" })}
            onSettings={() => navigate({ to: "/wifi-settings" })}
        />
    );
}
