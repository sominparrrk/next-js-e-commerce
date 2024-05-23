'use client';
import useSWR from 'swr';
import styles from './CategoryBar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const allPath = '/products';

export default function CategoryBar() {
  const { data: categories, isLoading, error } = useSWR('/api/categories');
  const pathName = usePathname();

  return (
    <div className={styles.wrapper}>
      <div className={styles.listContainer}>
        <ul className={styles.list}>
          <li className={pathName === allPath ? styles.selected : undefined}><Link href="/products">All</Link></li>
          {!isLoading && !error && categories.map((category: string) => {
            const isOnPath = pathName.replace(`${allPath}/`,'').replace('%20',' ') === category;
            return (<li key={category} className={isOnPath ? styles.selected : undefined}><Link href={`${allPath}/${category}`}>{category}</Link></li>)
          })}
        </ul>
      </div>
    </div>
  )
};
