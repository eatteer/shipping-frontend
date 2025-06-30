import { api } from "@/lib/api";

export type GetShipmentTrackingDetailsRequest = {
  shipmentId: string;
};

export type ShipmentTrackingDetails = {
  shipmentId: string;
  originCity: string;
  destinationCity: string;
  packageWeightKg: number;
  packageLengthCm: number;
  packageWidthCm: number;
  packageHeightCm: number;
  calculatedWeightKg: number;
  quotedValue: number;
  currentStatus: string;
  trackingHistory: {
    statusId: string;
    statusName: string;
    statusDescription: string;
    timestamp: string;
  }[];
  lastUpdate: string;
};

export async function getShipmentTrackingDetails({
  shipmentId,
}: GetShipmentTrackingDetailsRequest) {
  const response = await api.get<ShipmentTrackingDetails>(
    `/shipments/${shipmentId}/track`
  );

  return response.data;
}
