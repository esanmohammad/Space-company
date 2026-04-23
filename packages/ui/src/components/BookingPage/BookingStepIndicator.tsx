import React from "react";
import { Steps } from "antd";
import styles from "./BookingStepIndicator.module.css";

const STEP_LABELS = [
  "Select Trip",
  "Date & Passengers",
  "Passenger Details",
  "Confirmation",
];

interface BookingStepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

export function BookingStepIndicator({
  currentStep,
}: BookingStepIndicatorProps) {
  const items = STEP_LABELS.map((label, index) => {
    let status: "finish" | "process" | "wait";
    if (index + 1 < currentStep) {
      status = "finish";
    } else if (index + 1 === currentStep) {
      status = "process";
    } else {
      status = "wait";
    }
    return { title: label, status };
  });

  return (
    <div className={styles.indicator} data-testid="booking-step-indicator">
      <Steps current={currentStep - 1} items={items} />
    </div>
  );
}

BookingStepIndicator.displayName = "BookingStepIndicator";
