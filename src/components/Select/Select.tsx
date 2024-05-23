import React from 'react';
import styles from './Select.module.css';
import { PLPSortOptionType } from '@/types/sort';

interface Option {
  value: PLPSortOptionType;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: PLPSortOptionType;
  onChange: (value: PLPSortOptionType) => void;
  label: string;
  id: number;
}

const Select: React.FC<SelectProps> = function ({ options, value, onChange, label, id }) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as PLPSortOptionType);
  };

  return (
    <div className={styles.selectContainer}>
      <label htmlFor={id.toString()}>{label}</label>
      <select
        id={id.toString()}
        value={value}
        onChange={handleChange}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
