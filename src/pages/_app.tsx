import "../index.css";
import { ConversationProvider } from "../context/ConversationContext";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";

function MyApp() {
  return (
    <Provider store={store}>
      <ConversationProvider>
        <Outlet />
      </ConversationProvider>
    </Provider>
  );
}

export default MyApp;
