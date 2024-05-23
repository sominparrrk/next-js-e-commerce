import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator component', () => {
  it('renders without crashing', () => {
    render(<LoadingIndicator />);
  });
});
