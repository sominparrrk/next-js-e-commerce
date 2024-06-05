import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input component', () => {
  it('renders correctly', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <Input
        type='text'
        value=''
        onChange={() => {}}
        id='test-input'
        label='Test Label'
        placeholder='Test Placeholder'
      />
    );
    expect(getByLabelText('Test Label')).toBeInTheDocument();
    expect(getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Input
        type='text'
        value=''
        onChange={handleChange}
        id='test-input'
        label='Test Label'
      />
    );
    const inputElement = getByRole('textbox');
    userEvent.type(inputElement, 'Test value');
    waitFor(() => expect(handleChange).toHaveBeenCalledWith('Test value'));
  });

  it('applies the correct input type', () => {
    const { getByRole } = render(
      <Input
        type='text'
        value=''
        onChange={() => {}}
        id='test-input'
        label='Test Label'
      />
    );
    const inputElement = getByRole('textbox');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('applies the correct label text', () => {
    const { getByLabelText } = render(
      <Input
        type='text'
        value=''
        onChange={() => {}}
        id='test-input'
        label='Test Label'
      />
    );
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('applies the correct placeholder text', () => {
    const { getByPlaceholderText } = render(
      <Input
        type='text'
        value=''
        onChange={() => {}}
        placeholder='Test Placeholder'
        id='test-input'
        label='Test Label'
      />
    );
    expect(getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });
});
