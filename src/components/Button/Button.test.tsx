import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('applies default variant class when no variant prop is provided', () => {
    const { container } = render(<Button>Default Button</Button>);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveClass('primary');
  });

  it('applies the specified variant class when variant prop is provided', () => {
    const { container } = render(
      <Button variant='secondary'>Secondary Button</Button>
    );
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveClass('secondary');
  });

  it('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
