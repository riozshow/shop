import { useState } from 'react';
import { API } from '../../../../api/api';
import { OrderProduct } from '../../../../api/dtos';

function useValidateCoupon() {
  const [result, setResult] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>('');

  const checkCoupon = async (products: OrderProduct[], phrase: string) => {
    if (phrase.length === 0) return;
    setIsLoading(true);
    API.coupons
      .check(products, phrase)
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
