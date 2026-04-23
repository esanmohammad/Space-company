import React from "react";
import { Button } from "antd";
import styles from "./CtaBanner.module.css";

export interface CtaBannerProps {
  headline: string;
  ctaLabel: string;
  onCtaClick: () => void;
}

const CtaBanner = React.memo<CtaBannerProps>(function CtaBanner({
  headline,
  ctaLabel,
  onCtaClick,
}) {
  return (
    <section className={styles.banner} data-testid="cta-banner">
      <div className={styles.inner}>
        <h2 className={styles.headline}>{headline}</h2>
        <Button type="primary" size="large" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
});
CtaBanner.displayName = "CtaBanner";
export { CtaBanner };
export default CtaBanner;
