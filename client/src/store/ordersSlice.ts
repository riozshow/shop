import { createStoreHandler } from './StoreHandler/createStoreHandler';
import { API } from '../api/api';

const orders = {
  name: 'orders',
  initialState: [],
  actions: {
    getOrders: {
      caller: API.orders.read,
    },
    getByPaymentId: {
      caller: (paymentId: string) => API.orders.getByPaymentId(paymentId),
      selector: (state: any, paymentId: string) =>
        state.orders.find((o: any) => o.paymentId === paymentId),
      reducer: (state: any, action: { payload: any }) => {
        state.push(action.payload);
      },
    },
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
