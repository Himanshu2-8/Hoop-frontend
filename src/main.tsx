import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-screen w-full bg-[#f0fdfa] relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg,
              rgba(240,253,250,1) 0%,
              rgba(204,251,241,0.7) 30%,
              rgba(153,246,228,0.5) 60%,
              rgba(94,234,212,0.4) 100%
            ),
            radial-gradient(circle at 40% 30%, rgba(255,255,255,0.8) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(167,243,208,0.5) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(209,250,229,0.6) 0%, transparent 45%)
          `,
        }}
      />
      <div className="relative z-10">
        <App />
      </div>
    </div>
  </StrictMode>,
);
