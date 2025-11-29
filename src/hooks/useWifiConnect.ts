import { useMutation, useQueryClient } from "@tanstack/react-query";

interface WifiConnectionData {
    ssid: string;
    password?: string;
}

async function connectToWifi(connectionData: WifiConnectionData) {
    const response = await fetch("/api/wifi", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(connectionData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        console.error("Connection error response:", errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export function useWifiConnect() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: connectToWifi,
        onSuccess: () => {
            // Optionally invalidate queries that should be updated after connection
            queryClient.invalidateQueries({ queryKey: ['wifi-config'] });
        },
    });

    return {
        connect: mutation.mutate,
        connectAsync: mutation.mutateAsync,
        isConnecting: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
    };
}
