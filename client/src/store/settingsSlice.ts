import { loadLocalStorage } from '../utils/localStorage';
import { createStoreHandler } from './StoreHandler/createStoreHandler';

export enum PRODUCT_VIEW {
  BLOCK,
  LIST,
}

const settings = {
  name: 'settings',
  initialState: loadLocalStorage('settings') || {
    productsView: PRODUCT_VIEW.BLOCK,
  },
  actions: {
    getProductsView: {
      selector: (state: any) => state.settings.productsView,
    },
    setProductsView: {
      reducer: (state: any, action: { payload: PRODUCT_VIEW }) => {
        state.productsView = action.payload;
      },
    },
  },
};

export const { settingsReducer, useGetProductsView, useSetProductsView } =
  createStoreHandler(settings);
