import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "preact";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App } from "./app.tsx";

const queryClient = new QueryClient();

render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
    </QueryClientProvider>,
    document.getElementById("app")!,
);
