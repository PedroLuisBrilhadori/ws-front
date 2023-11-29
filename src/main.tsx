import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/theme-provider";
import { AuthProvider } from "./context/auth";

const app = document.getElementById("app") as HTMLElement;

createRoot(app).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <Routes />
    </Provider>
  </ThemeProvider>
);
