import React from 'react';
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import StarOutlined from '@ant-design/icons/StarOutlined';
import type { FeatureCardData } from '../types';

export const FEATURE_CARDS: FeatureCardData[] = [
  {
    id: 'feature-launch',
    icon: React.createElement(RocketOutlined),
    title: 'Orbital Launches',
    description:
      'Experience the raw power of lift-off as Stellar Horizons carries you beyond the atmosphere into the silence of low Earth orbit.',
  },
  {
    id: 'feature-destinations',
    icon: React.createElement(GlobalOutlined),
    title: 'Exclusive Destinations',
    description:
      'From lunar flybys to the International Space Station, we curate once-in-a-lifetime itineraries across the solar neighbourhood.',
  },
  {
    id: 'feature-safety',
    icon: React.createElement(SafetyCertificateOutlined),
    title: 'Certified Safety',
    description:
      'Every mission is designed and tested to the highest aerospace standards, so you can focus on the wonder — not the risk.',
  },
  {
    id: 'feature-experience',
    icon: React.createElement(StarOutlined),
    title: 'Five-Star Experience',
    description:
      'Luxury amenities, gourmet zero-gravity dining, and personalised crew support ensure your journey is as comfortable as it is extraordinary.',
  },
];
