import { createContext, useEffect } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { useDispatch } from "react-redux";
import { APIRoutes } from "@/services";
import { useNavigate } from "@/router";
import { PUBLIC_ROUTES } from "@/public.routes";
import { setUser } from "@/store/user";
import { User } from "@/models";

type AuthContextType = {
  signOut: () => Promise<void>;
};

const fetchUser = async (token: string): Promise<User> => {
  const headers = new Headers();

  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(APIRoutes.userByToken, { headers });

  if (response.status !== 200) throw new Error();

  return response.json();
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (PUBLIC_ROUTES.includes(location.pathname)) return;

    if (!token) return navigate("/login");

    fetchUser(token).then((user) => {
      dispach(setUser({ ...user, access_token: token }));
    });
  }, []);

  const signOut = async () => {
    destroyCookie(null, "nextauth.token");

    setUser(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ signOut }}>{children}</AuthContext.Provider>
  );
}
