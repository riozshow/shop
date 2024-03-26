import axios from 'axios';
import { ORIGIN } from '../config';
import { bodyToForm } from './bodyToForm';

export const api = axios.create({
  baseURL: ORIGIN + 'api/',
  withCredentials: true,
});

export const API = {
  auth: {
    register: (body) => api.post('auth/register', body),
    login: (body) => api.post('auth/login', body),
    logout: () => api.delete('auth/logout'),
  },
  user: {
    getProfile: () => api.get('users/profile'),
  },
  images: {
    sendImage: (form) => {
      const body = bodyToForm(form);
      return api.post('images', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    setDefault: (id) => api.post('images/setDefault/' + id),
    deleteImage: (id) => api.delete('images/' + id),
  },
  categories: {
    create: (data) => api.post('categories', data),
    getAll: () => api.get('categories'),
    update: ({ id, ...form }) => api.put('categories/' + id, form),
    delete: (id) => api.delete('categories/' + id),
  },
  products: {
    getByCategoryId: (categoryId) => api.get('products/category/' + categoryId),
    getTopSellers: () => api.get('products/topSellers'),
    getById: (productId) => api.get('products/' + productId),
    create: (form) => api.post('products/', form),
    update: ({ id, ...form }) => api.patch('products/' + id, form),
    delete: (id) => api.delete('products/' + id),
  },
  orders: {
    getAll: () => api.get('/orders'),
    getByPaymentId: (paymentId) => api.get('/orders?paymentId=' + paymentId),
    create: (order) => api.post('/orders', order),
    pay: (orderId) => api.post('/orders/' + orderId + '/pay'),
  },
  discounts: {
    getAll: () => api.get('/discounts'),
    create: (form) => api.post('discounts/', form),
    update: ({ id, ...form }) => api.patch('discounts/' + id, form),
    delete: (id) => api.delete('discounts/' + id),
  },
  coupons: {
    getAll: () => api.get('/coupons'),
    check: (order, phrase) =>
      api.post('/coupons/check/' + phrase, { products: order }),
    create: (form) => api.post('coupons/', form),
    update: ({ id, ...form }) => api.patch('coupons/' + id, form),
    delete: (id) => api.delete('coupons/' + id),
  },
  addresses: {
    getAll: () => api.get('/addresses'),
    create: (address) => api.post('/addresses', address),
    edit: (address) => api.put('/addresses/' + address.id, address),
    setDefault: (addressId) => api.post('/addresses/default/' + addressId),
    delete: (addressId) => api.delete('/addresses/' + addressId),
  },
  tags: {
    getByCategory: (categoryId) => api.get('tags/category/' + categoryId),
  },
};
