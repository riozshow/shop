import {
  SliceSchema,
  createStoreHandler,
} from './StoreHandler/createStoreHandler';
import { API } from '../api/api';

const categories: SliceSchema = {
  name: 'categories',
  initialState: [],
  queries: {
    getCategories: {
      caller: API.categories.getAll,
    },
    getById: {
      selector: (state: any, categoryId: string) =>
        state.categories.find((c: any) => c.id === categoryId),
    },
  },
  mutations: {
    createCategory: {
      caller: (form: any) => API.categories.create(form),
      reducer: (state: any, action: { payload: any }) => {
        state.push(action.payload);
      },
    },
    updateCategory: {
      caller: (form: any) => API.categories.update(form),
      reducer: (state: any, action: { payload: any }) => {
        return state.map((p: any) => {
          if (p.id === action.payload.id) {
            return action.payload;
          }
          return p;
        });
      },
    },
    deleteCategory: {
      caller: (id: string) => API.categories.delete(id),
      reducer: (state: any, action: { payload: any }) => {
        const { id } = action.payload;
        return state.filter((p: any) => p.id !== id);
      },
    },
  },
};

export const {
  useGetCategories,
  categoriesReducer,
  useGetById,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} = createStoreHandler(categories);
