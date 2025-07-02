import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p style={{ color: "white", padding: 20 }}>로딩 중...</p>}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);