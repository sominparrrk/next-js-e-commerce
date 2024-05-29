import useSWR from 'swr';
import styles from './CategoryBar.module.css';
import Link from 'next/link';

type CategoryBarProps = {
  pathname: string;
  query: { category?: string };
};

const allPath = '/products';

export default function CategoryBar({ pathname, query }: CategoryBarProps) {
  const { data: categories, error } = useSWR('/api/categories');

  return (
    <div className={styles.wrapper}>
      <div className={styles.listContainer}>
        <ul className={styles.list}>
          <li className={pathname === allPath ? styles.selected : undefined}>
            <Link href='/products'>All</Link>
          </li>
          {!error &&
            categories?.map((category: string) => {
              const isOnPath = query.category === category;
              return (
                <li
                  key={category}
                  className={isOnPath ? styles.selected : undefined}
                >
                  <Link href={`${allPath}/${category}`}>{category}</Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
