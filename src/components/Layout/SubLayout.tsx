import SubFooter from '@/components/SubFooter/SubFooter';
import styles from './SubLayout.module.css';

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className={styles.container}>
        <div>{children}</div>
      </main>
      <footer>
        <SubFooter />
      </footer>
    </>
  );
}
