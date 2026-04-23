import React, { useState } from "react";
import {
  Form,
  Select,
  Input,
  Radio,
  InputNumber,
  Button,
  notification,
} from "antd";
import type {
  BookingFormValues,
  BookingDestination,
  SeatTier,
  FormStatus,
} from "../../types";
import { mockBookingSubmit } from "../../utils/mockBookingSubmit";
import styles from "./BookingForm.module.css";

export interface BookingFormProps {
  onSubmit?: (values: BookingFormValues) => Promise<void>;
}

const DESTINATIONS: BookingDestination[] = [
  "Lunar Flyby",
  "ISS Expedition",
  "Mars Orbital",
];

const SEAT_TIERS: Array<{ value: SeatTier; label: string }> = [
  { value: "economy", label: "Economy" },
  { value: "business", label: "Business" },
  { value: "luxury", label: "Luxury" },
];

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [form] = Form.useForm<BookingFormValues>();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleFinish = async (values: BookingFormValues) => {
    setFormStatus("submitting");
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        await mockBookingSubmit(values);
      }
      form.resetFields();
      setFormStatus("idle");
      notification.success({
        message: "Booking confirmed!",
        description: "Your space journey has been booked successfully.",
      });
    } catch {
      setFormStatus("error");
      notification.error({
        message: "Booking failed",
        description: "Please try again later.",
      });
    }
  };

  const isSubmitting = formStatus === "submitting";

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className={styles.form}
      data-testid="booking-form"
    >
      <Form.Item
        label="Destination"
        name="destination"
        rules={[{ required: true, message: "Destination is required" }]}
      >
        <Select
          placeholder="Select a destination"
          options={DESTINATIONS.map((d) => ({ value: d, label: d }))}
        />
      </Form.Item>

      <Form.Item
        label="Departure Date"
        name="departureDate"
        rules={[{ required: true, message: "Departure date is required" }]}
      >
        <Input aria-required="true" type="date" />
      </Form.Item>

      <Form.Item
        label="Seat Tier"
        name="seatTier"
        rules={[{ required: true, message: "Seat tier is required" }]}
      >
        <Radio.Group>
          {SEAT_TIERS.map(({ value, label }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Passenger Count"
        name="passengerCount"
        initialValue={1}
        rules={[
          { required: true, message: "Passenger count is required" },
          {
            type: "number",
            min: 1,
            message: "At least 1 passenger is required",
          },
          { type: "number", max: 10, message: "Maximum 10 passengers" },
        ]}
      >
        <InputNumber
          aria-required="true"
          min={1}
          max={10}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item className={styles.submitRow}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Book Now"}
        </Button>
      </Form.Item>
    </Form>
  );
}

BookingForm.displayName = "BookingForm";
export default BookingForm;
