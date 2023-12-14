import ConversationDetails from "@/components/Conversation";
import { useUserHeaders } from "@/hooks";
import { baseUrl } from "@/services";

import {
  selectCurrentConversation,
  setCurrentConversation,
} from "@/store/currentConversation";
import { setMessages } from "@/store/messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Index() {
  const { to } = useParams();
  const current = useSelector(selectCurrentConversation);
  const dispatch = useDispatch();

  const { headers, user } = useUserHeaders();

  useEffect(() => {
    if (user.id && to) {
      fetch(`${baseUrl}/messages/${to}`, { headers }).then(async (response) => {
        const messages = await response.json();

        dispatch(setMessages(messages));

        if (!current) {
          fetch(
            `${baseUrl}/conversations?companyId=${user?.company?.id}&to=${to}`,
            { headers }
          )
            .then(async (response) => {
              console.log(response);
              if (response.status !== 200) throw new Error();

              const conversations = await response.json();

              dispatch(setCurrentConversation(conversations));
            })
            .catch((error) => {
              dispatch(setCurrentConversation({ to }));
            });
        }
      });

      setTimeout(() => {
        scroll();
      }, 100);
    }
  }, [user]);

  return (
    <div className="flex justify-center">
      <div className="flex w-full xl:container h-screen xl:py-4">
        <ConversationDetails />
      </div>
    </div>
  );
}
