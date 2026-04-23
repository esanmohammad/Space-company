import React from "react";
import { Row, Col, Card, Button } from "antd";
import type { TripData } from "../../types";
import styles from "./TripBrowser.module.css";

interface TripBrowserProps {
  trips: TripData[];
  selectedTripId: string | null;
  onSelect: (tripId: string) => void;
}

export function TripBrowser({
  trips,
  selectedTripId,
  onSelect,
}: TripBrowserProps) {
  if (trips.length === 0) {
    return (
      <div className={styles.browser} data-testid="trip-browser">
        <p className={styles.emptyState}>No trips available at this time.</p>
      </div>
    );
  }

  return (
    <div className={styles.browser} data-testid="trip-browser">
      <Row gutter={[24, 24]}>
        {trips.map((trip) => (
          <Col key={trip.id} xs={24} sm={12} lg={8}>
            <Card
              className={`${styles.card} ${trip.id === selectedTripId ? styles.selected : ""}`}
              data-testid="trip-card"
              cover={
                <img
                  alt={trip.destination}
                  src={trip.imageUrl}
                  className={styles.cardImage}
                />
              }
            >
              <h3 className={styles.destination}>{trip.destination}</h3>
              <p className={styles.description}>{trip.description}</p>
              <div className={styles.meta}>
                <span>{trip.durationDays} days</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(trip.pricePerPerson)}{" "}
                  / person
                </span>
              </div>
              <Button
                type="primary"
                className={styles.selectButton}
                data-testid={`trip-select-${trip.id}`}
                onClick={() => onSelect(trip.id)}
              >
                Select
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

TripBrowser.displayName = "TripBrowser";
