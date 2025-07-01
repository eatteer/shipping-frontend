import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { SignUpForm } from "@/pages/sign-up/sign-up-form";
import "@testing-library/jest-dom";

describe("SignUpForm", () => {
  it("should render the form correctly", () => {
    render(
      <BrowserRouter>
        <SignUpForm onSubmit={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();
  });

  it("should display validation errors for invalid data", async () => {
    render(
      <BrowserRouter>
        <SignUpForm onSubmit={() => {}} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();

      expect(
        screen.getAllByText(/string must contain at least 8 character\(s\)/i)
      ).toHaveLength(2);
    });
  });

  it("should display validation error for mismatching passwords", async () => {
    render(
      <BrowserRouter>
        <SignUpForm onSubmit={() => {}} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });
  });

  it("should call onSubmit with form values when form is submitted", async () => {
    const handleSubmit = jest.fn();

    render(
      <BrowserRouter>
        <SignUpForm onSubmit={handleSubmit} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      });
    });
  });
});
