import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";

const queryClient = new QueryClient();

render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>,
    document.getElementById("app")!,
);
