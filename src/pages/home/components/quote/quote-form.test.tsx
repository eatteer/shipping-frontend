import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QuoteForm } from "@/pages/home/components/quote/quote-form";

const mockCities = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "City A",
    departmentId: "d1",
    zoneId: "z1",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "City B",
    departmentId: "d2",
    zoneId: "z2",
    createdAt: "",
    updatedAt: "",
  },
];

describe("QuoteForm", () => {
  it("should render the form correctly", () => {
    render(<QuoteForm cities={mockCities} onQuoteShipment={() => {}} />);

    expect(screen.getByText(/get shipping quote/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/origin city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/weight \(kg\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/width \(cm\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/height \(cm\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/length \(cm\)/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /calculate quote/i })
    ).toBeInTheDocument();
  });

  it("should display validation errors for invalid data", async () => {
    render(<QuoteForm cities={mockCities} onQuoteShipment={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /calculate quote/i }));

    await waitFor(() => {
      expect(screen.getByText(/origin city is required/i)).toBeInTheDocument();

      expect(
        screen.getByText(/destination city is required/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/weight should be greater than 1/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/width should be greater than 1/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/height should be greater than 1/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/length should be greater than 1/i)
      ).toBeInTheDocument();
    });
  });

  it("should call onQuoteShipment with form values when form is submitted", async () => {
    const handleQuote = jest.fn();

    render(<QuoteForm cities={mockCities} onQuoteShipment={handleQuote} />);

    // Open and select origin city
    const originTrigger = screen.getByRole("combobox", {
      name: /origin city/i,
    });

    fireEvent.click(originTrigger);

    await waitFor(() => {
      const cityAOption = screen.getByRole("option", { name: "City A" });
      fireEvent.click(cityAOption);
    });

    // Open and select destination city
    const destinationTrigger = screen.getByRole("combobox", {
      name: /destination city/i,
    });

    fireEvent.click(destinationTrigger);

    await waitFor(() => {
      const cityBOption = screen.getByRole("option", { name: "City B" });
      fireEvent.click(cityBOption);
    });

    fireEvent.change(screen.getByLabelText(/weight \(kg\)/i), {
      target: { value: "10" },
    });

    fireEvent.change(screen.getByLabelText(/width \(cm\)/i), {
      target: { value: "20" },
    });

    fireEvent.change(screen.getByLabelText(/height \(cm\)/i), {
      target: { value: "30" },
    });

    fireEvent.change(screen.getByLabelText(/length \(cm\)/i), {
      target: { value: "40" },
    });

    fireEvent.click(screen.getByRole("button", { name: /calculate quote/i }));

    await waitFor(() => {
      expect(handleQuote).toHaveBeenCalledWith({
        originCityId: mockCities[0].id,
        destinationCityId: mockCities[1].id,
        packageWeightKg: 10,
        packageWidthCm: 20,
        packageHeightCm: 30,
        packageLengthCm: 40,
      });
    });
  });
});
