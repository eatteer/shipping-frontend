import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth/use-auth";
import type { ShipmentTrackingDetails } from "@/services/get-shipment-tracking-details";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import type { ShipmentStatusUpdate } from "@/types/socket-types";

const API_BASE_URL_WS = import.meta.env.VITE_API_BASE_URL_WS;

export type TrackingDetailsProps = Readonly<{
  shipmentTrackingDetails: ShipmentTrackingDetails;
}>;

export function TrackingDetails({
  shipmentTrackingDetails,
}: TrackingDetailsProps) {
  const [trackingHistory, setTrackingHistory] = useState(
    shipmentTrackingDetails.trackingHistory
  );

  const auth = useAuth();

  const { lastJsonMessage } = useWebSocket<ShipmentStatusUpdate>(
    `${API_BASE_URL_WS}/ws/shipments/${shipmentTrackingDetails.shipmentId}/track?token=${auth.user?.token}`,
    {
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (!lastJsonMessage) return;

    setTrackingHistory((prevHistory) => [...prevHistory, lastJsonMessage]);
  }, [lastJsonMessage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment details</CardTitle>
        <CardDescription>
          Tracking ID: {shipmentTrackingDetails.shipmentId}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-2">Route</h4>
            <div className="text-sm">
              <p>{shipmentTrackingDetails.originCity}</p>
              <p className="text-gray-500">to</p>
              <p>{shipmentTrackingDetails.destinationCity}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Status</h4>
            <Badge>
              {trackingHistory.at(trackingHistory.length - 1)?.statusName ??
                "Unknown status"}
            </Badge>
          </div>
        </div>
        <Separator />
        <div>
          <h4 className="font-medium mb-4">Tracking progress</h4>
          <div className="space-y-4">
            {trackingHistory.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 mt-2 rounded-full ${"bg-green-500"}`}
                  />
                  {index < trackingHistory.length - 1 && (
                    <div className={`w-px h-8 ${"bg-green-500"}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${"text-green-700"}`}>
                      {step.statusName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(step.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {step.statusDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
