import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuotedShipment } from "@/services/quote-shipment";
import { CheckCircle, MapPin, Package } from "lucide-react";

export type QuotedShipmentProps = Readonly<{
  quotedShipment: QuotedShipment;
  onCreateShipment: (quotedShipment: QuotedShipment) => void;
}>;

export function QuotedShipment({
  quotedShipment,
  onCreateShipment,
}: QuotedShipmentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping quote</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Route</span>
            </div>
            <div className="pl-6">
              <p className="font-medium">{quotedShipment.originCityName}</p>
              <p className="text-gray-500">to</p>
              <p className="font-medium">
                {quotedShipment.destinationCityName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Package details</span>
            </div>
            <div className="pl-6 text-sm">
              <p>
                {quotedShipment.packageLengthCm}" ×{" "}
                {quotedShipment.packageWeightKg}" ×{" "}
                {quotedShipment.packageHeightCm}"
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${quotedShipment.quotedValue.toFixed(2)}
              </div>
              <div className="text-sm text-blue-600">Total shipping cost</div>
            </div>

            <Button
              onClick={() => onCreateShipment(quotedShipment)}
              className="w-full"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Create shipment order
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
