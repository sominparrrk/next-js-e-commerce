'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { useState } from 'react';
import { CloseIcon } from '../icons/Close';
import { BurgerMenuIcon } from '../icons/BurgerMenu';

const menu = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Products',
    href: '/products',
  },
  {
    name: 'Newsletter',
    href: '/newsletter',
  },
];

export default function Navbar() {
  const pathName = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <nav className={styles.box}>
      {isBurgerOpen ? (
        <CloseIcon
          className={styles.closeIcon}
          onClick={handleBurger}
          aria-label='menu-close-icon'
        />
      ) : (
        <BurgerMenuIcon
          className={styles.burgerIcon}
          onClick={handleBurger}
          aria-label='menu-open-icon'
        />
      )}
      <ul
        className={`${styles.menus} ${
          isBurgerOpen ? styles.mobileOpen : styles.mobileClose
        }`}
      >
        {menu.map((item) => {
          const isOnPath = pathName === item.href;
          return (
            <li
              key={item.href}
              className={isOnPath ? styles.selected : undefined}
            >
              <Link href={item.href} onClick={() => setIsBurgerOpen(false)}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
