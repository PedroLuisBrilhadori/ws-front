import { Conversation, User } from "@/models";
import { BaseServiceOptions, baseUrl } from "..";

class FindConversationsDto extends BaseServiceOptions {
  user: User;
}

export const findConversations = async ({
  headers,
  user,
}: FindConversationsDto): Promise<Conversation[]> => {
  if (!user?.company?.id) throw new Error("Usuário não pertence a uma empresa");

  const companyId = user.company.id;

  const response = await fetch(
    `${baseUrl}/messages/conversations?company=${companyId}`,
    {
      headers,
    }
  );

  if (response.status !== 200) throw new Error("Erro ao buscar conversas");

  return response.json();
};
