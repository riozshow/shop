import { useState } from 'react';
import { API } from '../../../../api/api';

function useValidateCoupon() {
  const [result, setResult] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>('');

  const checkCoupon = async (products: Array<any>, phrase: string) => {
    if (phrase.length === 0) return;
    const order = products.map((p) => ({ id: p.productId, amount: p.amount }));
    setIsLoading(true);
    API.coupons
      .check(order, phrase)
      .then(({ data }: { data: any }) => setResult(data))
      .catch((err: any) => err);
    setIsLoading(false);
    setName(phrase);
  };

  const getCouponDiscount = (productId: string) => {
    const product: { discount: number } = result.find(
      (p) => p.id === productId,
    );
    return product?.discount;
  };

  return {
    checkCoupon,
    getCouponDiscount,
    isValid: result.some((p) => p.discount > 0),
    isLoading,
    couponDiscounts: result,
    couponName: name,
  };
}

export default useValidateCoupon;
