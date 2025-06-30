import { api } from "@/lib/api";

export type CreateShipmentRequest = {
  originCityId: string;
  destinationCityId: string;
  packageWeightKg: number;
  packageLengthCm: number;
  packageWidthCm: number;
  packageHeightCm: number;
};
export type CreatedShipment = {
  shipmentId: string;
};

export async function createShipment(
  quoteShipmentRequest: CreateShipmentRequest
) {
  const response = await api.post<CreatedShipment>(
    "/shipments",
    quoteShipmentRequest
  );

  return response.data;
}
