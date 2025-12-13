import { Wifi, WifiOffIcon } from "lucide-react";

interface WifiIconProps {
    rssi: number;
    isPreviousNetwork: boolean;
}

export function WifiIcon({ rssi, isPreviousNetwork }: WifiIconProps) {
    const strength =
        rssi >= -50
            ? "excellent"
            : rssi >= -60
              ? "good"
              : rssi >= -70
                ? "fair"
                : "poor";
    const color =
        strength === "excellent" || strength === "good"
            ? "text-green-600"
            : strength === "fair"
              ? "text-yellow-500"
              : "text-red-500";

    return (
        <div className="group relative">
            {isPreviousNetwork ? (
                <WifiOffIcon className={`w-5 h-5 transition-colors ${color}`} />
            ) : (
                <Wifi className={`w-5 h-5 transition-colors ${color}`} />
            )}

            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {strength}
            </div>
        </div>
    );
}
