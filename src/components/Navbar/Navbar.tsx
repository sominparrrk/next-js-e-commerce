import Link from 'next/link';
import styles from './Navbar.module.css';
import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { CloseIcon } from '../icons/Close';
import { BurgerMenuIcon } from '../icons/BurgerMenu';

type NavbarProps = {
  pathname: string;
};

interface MenuItem {
  name: string;
  href: string;
}

const menu: MenuItem[] = [
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

export default function Navbar({ pathname }: NavbarProps) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const menuRef: MutableRefObject<HTMLUListElement | null> = useRef(null);
  const burgerIconRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerIconRef.current &&
        !burgerIconRef.current.contains(event.target as Node)
      ) {
        setIsBurgerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.box}>
      {isBurgerOpen ? (
        <div ref={burgerIconRef}>
          <CloseIcon
            className={styles.closeIcon}
            onClick={handleBurger}
            aria-label='menu-close-icon'
          />
        </div>
      ) : (
        <div ref={burgerIconRef}>
          <BurgerMenuIcon
            className={styles.burgerIcon}
            onClick={handleBurger}
            aria-label='menu-open-icon'
          />
        </div>
      )}
      <ul
        ref={menuRef}
        className={`${styles.menus} ${
          isBurgerOpen ? styles.mobileOpen : styles.mobileClose
        }`}
      >
        {menu.map((item) => {
          const isOnPath = pathname === item.href;
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
