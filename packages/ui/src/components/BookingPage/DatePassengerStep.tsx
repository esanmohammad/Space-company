import React, { useState } from "react";
import { Select, InputNumber, Button, Space } from "antd";
import type { TripData } from "../../types";
import styles from "./DatePassengerStep.module.css";

interface DatePassengerStepProps {
  trip: TripData;
  initialDate: string | null;
  initialPassengerCount: number;
  onNext: (date: string, count: number) => void;
  onBack: () => void;
}

export function DatePassengerStep({
  trip,
  initialDate,
  initialPassengerCount,
  onNext,
  onBack,
}: DatePassengerStepProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate);
  const [passengerCount, setPassengerCount] = useState<number>(
    initialPassengerCount,
  );

  const isNextDisabled = !selectedDate || passengerCount < 1;

  const handleNext = () => {
    if (selectedDate && passengerCount >= 1) {
      onNext(selectedDate, passengerCount);
    }
  };

  const dateOptions = trip.departureDates.map((d) => ({ label: d, value: d }));

  return (
    <div className={styles.step} data-testid="date-passenger-step">
      <h2 className={styles.heading}>Select Departure Date &amp; Passengers</h2>
      <p className={styles.subtitle}>
        Choose your departure date and the number of passengers for{" "}
        <strong>{trip.destination}</strong>.
      </p>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="departure-date">
          Departure Date
        </label>
        <Select
          id="departure-date"
          className={styles.select}
          placeholder="Select a departure date"
          options={dateOptions}
          value={selectedDate ?? undefined}
          onChange={(value: string) => setSelectedDate(value)}
          data-testid="departure-date-select"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="passenger-count">
          Number of Passengers
        </label>
        <InputNumber
          id="passenger-count"
          className={styles.inputNumber}
          min={1}
          max={6}
          value={passengerCount}
          onChange={(value) => setPassengerCount(value ?? 1)}
          data-testid="passenger-count-input"
        />
      </div>

      <Space className={styles.actions}>
        <Button onClick={onBack} data-testid="back-button">
          Back
        </Button>
        <Button
          type="primary"
          disabled={isNextDisabled}
          onClick={handleNext}
          data-testid="next-button"
        >
          Next
        </Button>
      </Space>
    </div>
  );
}

DatePassengerStep.displayName = "DatePassengerStep";
