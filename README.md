# ESP32 Vite WebApp

A modern, lightweight web UI template for ESP32 projects using Vite, TailwindCSS v4, Preact, and Shadcn UI. This project provides a complete solution for serving a slick web interface directly from your ESP32 microcontroller.

## Features

- 🚀 **Modern Web Stack**: Vite, TailwindCSS v4, Preact, and Shadcn UI
- ⚡ **Fast Development**: Hot module replacement and instant rebuilds
- 📱 **Responsive Design**: Mobile-first approach with TailwindCSS
- 🔧 **Easy Integration**: Simple C++ library for ESP32
- 📦 **Optimized Delivery**: Static files served as compressed C arrays
- 🎯 **Zero Dependencies**: No external CDN calls or internet required

## Quick Start

### 1. Setup the Web Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Convert to C++ header file
npm run convert-to-cpp
```

### 2. Install ESP32 Library

1. Copy the `library` folder to your Arduino libraries directory
2. Install dependencies:
   - ESPAsyncWebServer
   - AsyncTCP

### 3. Use in Your ESP32 Project

```cpp
#include <esp32-vite-webapp.h>

ESP32ViteWebApp webapp(80); // Port 80

void setup() {
  // Connect to WiFi first
  WiFi.begin("your-ssid", "your-password");
  // ... wait for connection
  
  // Start the webapp
  webapp.begin();
}

void loop() {
  // Your application logic here
}
```

## Project Structure

```
esp32-vite-webapp/
├── src/                    # Web application source
│   ├── components/         # Preact components
│   ├── App.jsx            # Main application
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── scripts/               # Build scripts
│   └── convert-to-cpp.js  # Converts webapp to C arrays
├── library/               # ESP32 Arduino library
│   ├── src/
│   │   ├── esp32-vite-webapp.h
│   │   └── esp32-vite-webapp.cpp
│   └── library.properties
├── example/               # Example ESP32 sketch
├── dist/                  # Built webapp (generated)
└── cpp/                   # Generated C++ header files
```

## Development Workflow

1. **Develop the web interface**:
   ```bash
   npm run dev
   ```
   Edit files in `src/` directory, changes are hot-reloaded

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Convert to ESP32 format**:
   ```bash
   npm run convert-to-cpp
   ```
   This generates `cpp/webapp_data.h` with all your web files as C arrays

4. **Upload to ESP32**:
   - Include the generated header in your Arduino project
   - Upload using Arduino IDE or PlatformIO

## API Reference

### ESP32ViteWebApp Class

```cpp
ESP32ViteWebApp(uint16_t port = 80)
```
Creates a new webapp instance on the specified port.

```cpp
void begin()
```
Starts the web server and serves the web interface.

```cpp
void end()
```
Stops the web server.

```cpp
bool isStarted() const
```
Returns true if the webapp is running.

## Customization

### Adding New Components

1. Create new Preact components in `src/components/`
2. Import and use them in `App.jsx`
3. Rebuild and convert to update the ESP32

### Styling

- Use TailwindCSS classes for styling
- Customize the theme in `tailwind.config.js`
- Add custom CSS in `src/index.css`

### Adding API Endpoints

Extend the `setupRoutes()` method in the C++ library to add custom API endpoints:

```cpp
server->on("/api/status", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "application/json", "{\"status\":\"ok\"}");
});
```

## Performance

- Files are served from PROGMEM, saving RAM
- Gzip compression reduces transfer size
- Cache headers optimize repeat visits
- Optimized for ESP32 memory constraints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on actual ESP32 hardware
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- 📖 Check the [example](example/) for a complete implementation
- 🐛 Report issues on GitHub
- 💬 Join discussions in the community forum