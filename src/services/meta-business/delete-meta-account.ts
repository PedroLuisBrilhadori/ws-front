import { BaseServiceOptions, baseUrl } from "..";
import { MetaAccount } from "@/models";

class DeleteMetaAccountDto extends BaseServiceOptions {
  id: string;
}

export const deleteMetaAccount = async ({
  id,
  headers,
}: DeleteMetaAccountDto): Promise<MetaAccount> => {
  const response = await fetch(`${baseUrl}/meta-business/?=${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir conta.");
  }

  return await response.json();
};
