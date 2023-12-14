import { useUserHeaders } from "@/hooks/use-fetch";
import { Conversation } from "@/models";
import { baseUrl } from "@/services";
import {
  selectCurrentConversation,
  setCurrentConversation,
} from "@/store/currentConversation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const useCurrentConversation = () => {
  const { to } = useParams();
  const current = useSelector(selectCurrentConversation) as
    | Conversation
    | false;
  const dispatch = useDispatch();

  const { headers, user } = useUserHeaders();

  useEffect(() => {
    if (user.id) {
      if (!current) {
        fetch(`${baseUrl}/messages/conversations/${to}`, { headers })
          .then(async (response) => {
            if (response.status !== 200) throw new Error();

            const conversations = await response.json();

            dispatch(setCurrentConversation(conversations));
          })
          .catch((error) => {
            dispatch(setCurrentConversation({ to }));
          });
      }
    }
  }, [user]);

  return { current, user, to };
};
