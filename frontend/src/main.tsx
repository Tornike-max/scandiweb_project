import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CheckInputsProvider } from "./context/CheckInputContext.tsx";
import { SaveProductProvider } from "./context/SaveProductContext.tsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CheckInputsProvider>
      <QueryClientProvider client={queryClient}>
        <SaveProductProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <App />
        </SaveProductProvider>
      </QueryClientProvider>
    </CheckInputsProvider>
  </React.StrictMode>
);
