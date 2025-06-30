import { Navbar } from "@/components/shared/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuoteSection } from "@/pages/home/components/quote/quote-section";
import { TrackingSection } from "@/pages/home/components/track/tracking-section";
import { Package, Search } from "lucide-react";
import { useState } from "react";

export function Home() {
  const [shipmentCreatedId, setShipmentCreatedId] = useState("");

  const [activeTab, setActiveTab] = useState("quote");

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
              Shipfast
            </h1>
            <p className="text-xl text-gray-600">
              Quote, ship, and track your packages with ease
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quote" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Get quote
              </TabsTrigger>
              <TabsTrigger value="track" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Track shipment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quote">
              <QuoteSection
                onShipmentCreated={(shipmentId) => {
                  setShipmentCreatedId(shipmentId);
                  setActiveTab("track");
                }}
              />
            </TabsContent>
            <TabsContent value="track">
              <TrackingSection />
            </TabsContent>
          </Tabs>

          {shipmentCreatedId && activeTab === "track" && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                Order created successfully! Track your shipment with ID:{" "}
                {shipmentCreatedId}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
