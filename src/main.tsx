import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/route";
import SmoothScrollProvider from "./provider/SmoothScrollProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SmoothScrollProvider>
      <RouterProvider router={router} />
    </SmoothScrollProvider>
  </StrictMode>,
);
