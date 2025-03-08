import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { SalaryProvider } from "@/lib/context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SalaryProvider>
      <App />
    </SalaryProvider>
  </StrictMode>,
);
