import "../index.css";
import { ConversationProvider } from "../context/ConversationContext";
import { Outlet } from "react-router-dom";

function MyApp() {
  return (
    <ConversationProvider>
      <Outlet />
    </ConversationProvider>
  );
}

export default MyApp;
