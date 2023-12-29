import ConversationDetails from "@/components/Conversation";
import { useUserHeaders } from "@/hooks";
import { baseUrl } from "@/services";
import {
  selectCurrentMetaAccount,
  setCurrentMetaAccounts,
} from "@/store/current-meta-account";

import {
  selectCurrentConversation,
  setCurrentConversation,
} from "@/store/currentConversation";
import { setMessages } from "@/store/messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Index() {
  const { to, numberId } = useParams();
  const current = useSelector(selectCurrentConversation);
  const metaAccount = useSelector(selectCurrentMetaAccount);
  const dispatch = useDispatch();

  const { headers, user } = useUserHeaders();

  useEffect(() => {
    if (!metaAccount.id) {
      dispatch(setCurrentMetaAccounts({ id: numberId }));
    }

    if (user.id && metaAccount.id && to) {
      fetch(`${baseUrl}/messages/${to}`, { headers }).then(async (response) => {
        const messages = await response.json();

        dispatch(setMessages(messages));

        if (!current) {
          fetch(
            `${baseUrl}/conversations?metaAccountId=${metaAccount.id}&to=${to}`,
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
  }, [user, metaAccount]);

  if (!metaAccount.id || !current) return null;

  return (
    <div className="flex justify-center">
      <div className="flex w-full h-screen ">
        <ConversationDetails />
      </div>
    </div>
  );
}
