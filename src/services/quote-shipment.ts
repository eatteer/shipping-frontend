import { api } from "@/lib/api";

export type QuoteShipmentRequest = {
  originCityId: string;
  destinationCityId: string;
  packageWeightKg: number;
  packageLengthCm: number;
  packageWidthCm: number;
  packageHeightCm: number;
};
export type QuotedShipment = {
  originCityId: string;
  destinationCityId: string;
  originCityName: string;
  destinationCityName: string;
  packageWeightKg: number;
  packageLengthCm: number;
  packageWidthCm: number;
  packageHeightCm: number;
  calculatedWeightKg: number;
  quotedValue: number;
};

export async function quoteShipment(
  quoteShipmentRequest: QuoteShipmentRequest
) {
  const response = await api.post<QuotedShipment>(
    "/shipments/quote",
    quoteShipmentRequest
  );

  return response.data;
}
