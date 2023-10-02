import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { ConversationContext } from "../../context/ConversationContext";
import MessageBalloon from "../MessageBalloon";
import { ConversationFooter } from "./footer";
import { ConversationHeader } from "./header";

export default function ConversationDetails() {
  const { conversation, message, setMessage } = useContext(ConversationContext);
  const { contactName, image, messageHistory } = conversation;
  const [messageSend, setMessageSend] = useState("");

  useEffect(() => {
    setMessage(messageHistory);
  }, [conversation]);

  function changeHandler(evt: KeyboardEvent<HTMLInputElement>) {
    const { key } = evt;

    if (key === "Enter") {
      const teste = { me: true, message: messageSend };
      setMessage([...message, teste]);
      setMessageSend("");
    }
  }

  return (
    <div className="flex flex-col w-full">
      <ConversationHeader image={image} contactName={contactName} />

      <div
        className="flex flex-col w-full h-full px-24 py-6 overflow-y-auto"
        style={{ backgroundImage: "url('/assets/images/background.jpg')" }}
      >
        {message.map((messageConversation, index) => {
          const { me, message } = messageConversation;

          return <MessageBalloon key={index} me={me} message={message} />;
        })}
      </div>

      <ConversationFooter
        changeHandler={changeHandler}
        setMessageSend={setMessageSend}
        messageSend={messageSend}
      />
    </div>
  );
}
