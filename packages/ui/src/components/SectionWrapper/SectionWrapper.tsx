import React from 'react';
import styles from './SectionWrapper.module.css';

type ValidElement = 'section' | 'div' | 'article' | 'aside';

interface SectionWrapperProps {
  as?: ValidElement;
  className?: string;
  'aria-labelledby'?: string;
  children?: React.ReactNode;
  id?: string;
}

const SectionWrapper = React.memo<SectionWrapperProps>(function SectionWrapper({
  as: Tag = 'section',
  className,
  'aria-labelledby': ariaLabelledBy,
  children,
  id,
}) {
  return (
    <Tag
      className={`${styles.wrapper}${className ? ` ${className}` : ''}`}
      aria-labelledby={ariaLabelledBy}
      id={id}
      data-testid="section-wrapper"
    >
      <div className={styles.inner}>{children}</div>
    </Tag>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

export { SectionWrapper };
export default SectionWrapper;
