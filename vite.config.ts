import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(), 
    tailwindcss(),
    viteSingleFile(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 0, // Compress all files
      deleteOriginFile: true,
    }),
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
  server: {
    proxy: {
      '/config': {
        target: 'http://localhost:5173',
        bypass: (req, res) => {
          // Mock the /config endpoint during development
          if (req.url === '/config') {
            // Change these values to test different scenarios
            const mockResponse = {
              wifiConfigured: true,     // Try false for unconfigured state
              wifiConnected: false,     // Try true for connected state
              currentSSID: "TestNetwork" // Only included when wifiConnected = true
            };

            res?.setHeader('Content-Type', 'application/json');
            res?.end(JSON.stringify(mockResponse));
            return false;
          }
        }
      },
      '/scan-wifi': {
        target: 'http://localhost:5173',
        bypass: (req, res) => {
          // Mock the /scan-wifi endpoint
          if (req.url === '/scan-wifi') {
            console.log("Scan WiFi endpoint called")
            const mockNetworks = [
              { ssid: "HomeNetwork_5G", rssi: -35, encryption: "WPA2" },
              { ssid: "HomeNetwork", rssi: -42, encryption: "WPA2" },
              { ssid: "Neighbor_WiFi", rssi: -58, encryption: "WPA3" },
              { ssid: "Coffee_Shop", rssi: -65, encryption: "WPA2" },
              { ssid: "Office_Guest", rssi: -70, encryption: "WPA2" },
              { ssid: "TestNetwork", rssi: -78, encryption: "WPA2" }, // Previously configured
              { ssid: "Free_Public_WiFi", rssi: -85, encryption: "Open" },
              { ssid: "HiddenNetwork", rssi: -90, encryption: "WPA2" }
            ];

            res?.setHeader('Content-Type', 'application/json');
            res?.end(JSON.stringify({ networks: mockNetworks }));
            return false;
          }
        }
      }
    }
  }
})
