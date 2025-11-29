import { useState } from "preact/hooks";
import viteLogo from "/vite.svg";
import preactLogo from "./assets/preact.svg";
import { CaptivePortal } from "./components/captive-portal/CaptivePortal";
import { WiFiConnected } from "./components/captive-portal/WiFiConnected";
import { Button } from "./components/ui/button";
import { useWiFiConfig } from "./hooks/useWiFiConfig";
import "./app.css";

export function App() {
    const [count, setCount] = useState(0);
    const [showCaptivePortal, setShowCaptivePortal] = useState(false);
    const { config, loading, error, refetch } = useWiFiConfig();

    if (loading) {
        return (
            <div class="flex items-center justify-center min-h-screen">
                <div class="text-lg">Loading WiFi configuration...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div class="flex flex-col items-center justify-center min-h-screen gap-4">
                <div class="text-red-500">Error: {error}</div>
                <Button
                    onClick={() => {
                        refetch();
                    }}
                >
                    Retry
                </Button>
            </div>
        );
    }

    // Show captive portal when WiFi is not connected or explicitly requested
    if (!config.wifiConnected || showCaptivePortal) {
        return <CaptivePortal />;
    }

    // Show connected screen when WiFi is connected
    if (config.wifiConnected && config.currentSSID) {
        return (
            <WiFiConnected
                ssid={config.currentSSID}
                onDisconnect={() => setShowCaptivePortal(true)}
            />
        );
    }

    return (
        <>
            <div>
                <a
                    href="https://vite.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={viteLogo} class="logo" alt="Vite logo" />
                </a>
                <a
                    href="https://preactjs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={preactLogo}
                        class="logo preact"
                        alt="Preact logo"
                    />
                </a>
            </div>

            <h1>ESP32 WiFi Manager</h1>

            {/* Original demo content */}
            <div class="card">
                <h3>Demo Counter</h3>
                <button
                    type="button"
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </button>
                <p>
                    Edit <code>src/app.tsx</code> and save to test HMR
                </p>
            </div>

            <p>
                Check out{" "}
                <a
                    href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    create-preact
                </a>
                , the official Preact + Vite starter
            </p>
            <p class="read-the-docs">
                Click on the Vite and Preact logos to learn more
            </p>
        </>
    );
}
