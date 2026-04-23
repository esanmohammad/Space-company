import React from "react";
import styles from "./MissionStrip.module.css";

export interface MissionStripProps {
  title: string;
  body: string;
  backgroundImage?: string;
}

const MissionStrip = React.memo<MissionStripProps>(function MissionStrip({
  title,
  body,
  backgroundImage,
}) {
  return (
    <section
      className={styles.strip}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
      data-testid="mission-strip"
    >
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </div>
    </section>
  );
});
MissionStrip.displayName = "MissionStrip";
export { MissionStrip };
export default MissionStrip;
