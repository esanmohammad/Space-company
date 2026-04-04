import type React from 'react';

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

export type FormStatus = 'idle' | 'dirty' | 'submitting' | 'success' | 'error';

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
