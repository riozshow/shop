import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { categoriesReducer } from './categoriesSlice';
import { productsReducer } from './productsSlice';
import { cartReducer } from './cartSlice';
import { discountsReducer } from './discountsSlice';
import { couponsReducer } from './couponsSlice';
import { addressesReducer } from './addressesSlice';
import { ordersReducer } from './ordersSlice';
import { settingsReducer } from './settingsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    orders: ordersReducer,
    coupons: couponsReducer,
    settings: settingsReducer,
    products: productsReducer,
    addresses: addressesReducer,
    discounts: discountsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
