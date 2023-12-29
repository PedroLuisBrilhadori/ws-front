import { ConversationFooter } from "./footer";
import { ConversationHeader } from "./header";
import { ConversationMessages } from "./messages";

export default function ConversationDetails() {
  return (
    <div
      className="flex flex-col w-full"
      style={{ backgroundImage: "url('/assets/images/background.jpg')" }}
    >
      <ConversationHeader />

      <ConversationMessages />

      <ConversationFooter />
    </div>
  );
}
