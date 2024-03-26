import {
  SliceSchema,
  createStoreHandler,
} from './StoreHandler/createStoreHandler';
import { API } from '../api/api';
import {
  deleteLocalStorage,
  loadLocalStorage,
  saveLocalStorage,
} from '../utils/localStorage';

const addresses: SliceSchema = {
  name: 'addresses',
  initialState: {
    addresses: [],
    defaultAddress: loadLocalStorage('defaultAddress'),
  },
  queries: {
    getAddresses: {
      caller: API.addresses.getAll,
      reducer: (
        state: any,
        action: { payload: Array<{ id: string; isDefault?: boolean }> },
      ) => {
        state.addresses = action.payload;
        if (state.addresses.length === 0) {
          deleteLocalStorage('defaultAddress');
        }
      },
      selector: (state: any) => state.addresses.addresses,
    },
    getDefault: {
      selector: (state: any) =>
        state.addresses.addresses.find(
          (a: any) => a.id === state.addresses.defaultAddress,
        ),
    },
  },
  mutations: {
    setDefault: {
      reducer: (state: any, action: { payload: any }) => {
        state.defaultAddress = action.payload.id;
        saveLocalStorage('defaultAddress', action.payload.id);
      },
    },
    addAddress: {
      caller: API.addresses.create,
      reducer: (state: any, action: { payload: any }) => {
        state.addresses.push(action.payload);
        state.defaultAddress = action.payload.id;
      },
    },
    editAddress: {
      caller: API.addresses.edit,
      reducer: (state: any, action: { payload: { id: string } }) => {
        state.addresses = state.addresses.filter(
          (a: any) => a.id !== action.payload.id,
        );
        state.addresses.push(action.payload);
      },
    },
    removeAddress: {
      caller: (addressId: string) => API.addresses.delete(addressId),
      reducer: (state: any, action: { payload: { id: string } }) => {
        state.addresses = state.addresses.filter(
          (a: any) => a.id !== action.payload.id,
        );
        if (
          state.addresses.length > 0 &&
          state.defaultAddress === action.payload.id
        ) {
          state.defaultAddress = state.addresses[0].id;
        }
        if (state.addresses.length === 0) {
          state.defaultAddress = null;
        }
      },
    },
    clear: {
      reducer: (state: any) => {
        state.addresses = [];
      },
    },
  },
};

export const {
  useGetAddresses,
  addressesReducer,
  useSetDefault,
  useGetDefault,
  useClear,
  useAddAddress,
  useEditAddress,
  useRemoveAddress,
} = createStoreHandler(addresses);
