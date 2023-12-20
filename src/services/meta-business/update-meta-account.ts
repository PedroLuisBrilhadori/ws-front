import { BaseServiceOptions, baseUrl } from "..";
import { MetaAccount } from "@/models";

class UpdateMetaAccountDto extends BaseServiceOptions {
  metaAccount: MetaAccount;
}

export const updateMetaAccount = async (
  dto: UpdateMetaAccountDto
): Promise<MetaAccount> => {
  const response = await fetch(
    `${baseUrl}/meta-business/${dto.metaAccount.id}`,
    {
      method: "PATCH",
      headers: dto.headers,
      body: JSON.stringify(dto.metaAccount),
    }
  );

  if (!response.ok) throw new Error("Erro ao editar conta.");

  return await response.json();
};
