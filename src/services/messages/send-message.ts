import { BaseServiceOptions, baseUrl } from "..";

export class SendMessageDto extends BaseServiceOptions {
  to: string;
  text: string;
}

export const sendMessageService = async ({
  to,
  text,
  headers,
}: SendMessageDto) => {
  const response = await fetch(`${baseUrl}/messages/text`, {
    method: `POST`,
    headers,
    body: JSON.stringify({
      to,
      message: text,
    }),
  });

  const message = await response.json();

  if (response.status === 201) {
    return message;
  } else {
    throw new Error("Erro ao enviar a menssagem.");
  }
};
