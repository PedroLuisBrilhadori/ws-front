import { BaseServiceOptions, baseUrl } from "..";
import { MetaAccount } from "@/models";

class DeleteMetaAccountDto extends BaseServiceOptions {
  id: string;
}

export const deleteMetaAccount = async (
  dto: DeleteMetaAccountDto
): Promise<MetaAccount> => {
  const response = await fetch(`${baseUrl}/meta-business/${dto.id}`, {
    method: "DELETE",
    headers: dto.headers,
  });

  if (!response.ok) throw new Error("Erro ao excluir conta.");

  return await response.json();
};
