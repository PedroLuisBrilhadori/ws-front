import ConversationDetails from "@/components/ConversationDetails";
import {
  selectCurrentConversation,
  setCurrentConversation,
} from "@/store/currentConversation";
import { selectMessage, setMessages } from "@/store/messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Index() {
  const { to } = useParams();
  const current = useSelector(selectCurrentConversation);
  const messages = useSelector(selectMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (to) {
      fetch(`http://localhost:3000/messages/${to}`).then(async (response) => {
        const messages = await response.json();

        dispatch(setMessages(messages));

        if (!current) {
          dispatch(setCurrentConversation({ to }));
        }
      });

      setTimeout(() => {
        scroll();
      }, 100);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex w-full xl:container h-screen xl:py-4">
        {messages.length > 0 ? <ConversationDetails /> : null}
      </div>
    </div>
  );
}
