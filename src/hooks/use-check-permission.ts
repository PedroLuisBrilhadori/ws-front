import { selectUser } from "@/store/user";
import { useSelector } from "react-redux";

export const useCheckPermission = (permission: string) => {
  const user = useSelector(selectUser);

  if (!user?.group) return false;

  if (!user?.group?.permissions) return false;

  return user.group.permissions.find(({ name }) => name === permission);
};
