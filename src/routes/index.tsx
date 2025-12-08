import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { WiFiConnected } from "../components/captive-portal/WiFiConnected";
import { Button } from "../components/ui/button";
import { useWiFiConfig } from "../hooks/useWiFiConfig";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const navigate = useNavigate();
    const { config, loading, error } = useWiFiConfig();

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

    // Redirect to wifi-setting if not connected
    if (!config.wifiConnected) {
        navigate({ to: "/wifi-settings" });
        return null;
    }

    // Show connected screen
    return (
        <WiFiConnected
            ssid={config.currentSSID}
            onDisconnect={() => navigate({ to: "/wifi-settings" })}
        />
    );
}
