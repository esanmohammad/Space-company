import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { Navbar, Footer, NAV_LINKS, COMPANY_INFO } from '@space-tourism/ui';
import GithubOutlined from '@ant-design/icons/GithubOutlined';
import TwitterOutlined from '@ant-design/icons/TwitterOutlined';
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined';
import type { SocialLink } from '@space-tourism/ui';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/stellar-horizons', icon: <GithubOutlined /> },
  { label: 'Twitter', href: 'https://twitter.com/stellarhorizons', icon: <TwitterOutlined /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/stellar-horizons', icon: <LinkedinOutlined /> },
];

const loadingFallback = (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      background: '#0A0A0F',
    }}
  >
    <Spin size="large" />
  </div>
);

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar
        brandName="Stellar Horizons"
        links={NAV_LINKS}
        currentPath={location.pathname}
      />
      <main>
        <Suspense fallback={loadingFallback}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer
        companyName="Stellar Horizons"
        tagline={COMPANY_INFO.tagline}
        socialLinks={SOCIAL_LINKS}
      />
    </>
  );
}
