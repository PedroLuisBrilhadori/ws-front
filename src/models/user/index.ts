import { Company } from "../company";
import { Group } from "../group";

export type User = {
  id: string;
  name: string;
  email: string;
  company?: Company;
  group: Group;
  access_token?: string;
};

export type UpdateUser = {
  id: string;
  name?: string;
  email?: string;
  company: Company;
};
