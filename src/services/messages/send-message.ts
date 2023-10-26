export type SendMessageDto = {
  to: string;
  text: string;
};

export const sendMessageService = async ({ to, text }: SendMessageDto) => {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  const response = await fetch(`http://localhost:3000/messages/text`, {
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
