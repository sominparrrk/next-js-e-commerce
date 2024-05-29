import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import CategoryBar from './CategoryBar';
import useSWR from 'swr';
import styles from './CategoryBar.module.css';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/products',
    query: { category: 'category1' },
  }),
}));

jest.mock('swr');

describe('CategoryBar component', () => {
  const mockCategories = ['category1', 'category2', 'category3'];

  beforeAll(() => {
    (useSWR as jest.Mock).mockReturnValue({
      data: mockCategories,
      isLoading: false,
      error: null,
    });
  });

  it('renders correctly', async () => {
    render(
      <CategoryBar
        pathname='/products'
        query={{
          category: 'category1',
        }}
      />
    );
    await waitFor(() => {
      expect(useSWR).toHaveBeenCalledWith('/api/categories');
    });
  });

  it('renders category links', async () => {
    const { getByText } = render(
      <CategoryBar
        pathname='/products'
        query={{
          category: 'category1',
        }}
      />
    );
    await waitFor(() => {
      expect(getByText('All')).toBeInTheDocument();
      mockCategories.forEach((category) => {
        expect(getByText(category)).toBeInTheDocument();
      });
    });
  });

  it('highlights selected category', async () => {
    const { getByText } = render(
      <CategoryBar
        pathname='/products/category1'
        query={{
          category: 'category1',
        }}
      />
    );
    await waitFor(() => {
      expect(getByText('All').parentNode).not.toHaveClass(styles.selected);
      expect(getByText('category1').parentNode).toHaveClass(styles.selected);
    });
  });
});
