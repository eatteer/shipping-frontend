import { api } from "@/lib/api";

export type SignInCredentials = {
  token: string;
};

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post<SignInCredentials>("/auth/authenticate", {
    email,
    password,
  });

  return response.data;
}
