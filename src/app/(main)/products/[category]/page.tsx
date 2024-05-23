'use client';
import { useState } from 'react';
import useSWR from 'swr';
import CategoryBar from '@/components/CategoryBar/CategoryBar';
import ProductGrid from '@/components/ProductsGrid/ProductsGrid';
import Select from '@/components/Select/Select';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import ErrorMessage from '@/components/ErrorMessage/ErrorMesssage';
import { PLPSortOptionType } from '@/types/sort';
import styles from '../page.module.css';

const sortOptions: { value: PLPSortOptionType; label: string }[] = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

export default function CategoryPLP({
  params,
}: {
  params: { category: string };
}) {
  const [selectedValue, setSelectedValue] = useState<PLPSortOptionType>('asc');
  const {
    data: products,
    isLoading,
    error,
  } = useSWR(`/api/products/${params.category}?sort=${selectedValue}`);

  const handleChange = (value: PLPSortOptionType) => {
    setSelectedValue(value);
  };

  return (
    <>
      <h1 className={styles.title}>{params.category.replace('%20', ' ')}</h1>
      <Select
        id={0}
        options={sortOptions}
        value={selectedValue}
        onChange={handleChange}
        label={'Sort By'}
      />
      <div className={styles.container}>
        <CategoryBar />
        {isLoading ? (
          <div className={styles.stateContainer}>
            <LoadingIndicator />
          </div>
        ) : error ? (
          <div className={styles.stateContainer}>
            <ErrorMessage message='Error occurred while fetching data' />
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </>
  );
}
