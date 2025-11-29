import { useEffect, useState } from "preact/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

interface RebootCountdownProps {
    onComplete?: () => void;
}

export function RebootCountdown({ onComplete }: RebootCountdownProps) {
    const COUNTDOWN_SECONDS = 60;
    const [timeRemaining, setTimeRemaining] = useState(COUNTDOWN_SECONDS);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    const progress =
        ((COUNTDOWN_SECONDS - timeRemaining) / COUNTDOWN_SECONDS) * 100;

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-green-600">
                    Connection in Progress!
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <div className="space-y-2">
                    <p className="text-lg font-medium">
                        Device is rebooting...
                    </p>
                    <p className="text-sm text-gray-600">
                        Refresh after {timeRemaining} seconds
                    </p>
                </div>

                <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                </div>

                <div className="text-xs text-gray-400 space-y-1">
                    <p>The device will restart with your new WiFi settings.</p>
                    <p>This page will automatically refresh when ready.</p>
                </div>
            </CardContent>
        </Card>
    );
}
