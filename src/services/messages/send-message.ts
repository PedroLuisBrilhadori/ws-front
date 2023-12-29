import { Company, MetaAccount } from "@/models";
import { BaseServiceOptions, baseUrl } from "..";

export class SendMessageDto extends BaseServiceOptions {
  to: string;
  text: string;
  company: Company;
  metaBusinessAccount: MetaAccount;
}

export const sendMessageService = async ({
  text,
  headers,
  ...dto
}: SendMessageDto) => {
  const response = await fetch(`${baseUrl}/messages/text`, {
    method: `POST`,
    headers,
    body: JSON.stringify({
      message: text,
      ...dto,
    }),
  });

  const message = await response.json();

  if (response.status === 201) {
    return message;
  } else {
    throw new Error("Erro ao enviar a menssagem.");
  }
};
