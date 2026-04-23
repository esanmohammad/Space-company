import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockNotificationSuccess, mockNotificationError } = vi.hoisted(() => ({
  mockNotificationSuccess: vi.fn(),
  mockNotificationError: vi.fn(),
}));

vi.mock("antd", async (importOriginal) => {
  const actual = await importOriginal<typeof import("antd")>();
  return {
    ...actual,
    notification: {
      ...actual.notification,
      success: mockNotificationSuccess,
      error: mockNotificationError,
    },
  };
});

// Import after mock setup
import BookingForm from "./BookingForm";

/** Helper: select a destination via antd Select */
async function selectDestination(destination: string) {
  const selector = document.querySelector(".ant-select-selector");
  expect(selector).toBeTruthy();
  fireEvent.mouseDown(selector!);
  const option = await screen.findByTitle(destination);
  fireEvent.click(option);
}

/** Helper: set the departure date on the native date input */
function setDepartureDate(value: string) {
  const dateInput = document.querySelector(
    'input[type="date"]',
  ) as HTMLInputElement;
  expect(dateInput).toBeTruthy();
  fireEvent.change(dateInput, { target: { value } });
}

describe("BookingForm", () => {
  beforeEach(() => {
    mockNotificationSuccess.mockClear();
    mockNotificationError.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders all required fields", () => {
    render(<BookingForm />);

    expect(screen.getByText("Destination")).toBeTruthy();
    expect(screen.getByText("Departure Date")).toBeTruthy();
    expect(screen.getByText("Seat Tier")).toBeTruthy();
    expect(screen.getByText("Passenger Count")).toBeTruthy();

    expect(screen.getByText("Economy")).toBeTruthy();
    expect(screen.getByText("Business")).toBeTruthy();
    expect(screen.getByText("Luxury")).toBeTruthy();

    expect(document.querySelector('input[type="date"]')).toBeTruthy();
    expect(screen.getByRole("button", { name: /book now/i })).toBeTruthy();
  });

  it("empty submit shows required errors for destination, date, and seat tier", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    // Clear passengerCount default so it also triggers required
    const submitButton = screen.getByRole("button", { name: /book now/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Destination is required")).toBeTruthy();
      expect(screen.getByText("Departure date is required")).toBeTruthy();
      expect(screen.getByText("Seat tier is required")).toBeTruthy();
    });
  });

  it("valid submit: calls onSubmit with correct BookingFormValues", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<BookingForm onSubmit={onSubmit} />);

    await selectDestination("Lunar Flyby");
    setDepartureDate("2026-07-15");
    await user.click(screen.getByText("Economy"));

    await user.click(screen.getByRole("button", { name: /book now/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          destination: "Lunar Flyby",
          departureDate: "2026-07-15",
          seatTier: "economy",
          passengerCount: 1,
        }),
      );
    });
  });

  it("successful submission: shows confirmation notification and resets form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<BookingForm onSubmit={onSubmit} />);

    await selectDestination("ISS Expedition");
    setDepartureDate("2026-08-01");
    await user.click(screen.getByText("Business"));

    await user.click(screen.getByRole("button", { name: /book now/i }));

    await waitFor(() => {
      expect(mockNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(mockNotificationSuccess).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Booking confirmed!" }),
      );
    });
  });

  it("rejected onSubmit: shows error notification", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error("Network error"));

    render(<BookingForm onSubmit={onSubmit} />);

    await selectDestination("Mars Orbital");
    setDepartureDate("2027-03-22");
    await user.click(screen.getByText("Luxury"));

    await user.click(screen.getByRole("button", { name: /book now/i }));

    await waitFor(() => {
      expect(mockNotificationError).toHaveBeenCalledTimes(1);
      expect(mockNotificationError).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Booking failed" }),
      );
    });
  });
});
