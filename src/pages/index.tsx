import ConversationDetails from "../components/ConversationDetails";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { selectCurrentConversation } from "@/store/currentConversation";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex w-full h-screen">
        <SideBar />
      </div>
    </div>
  );
}
