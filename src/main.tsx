import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";

const app = document.getElementById("app") as HTMLElement;
createRoot(app).render(<Routes />);
