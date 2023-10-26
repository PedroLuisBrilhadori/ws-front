import { useDispatch } from "react-redux";
import SideBar from "../components/SideBar";
import { clearCurrentConversation } from "@/store/currentConversation";

export default function Home() {
  const dispatch = useDispatch();

  dispatch(clearCurrentConversation(false));

  return (
    <div className="flex justify-center">
      <div className="flex w-full h-screen">
        <SideBar />
      </div>
    </div>
  );
}
