import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TrackingForm } from "@/pages/home/components/track/tracking-form";

describe("TrackingForm", () => {
  it("should render the form correctly", () => {
    render(<TrackingForm onTrackShipment={() => {}} />);

    expect(screen.getByText(/track your shipment/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        /enter your shipment id to see the current status and location/i
      )
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/shipment id/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /track shipment/i })
    ).toBeInTheDocument();
  });

  it("should display validation errors for invalid data", async () => {
    render(<TrackingForm onTrackShipment={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /track shipment/i }));

    await waitFor(() => {
      expect(screen.getByText(/shipment id is required/i)).toBeInTheDocument();
    });
  });

  it("should display validation error for invalid UUID format", async () => {
    render(<TrackingForm onTrackShipment={() => {}} />);

    fireEvent.change(screen.getByLabelText(/shipment id/i), {
      target: { value: "invalid-uuid" },
    });

    fireEvent.click(screen.getByRole("button", { name: /track shipment/i }));

    await waitFor(() => {
      expect(screen.getByText(/shipment id is required/i)).toBeInTheDocument();
    });
  });

  it("should call onTrackShipment with form values when form is submitted", async () => {
    const handleTrack = jest.fn();
    const validUuid = "7ed64c7a-f810-47e9-a216-bdb7703544b7";

    render(<TrackingForm onTrackShipment={handleTrack} />);

    fireEvent.change(screen.getByLabelText(/shipment id/i), {
      target: { value: validUuid },
    });

    fireEvent.click(screen.getByRole("button", { name: /track shipment/i }));

    await waitFor(() => {
      expect(handleTrack).toHaveBeenCalledWith({
        shipmentId: validUuid,
      });
    });
  });
});
