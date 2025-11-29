import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import type { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { defineConfig, type ViteDevServer } from "vite";
import viteCompression from "vite-plugin-compression";
import { viteSingleFile } from "vite-plugin-singlefile";

// Mock data for development
const mockNetworks = [
    { ssid: "HomeNetwork_5G", rssi: -35, encryption: "WPA2_PSK" },
    { ssid: "HomeNetwork", rssi: -42, encryption: "WPA2_PSK" },
    { ssid: "Neighbor_WiFi", rssi: -58, encryption: "WPA3_PSK" },
    { ssid: "Coffee_Shop", rssi: -65, encryption: "WPA2_PSK" },
    { ssid: "Office_Guest", rssi: -70, encryption: "WPA2_PSK" },
    { ssid: "TestNetwork", rssi: -78, encryption: "WPA2_PSK" },
    { ssid: "Free_Public_WiFi", rssi: -85, encryption: "Open" },
    { ssid: "HiddenNetwork", rssi: -90, encryption: "WPA2_PSK" },
];

const mockConfig = {
    wifiConfigured: true,
    wifiConnected: true,
    currentSSID: "TestNetwork",
};

// Custom plugin to mock API endpoints
const apiMockPlugin = () => ({
    name: "api-mock",
    configureServer(server: ViteDevServer) {
        server.middlewares.use(
            (req: IncomingMessage, res: ServerResponse, next: () => void) => {
                // Mock /config
                if (req.url === "/config" && req.method === "GET") {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(mockConfig));
                    return;
                }

                // Mock /api/wifi
                if (req.url === "/api/wifi") {
                    if (req.method === "GET") {
                        console.log("Mock API: GET /api/wifi");
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({ networks: mockNetworks }));
                        return;
                    }
                    if (req.method === "POST") {
                        console.log("Mock API: POST /api/wifi");
                        // Read the body to simulate processing
                        let body = "";
                        req.on("data", (chunk: Buffer) => {
                            body += chunk.toString();
                        });
                        req.on("end", () => {
                            console.log("Received credentials:", body);
                            res.setHeader("Content-Type", "application/json");
                            res.end(
                                JSON.stringify({
                                    status: "connecting",
                                    message:
                                        "Credentials received, attempting connection...",
                                }),
                            );
                        });
                        return;
                    }
                }

                next();
            },
        );
    },
});

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        preact(),
        tailwindcss(),
        viteSingleFile(),
        viteCompression({
            algorithm: "gzip",
            ext: ".gz",
            threshold: 0, // Compress all files
            deleteOriginFile: true,
        }),
        apiMockPlugin(), // Add the mock plugin
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    build: {
        outDir: path.resolve(__dirname, "./data"),
        emptyOutDir: true,
        assetsInlineLimit: 100000000, // Inline all assets
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});
