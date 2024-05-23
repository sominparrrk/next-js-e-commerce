'use client';
import { useState } from 'react';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputValue, setInputValue] = useState('');

  return (
    <html lang='en' className={openSans.className}>
      <body>
        <header className={styles.layoutHeader}>
          <Navbar />
          <div className={styles.inputContainer}>
            <Input
              type='text'
              id='search'
              label='Search'
              placeholder='Search for products ...'
              value={inputValue}
              onChange={setInputValue}
            />
          </div>
        </header>
        <main className={styles.mainContent}>
          <SWRConfigContext>{children}</SWRConfigContext>
        </main>
        <footer className={styles.layoutFooter}>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
