import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Footer />);
    const footerElement = getByText('© Somin Park 2024 • This is general footer for Home & Products page');
    expect(footerElement).toBeInTheDocument();
  });
});
