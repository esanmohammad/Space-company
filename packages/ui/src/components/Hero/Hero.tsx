import React from 'react';
import { Button } from 'antd';
import styles from './Hero.module.css';

export interface HeroProps {
  headline: string;
  subHeadline: string;
  ctaLabel: string;
  onCtaClick: () => void;
  backgroundImage?: string;
}

const Hero = React.memo<HeroProps>(function Hero({
  headline,
  subHeadline,
  ctaLabel,
  onCtaClick,
  backgroundImage,
}) {
  return (
    <div
      className={styles.hero}
      data-testid="hero"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <div className={styles.content}>
        <h1>{headline}</h1>
        <p>{subHeadline}</p>
        <Button type="primary" onClick={onCtaClick} size="large">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export { Hero };
export default Hero;
