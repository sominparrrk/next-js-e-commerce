import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}
export default function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
