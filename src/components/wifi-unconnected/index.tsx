import { Alert, AlertDescription } from "@ui/alert";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { AlertCircle, RefreshCw, Settings, Wifi } from "lucide-react";

interface WifiUnconnectedProps {
    ssid?: string;
    onRetry?: () => void;
    onSettings?: () => void;
}

export function WifiUnconnected({
    ssid,
    onRetry,
    onSettings,
}: WifiUnconnectedProps) {
    return (
        <div className="min-h-svh bg-gradient-to-br from-orange-50 to-red-100 p-4">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center pt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                        <AlertCircle className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Can't Connect to {ssid ? `"${ssid}"` : "Network"}
                    </h1>
                    <p className="text-gray-600">
                        Your device is having trouble connecting to the WiFi
                        network
                    </p>
                </div>

                {/* Connection Status Card */}
                <Card className="max-w-md mx-auto border-orange-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wifi className="w-5 h-5" />
                            Connection Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">
                                Network
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    {ssid || "Unknown"}
                                </span>
                                <Badge
                                    variant="outline"
                                    className="border-orange-400 text-orange-700 bg-orange-50"
                                >
                                    Failed
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">
                                Status
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span className="text-orange-600">
                                    Connection Failed
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Alert with troubleshooting info */}
                <Alert className="max-w-md mx-auto border-orange-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        <div className="space-y-2 text-sm">
                            <p className="font-semibold">Possible issues:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Incorrect WiFi password</li>
                                <li>Network is out of range</li>
                                <li>Router security settings</li>
                                <li>Network is temporarily unavailable</li>
                            </ul>
                        </div>
                    </AlertDescription>
                </Alert>

                {/* Action Cards */}
                <div className="max-w-md mx-auto space-y-3">
                    <Button
                        onClick={onRetry}
                        className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try to Connect Again
                    </Button>

                    <Button
                        variant="outline"
                        onClick={onSettings}
                        className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        Change Network Settings
                    </Button>
                </div>

                {/* Additional Options */}
                <div className="text-center space-y-3">
                    <p className="text-sm text-gray-500">
                        You can also try connecting to a different network or
                        check the router configuration
                    </p>
                </div>
            </div>
        </div>
    );
}
