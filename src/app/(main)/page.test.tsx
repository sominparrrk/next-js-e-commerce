/* eslint-disable react/display-name */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HomePage from './page';

jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('HomePage', () => {
  it('renders home page content', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Welcome to Home !')).toBeInTheDocument();
    expect(getByText('This is a simple e-commerce application using Next.js')).toBeInTheDocument();
    expect(getByText('Want to explore?')).toBeInTheDocument();
    expect(getByText('Go to Product Listing Page')).toBeInTheDocument();
  });
});
