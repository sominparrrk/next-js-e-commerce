'use client';
import { DM_Sans } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Input from '@/components/Input/Input';
import { useState } from 'react';
import SWRConfigContext from '@/context/SWRConfigContext';

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
        <header>
          <Navbar />
          <div>
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
        <main>
          <SWRConfigContext>{children}</SWRConfigContext>
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
