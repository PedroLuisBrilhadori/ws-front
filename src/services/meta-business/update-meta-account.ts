import { BaseServiceOptions, baseUrl } from "..";
import { MetaAccount } from "@/models";

class UpdateMetaAccountDto extends BaseServiceOptions {
  id: string;
  metaAccount: MetaAccount;
}

export const updateMetaAccount = async ({
  headers,
  id,
  metaAccount,
}: UpdateMetaAccountDto): Promise<MetaAccount> => {
  const response = await fetch(`${baseUrl}/meta-business/?=${id}`, {
    method: "POST",
    headers,
    body: JSON.stringify(metaAccount),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar conta.");
  }

  return await response.json();
};
