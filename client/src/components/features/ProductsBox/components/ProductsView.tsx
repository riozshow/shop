import { useEffect } from 'react';
import {
  useGetProductsView,
  useSetProductsView,
} from '../../../../store/settingsSlice';
import { PRODUCT_VIEW } from '../../../../store/settingsSlice';
import { saveLocalStorage } from '../../../../utils/localStorage';

function ProductsView() {
  const { data: view } = useGetProductsView();
  const { setProductsView } = useSetProductsView();

  useEffect(() => {
    saveLocalStorage('settings', { productsView: view });
  }, [view]);

  return (
    <ul className={`d-flex flex-shrink-0 ms-2 `}>
      <li
        className={`${view === PRODUCT_VIEW.LIST ? 'selected' : ''}`}
        onClick={() => setProductsView(PRODUCT_VIEW.LIST)}
      >
        <i className="bi bi-distribute-vertical"></i>
      </li>
      <li
        className={`${view === PRODUCT_VIEW.BLOCK ? 'selected' : ''}`}
        onClick={() => setProductsView(PRODUCT_VIEW.BLOCK)}
      >
        <i className="bi bi-grid-3x3-gap-fill"></i>
      </li>
    </ul>
  );
}

export default ProductsView;
