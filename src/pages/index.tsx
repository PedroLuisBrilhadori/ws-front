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
    <div className="bg-background flex flex-col h-screen w-full">
      {/* TODO: colocar hover:cursor-pointer nos go backs */}
      <SideBarSearch search={search} setSearch={setSearch} />

      <ConversationList search={search} />
    </div>
  );
}
