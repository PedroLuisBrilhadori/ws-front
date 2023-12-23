import { MetaAccount } from "@/models";
import { BaseServiceOptions, baseUrl } from "..";

class FindMetaAccountDto extends BaseServiceOptions {
  companyId?: string;
}

export const findMetaAccounts = async ({
  headers,
  companyId,
}: FindMetaAccountDto): Promise<MetaAccount[]> => {
  const response = await fetch(
    `${baseUrl}/meta-business/?companyId=${companyId}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar contas.");
  }

  return await response.json();
};
