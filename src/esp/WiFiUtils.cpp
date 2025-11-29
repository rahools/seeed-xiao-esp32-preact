#include "WiFiUtils.h"

WiFiUtils::WiFiUtils() : _scanResultJson("{\"networks\":[]}"), _lastScanTime(0), _scanning(false) {}

void WiFiUtils::begin() {
  // Ensure we are in a mode that supports scanning
  WiFi.mode(WIFI_AP_STA);
  // Trigger initial scan
  triggerScan();
}

void WiFiUtils::triggerScan() {
  if (!_scanning && WiFi.scanComplete() != WIFI_SCAN_RUNNING) {
    WiFi.scanNetworks(true);  // true = async
    _scanning = true;
  }
}

void WiFiUtils::loop() {
  int n = WiFi.scanComplete();
  if (n >= 0) {
    _scanning = false;

    DynamicJsonDocument doc(2048);  // Allocate memory for the JSON document
    JsonArray networks = doc.createNestedArray("networks");

    for (int i = 0; i < n; ++i) {
      JsonObject net = networks.createNestedObject();
      net["ssid"] = WiFi.SSID(i);
      net["rssi"] = WiFi.RSSI(i);
      net["encryption"] = _encryptionTypeToString(WiFi.encryptionType(i));
      // net["channel"] = WiFi.channel(i);
      // net["bssid"] = WiFi.BSSIDstr(i);
    }

    String output;
    serializeJson(doc, output);
    _scanResultJson = output;

    WiFi.scanDelete();
  }
  else if (n == WIFI_SCAN_FAILED) {
    _scanning = false;
  }
}

String WiFiUtils::getScanResults() {
  return _scanResultJson;
}

void WiFiUtils::connect(const String& ssid, const String& password) {
  if (ssid.length() > 0) {
    WiFi.begin(ssid.c_str(), password.c_str());
  }
}

String WiFiUtils::_encryptionTypeToString(wifi_auth_mode_t authType) {
  switch (authType) {
    case WIFI_AUTH_OPEN:
      return "Open";
    case WIFI_AUTH_WEP:
      return "WEP";
    case WIFI_AUTH_WPA_PSK:
      return "WPA_PSK";
    case WIFI_AUTH_WPA2_PSK:
      return "WPA2_PSK";
    case WIFI_AUTH_WPA_WPA2_PSK:
      return "WPA_WPA2_PSK";
    case WIFI_AUTH_WPA2_ENTERPRISE:
      return "WPA2_ENTERPRISE";
    case WIFI_AUTH_WPA3_PSK:
      return "WPA3_PSK";
    case WIFI_AUTH_WPA2_WPA3_PSK:
      return "WPA2_WPA3_PSK";
    case WIFI_AUTH_WAPI_PSK:
      return "WAPI_PSK";
    default:
      return "Unknown";
  }
}
