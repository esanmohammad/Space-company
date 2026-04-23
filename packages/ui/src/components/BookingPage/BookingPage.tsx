import React, { useState } from "react";
import type { PassengerDetails } from "../../types";
import { TRIPS } from "../../constants/trips";
import { BookingStepIndicator } from "./BookingStepIndicator";
import { TripBrowser } from "./TripBrowser";
import { DatePassengerStep } from "./DatePassengerStep";
import { PassengerDetailsStep } from "./PassengerDetailsStep";
import { BookingConfirmation } from "./BookingConfirmation";
import styles from "./BookingPage.module.css";

interface WizardBookingValues {
  tripId: string;
  departureDate: string;
  passengerCount: number;
  passengers: PassengerDetails[];
}

export interface BookingPageProps {
  /** Optional callback invoked when the user reaches the confirmation step.
   *  Reserved for future backend integration — has no side effects in v1. */
  onBookingComplete?: (values: WizardBookingValues) => void;
}

type WizardStep = 1 | 2 | 3 | 4;

interface WizardState {
  currentStep: WizardStep;
  selectedTripId: string | null;
  departureDate: string | null;
  passengerCount: number;
  passengers: PassengerDetails[];
}

const INITIAL_STATE: WizardState = {
  currentStep: 1,
  selectedTripId: null,
  departureDate: null,
  passengerCount: 1,
  passengers: [],
};

const EMPTY_PASSENGER: PassengerDetails = {
  fullName: "",
  dateOfBirth: "",
  idNumber: "",
  nationality: "",
  specialRequirements: "",
};

const BookingPage = React.memo<BookingPageProps>(function BookingPage({
  onBookingComplete,
}) {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);

  const handleTripSelect = (tripId: string) => {
    setState((prev) => ({ ...prev, selectedTripId: tripId, currentStep: 2 }));
  };

  const handleDatePassengerNext = (date: string, count: number) => {
    setState((prev) => ({
      ...prev,
      departureDate: date,
      passengerCount: count,
      passengers: Array.from({ length: count }, () => ({ ...EMPTY_PASSENGER })),
      currentStep: 3,
    }));
  };

  const handlePassengersNext = (passengers: PassengerDetails[]) => {
    setState((prev) => {
      if (prev.selectedTripId && prev.departureDate && onBookingComplete) {
        onBookingComplete({
          tripId: prev.selectedTripId,
          departureDate: prev.departureDate,
          passengerCount: passengers.length,
          passengers,
        });
      }
      return { ...prev, passengers, currentStep: 4 };
    });
  };

  const handleBack = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1) as WizardStep,
    }));
  };

  const selectedTrip = TRIPS.find((t) => t.id === state.selectedTripId) ?? null;

  return (
    <div className={styles.page} data-testid="booking-page">
      <BookingStepIndicator currentStep={state.currentStep} />

      <div className={styles.content}>
        {state.currentStep === 1 && (
          <TripBrowser
            trips={TRIPS}
            selectedTripId={state.selectedTripId}
            onSelect={handleTripSelect}
          />
        )}

        {state.currentStep === 2 && selectedTrip && (
          <DatePassengerStep
            trip={selectedTrip}
            initialDate={state.departureDate}
            initialPassengerCount={state.passengerCount}
            onNext={handleDatePassengerNext}
            onBack={handleBack}
          />
        )}

        {state.currentStep === 3 && (
          <PassengerDetailsStep
            passengerCount={state.passengerCount}
            initialPassengers={state.passengers}
            onNext={handlePassengersNext}
            onBack={handleBack}
          />
        )}

        {state.currentStep === 4 && selectedTrip && state.departureDate && (
          <BookingConfirmation
            trip={selectedTrip}
            departureDate={state.departureDate}
            passengers={state.passengers}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
});

BookingPage.displayName = "BookingPage";

export { BookingPage };
export default BookingPage;
