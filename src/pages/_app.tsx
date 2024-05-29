import { AppProps } from 'next/app';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/Layout/MainLayout';
import { useRouter } from 'next/router';

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as NextPageWithLayout;
  const getLayout = PageComponent.getLayout || ((page) => page);
  const router = useRouter();
  const isNewsletterRoute = router.pathname === '/newsletter';

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${dmSans.style.fontFamily};
        }
      `}</style>
      {isNewsletterRoute ? (
        getLayout(<PageComponent {...pageProps} />)
      ) : (
        <MainLayout>{getLayout(<PageComponent {...pageProps} />)}</MainLayout>
      )}
    </>
  );
}
