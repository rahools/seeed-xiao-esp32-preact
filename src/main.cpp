// SPDX-License-Identifier: LGPL-3.0-or-later
// Copyright 2016-2025 Hristo Gochkov, Mathieu Carbou, Emil Muratov

//
// Shows how to serve a static file
//

#include <Arduino.h>
#include <AsyncTCP.h>
#include <WiFi.h>

#include <ArduinoJson.h>
#include <AsyncJson.h>
#include <ESPAsyncWebServer.h>
#include <LittleFS.h>
#include "esp/WiFiUtils.h"

#ifndef LED_BUILTIN
  #define LED_BUILTIN 2
#endif

static AsyncWebServer server(80);
static WiFiUtils wifiUtils;

// WiFi status variables
bool wifiConfigured = false;
bool wifiConnected = false;
String currentSSID = "";

// Function to check WiFi status
void updateWiFiStatus() {
  wifiConnected = WiFi.status() == WL_CONNECTED;
  if (wifiConnected) {
    currentSSID = WiFi.SSID();
    wifiConfigured = true;
  }
  else {
    currentSSID = "";
    // For now, assume WiFi is not configured if not connected
    // This can be enhanced later to check stored credentials
    wifiConfigured = false;
  }
}

// Debug function to list all files in LittleFS
void listDir(fs::FS& fs, const char* dirname, uint8_t levels) {
  Serial.printf("Listing directory: %s\n", dirname);

  File root = fs.open(dirname);
  if (!root) {
    Serial.println("Failed to open directory");
    return;
  }
  if (!root.isDirectory()) {
    Serial.println("Not a directory");
    return;
  }

  File file = root.openNextFile();
  while (file) {
    if (file.isDirectory()) {
      Serial.print("  DIR : ");
      Serial.println(file.name());
      if (levels) {
        listDir(fs, file.path(), levels - 1);
      }
    }
    else {
      Serial.print("  FILE: ");
      Serial.print(file.name());
      Serial.print("  SIZE: ");
      Serial.println(file.size());
    }
    file = root.openNextFile();
  }
}

void setup() {
  // start serial
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);

  // start wifi
  // WiFi.mode(WIFI_AP); // Moved to WiFiUtils::begin() which sets WIFI_AP_STA
  WiFi.softAP("esp-captive");

  wifiUtils.begin();

  // start LittleFS
  if (!LittleFS.begin(false)) {
    Serial.println("LittleFS mount failed, formatting...");
    if (!LittleFS.begin(true)) {
      Serial.println("LittleFS format failed!");
      return;
    }
    Serial.println("LittleFS formatted successfully");
  }
  Serial.println("LittleFS mounted successfully");

  // List all files for debugging
  listDir(LittleFS, "/", 3);

  // curl -v http://192.168.4.1/
  server.on(
      "/", HTTP_GET, [](AsyncWebServerRequest* request) { request->redirect("/index.html"); });

  // curl -v http://192.168.4.1/config
  server.on("/config", HTTP_GET, [](AsyncWebServerRequest* request) {
    updateWiFiStatus();

    AsyncJsonResponse* response = new AsyncJsonResponse();
    JsonObject root = response->getRoot().to<JsonObject>();
    root["wifiConfigured"] = wifiConfigured;
    root["wifiConnected"] = wifiConnected;
    if (wifiConnected && currentSSID.length() > 0) {
      root["currentSSID"] = currentSSID;
    }
    response->setLength();
    request->send(response);
  });

  // curl -v http://192.168.4.1/api/wifi
  server.on("/api/wifi", HTTP_GET, [](AsyncWebServerRequest* request) {
    request->send(200, "application/json", wifiUtils.getScanResults());
    wifiUtils.triggerScan();  // Trigger next scan
  });

  // curl -X POST -H "Content-Type: application/json" -d '{"ssid":"SSID","password":"PASSWORD"}'
  // http://192.168.4.1/api/wifi
  AsyncCallbackJsonWebHandler* wifiConnectHandler = new AsyncCallbackJsonWebHandler(
      "/api/wifi", [](AsyncWebServerRequest* request, JsonVariant& json) {
        JsonObject jsonObj = json.as<JsonObject>();
        String ssid = jsonObj["ssid"];
        String password = jsonObj["password"];

        if (ssid.length() > 0) {
          wifiUtils.connect(ssid, password);
          request->send(200,
                        "application/json",
                        "{\"status\":\"connecting\",\"message\":\"Credentials received, attempting "
                        "connection...\"}");
        }
        else {
          request->send(
              400, "application/json", "{\"status\":\"error\",\"message\":\"SSID is required\"}");
        }
      });
  wifiConnectHandler->setMethod(HTTP_POST);
  server.addHandler(wifiConnectHandler);

  // curl -v http://192.168.4.1/
  server.serveStatic("/index.html", LittleFS, "/index.html");

  server.begin();
}

void loop() {
  wifiUtils.loop();
  updateWiFiStatus();

  if (wifiConnected) {
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else {
    // Blink LED
    digitalWrite(LED_BUILTIN, millis() / 500 % 2);
  }
  delay(10);
}