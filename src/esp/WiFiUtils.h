#pragma once

#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFi.h>

class WiFiUtils {
 public:
  WiFiUtils();
  void begin();
  void loop();
  String getScanResults();
  void triggerScan();
  void connect(const String& ssid, const String& password);

 private:
  String _scanResultJson;
  unsigned long _lastScanTime;
  bool _scanning;

  String _encryptionTypeToString(wifi_auth_mode_t authType);
};
