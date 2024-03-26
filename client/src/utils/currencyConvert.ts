export const currencyConvert = (price: string | number) => {
  if (typeof price === 'string') {
    price = parseInt(price);
  }

  return price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  });
};
