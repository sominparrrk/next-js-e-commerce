import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  id: string;
}

export default function Input({ type, value, onChange, label, placeholder, id }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      {label && <label htmlFor={id.toString()}>{label}</label>}
      <input
        id={id.toString()}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
}
