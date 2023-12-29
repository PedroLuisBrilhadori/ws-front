import { Conversation, MetaAccount, User } from "@/models";
import { BaseServiceOptions, baseUrl } from "..";

class FindConversationsDto extends BaseServiceOptions {
  metaAccount: MetaAccount;
}

export const findConversations = async ({
  headers,
  metaAccount,
}: FindConversationsDto): Promise<Conversation[]> => {
  if (!metaAccount.id) throw new Error("Conta não selecionada");

  const response = await fetch(
    `${baseUrl}/conversations?metaAccountId=${metaAccount.id}`,
    {
      headers,
    }
  );

  if (response.status !== 200) throw new Error("Erro ao buscar conversas");

  return response.json();
};
