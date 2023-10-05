import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { store } from "./store";
import { Provider } from "react-redux";

const app = document.getElementById("app") as HTMLElement;

createRoot(app).render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
