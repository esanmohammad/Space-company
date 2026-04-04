import React from 'react';
import type { SocialLink } from '../../types';
import styles from './Footer.module.css';

export interface FooterProps {
  companyName: string;
  tagline: string;
  socialLinks: SocialLink[];
  year?: number;
}

const Footer = React.memo<FooterProps>(function Footer({
  companyName,
  tagline,
  socialLinks,
  year,
}) {
  const displayYear = year ?? new Date().getFullYear();

  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.inner}>
        <p className={styles.tagline}>{tagline}</p>

        {socialLinks.length > 0 && (
          <ul className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span aria-hidden="true">{link.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.copyright}>
          &copy; {displayYear} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export { Footer };
export default Footer;
