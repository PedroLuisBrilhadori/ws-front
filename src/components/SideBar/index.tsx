import { useState } from "react";

import ConversationList from "../ConversationList";
import { SideBarSearch } from "./search";

export default function SideBar() {
  const [search, setSearch] = useState("");

  return (
    <div
      className="flex flex-col w-full h-full bg-[#202c33]"
      style={{ borderRight: "1px solid rgba(134,150,160,0.15)" }}
    >
      <SideBarSearch search={search} setSearch={setSearch} />

      <div className="flex flex-col w-full overflow-y-scroll" id="conversation">
        <ConversationList search={search} />
      </div>
    </div>
  );
}
