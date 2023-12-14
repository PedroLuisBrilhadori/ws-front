import { User } from "../user";

export type Company = {
  id: string;
  name: string;
  cnpj: string;
  user?: User;
};
