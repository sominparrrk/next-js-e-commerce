import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';
import { PLPSortOptionType } from '@/types/sort';

const mockOptions = [
  { value: 'asc' as PLPSortOptionType, label: 'Ascending' },
  { value: 'desc' as PLPSortOptionType, label: 'Descending' },
];

describe('Select Component', () => {
  it('renders select component with options', () => {
    render(<Select options={mockOptions} value={'asc'} onChange={() => {}} id={1} label="Sort By" />);

    expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    mockOptions.forEach(option => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
    });
  });

  it('calls onChange with the correct value when an option is selected', () => {
    const handleChange = jest.fn();

    render(<Select options={mockOptions} value={'asc'} onChange={handleChange} id={1} label="Sort By" />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'desc' } });

    expect(handleChange).toHaveBeenCalledWith('desc');
  });

  it('displays the correct initial value', () => {
    render(<Select options={mockOptions} value={'asc'} onChange={() => {}} id={1} label="Sort By" />);

    expect(screen.getByRole('combobox')).toHaveValue('asc');
  });
});
