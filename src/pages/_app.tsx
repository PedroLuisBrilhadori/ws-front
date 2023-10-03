import "../index.css";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";

function MyApp() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export default MyApp;
