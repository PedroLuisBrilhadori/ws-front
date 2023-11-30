import { Company } from "@/models";
import { BaseServiceOptions, baseUrl } from "..";

export class SendMessageDto extends BaseServiceOptions {
  to: string;
  text: string;
  company: Company;
}

export const sendMessageService = async ({
  to,
  text,
  company,
  headers,
}: SendMessageDto) => {
  const response = await fetch(`${baseUrl}/messages/text`, {
    method: `POST`,
    headers,
    body: JSON.stringify({
      to,
      message: text,
      company,
    }),
  });

  const message = await response.json();

  if (response.status === 201) {
    return message;
  } else {
    throw new Error("Erro ao enviar a menssagem.");
  }
};
