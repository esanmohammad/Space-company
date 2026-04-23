import React from "react";
import { Button, Descriptions } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { TripData, PassengerDetails } from "../../types";
import styles from "./BookingConfirmation.module.css";

interface BookingConfirmationProps {
  trip: TripData;
  departureDate: string;
  passengers: PassengerDetails[];
  onBack: () => void;
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BookingConfirmation({
  trip,
  departureDate,
  passengers,
  onBack,
}: BookingConfirmationProps) {
  const totalPrice = trip.pricePerPerson * passengers.length;

  return (
    <div className={styles.confirmation} data-testid="booking-confirmation">
      <div className={styles.successHeader}>
        <CheckCircleOutlined className={styles.successIcon} />
        <h2 className={styles.heading}>Booking Confirmed</h2>
        <p className={styles.subtitle}>
          Your space travel reservation has been confirmed. Review the details
          below.
        </p>
      </div>

      <div className={styles.summary}>
        <Descriptions
          title="Booking Summary"
          bordered
          column={1}
          className={styles.descriptions}
        >
          <Descriptions.Item label="Destination">
            {trip.destination}
          </Descriptions.Item>
          <Descriptions.Item label="Departure Date">
            {formatDate(departureDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Duration">
            {trip.durationDays} days
          </Descriptions.Item>
          <Descriptions.Item label="Passenger Count">
            {passengers.length}
          </Descriptions.Item>
          <Descriptions.Item label="Passengers">
            <ul className={styles.passengerList}>
              {passengers.map((p, i) => (
                <li key={i}>{p.fullName}</li>
              ))}
            </ul>
          </Descriptions.Item>
          <Descriptions.Item label="Price per Person">
            {formatCurrency(trip.pricePerPerson)}
          </Descriptions.Item>
          <Descriptions.Item label="Total Price">
            <strong className={styles.totalPrice}>
              {formatCurrency(totalPrice)}
            </strong>
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.actions}>
        <Button onClick={onBack} data-testid="back-button">
          Back
        </Button>
      </div>
    </div>
  );
}

BookingConfirmation.displayName = "BookingConfirmation";
