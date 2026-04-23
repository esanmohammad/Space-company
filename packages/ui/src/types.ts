import type React from "react";

export interface FeatureCardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CompanyInfo {
  address: string;
  email: string;
  phone: string;
  tagline: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = "idle" | "dirty" | "submitting" | "success" | "error";

export interface SpaceTheme {
  colorPrimary: string;
  colorBgBase: string;
  colorBgContainer: string;
  colorBorder: string;
  colorTextBase: string;
  colorTextSecondary: string;
  borderRadius: number;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * Represents a space travel offering available for booking.
 * `pricePerPerson` is a whole-dollar USD amount (e.g. 250000 = $250,000).
 */
export interface TripData {
  /** Kebab-case unique identifier, e.g. "mars-orbital-2026" */
  id: string;
  /** Human-readable destination name, e.g. "Mars Orbital" */
  destination: string;
  /** 1–3 sentence marketing description */
  description: string;
  /** Trip duration in days (integer, minimum 1) */
  durationDays: number;
  /** Available departure dates as ISO-8601 strings, e.g. ["2026-07-15"] */
  departureDates: string[];
  /** Price per person in whole USD dollars, e.g. 250000 for $250,000 */
  pricePerPerson: number;
  /** Absolute URL or relative path to trip hero image */
  imageUrl: string;
}

/**
 * PII details for a single passenger.
 * This data must remain in React's ephemeral state only — never persisted.
 */
export interface PassengerDetails {
  fullName: string;
  /** ISO-8601 date string, e.g. "1990-04-12" */
  dateOfBirth: string;
  /** Passport or national ID number */
  idNumber: string;
  /** Free-text country name */
  nationality: string;
  /** Optional special requirements or accessibility needs */
  specialRequirements?: string;
}

/** Available rocket booking destinations. */
export type BookingDestination =
  | "Lunar Flyby"
  | "ISS Expedition"
  | "Mars Orbital";

/** Seat tier options for a rocket booking. */
export type SeatTier = "economy" | "business" | "luxury";

/** Values collected by the BookingForm component. */
export interface BookingFormValues {
  destination: BookingDestination;
  /** ISO-8601 date string, e.g. "2026-07-15" */
  departureDate: string;
  seatTier: SeatTier;
  /** Integer ≥ 1 */
  passengerCount: number;
}
