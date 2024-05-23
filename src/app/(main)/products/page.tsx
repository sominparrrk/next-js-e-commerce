'use client';
import { PLPSortOptionType } from '@/types/sort';
import CategoryBar from '@/components/CategoryBar/CategoryBar';
import Select from '@/components/Select/Select';
import { useState } from 'react';
import styles from './page.module.css';
import useSWR from 'swr';
import ProductGrid from '@/components/ProductsGrid/ProductsGrid';

const sortOptions: { value: PLPSortOptionType; label: string }[] = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

export default function AllProductListingPage() {
  const [selectedValue, setSelectedValue] = useState<PLPSortOptionType>('asc');
  const {
    data: products,
    isLoading,
    error,
  } = useSWR(`/api/products?sort=${selectedValue}`);

  const handleChange = (value: PLPSortOptionType) => {
    setSelectedValue(value);
  };

  return (
    <>
      <h1>all PLP</h1>
      <Select
        id={0}
        options={sortOptions}
        value={selectedValue}
        onChange={handleChange}
        label={'Sort By'}
      />
      <div className={styles.container}>
        <CategoryBar />
        <ProductGrid products={products} />
      </div>
    </>
  );
}
