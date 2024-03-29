import { API } from '../api/api';
import { Product } from '../components/features/ProductItem/ProductItem';
import { createStoreHandler } from './StoreHandler/createStoreHandler';

const products = {
  name: 'products',
  initialState: {
    all: [],
    topSellers: [],
  },
  actions: {
    getByCategory: {
      caller: (categoryId: string) => API.products.getByCategoryId(categoryId),
      selector: (state: any, categoryId: string) =>
        state.products.all.filter((p: Product) => p.categoryId === categoryId),
      reducer: (state: any, action: { payload: any }) => {
        const products = action.payload;
        for (const product of products) {
          if (!state.all.find((p: Product) => p.id === product.id)) {
            state.all.push(product);
          }
        }
      },
    },
    getById: {
      caller: (productId: string) => API.products.getById(productId),
      selector: (state: any, productId: string) =>
        state.products.all.find((p: any) => p.id === productId),
      reducer: (state: any, action: { payload: any }) => {
        const product = action.payload;
        state.all = state.all.filter((p: any) => p.id !== product.id);
        state.all.push(product);
        return state;
      },
    },
    getProductsByIds: {
      selector: (state: any, productIds: Array<string>) => {
        return state.products.all.filter((p: any) => productIds.includes(p.id));
      },
    },
    getTopSellers: {
      caller: API.products.getTopSellers,
      selector: (state: any) => state.products.topSellers,
      reducer: (state: any, action: { payload: any }) => {
        state.topSellers.push(...action.payload);
      },
    },
    createProduct: {
      caller: (form: any) => API.products.create(form),
      reducer: (state: any, action: { payload: any }) => {
        state.all.push(action.payload);
      },
    },
    updateProduct: {
      caller: (form: any) => API.products.update(form),
      reducer: (state: any, action: { payload: any }) => {
        state.all = state.all.map((p: any) => {
          if (p.id === action.payload.id) {
            return action.payload;
          }
          return p;
        });
      },
    },
    deleteProduct: {
      caller: (id: string) => API.products.delete(id),
      reducer: (state: any, action: { payload: any }) => {
        const { id } = action.payload;
        state.all = state.all.filter((p: any) => p.id !== id);
        state.topSellers = state.topSellers.filter((p: any) => p.id !== id);
      },
    },
  },
};

export const {
  productsReducer,
  useGetByCategory,
  useGetById,
  useGetTopSellers,
  useGetProductsByIds,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} = createStoreHandler(products);
