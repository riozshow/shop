import { useEffect, useState } from 'react';
import styles from './CouponItem.module.scss';
import useCountdown from '../../../hooks/useCountdown';

type CouponItem = {
  CouponOnCategory?: Array<any>;
  CouponOnProduct?: Array<any>;
  description: string;
  expires: string;
  percent: number;
  name: string;
};

function CouponItem({
  CouponOnCategory,
  CouponOnProduct,
  expires,
  percent,
  name,
}: CouponItem) {
  const [products, setProducts] = useState<Array<any>>([]);
  const [categories, setCategories] = useState<Array<any>>([]);
  const { timeRemain, isFinish } = useCountdown();

  const loadTargets = () => {
    const products = CouponOnProduct?.map((d) => d.Product);
    if (products?.length) {
      setProducts(products);
    }

    const categories = CouponOnCategory?.map((d) => d.Category);
    if (categories?.length) {
      setCategories(categories);
    }
  };

  const productsString =
    products.length === 0
      ? ''
      : `on product ${products.length > 1 ? 's' : ''} ${products.map((product) => product.name).join(', ')}`;

  const categoryString =
    categories.length === 0
      ? ''
      : `${categories.length > 0 ? 'and' : ''} on categor${categories.length > 1 ? 'ies' : 'y'}: ${categories.map((category) => category.name).join(' ')}`;

  useEffect(loadTargets, []);

  if (isFinish) return <></>;
  return (
    <div className={styles.container}>
      <div className="d-flex gap-3">
        <h4 className="customBadge">-{percent}%</h4>
      </div>
      <p>{timeRemain(expires)}</p>
      <div className={styles.couponName}>
        <h2>{name}</h2>
      </div>
      <p className="w-100">
        -{percent}% off {productsString} {categoryString}
      </p>
    </div>
  );
}

export default CouponItem;
