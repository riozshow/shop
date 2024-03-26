import { useParams } from 'react-router';
import { useGetFullProductById } from '../../../store/productsSlice';
import PageLayout from '../../layout/PageLayout/PageLayout';
import AmountBox from '../../features/AmountBox/AmountBox';
import styles from './ProductPage.module.scss';
import { currencyConvert } from '../../../utils/currencyConvert';
import { NavLink } from 'react-router-dom';
import ImageGallery from '../../features/ImageGallery/ImageGallery';

function ProductPage() {
  const { productId } = useParams();

  const { data: product } = useGetFullProductById({
    select: productId,
    callOnMount: true,
  });

  if (!product) return <></>;

  return (
    <PageLayout>
      <div className={styles.left}>
        <ImageGallery Images={product.Images} />
      </div>
      <div className={styles.right}>
        <ul className="align-self-start">
          <NavLink to={'/categories/' + product.categoryId}>
            <li>{product?.Category.name}</li>
          </NavLink>
        </ul>
        <div className="d-flex w-100">
          <h2>{product.name}</h2>
        </div>
        <h3>{currencyConvert(product.price)}</h3>
        <div className="align-self-start">
          <AmountBox productId={product.id} />
        </div>
        <p>{product.description}</p>
      </div>
    </PageLayout>
  );
}

export default ProductPage;
