/* eslint-disable react/display-name */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useSWR from 'swr';
import { PLPSortOptionType } from '@/types/sort';
import AllProductListingPage from '.';
import CategoryPLP from './[category]';

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/',
    query: {},
  }),
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
      value: PLPSortOptionType;
      onChange: (value: PLPSortOptionType) => void;
    }) =>
      (
        <select
          data-testid='select'
          value={value}
          onChange={(e) => onChange(e.target.value as PLPSortOptionType)}
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

describe('AllProductListingPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator while loading', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<AllProductListingPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message on error', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<AllProductListingPage />);

    expect(
      screen.getByText('Error occurred while fetching data')
    ).toBeInTheDocument();
  });

  it('renders products grid', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ];
    (useSWR as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<AllProductListingPage />);

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

    render(<AllProductListingPage />);

    const select = screen.getByTestId('select') as HTMLSelectElement;
    await act(async () => {
      userEvent.type(select, 'desc');
    });

    await waitFor(() => {
      expect(screen.getByText('ProductsGrid: 2 products')).toBeInTheDocument();
    });
  });
});

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

    render(<CategoryPLP />);

    waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());
  });

  it('renders error message on error', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<CategoryPLP />);

    expect(
      screen.getByText('Error occurred while fetching data')
    ).toBeInTheDocument();
  });

  it('renders products grid', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ];
    (useSWR as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<CategoryPLP />);

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

    render(<CategoryPLP />);

    const select = screen.getByTestId('select') as HTMLSelectElement;
    await act(async () => {
      userEvent.type(select, 'desc');
    });

    await waitFor(() => {
      expect(screen.getByText('ProductsGrid: 2 products')).toBeInTheDocument();
    });
  });
});
