import { selectUser } from "@/store/user";
import { useSelector } from "react-redux";

export const useUserHeaders = (json: boolean = true) => {
  const user = useSelector(selectUser);

  if (!user) throw new Error("Usuário não autenticado");

  const headers = new Headers();
  if (json) headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user.access_token}`);

  return {
    user,
    headers,
  };
};
