import "./index.css";
import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/theme-provider";

const app = document.getElementById("app") as HTMLElement;

createRoot(app).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <Routes />
    </Provider>
  </ThemeProvider>
);
