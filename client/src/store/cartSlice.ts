import CartProduct from '../components/features/CartProduct/CartProduct';
import { loadLocalStorage, saveLocalStorage } from '../utils/localStorage';
import {
  SliceSchema,
  createStoreHandler,
} from './StoreHandler/createStoreHandler';
import { RootState } from './store';

const localCart = loadLocalStorage('cart');

const cart: SliceSchema = {
  name: 'cart',
  initialState: localCart || [],
  queries: {
    getCart: {
      selector: (state: RootState) => state.cart,
    },
    getProductAmount: {
      selector: (state: any, productId: string) => {
        const existingProduct = state.cart.find(
          (p: CartProduct) => p.productId === productId,
        );
        if (existingProduct) {
          return existingProduct.amount;
        } else {
          return 0;
        }
      },
    },
  },
  mutations: {
    addProduct: {
      reducer: (state: any, action: { payload: string }) => {
        const productId = action.payload;
        const existingProduct = state.find(
          (p: CartProduct) => p.productId === productId,
        );
        if (existingProduct) {
          existingProduct.amount++;
        } else {
          state.push({ productId, amount: 1 });
        }
      },
    },
    removeProduct: {
      reducer: (state: any, action: { payload: string }) => {
        const productId = action.payload;
        const existingProduct = state.find(
          (p: CartProduct) => p.productId === productId,
        );
        if (existingProduct && existingProduct.amount > 1) {
          existingProduct.amount--;
        } else {
          return state.filter((p: CartProduct) => p.productId !== productId);
        }
      },
    },
    setProductMessage: {
      reducer: (
        state: any,
        action: { payload: { id: string; message: string } },
      ) => {
        const { id, message } = action.payload;
        const existingProduct = state.find(
          (p: CartProduct) => p.productId === id,
        );
        existingProduct.message = message;
      },
    },
    clearCart: {
      reducer: () => {
        saveLocalStorage('cart', []);
        return [];
      },
    },
  },
};

export const {
  useGetCart,
  useAddProduct,
  useRemoveProduct,
  cartReducer,
  useGetProductAmount,
  useClearCart,
  useSetProductMessage,
} = createStoreHandler(cart);
