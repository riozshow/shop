import AmountBox from '../AmountBox/AmountBox';
import styles from './ProductItem.module.scss';
import { currencyConvert } from '../../../utils/currencyConvert';
import { useGetProductsView } from '../../../store/settingsSlice';
import { PRODUCT_VIEW } from '../../../store/settingsSlice';
import { NavLink } from 'react-router-dom';
import { Image } from '../../pages/CMSPage/components/ImageManager/ImageManager';
import { imageSrc } from '../../../utils/imgSrc';

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  Tags: string;
  Images: Array<Image>;
  topSeller?: boolean;
};

function ProductItem({ id, name, price, Images, topSeller }: Product) {
  const { data: view } = useGetProductsView();

  const listView = view === PRODUCT_VIEW.LIST && !topSeller;

  const defaultImage = Images.find((i: Image) => i.isDefault);

  return (
    <div className={`${styles.container} ${listView ? styles.list : ''}`}>
      <NavLink to={'/products/' + id}>
        <div className={styles.imgWrapper}>
          {!defaultImage && <i className="bi bi-image"></i>}
          {defaultImage && <img src={imageSrc(defaultImage.id)} />}
        </div>
      </NavLink>

      <div className={styles.infoWrapper}>
        <NavLink to={'/products/' + id}>
          <h5>{name}</h5>
        </NavLink>
        <p>{currencyConvert(price)}</p>
        <AmountBox productId={id} />
      </div>
    </div>
  );
}

export default ProductItem;
