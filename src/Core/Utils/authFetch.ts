import { authProvider } from "../Auth/AuthProvider";

export const authFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  const tokenObj = await authProvider.getAccessToken();

  const headers: HeadersInit = new Headers();
  headers.set("Authorization", tokenObj.accessToken);

  if (init) {
    init.headers = headers;
  }

  return await fetch(input, init || { method: "GET", headers });
}