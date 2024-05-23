import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMesssage';


describe('ErrorMessage component', () => {
  it('renders the error message correctly', () => {
    const errorMessage = 'Error message';
    const { getByText } = render(<ErrorMessage message={errorMessage} />);
    const errorMessageElement = getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});