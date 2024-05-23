import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Navbar from './Navbar';
import styles from './Navbar.module.css';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation');

describe('Navbar component', () => {
  beforeAll(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders navbar', () => {
    const { getByText } = render(<Navbar />);

    const homeLink = getByText('Home');
    const productsLink = getByText('Products');
    const newsletterLink = getByText('Newsletter');
    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(newsletterLink).toBeInTheDocument();
  });

  it('opens and closes mobile menu', () => {
    const { getByLabelText, getByText } = render(<Navbar />);

    const burgerMenuIcon = getByLabelText('menu-open-icon');
    expect(burgerMenuIcon).toBeInTheDocument();

    fireEvent.click(burgerMenuIcon);

    const closeIcon = getByLabelText('menu-close-icon');
    expect(closeIcon).toBeInTheDocument();

    const homeLink = getByText('Home');
    const productsLink = getByText('Products');
    const newsletterLink = getByText('Newsletter');
    expect(homeLink).toBeVisible();
    expect(productsLink).toBeVisible();
    expect(newsletterLink).toBeVisible();

    fireEvent.click(closeIcon);

    expect(getByLabelText('menu-open-icon')).toBeInTheDocument();
  });

  it('highlights selected menu', async () => {
    (usePathname as jest.Mock).mockReturnValueOnce('/products');
    const { getByText } = render(<Navbar />);

    const productsLink = getByText('Products');
    await waitFor(() => {
      expect(productsLink.parentNode).toHaveClass(styles.selected);
    });
  });
});