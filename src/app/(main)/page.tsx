import Link from 'next/link';
import styles from './page.module.css';
import Button from '@/components/Button/Button';

const content = {
  title: 'Home',
  description: 'Welcome to Home !',
  text1: 'This is a simple e-commerce application using Next.js',
  text2: 'Want to explore?',
  link: '/products',
};

export default function HomePage() {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{content.title}</h1>
      <p className={styles.description}>{content.description}</p>
      <p>{content.text1}</p>
      <p>{content.text2}</p>
      <Button>
        <Link href={content.link} className={styles.link}>
          Go to Product Listing Page
        </Link>
      </Button>
    </div>
  );
}
