'use client';
import { PLPSortOptionType } from '@/types/sort';
import CategoryBar from '@/components/CategoryBar/CategoryBar';
import Select from '@/components/Select/Select';
import { useEffect, useState } from 'react';
import ProductGrid from '@/components/ProductsGrid/ProductsGrid';
import styles from '../page.module.css';
import useSWR from 'swr';

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

  useEffect(() => {
    console.log('selectedValue > ', selectedValue);
  }, [selectedValue]);

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
        <ProductGrid products={products} />
      </div>
    </>
  );
}
