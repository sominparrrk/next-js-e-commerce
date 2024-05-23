'use client';
import { useState, useEffect } from 'react';
import { DM_Sans } from 'next/font/google';
import SWRConfigContext from '@/context/SWRConfigContext';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Input from '@/components/Input/Input';
import '../globals.css';
import styles from './layout.module.css';

const openSans = DM_Sans({
  subsets: ['latin'],
  weight: '400',
});

const localStorageKey = 'searchValue';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang='en' className={openSans.className}>
      <body>
        <div className={styles.container}>
          <header className={styles.layoutHeader}>
            <Navbar />
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
      </body>
    </html>
  );
}
