import { DM_Sans } from 'next/font/google';
import '../globals.css';
import SubFooter from '@/components/SubFooter/SubFooter';

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
        <section>{children}</section>
        <footer>
          <SubFooter />
        </footer>
      </body>
    </html>
  );
}
