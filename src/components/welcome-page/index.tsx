import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@ui/card";
import { Wifi } from "lucide-react";

export function WelcomePage() {
    return (
        <div className="min-h-svh bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex flex-col">
            {/* Header */}
            <div className="text-center pt-8 flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Wifi className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome to ESP32 Captive Portal
                </h1>
                <p className="text-gray-600 mb-8">
                    Configure your device to connect to the internet
                </p>

                {/* Status Cards */}
                <div className="max-w-md mx-auto space-y-4">
                    <Link to="/wifi-settings">
                        <Card className="cursor-pointer hover:shadow-md transition-shadow max-w-md mx-auto">
                            <CardContent className="p-6 text-center">
                                <Wifi className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                <h3 className="font-semibold mb-1">
                                    Configure WiFi
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Let's get your device connected
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
