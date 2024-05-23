'use client';
import { DM_Sans } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar/Navbar';

const openSans = DM_Sans({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
