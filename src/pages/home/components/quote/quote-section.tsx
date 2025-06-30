import { useLoader } from "@/contexts/loader/use-loader";
import { getApplicationError } from "@/lib/get-application-error";
import { QuoteForm } from "@/pages/home/components/quote/quote-form";
import { QuotedShipment } from "@/pages/home/components/quote/quoted-shipment";
import { createShipment } from "@/services/create-shipment";
import { getAllCities } from "@/services/get-all-cities";
import {
  quoteShipment,
  type QuotedShipment as QuotedShipmentType,
} from "@/services/quote-shipment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export type QuoteSectionProps = Readonly<{
  onShipmentCreated?: (shipmentId: string) => void;
  onQuotedShipment?: () => void;
}>;

export function QuoteSection({
  onShipmentCreated,
  onQuotedShipment,
}: QuoteSectionProps) {
  const [quotedShipment, setQuotedShipment] = useState<
    QuotedShipmentType | undefined
  >(undefined);

  const loader = useLoader();

  const { data: cities } = useQuery({
    queryKey: ["get-all-cities"],
    queryFn: getAllCities,
    initialData: [],
  });

  const quoteShipmentMutation = useMutation({
    mutationKey: ["quote-shipment"],
    mutationFn: quoteShipment,
    onMutate: () => {
      loader.show();
    },
    onSuccess: (data) => {
      setQuotedShipment(data);
      if (onQuotedShipment) onQuotedShipment();
    },
    onError: (error) => {
      const { message } = getApplicationError(error);
      toast.error(message);
    },
    onSettled: () => {
      loader.hide();
    },
  });

  const createShipmentMutation = useMutation({
    mutationKey: ["create-shipment"],
    mutationFn: createShipment,
    onMutate: () => {
      loader.show();
    },
    onSuccess: ({ shipmentId }) => {
      toast.success("Shipment created successfully");

      if (onShipmentCreated) onShipmentCreated(shipmentId);
    },
    onError: (error) => {
      const { message } = getApplicationError(error);
      toast.error(message);
    },
    onSettled: () => {
      loader.hide();
    },
  });

  return (
    <section className="space-y-6">
      <QuoteForm
        cities={cities}
        onQuoteShipment={(values) => {
          quoteShipmentMutation.mutate(values);
        }}
      />
      {quotedShipment && (
        <QuotedShipment
          quotedShipment={quotedShipment}
          onCreateShipment={(quotedShipment) => {
            createShipmentMutation.mutate(quotedShipment);
          }}
        />
      )}
    </section>
  );
}
