import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/products',
  }),
}));

describe('Navbar component', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: '/' });
  });

  it('renders navbar', () => {
    const { getByText } = render(<Navbar pathname='/products' />);

    const homeLink = getByText('Home');
    const productsLink = getByText('Products');
    const newsletterLink = getByText('Newsletter');
    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(newsletterLink).toBeInTheDocument();
  });

  it('opens and closes mobile menu', () => {
    const { getByLabelText, getByText } = render(
      <Navbar pathname='/products' />
    );

    const burgerMenuIcon = getByLabelText('menu-open-icon');
    expect(burgerMenuIcon).toBeInTheDocument();

    userEvent.click(burgerMenuIcon);

    waitFor(() => {
      const closeIcon = getByLabelText('menu-close-icon');
      const homeLink = getByText('Home');
      const productsLink = getByText('Products');
      const newsletterLink = getByText('Newsletter');

      expect(homeLink).toBeVisible();
      expect(productsLink).toBeVisible();
      expect(newsletterLink).toBeVisible();
      expect(closeIcon).toBeInTheDocument();

      userEvent.click(closeIcon);
    });

    waitFor(() => {
      expect(getByLabelText('menu-open-icon')).toBeInTheDocument();
    });
  });

  it('closes mobile menu when clicking outside', () => {
    const { getByLabelText, container } = render(
      <Navbar pathname='/products' />
    );

    const burgerMenuIcon = getByLabelText('menu-open-icon');
    userEvent.click(burgerMenuIcon);

    waitFor(() => {
      const closeIcon = getByLabelText('menu-close-icon');
      expect(closeIcon).toBeInTheDocument();
    });

    userEvent.click(container);

    waitFor(() => expect(getByLabelText('menu-open-icon')).toBeInTheDocument());
  });

  it('highlights selected menu', async () => {
    (useRouter as jest.Mock).mockReturnValueOnce('/products');
    const { getByText } = render(<Navbar pathname='/products' />);

    const productsLink = getByText('Products');
    await waitFor(() => {
      expect(productsLink.parentNode).toHaveClass(styles.selected);
    });
  });
});
