import { BaseServiceOptions, baseUrl } from "..";
import { Company, MetaAccount } from "@/models";

class CreateMetaAccountDto extends BaseServiceOptions {
  metaAccount: MetaAccount;
  company: Company;
}

export const createMetaAccount = async (
  dto: CreateMetaAccountDto
): Promise<MetaAccount> => {
  const response = await fetch(`${baseUrl}/meta-business/`, {
    method: "POST",
    headers: dto.headers,
    body: JSON.stringify({ ...dto.metaAccount, company: dto.company }),
  });

  if (!response.ok) throw new Error("Erro ao criar conta.");

  return await response.json();
};
