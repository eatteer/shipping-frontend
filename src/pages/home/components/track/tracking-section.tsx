import { useLoader } from "@/contexts/loader/use-loader";
import { getApplicationError } from "@/lib/get-application-error";
import { TrackingDetails } from "@/pages/home/components/track/tracking-details";
import { TrackingForm } from "@/pages/home/components/track/tracking-form";
import { getShipmentTrackingDetails } from "@/services/get-shipment-tracking-details";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function TrackingSection() {
  const [shipmentId, setShipmentId] = useState("");

  const loader = useLoader();

  const {
    data: shipmentTrackingDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["get-shipment-tracking-details", shipmentId],
    queryFn: () => getShipmentTrackingDetails({ shipmentId }),
    enabled: !!shipmentId,
    gcTime: 0,
  });

  useEffect(() => {
    if (error) {
      const { message } = getApplicationError(error);
      toast.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (isLoading) {
      loader.show();
    } else {
      loader.hide();
    }
  }, [isLoading]);

  return (
    <section className="space-y-6">
      <TrackingForm
        onTrackShipment={({ shipmentId: trackingId }) => {
          setShipmentId(trackingId);
        }}
      />
      {shipmentTrackingDetails && (
        <TrackingDetails shipmentTrackingDetails={shipmentTrackingDetails} />
      )}
    </section>
  );
}
