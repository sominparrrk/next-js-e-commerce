/* eslint-disable react/display-name */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HomePage from './page';

jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('Newsletter Page', () => {
  it('renders newsletter page content', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('Newsletter')).toBeInTheDocument();
    expect(getByText('This is Newsletter')).toBeInTheDocument();
    expect(getByText('Sub-feature of this simple e-commerce app')).toBeInTheDocument();
  });
});
