import { api } from "@/lib/api";

export type SignInResponse = {
  token: string;
};

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post<SignInResponse>("/auth/authenticate", {
    email,
    password,
  });

  return response.data;
}
