import {
  SliceSchema,
  createStoreHandler,
} from './StoreHandler/createStoreHandler';
import { API } from '../api/api';

const discounts: SliceSchema = {
  name: 'discounts',
  initialState: [],
  queries: {
    getDiscounts: {
      caller: API.discounts.getAll,
    },
  },
  mutations: {
    createDiscount: {
      caller: (form: any) => API.discounts.create(form),
      reducer: (state: any, action: { payload: any }) => {
        state.push(action.payload);
      },
    },
    updateDiscount: {
      caller: (form: any) => API.discounts.update(form),
      reducer: (state: any, action: { payload: any }) => {
        return state.map((p: any) => {
          if (p.id === action.payload.id) {
            return action.payload;
          }
          return p;
        });
      },
    },
    deleteDiscount: {
      caller: (id: string) => API.discounts.delete(id),
      reducer: (state: any, action: { payload: any }) => {
        const { id } = action.payload;
        return state.filter((p: any) => p.id !== id);
      },
    },
  },
};

export const {
  useGetDiscounts,
  discountsReducer,
  useCreateDiscount,
  useUpdateDiscount,
  useDeleteDiscount,
} = createStoreHandler(discounts);
