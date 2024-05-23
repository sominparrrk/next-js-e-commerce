import { DM_Sans } from 'next/font/google';
import '../globals.css';

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
        <footer>this footer is only for newsletter</footer>
      </body>
    </html>
  );
}
