import { Company } from "../company";

export type User = {
  id: string;
  name: string;
  email: string;
  company?: Company;
  access_token?: string;
};
