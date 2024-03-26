import { useGetProductsByIds } from '../store/productsSlice';
import { useEffect, useState } from 'react';
import { getDiscount } from '../utils/getDiscount';
import { useGetDiscounts } from '../store/discountsSlice';

function useCartSumarize(
  cart: Array<{ productId: string; amount: number }>,
  couponDiscounts?: Array<{ id: string; discount: number }>,
) {
  const { data: discounts } = useGetDiscounts();

  const [sumarize, setSumarize] = useState<{
    totalPrice: number;
    totalDiscount: number;
  }>({ totalPrice: 0, totalDiscount: 0 });

  const { data: products } = useGetProductsByIds({
    select: cart.map((p: any) => p.productId),
  });

  useEffect(() => {
    let totalPrice = 0;
    let totalDiscount = 0;

    for (const cartProduct of cart) {
      const product = products.find((p: any) => p.id === cartProduct.productId);
      if (product) {
        const productCost = product.price * cartProduct.amount;
        totalPrice += productCost;
        totalDiscount += productCost * (getDiscount(product) / 100);
        if (couponDiscounts) {
          const couponDiscount = couponDiscounts.find(
            (c) => c.id === product.id,
          );
          if (couponDiscount) {
            totalDiscount += (couponDiscount.discount / 100) * product.price;
          }
        }
      }
    }
    setSumarize({ totalPrice, totalDiscount });
  }, [cart, products, couponDiscounts, discounts]);

  return sumarize;
}

export default useCartSumarize;
