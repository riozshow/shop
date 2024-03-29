import { API } from '../api/api';
import { createStoreHandler } from './StoreHandler/createStoreHandler';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

type User = {
  id: string;
  email: string;
  name: string;
  role: Roles;
  phone?: number;
  createdAt: string;
  updatedAt: string;
};

const user = {
  name: 'user',
  actions: {
    loggedUser: {
      caller: API.user.getProfile,
      selector: (state: { user: User }) => state.user,
    },
    login: {
      caller: API.auth.login,
    },
    logout: {
      reducer: () => null,
      caller: API.auth.logout,
    },
    register: {
      caller: (form: any) => API.auth.register(form),
      reducer: () => null,
    },
  },
};

export const { userReducer, useLoggedUser, useLogin, useLogout, useRegister } =
  createStoreHandler(user);
