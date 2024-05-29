'use client';
import { useState } from 'react';
import useSWR from 'swr';
import ProductGrid from '@/components/ProductsGrid/ProductsGrid';
import Select from '@/components/Select/Select';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import ErrorMessage from '@/components/ErrorMessage/ErrorMesssage';
import { PLPSortOptionType } from '@/types/sort';
import styles from './products.module.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicCategoryBar = dynamic(
  () => import('../../components/CategoryBar/CategoryBar'),
  {
    ssr: false,
  }
);

const sortOptions: { value: PLPSortOptionType; label: string }[] = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

export default function AllProductListingPage() {
  const [selectedValue, setSelectedValue] = useState<PLPSortOptionType>('asc');
  const { pathname, query } = useRouter();
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
      <h1 className={styles.title}>All Products</h1>
      <Select
        id={0}
        options={sortOptions}
        value={selectedValue}
        onChange={handleChange}
        label={'Sort By'}
      />
      <div className={styles.container}>
        <DynamicCategoryBar pathname={pathname} query={query} />
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
