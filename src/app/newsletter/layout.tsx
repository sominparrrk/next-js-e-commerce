import { DM_Sans } from 'next/font/google';
import SubFooter from '@/components/SubFooter/SubFooter';
import '../globals.css';
import styles from './layout.module.css';

const openSans = DM_Sans({
  subsets: ['latin'],
  weight: '400',
});

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body>
        <section className={styles.mainContent}>{children}</section>
        <footer>
          <SubFooter />
        </footer>
      </body>
    </html>
  );
}
