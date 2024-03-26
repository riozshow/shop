import { API } from '../api/api';
import { SliceSchema } from './StoreHandler/createStoreHandler';
import { createStoreHandler } from './StoreHandler/createStoreHandler';

const user: SliceSchema = {
  name: 'user',
  queries: {
    loggedUser: {
      selector: (state: any) => (state.user.id ? state.user : null),
      caller: API.user.getProfile,
    },
  },
  mutations: {
    login: {
      caller: API.auth.login,
    },
    logout: {
      reducer: () => ({}),
      caller: API.auth.logout,
    },
    register: {
      reducer: (state: any) => state,
      caller: (form: any) => API.auth.register(form),
    },
  },
};

export const { userReducer, useLoggedUser, useLogin, useLogout, useRegister } =
  createStoreHandler(user);
