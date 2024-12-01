export const formatPrice = (price: number | string) => {
  const formattedPrice = price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

  return formattedPrice.replace(/(\,)(\d{2})$/, ',00');
};