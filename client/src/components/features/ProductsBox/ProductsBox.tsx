import { useParams } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
import { Product } from '../ProductItem/ProductItem';
import { useGetByCategory } from '../../../store/productsSlice';
import SearchBar from '../../common/SearchBar/SearchBar';
import styles from './ProductsBox.module.scss';
import ProductsView from './components/ProductsView';
import { useGetProductsView } from '../../../store/settingsSlice';
import { PRODUCT_VIEW } from '../../../store/settingsSlice';
import FilterButtons from './components/FilterButtons';

function ProductsBox() {
  const { categoryId } = useParams();
  const { data: view } = useGetProductsView();
  const { data: products } = useGetByCategory({
    select: categoryId,
    callOnMount: true,
  });

  const listView = view === PRODUCT_VIEW.LIST;

  return (
    <div className={styles.container}>
      <div className="d-flex">
        <FilterButtons />
        <SearchBar />
        <ProductsView />
      </div>
      <div
        className={`${styles.productsWrapper} ${listView ? styles.list : ''}`}
      >
        {products.map((product: Product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsBox;
