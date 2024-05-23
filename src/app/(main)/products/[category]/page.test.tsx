/* eslint-disable react/display-name */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import useSWR from 'swr';
import CategoryPLP from './page';

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/components/CategoryBar/CategoryBar', () => () => (
  <div>CategoryBar</div>
));
jest.mock(
  '@/components/ProductsGrid/ProductsGrid',
  () =>
    ({ products }: { products: any }) =>
      <div>ProductsGrid: {products.length} products</div>
);
jest.mock(
  '@/components/Select/Select',
  () =>
    ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) =>
      (
        <select
          data-testid='select'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      )
);
jest.mock('@/components/LoadingIndicator/LoadingIndicator', () => () => (
  <div>Loading...</div>
));
jest.mock(
  '@/components/ErrorMessage/ErrorMesssage',
  () =>
    ({ message }: { message: string }) =>
      <div>{message}</div>
);

describe('CategoryPLP', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator while loading', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CategoryPLP params={{ category: 'test-category' }} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message on error', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<CategoryPLP params={{ category: 'test-category' }} />);

    expect(
      screen.getByText('Error occurred while fetching data')
    ).toBeInTheDocument();
  });

  it('renders products grid on success', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ];
    (useSWR as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<CategoryPLP params={{ category: 'test-category' }} />);

    expect(screen.getByText('ProductsGrid: 2 products')).toBeInTheDocument();
  });

  it('changes sort order when new option is selected', async () => {
    const mockProductsAsc = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ];
    const mockProductsDesc = [
      { id: 3, title: 'Product 3' },
      { id: 4, title: 'Product 4' },
    ];

    (useSWR as jest.Mock)
      .mockReturnValueOnce({
        data: mockProductsAsc,
        isLoading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: mockProductsDesc,
        isLoading: false,
        error: null,
      });

    render(<CategoryPLP params={{ category: 'test-category' }} />);

    const select = screen.getByTestId('select') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'desc' } });

    await waitFor(() => {
      expect(screen.getByText('ProductsGrid: 2 products')).toBeInTheDocument();
    });
  });
});
