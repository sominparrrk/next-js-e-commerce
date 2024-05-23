'use client';
import { PLPSortOptionType } from '@/app/types/sort';
import Select from '@/components/Select/Select';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    console.log('selectedValue > ', selectedValue);
  }, [selectedValue]);

  const handleChange = (value: PLPSortOptionType) => {
    setSelectedValue(value);
  };

  return (
    <>
      <h1>{params.category} category PLP</h1>
      <Select
        id={0}
        options={sortOptions}
        value={selectedValue}
        onChange={handleChange}
        label={'Sort By'}
      />
    </>
  );
}
