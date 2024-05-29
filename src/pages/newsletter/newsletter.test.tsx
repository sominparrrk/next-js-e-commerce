import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NewsletterPage from '.';

describe('Newsletter Page', () => {
  it('renders newsletter page content', () => {
    const { getByText } = render(<NewsletterPage />);

    expect(getByText('Newsletter')).toBeInTheDocument();
    expect(getByText('This is Newsletter')).toBeInTheDocument();
    expect(
      getByText('Sub-feature of this simple e-commerce app')
    ).toBeInTheDocument();
  });
});
