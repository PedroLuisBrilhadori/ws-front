import { BaseServiceOptions, baseUrl } from "..";

class FindConversationsDto extends BaseServiceOptions {
  to: string;
}

export const findConversationsMessages = async ({
  to,
  headers,
}: FindConversationsDto) => {
  const response = await fetch(`${baseUrl}/messages/conversations/${to}`, {
    headers,
  });

  if (response.status !== 200) throw new Error("Erro ao buscar mensagens");

  return response.json();
};
