import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingPage from "./BookingPage";
import { TRIPS } from "../../constants/trips";

type User = ReturnType<typeof userEvent.setup>;

const firstTrip = TRIPS[0];

/** Click "Select" on the first trip to advance to step 2. */
async function selectFirstTrip(user: User) {
  const selectBtn = await screen.findByTestId(`trip-select-${firstTrip.id}`);
  await user.click(selectBtn);
  await screen.findByTestId("date-passenger-step");
}

/**
 * Fill the date/passenger step and advance to step 3.
 * Uses Ant Design Select mouseDown + title-based option lookup.
 */
async function fillDatePassengerStep(
  user: User,
  passengerCount = 1,
  dateIndex = 0,
) {
  const date = firstTrip.departureDates[dateIndex];

  // Open the Ant Design Select via mouseDown on its selector element
  const selector = document.querySelector(".ant-select-selector");
  expect(selector).toBeTruthy();
  fireEvent.mouseDown(selector!);

  // Options render in document.body; find by the `title` attribute Ant Design adds
  const option = await screen.findByTitle(date);
  fireEvent.click(option);

  // Adjust passenger count by clicking the increment (▲) button on InputNumber
  if (passengerCount > 1) {
    const upBtn = document.querySelector(
      ".ant-input-number-handler-up",
    ) as HTMLElement | null;
    if (upBtn) {
      for (let i = 1; i < passengerCount; i++) {
        fireEvent.mouseDown(upBtn);
        fireEvent.mouseUp(upBtn);
      }
    }
  }

  // Click Next to advance
  const nextBtn = await screen.findByTestId("next-button");
  fireEvent.click(nextBtn);
  await screen.findByTestId("passenger-details-step");
}

/** Fill all required fields for `count` passengers and click Next to reach step 4. */
async function fillPassengerDetails(count: number) {
  await screen.findByTestId("passenger-details-step");

  for (let i = 0; i < count; i++) {
    const section = await screen.findByTestId(`passenger-section-${i}`);
    fireEvent.change(within(section).getByPlaceholderText("Full legal name"), {
      target: { value: `Passenger ${i + 1}` },
    });
    fireEvent.change(within(section).getByPlaceholderText("YYYY-MM-DD"), {
      target: { value: "1990-01-01" },
    });
    fireEvent.change(
      within(section).getByPlaceholderText("Passport or national ID number"),
      { target: { value: `P${i + 1}00000` } },
    );
    fireEvent.change(
      within(section).getByPlaceholderText("Country of nationality"),
      {
        target: { value: "Earth" },
      },
    );
  }

  const nextBtn = screen.getByTestId("next-button");
  fireEvent.click(nextBtn);
  await screen.findByTestId("booking-confirmation");
}

// ─────────────────────────────────────────────────────────────────────────────

describe("BookingPage", () => {
  describe("Initialization", () => {
    it("renders with step 1 (TripBrowser) visible initially", () => {
      render(<BookingPage />);
      expect(screen.getByTestId("booking-page")).toBeTruthy();
      expect(screen.getByTestId("trip-browser")).toBeTruthy();
      expect(screen.getByTestId("booking-step-indicator")).toBeTruthy();
    });

    it("renders all trip cards from TRIPS constant", () => {
      render(<BookingPage />);
      const cards = screen.getAllByTestId("trip-card");
      expect(cards.length).toBe(TRIPS.length);
    });

    it("step indicator is present and visible on initial render", () => {
      render(<BookingPage />);
      expect(screen.getByTestId("booking-step-indicator")).toBeTruthy();
    });
  });

  describe("Step 1 → Step 2: Trip Selection", () => {
    it("clicking Select on a trip advances to DatePassengerStep", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);

      expect(screen.getByTestId("date-passenger-step")).toBeTruthy();
      expect(screen.queryByTestId("trip-browser")).toBeNull();
    });

    it("step indicator is still present after trip selection", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);
      await selectFirstTrip(user);
      expect(screen.getByTestId("booking-step-indicator")).toBeTruthy();
    });
  });

  describe("Step 2: DatePassengerStep", () => {
    it("Next button is disabled when no date is selected", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);
      await selectFirstTrip(user);

      const nextBtn = screen.getByTestId("next-button");
      expect(nextBtn).toHaveProperty("disabled", true);
    });

    it("Back button is present in step 2", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);
      await selectFirstTrip(user);
      expect(screen.getByTestId("back-button")).toBeTruthy();
    });
  });

  describe("Step 2 → Step 3: Date & Passenger selection", () => {
    it("selecting date advances to PassengerDetailsStep", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);

      expect(screen.getByTestId("passenger-details-step")).toBeTruthy();
    });

    it("PassengerDetailsStep renders 1 section when 1 passenger selected", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);

      const sections = screen.getAllByTestId(/^passenger-section-/);
      expect(sections.length).toBe(1);
    });

    it("PassengerDetailsStep renders 2 sections when 2 passengers selected", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 2, 0);

      const sections = screen.getAllByTestId(/^passenger-section-/);
      expect(sections.length).toBe(2);
    });
  });

  describe("Step 3 → Step 4: Passenger Details", () => {
    it("filling passenger details advances to BookingConfirmation", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);
      await fillPassengerDetails(1);

      expect(screen.getByTestId("booking-confirmation")).toBeTruthy();
    });

    it("confirmation displays trip destination", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);
      await fillPassengerDetails(1);

      expect(screen.getByText(firstTrip.destination)).toBeTruthy();
    });

    it("confirmation displays total price (pricePerPerson × passengerCount)", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);
      await fillPassengerDetails(1);

      const expectedTotal = firstTrip.pricePerPerson * 1;
      const formattedTotal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(expectedTotal);

      // Price per person and total are equal for 1 passenger — use getAllByText
      const matches = screen.getAllByText(formattedTotal);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it("confirmation displays total price for 2 passengers (2× pricePerPerson)", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 2, 0);
      await fillPassengerDetails(2);

      const expectedTotal = firstTrip.pricePerPerson * 2;
      const formattedTotal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(expectedTotal);

      expect(screen.getByText(formattedTotal)).toBeTruthy();
    });
  });

  describe("Back Navigation", () => {
    it("Back from step 2 returns to step 1", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);

      fireEvent.click(screen.getByTestId("back-button"));

      await waitFor(() => {
        expect(screen.getByTestId("trip-browser")).toBeTruthy();
      });
    });

    it("Back from step 2 preserves the trip selection (card still present)", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      fireEvent.click(screen.getByTestId("back-button"));

      await waitFor(() => {
        expect(screen.getByTestId(`trip-select-${firstTrip.id}`)).toBeTruthy();
      });
    });

    it("Back from step 3 returns to step 2", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);

      fireEvent.click(screen.getByTestId("back-button"));

      await waitFor(() => {
        expect(screen.getByTestId("date-passenger-step")).toBeTruthy();
      });
    });

    it("Back from step 3 preserves the previously selected date", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);

      fireEvent.click(screen.getByTestId("back-button"));

      await waitFor(() => {
        expect(screen.getByTestId("date-passenger-step")).toBeTruthy();
        // Previously selected date is visible in the select's display area
        expect(screen.getByText(firstTrip.departureDates[0])).toBeTruthy();
      });
    });

    it("Back from step 4 returns to step 3", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);
      await fillPassengerDetails(1);

      fireEvent.click(screen.getByTestId("back-button"));

      await waitFor(() => {
        expect(screen.getByTestId("passenger-details-step")).toBeTruthy();
      });
    });
  });

  describe("Step Indicator", () => {
    it("step indicator is always present across steps 1–3", async () => {
      const user = userEvent.setup();
      render(<BookingPage />);

      expect(screen.getByTestId("booking-step-indicator")).toBeTruthy(); // Step 1

      await selectFirstTrip(user);
      expect(screen.getByTestId("booking-step-indicator")).toBeTruthy(); // Step 2

      await fillDatePassengerStep(user, 1, 0);
      expect(screen.getByTestId("booking-step-indicator")).toBeTruthy(); // Step 3
    });
  });

  describe("onBookingComplete callback", () => {
    it("does not call onBookingComplete before step 4 is reached", async () => {
      const onComplete = vi.fn();
      const user = userEvent.setup();
      render(<BookingPage onBookingComplete={onComplete} />);

      await selectFirstTrip(user);

      expect(onComplete).not.toHaveBeenCalled();
    });

    it("calls onBookingComplete with booking data when passenger details are submitted", async () => {
      const onComplete = vi.fn();
      const user = userEvent.setup();
      render(<BookingPage onBookingComplete={onComplete} />);

      await selectFirstTrip(user);
      await fillDatePassengerStep(user, 1, 0);
      await fillPassengerDetails(1);

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1);
        expect(onComplete).toHaveBeenCalledWith(
          expect.objectContaining({
            tripId: firstTrip.id,
            departureDate: firstTrip.departureDates[0],
            passengerCount: 1,
          }),
        );
      });
    });
  });
});
