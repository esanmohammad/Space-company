import React from 'react';
import { Row, Col } from 'antd';
import type { FeatureCardData } from '../../types';
import { FeatureCard } from '../FeatureCard';
import styles from './FeaturesGrid.module.css';

export interface FeaturesGridProps {
  features: FeatureCardData[];
  sectionTitle?: string;
}

const FeaturesGrid = React.memo<FeaturesGridProps>(function FeaturesGrid({
  features,
  sectionTitle,
}) {
  if (process.env.NODE_ENV !== 'production') {
    if (features.length < 3) {
      console.warn(
        `[FeaturesGrid] Expected at least 3 features, but received ${features.length}.`
      );
    }
    if (features.length > 6) {
      console.warn(
        `[FeaturesGrid] Expected at most 6 features, but received ${features.length}. Only the first 6 will be rendered.`
      );
    }
  }

  const displayedFeatures = features.slice(0, 6);

  return (
    <div className={styles.grid} data-testid="features-grid">
      {sectionTitle && <h2 className={styles.title}>{sectionTitle}</h2>}
      <Row gutter={[24, 24]}>
        {displayedFeatures.map((feature) => (
          <Col key={feature.id} xs={24} sm={24} md={12} lg={8}>
            <FeatureCard
              id={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
});

FeaturesGrid.displayName = 'FeaturesGrid';

export { FeaturesGrid };
export default FeaturesGrid;
