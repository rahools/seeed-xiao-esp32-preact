import { zodResolver } from "@hookform/resolvers/zod";
import { useWifiConnect } from "@hooks/use-wifi-connect";
import type { WifiNetwork } from "@hooks/use-wifi-scan";
import { Button } from "@ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../lib/utils";

const formSchema = z.object({
    password: z.string(),
});

interface WifiPasswordFormProps {
    network: WifiNetwork;
    onCancel: () => void;
}

export function WifiPasswordForm({ network, onCancel }: WifiPasswordFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { password: "" },
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const { connectAsync, isConnecting } = useWifiConnect();
    const onConnect = async (values: z.infer<typeof formSchema>) => {
        console.log(
            "Connecting to network:",
            network.ssid,
            "with password:",
            values.password,
        );
        await connectAsync({ ssid: network.ssid, password: values.password });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onConnect)}
                className="border-t border-gray-200 bg-gray-50 p-4"
            >
                <div
                    className={cn(
                        "mb-4",
                        network.encryption === "Open" ? "hidden" : "",
                    )}
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password for "{network.ssid}"
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter WiFi password"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-3">
                    <Button
                        type="submit"
                        disabled={isConnecting}
                        className="flex-1"
                    >
                        Connect
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isConnecting}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
