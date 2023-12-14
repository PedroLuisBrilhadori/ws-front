import { useUserHeaders } from "@/hooks/use-fetch";
import { Conversation } from "@/models";
import { baseUrl, findMedia } from "@/services";
import conversations from "@/store/conversations";
import {
  selectCurrentConversation,
  setCurrentConversation,
} from "@/store/currentConversation";
import { setMedias } from "@/store/media";
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
        fetch(
          `${baseUrl}/conversations?companyId=${user?.company?.id}&to=${to}`,
          { headers }
        )
          .then(async (response) => {
            if (response.status !== 200) throw new Error();

            const conversations = await response.json();

            dispatch(setCurrentConversation(conversations));
          })
          .catch((error) => {
            dispatch(setCurrentConversation({ to }));
          });
      } else {
        findMedia({ headers, conversationId: current.id }).then((medias) => {
          dispatch(setMedias(medias));
        });
      }
    }
  }, [user, current]);

  return { current, user, to };
};
