import React from "react";
import { Card } from "antd";
import styles from "./FeatureCard.module.css";

export interface FeatureCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = React.memo<FeatureCardProps>(function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <article data-testid="feature-card">
      <Card className={styles.card} bordered={false}>
        <span aria-hidden="true" className={styles.iconWrapper}>
          {icon}
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
      </Card>
    </article>
  );
});

FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
export default FeatureCard;
