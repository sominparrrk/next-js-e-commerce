import styles from './page.module.css';

const content = {
  title: 'Newsletter',
  description: 'This is Newsletter',
  text1: 'Sub-feature of this simple e-commerce app',
};

export default function NewsletterPage() {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{content.title}</h1>
      <p className={styles.description}>{content.description}</p>
      <p>{content.text1}</p>
    </div>
  );
}
