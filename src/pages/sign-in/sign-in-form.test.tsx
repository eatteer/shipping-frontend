import { SignInForm } from "@/pages/sign-in/sign-in-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";

describe("SignInForm", () => {
  it("should render the form correctly", () => {
    render(
      <BrowserRouter>
        <SignInForm onSubmit={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should display validation errors for invalid data", async () => {
    render(
      <BrowserRouter>
        <SignInForm onSubmit={() => {}} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();

      expect(
        screen.getByText(/string must contain at least 8 character\(s\)/i)
      ).toBeInTheDocument();
    });
  });

  it("should call onSubmit with form values when form is submitted", async () => {
    const handleSubmit = jest.fn();

    render(
      <BrowserRouter>
        <SignInForm onSubmit={handleSubmit} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
