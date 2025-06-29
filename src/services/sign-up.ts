import { api } from "@/lib/api";

export type SignUpResponse = {
  message: string;
};

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post<SignUpResponse>("/auth/register", {
    email,
    password,
  });

  return response.data;
}
