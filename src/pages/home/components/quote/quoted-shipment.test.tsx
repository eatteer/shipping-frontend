import { render, screen, fireEvent } from "@testing-library/react";
import type { QuotedShipment as QuotedShipmentType } from "@/services/quote-shipment";
import { QuotedShipment } from "@/pages/home/components/quote/quoted-shipment";
import "@testing-library/jest-dom";

const mockQuotedShipment: QuotedShipmentType = {
  originCityId: "11111111-1111-1111-1111-111111111111",
  destinationCityId: "22222222-2222-2222-2222-222222222222",
  originCityName: "New York",
  destinationCityName: "Los Angeles",
  packageWeightKg: 5.5,
  packageLengthCm: 30,
  packageWidthCm: 20,
  packageHeightCm: 15,
  calculatedWeightKg: 6.0,
  quotedValue: 125.5,
};

describe("QuotedShipment", () => {
  const mockOnCreateShipment = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the quoted shipment information correctly", () => {
    render(
      <QuotedShipment
        quotedShipment={mockQuotedShipment}
        onCreateShipment={mockOnCreateShipment}
      />
    );

    // Check title
    expect(screen.getByText(/shipping quote/i)).toBeInTheDocument();

    // Check route information
    expect(screen.getByText(/route/i)).toBeInTheDocument();
    expect(screen.getByText(/new york/i)).toBeInTheDocument();
    expect(screen.getByText(/los angeles/i)).toBeInTheDocument();

    // Check package details
    expect(screen.getByText(/package details/i)).toBeInTheDocument();
    expect(screen.getByText('20" × 15" × 30"')).toBeInTheDocument();

    // Check quoted value
    expect(screen.getByText("$125.50")).toBeInTheDocument();
    expect(screen.getByText(/total shipping cost/i)).toBeInTheDocument();

    // Check create shipment button
    expect(
      screen.getByRole("button", { name: /create shipment order/i })
    ).toBeInTheDocument();
  });

  it("calls onCreateShipment when create shipment button is clicked", () => {
    render(
      <QuotedShipment
        quotedShipment={mockQuotedShipment}
        onCreateShipment={mockOnCreateShipment}
      />
    );

    const createButton = screen.getByRole("button", {
      name: /create shipment order/i,
    });

    fireEvent.click(createButton);

    expect(mockOnCreateShipment).toHaveBeenCalledTimes(1);
    expect(mockOnCreateShipment).toHaveBeenCalledWith(mockQuotedShipment);
  });

  it("formats quoted value with two decimal places", () => {
    const customQuotedShipment: QuotedShipmentType = {
      ...mockQuotedShipment,
      quotedValue: 99.9,
    };

    render(
      <QuotedShipment
        quotedShipment={customQuotedShipment}
        onCreateShipment={mockOnCreateShipment}
      />
    );

    expect(screen.getByText("$99.90")).toBeInTheDocument();
  });

  it("renders icons correctly", () => {
    render(
      <QuotedShipment
        quotedShipment={mockQuotedShipment}
        onCreateShipment={mockOnCreateShipment}
      />
    );

    // Check for MapPin icon (Route section)
    const routeSection = screen.getByText(/route/i).closest("div");
    expect(routeSection).toBeInTheDocument();

    // Check for Package icon (Package details section)
    const packageSection = screen.getByText(/package details/i).closest("div");
    expect(packageSection).toBeInTheDocument();

    // Check for CheckCircle icon in button
    const createButton = screen.getByRole("button", {
      name: /create shipment order/i,
    });

    expect(createButton).toBeInTheDocument();
  });
});
