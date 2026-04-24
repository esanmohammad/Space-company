import "./theme/tokens.css";

// Components
export { Navbar, default as NavbarDefault } from "./components/Navbar";
export type { NavbarProps } from "./components/Navbar";

export { Footer, default as FooterDefault } from "./components/Footer";
export type { FooterProps } from "./components/Footer";

export { Hero, default as HeroDefault } from "./components/Hero";
export type { HeroProps } from "./components/Hero";

export {
  FeatureCard,
  default as FeatureCardDefault,
} from "./components/FeatureCard";
export type { FeatureCardProps } from "./components/FeatureCard";

export {
  FeaturesGrid,
  default as FeaturesGridDefault,
} from "./components/FeaturesGrid";
export type { FeaturesGridProps } from "./components/FeaturesGrid";

export {
  MissionStrip,
  default as MissionStripDefault,
} from "./components/MissionStrip";
export type { MissionStripProps } from "./components/MissionStrip";

export { CtaBanner, default as CtaBannerDefault } from "./components/CtaBanner";
export type { CtaBannerProps } from "./components/CtaBanner";

export {
  ContactForm,
  default as ContactFormDefault,
} from "./components/ContactForm";
export type { ContactFormProps } from "./components/ContactForm";

export {
  CompanyInfoBlock,
  default as CompanyInfoBlockDefault,
} from "./components/CompanyInfoBlock";
export type { CompanyInfoBlockProps } from "./components/CompanyInfoBlock";

export {
  BookingPage,
  default as BookingPageDefault,
} from "./components/BookingPage";
export type { BookingPageProps } from "./components/BookingPage";

export {
  BookingForm,
  default as BookingFormDefault,
} from "./components/BookingForm";
export type { BookingFormProps } from "./components/BookingForm";

export { SectionWrapper } from "./components/SectionWrapper";
export { default as SectionWrapperDefault } from "./components/SectionWrapper";

// Types
export type {
  FeatureCardData,
  CompanyInfo,
  ContactFormValues,
  FormStatus,
  SpaceTheme,
  NavLink,
  SocialLink,
  TripData,
  PassengerDetails,
  BookingDestination,
  SeatTier,
  BookingFormValues,
  FooterLinkGroup,
} from "./types";

// Theme
export { spaceTheme } from "./theme/spaceTheme";

// Constants
export { FEATURE_CARDS } from "./constants/featureCards";
export { COMPANY_INFO } from "./constants/companyInfo";
export { NAV_LINKS } from "./constants/navLinks";
export { TRIPS } from "./constants/trips";

// Utils
export { mockContactSubmit } from "./utils/mockSubmit";
export { mockBookingSubmit } from "./utils/mockBookingSubmit";
