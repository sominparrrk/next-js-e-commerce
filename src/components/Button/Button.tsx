import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  url?: string;
}
export default function Button({
  children,
  variant = 'primary',
  url,
  ...props
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;
  return url ? (
    <a href={url} className={`${className} ${styles.link}`}>
      {children}
    </a>
  ) : (
    <button className={`${className} ${styles.link}`} {...props}>
      {children}
    </button>
  );
}
