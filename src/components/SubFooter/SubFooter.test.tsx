import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SubFooter from './SubFooter';

describe('SubFooter component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<SubFooter />);
    const footerElement = getByText('© Somin Park 2024 • This is newsletter footer');
    expect(footerElement).toBeInTheDocument();
  });
});
