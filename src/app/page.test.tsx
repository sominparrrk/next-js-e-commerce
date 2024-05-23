import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from './page';

describe('Home component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Home />);
    const text = getByText('Get started');
    expect(text).toBeInTheDocument();
  });
});
