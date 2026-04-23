import React from "react";
import type { CompanyInfo } from "../../types";
import styles from "./CompanyInfoBlock.module.css";

export interface CompanyInfoBlockProps {
  companyInfo: CompanyInfo;
}

const CompanyInfoBlock = React.memo<CompanyInfoBlockProps>(
  function CompanyInfoBlock({ companyInfo }) {
    const { address, email, phone, tagline } = companyInfo;
    return (
      <div className={styles.block} data-testid="company-info-block">
        <address className={styles.address}>
          <p className={styles.tagline}>{tagline}</p>
          <p>{address}</p>
          <p>
            <a href={`mailto:${email}`} className={styles.link}>
              {email}
            </a>
          </p>
          <p>
            <a href={`tel:${phone}`} className={styles.link}>
              {phone}
            </a>
          </p>
        </address>
      </div>
    );
  },
);
CompanyInfoBlock.displayName = "CompanyInfoBlock";
export { CompanyInfoBlock };
export default CompanyInfoBlock;
