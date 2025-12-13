import { Link } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { CheckCircle, Wifi } from "lucide-react";

interface WifiConnectedProps {
    ssid?: string;
    onDisconnect?: () => void;
}

export function WifiConnected({ ssid, onDisconnect }: WifiConnectedProps) {
    return (
        <div className="min-h-svh bg-gradient-to-br from-green-50 to-emerald-100 p-4">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center pt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        WiFi Connected Successfully!
                    </h1>
                    <p className="text-gray-600">
                        Your device is now connected to the internet
                    </p>
                </div>

                {/* Connection Status Card */}
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wifi className="w-5 h-5" />
                            Connection Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">
                                Network
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{ssid}</span>
                                <Badge
                                    variant="outline"
                                    className="border-green-400 text-green-700 bg-green-50"
                                >
                                    Connected
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">
                                Status
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-green-600">Online</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Cards */}
                <Link to="/wifi-settings">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow max-w-md mx-auto">
                        <CardContent className="p-6 text-center">
                            <Wifi className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                            <h3 className="font-semibold mb-1">
                                Network Settings
                            </h3>
                            <p className="text-sm text-gray-600">
                                View or modify WiFi configuration
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                {/* Additional Options */}
                <div className="text-center space-y-3">
                    <p className="text-sm text-gray-500">
                        You can now access this device from any device on the
                        same network
                    </p>

                    {onDisconnect && (
                        <Button
                            variant="outline"
                            onClick={onDisconnect}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            Disconnect from Network
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
