import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductsGrid';
import { mockProducts } from '@/mocks/mockProductAPIRes';
import formatPrice from '@/utils/formatPrice';

describe('ProductGrid', () => {
  it('renders correctly', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('Mock Product 1')).toBeInTheDocument();
    expect(screen.getByText('Mock Product 2')).toBeInTheDocument();
  });

  it('displays product details correctly', () => {
    render(<ProductGrid products={mockProducts} />);

    mockProducts.forEach((product) => {
      const { title, price, description, category, rating } = product;

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(`£${formatPrice(price)}`)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
      expect(screen.getByText(category)).toBeInTheDocument();
      expect(
        screen.getByText(`Rating: ${rating.rate} (${rating.count} reviews)`)
      ).toBeInTheDocument();
    });
  });

  it('renders product images correctly', () => {
    render(<ProductGrid products={mockProducts} />);

    const images = screen.getAllByRole('img');
    mockProducts.forEach((product, index) => {
      const imageElement = images[index] as HTMLImageElement;
      expect(imageElement).toBeInTheDocument();
      expect(imageElement.src).toContain(encodeURIComponent(product.image));
      expect(imageElement.alt).toBe(product.title);
    });
  });
});
