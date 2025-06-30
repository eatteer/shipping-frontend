"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TRACK_SHIPMENT_FORM_SCHEMA = z.object({
  shipmentId: z.string().uuid("Shipment ID is required"),
});

export type TrackShipmentFormValues = z.infer<
  typeof TRACK_SHIPMENT_FORM_SCHEMA
>;

export type TrackingFormProps = Readonly<{
  onTrackShipment: (values: TrackShipmentFormValues) => void;
}>;

export function TrackingForm({ onTrackShipment }: TrackingFormProps) {
  const form = useForm<TrackShipmentFormValues>({
    resolver: zodResolver(TRACK_SHIPMENT_FORM_SCHEMA),
    defaultValues: {
      shipmentId: "",
    },
  });

  const onSubmit = async (data: TrackShipmentFormValues) => {
    onTrackShipment(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track your shipment</CardTitle>
        <CardDescription>
          Enter your shipment ID to see the current status and location
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="shipmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipment ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter shipment ID (e.g., 7ed64c7a-f810-47e9-a216-bdb7703544b7)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Track shipment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
