import formatPrice from './formatPrice';

describe('formatPrice', () => {
  it('formats integer prices correctly', () => {
    expect(formatPrice(22)).toBe('22.00');
    expect(formatPrice(0)).toBe('0.00');
  });

  it('formats prices with one decimal place correctly', () => {
    expect(formatPrice(22.3)).toBe('22.30');
    expect(formatPrice(5.5)).toBe('5.50');
  });

  it('formats prices with two decimal places correctly', () => {
    expect(formatPrice(22.33)).toBe('22.33');
    expect(formatPrice(5.55)).toBe('5.55');
  });
});
