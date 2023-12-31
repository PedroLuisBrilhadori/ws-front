import { Company, Message, MetaAccount } from "@/models";
import { BaseServiceOptions, baseUrl } from "..";

export class SendTemplateDto extends BaseServiceOptions {
  to?: string;
  name: string;
  language: string;
  metaBusinessAccount: MetaAccount;
  company: Company;
  callback?: (message?: Message) => void;
}

export const sendTemplateService = ({
  to,
  name,
  language,
  metaBusinessAccount,
  company,
  callback,
  headers,
}: SendTemplateDto) => {
  const dto = {
    to,
    template: {
      name,
      language: {
        code: language,
      },
    },
    metaBusinessAccount,
    company,
  };

  fetch(`${baseUrl}/messages/template`, {
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
