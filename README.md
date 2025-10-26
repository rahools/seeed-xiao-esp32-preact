# ESP32 Vite WebApp

This repo targets to implement a modern, lightweight web UI template for ESP32 projects using Vite, TailwindCSS v4, Preact, and Shadcn UI.

## Goals

- 🚀 **Modern Web Stack**: Vite, TailwindCSS v4, Preact, and Shadcn UI
- 🔧 **Easy Integration**: Simple C++ library for ESP32
- 🛜 **Wifi Captive Portal**: Quick setup portal that helps user connect to WiFi
- 🔄 **OTA Updates**: Portal where user can update the firmware over-the-air

## Project Structure

```
esp32-vite-webapp/
├── src/                   # Web application & ESP32 code
│   ├── components/        # Preact components
│   ├── App.jsx            # Main application
│   ├── main.jsx           # Entry point
│   ├── index.css          # Global styles
│   └── main.cpp           # Entry point for ESP32
├── data/                  # Built webapp (generated)
```