import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CaptivePortal } from "../components/captive-portal/CaptivePortal";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/wifi-settings")({
    component: WifiSettingComponent,
});

function WifiSettingComponent() {
    const navigate = useNavigate();

    const handleConnectionSuccess = () => {
        // After successful connection, redirect to home page
        navigate({ to: "/" });
    };

    const handleBackToHome = () => {
        navigate({ to: "/" });
    };

    return (
        <div className="min-h-svh">
            <div className="absolute top-4 left-4 z-10">
                <Button
                    variant="outline"
                    onClick={handleBackToHome}
                    className="flex items-center gap-2"
                >
                    ← Back to Home
                </Button>
            </div>

            <CaptivePortal onConnectionSuccess={handleConnectionSuccess} />
        </div>
    );
}
