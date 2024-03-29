import { createStoreHandler } from './StoreHandler/createStoreHandler';
import { API } from '../api/api';

const coupons = {
  name: 'coupons',
  initialState: [],
  actions: {
    getCoupons: {
      caller: API.coupons.read,
    },
    createCoupon: {
      caller: (form: any) => API.coupons.create(form),
      reducer: (state: any, action: { payload: any }) => {
        state.push(action.payload);
      },
    },
    updateCoupon: {
      caller: ({ id, form }: { id: string; form: any }) =>
        API.coupons.update({ ...form, id }),
      reducer: (state: any, action: { payload: any }) => {
        return state.map((p: any) => {
          if (p.id === action.payload.id) {
            return action.payload;
          }
          return p;
        });
      },
    },
    deleteCoupon: {
      caller: (id: string) => API.coupons.delete(id),
      reducer: (state: any, action: { payload: any }) => {
        const { id } = action.payload;
        return state.filter((p: any) => p.id !== id);
      },
    },
  },
};

export const {
  couponsReducer,
  useGetCoupons,
  useCreateCoupon,
  useUpdateCoupon,
  useDeleteCoupon,
} = createStoreHandler(coupons);
