import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    userEvent.click(getByText('Click me'));
    waitFor(() => expect(handleClick).toHaveBeenCalledTimes(1));
  });

  it('renders as an <a> when url is provided', () => {
    const { getByText } = render(
      <Button url='https://mock.com'>Click me</Button>
    );

    const linkElement = getByText('Click me');
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', 'https://mock.com');
  });
});
