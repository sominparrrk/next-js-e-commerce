import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import CategoryBar from './CategoryBar';
import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import styles from './CategoryBar.module.css';

jest.mock('swr');
jest.mock('next/navigation');

describe('CategoryBar component', () => {
  const mockCategories = ['category1', 'category2', 'category3'];

  beforeAll(() => {
    (useSWR as jest.Mock).mockReturnValue({
      data: mockCategories,
      isLoading: false,
      error: null
    });
    (usePathname as jest.Mock).mockReturnValue('/products');
  });

  it('renders without crashing', async () => {
    render(<CategoryBar />);
    await waitFor(() => {
      expect(useSWR).toHaveBeenCalledWith('/api/categories');
    });
  });

  it('renders category links', async () => {
    const { getByText } = render(<CategoryBar />);
    await waitFor(() => {
      expect(getByText('All')).toBeInTheDocument();
      mockCategories.forEach(category => {
        expect(getByText(category)).toBeInTheDocument();
      });
    });
  });

  it('highlights selected category', async () => {
    (usePathname as jest.Mock).mockReturnValueOnce('/products/category1');
    const { getByText } = render(<CategoryBar />);
    await waitFor(() => {
      expect(getByText('All').parentNode).not.toHaveClass(styles.selected);
      expect(getByText('category1').parentNode).toHaveClass(styles.selected);
    });
  });
});
