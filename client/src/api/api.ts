import axios from 'axios';
import { ORIGIN } from '../config';
import { bodyToForm } from './bodyToForm';
import { generateCRUD } from './generateCRUD';
import { Id, Form } from './generateCRUD';
import { RegisterUser, LoginUser, Order, OrderProduct } from './dtos';

export const api = axios.create({
  baseURL: ORIGIN + 'api/',
  withCredentials: true,
});

export const API = {
  auth: {
    register: (form: RegisterUser) => api.post('auth/register', form),
    login: (form: LoginUser) => api.post('auth/login', form),
    logout: () => api.delete('auth/logout'),
  },
  user: {
    getProfile: () => api.get('users/profile'),
  },
  categories: generateCRUD(api, 'categories'),
  discounts: generateCRUD(api, 'discounts'),
  addresses: {
    ...generateCRUD(api, 'addresses'),
    setDefault: (id: Id) => api.post('/addresses/default/' + id),
  },
  coupons: {
    ...generateCRUD(api, 'coupons'),
    check: (products: OrderProduct[], phrase: string) =>
      api.post('/coupons/check/' + phrase, { products }),
  },
  orders: {
    getByPaymentId: (id: Id) => api.get('/orders?paymentId=' + id),
    pay: (id: Id) => api.post('/orders/' + id + '/pay'),
    create: (form: Order) => api.post('/orders', form),
    read: () => api.get('/orders'),
  },
  products: {
    ...generateCRUD(api, 'products'),
    getByCategoryId: (id: Id) => api.get('products/category/' + id),
    getTopSellers: () => api.get('products/topSellers'),
    getById: (id: Id) => api.get('products/' + id),
  },
  tags: {
    getByCategoryId: (id: Id) => api.get('tags/category/' + id),
  },
  images: {
    setDefault: (id: Id) => api.post('images/setDefault/' + id),
    deleteImage: (id: Id) => api.delete('images/' + id),
    sendImage: (form: Form) => {
      const body = bodyToForm(form);
      return api.post('images', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  },
};
