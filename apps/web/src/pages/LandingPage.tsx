import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Hero,
  FeaturesGrid,
  MissionStrip,
  CtaBanner,
  FEATURE_CARDS,
} from '@space-tourism/ui';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/contact');
  };

  return (
    <>
      <Hero
        headline="Your Journey to the Stars Begins Here"
        subHeadline="Stellar Horizons offers exclusive space tourism experiences — from orbital launches to lunar flybys. Safety, luxury, and wonder, guaranteed."
        ctaLabel="Book Your Mission"
        onCtaClick={handleCtaClick}
      />
      <FeaturesGrid
        features={FEATURE_CARDS}
        sectionTitle="Why Choose Stellar Horizons"
      />
      <MissionStrip
        title="Our Mission"
        body="We believe the cosmos belongs to everyone. Stellar Horizons is committed to making space accessible, safe, and unforgettable for the next generation of explorers. Every mission we design is built on decades of aerospace expertise and a relentless passion for discovery."
      />
      <CtaBanner
        headline="Ready to Leave Earth Behind?"
        ctaLabel="Contact Us Today"
        onCtaClick={handleCtaClick}
      />
    </>
  );
}
