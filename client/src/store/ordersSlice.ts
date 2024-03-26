import {
  SliceSchema,
  createStoreHandler,
} from './StoreHandler/createStoreHandler';
import { API } from '../api/api';

const orders: SliceSchema = {
  name: 'orders',
  initialState: [],
  queries: {
    getOrders: {
      caller: API.orders.getAll,
    },
    getByPaymentId: {
      caller: (paymentId: string) => API.orders.getByPaymentId(paymentId),
      selector: (state: any, paymentId: string) =>
        state.orders.find((o: any) => o.paymentId === paymentId),
      reducer: (state: any, action: { payload: any }) => {
        state.push(action.payload);
      },
    },
  },
  mutations: {
    createOrder: {
      caller: (order: any) => API.orders.create(order),
      reducer: (state: any, action: { payload: any }) => {
        state.push(action.payload);
      },
    },
    payOrder: {
      caller: (orderId: string) => API.orders.pay(orderId),
      reducer: (state: any, action: { payload: any }) => {
        const orderId = action.payload.id;
        if (orderId) {
          const newState = state.filter((o: any) => o.id !== orderId);
          newState.push(action.payload);
          return newState;
        }
      },
    },
  },
};

export const {
  usePayOrder,
  useGetOrders,
  ordersReducer,
  useCreateOrder,
  useGetByPaymentId,
} = createStoreHandler(orders);
