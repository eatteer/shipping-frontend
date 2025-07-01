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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import type { City } from "@/services/get-all-cities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const QUOTE_SHIPMENT_FORM_SCHEMA = z.object({
  originCityId: z.string().uuid("Origin city is required"),
  destinationCityId: z.string().uuid("Destination city is required"),
  packageWeightKg: z.coerce
    .number()
    .min(1, "Weight should be greater than 1")
    .lte(1000, "Weight should be less or equal than 1000"),
  packageLengthCm: z.coerce
    .number()
    .min(1, "Length should be greater than 1")
    .lte(1000, "Length should be less or equal 1000"),
  packageWidthCm: z.coerce
    .number()
    .min(1, "Width should be greater than 1")
    .lte(1000, "Width should be less or equal 1000"),
  packageHeightCm: z.coerce
    .number()
    .min(1, "Height should be greater than 1")
    .lte(1000, "Height should be less or equal 1000"),
});

export type QuoteShipmentFormValues = z.infer<
  typeof QUOTE_SHIPMENT_FORM_SCHEMA
>;

export type QuoteFormProps = {
  cities: City[];
  onQuoteShipment: (order: QuoteShipmentFormValues) => void;
};

export function QuoteForm({ cities, onQuoteShipment }: QuoteFormProps) {
  const form = useForm<QuoteShipmentFormValues>({
    resolver: zodResolver(QUOTE_SHIPMENT_FORM_SCHEMA),
    defaultValues: {
      originCityId: "",
      destinationCityId: "",
      packageWeightKg: 0,
      packageLengthCm: 0,
      packageWidthCm: 0,
      packageHeightCm: 0,
    },
  });

  const onSubmit = (data: QuoteShipmentFormValues) => {
    onQuoteShipment(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get shipping quote</CardTitle>
        <CardDescription>
          Enter your shipment details to get an instant quote
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => onSubmit(values))}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="originCityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin city</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select origin city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destinationCityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination city</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select destination city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="packageWeightKg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packageWidthCm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packageHeightCm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="6" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packageLengthCm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Calculate quote
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
