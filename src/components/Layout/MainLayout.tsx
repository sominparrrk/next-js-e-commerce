'use client';
import { useState, useEffect } from 'react';
import SWRConfigContext from '@/context/SWRConfigContext';
import Footer from '@/components/Footer/Footer';
import Input from '@/components/Input/Input';
import styles from './MainLayout.module.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicNavbar = dynamic(() => import('../../components/Navbar/Navbar'), {
  ssr: false,
});

const localStorageKey = 'searchValue';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useRouter();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem(localStorageKey);
    if (storedValue) {
      setSearchValue(storedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, searchValue);
  }, [searchValue]);

  return (
    <div className={styles.container}>
      <header className={styles.layoutHeader}>
        <DynamicNavbar pathname={pathname} />
        <div className={styles.inputContainer}>
          <Input
            type='text'
            id='search'
            label='Search'
            placeholder='Search for products ...'
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
      </header>
      <main className={styles.mainContent}>
        <SWRConfigContext>{children}</SWRConfigContext>
      </main>
      <footer className={styles.layoutFooter}>
        <Footer />
      </footer>
    </div>
  );
}
