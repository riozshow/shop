import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DiscountItem.module.scss';
import useCountdown from '../../../hooks/useCountdown';

type DiscountItem = {
  DiscountOnCategory?: Array<any>;
  DiscountOnProduct?: Array<any>;
  description: string;
  expires: string;
  percent: number;
};

function DiscountItem({
  DiscountOnCategory,
  DiscountOnProduct,
  expires,
  percent,
}: DiscountItem) {
  const [products, setProducts] = useState<Array<any>>([]);
  const [categories, setCategories] = useState<Array<any>>([]);
  const { timeRemain, isFinish } = useCountdown();

  const loadTargets = () => {
    const products = DiscountOnProduct?.map((d) => d.Product);
    if (products?.length) {
      setProducts(products);
    }

    const categories = DiscountOnCategory?.map((d) => d.Category);
    if (categories?.length) {
      setCategories(categories);
    }
  };

  useEffect(loadTargets, []);

  if (isFinish) return <></>;

  return (
    <div className={styles.container}>
      <h3>- {percent}%</h3>
      <div className={styles.infoWrapper}>
        <p>{timeRemain(expires)}</p>
        {products.map((product) => (
          <NavLink key={product.id} to={'/products/' + product.id}>
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
            </ul>
          </NavLink>
        ))}
        {categories.map((category) => (
          <NavLink key={category.id} to={'/categories/' + category.id}>
            <ul>
              <li>
                <h4>{category.name}</h4>
              </li>
            </ul>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default DiscountItem;
