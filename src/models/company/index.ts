import { User } from "../user";

export type Company = {
  id: string;
  cnpj: string;
  user?: User;
};
