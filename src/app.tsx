import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./app.css";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

export function App() {
    return <RouterProvider router={router} />;
}

// Register the router for TypeScript
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
