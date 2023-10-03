import { useEffect, useState } from "react";

import ConversationList from "../ConversationList";
import { SideBarSearch } from "./search";
import { useDispatch, useSelector } from "react-redux";
import { selectConversations, setConversations } from "@/store/conversations";

export default function SideBar() {
  const [search, setSearch] = useState("");

  const conversation = useSelector(selectConversations);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3000/messages/conversations`).then(
      async (response) => {
        const data = await response.json();
        dispatch(setConversations(data));
      }
    );
  }, []);

  return (
    <div
      className="flex flex-col w-[480px] h-full bg-[#202c33]"
      style={{ borderRight: "1px solid rgba(134,150,160,0.15)" }}
    >
      <SideBarSearch search={search} setSearch={setSearch} />

      <div className="flex flex-col w-full overflow-y-scroll" id="conversation">
        <ConversationList />
      </div>
    </div>
  );
}
