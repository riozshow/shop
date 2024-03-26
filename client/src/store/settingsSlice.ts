import { loadLocalStorage } from '../utils/localStorage';
import {
  SliceSchema,
  createStoreHandler,
} from './StoreHandler/createStoreHandler';

export enum PRODUCT_VIEW {
  BLOCK,
  LIST,
}

const settings: SliceSchema = {
  name: 'settings',
  initialState: loadLocalStorage('settings') || {
    productsView: PRODUCT_VIEW.BLOCK,
  },
  queries: {
    getProductsView: {
      selector: (state: any) => state.settings.productsView,
    },
  },
  mutations: {
    setProductsView: {
      reducer: (state: any, action: { payload: PRODUCT_VIEW }) => {
        state.productsView = action.payload;
      },
    },
  },
};

export const { settingsReducer, useGetProductsView, useSetProductsView } =
  createStoreHandler(settings);
