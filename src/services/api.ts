export const baseUrl = import.meta.env.VITE_API_URL || `http://localhost:3000`;

export const APIRoutes = {
  userByToken: `${baseUrl}/users/token`,
};

export class BaseServiceOptions {
  headers: Headers;
}
