import { api } from "@/lib/api";

export type City = {
  id: string;
  name: string;
  departmentId: string;
  zoneId: string;
  createdAt: string;
  updatedAt: string;
};

export async function getAllCities() {
  const response = await api.get<City[]>("/cities");
  return response.data;
}
