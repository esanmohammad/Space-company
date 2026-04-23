import React, { useEffect } from "react";
import { Form, Input, Button, Space } from "antd";
import type { PassengerDetails } from "../../types";
import styles from "./PassengerDetailsStep.module.css";

interface PassengerDetailsStepProps {
  passengerCount: number;
  initialPassengers: PassengerDetails[];
  onNext: (passengers: PassengerDetails[]) => void;
  onBack: () => void;
}

interface PassengerFormValues {
  passengers: PassengerDetails[];
}

export function PassengerDetailsStep({
  passengerCount,
  initialPassengers,
  onNext,
  onBack,
}: PassengerDetailsStepProps) {
  const [form] = Form.useForm<PassengerFormValues>();

  useEffect(() => {
    if (initialPassengers.length > 0) {
      form.setFieldsValue({ passengers: initialPassengers });
    }
  }, [form, initialPassengers]);

  const handleFinish = (values: PassengerFormValues) => {
    onNext(values.passengers);
  };

  return (
    <div className={styles.step} data-testid="passenger-details-step">
      <h2 className={styles.heading}>Passenger Details</h2>
      <p className={styles.subtitle}>
        Please provide details for all {passengerCount} passenger
        {passengerCount > 1 ? "s" : ""}.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className={styles.form}
      >
        {Array.from({ length: passengerCount }, (_, index) => (
          <div
            key={index}
            className={styles.passengerSection}
            data-testid={`passenger-section-${index}`}
          >
            <h3 className={styles.passengerHeading}>Passenger {index + 1}</h3>

            <Form.Item
              label="Full Name"
              name={["passengers", index, "fullName"]}
              rules={[{ required: true, message: "Full name is required" }]}
            >
              <Input placeholder="Full legal name" />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name={["passengers", index, "dateOfBirth"]}
              rules={[
                { required: true, message: "Date of birth is required" },
                {
                  pattern: /^\d{4}-\d{2}-\d{2}$/,
                  message: "Please enter date in YYYY-MM-DD format",
                },
              ]}
            >
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Passport / ID Number"
              name={["passengers", index, "idNumber"]}
              rules={[{ required: true, message: "ID number is required" }]}
            >
              <Input placeholder="Passport or national ID number" />
            </Form.Item>

            <Form.Item
              label="Nationality"
              name={["passengers", index, "nationality"]}
              rules={[{ required: true, message: "Nationality is required" }]}
            >
              <Input placeholder="Country of nationality" />
            </Form.Item>

            <Form.Item
              label="Special Requirements"
              name={["passengers", index, "specialRequirements"]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Dietary needs, medical requirements, accessibility needs (optional)"
              />
            </Form.Item>
          </div>
        ))}

        <Space className={styles.actions}>
          <Button onClick={onBack} data-testid="back-button">
            Back
          </Button>
          <Button type="primary" htmlType="submit" data-testid="next-button">
            Next
          </Button>
        </Space>
      </Form>
    </div>
  );
}

PassengerDetailsStep.displayName = "PassengerDetailsStep";
