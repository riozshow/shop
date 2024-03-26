import styles from './TopSellers.module.scss';
import { useGetTopSellers } from '../../../store/productsSlice';
import ProductItem, { Product } from '../ProductItem/ProductItem';

function TopSellers() {
  const { data: topSellers } = useGetTopSellers({
    callOnMount: true,
  });

  return (
    <div className={styles.container}>
      <h5>Top Sellers</h5>
      <div className={styles.topSellersWrapper}>
        {topSellers.map((topSeller: Product) => (
          <ProductItem topSeller={true} key={topSeller.id} {...topSeller} />
        ))}
      </div>
    </div>
  );
}

export default TopSellers;
