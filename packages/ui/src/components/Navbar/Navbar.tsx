import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons/lib/icons/MenuOutlined';
import type { NavLink } from '../../types';
import styles from './Navbar.module.css';

export interface NavbarProps {
  brandName: string;
  links: NavLink[];
  currentPath: string;
}

const Navbar = React.memo<NavbarProps>(function Navbar({ brandName, links, currentPath }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen, closeDrawer]);

  return (
    <header className={styles.nav} data-testid="navbar">
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>{brandName}</Link>
        <nav aria-label="Main navigation">
          <ul className={styles.desktopLinks}>
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={link.to === currentPath ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className={styles.hamburger}
          aria-label="Open navigation"
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav-drawer"
          onClick={openDrawer}
          type="button"
        >
          <MenuOutlined aria-hidden="true" />
        </button>
        <Drawer
          open={drawerOpen}
          onClose={closeDrawer}
          placement="right"
          title="Site navigation"
          aria-label="Site navigation"
          id="mobile-nav-drawer"
          data-testid="nav-drawer"
        >
          <nav aria-label="Mobile navigation">
            <ul className={styles.drawerLinks}>
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={styles.drawerLink}
                    aria-current={link.to === currentPath ? 'page' : undefined}
                    onClick={closeDrawer}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Drawer>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export { Navbar };
export default Navbar;
