import { useDispatch } from "react-redux";
import { clearCurrentConversation } from "@/store/currentConversation";
import { useState } from "react";
import { SideBarSearch } from "@/components/SideBar/search";
import ConversationList from "@/components/ConversationList";

export default function Home() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  dispatch(clearCurrentConversation(false));

  return (
    <div className="flex justify-center bg-background-dark h-screen w-full">
      <div
        className="flex flex-col w-full h-full "
        style={{ borderRight: "1px solid rgba(134,150,160,0.15)" }}
      >
        <SideBarSearch search={search} setSearch={setSearch} />

        <div
          className="flex flex-col w-full overflow-y-scroll"
          id="conversation"
        >
          <ConversationList search={search} />
        </div>
      </div>
    </div>
  );
}
