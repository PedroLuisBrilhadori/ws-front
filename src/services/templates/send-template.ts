import { Message } from "@/models";

export type SendTemplateDto = {
  to?: string;
  name: string;
  language: string;
  callback?: (message?: Message) => void;
};

export const sendTemplateService = ({
  to,
  name,
  language,
  callback,
}: SendTemplateDto) => {
  const dto = {
    to,
    template: {
      name,
      language: {
        code: language,
      },
    },
  };

  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  fetch("http://localhost:3000/messages/template", {
    method: "POST",
    headers,
    body: JSON.stringify(dto),
  })
    .then(async (data) => {
      const message = await data.json();

      callback && callback(message);
    })
    .catch((error) => {
      callback && callback();
    });
};
