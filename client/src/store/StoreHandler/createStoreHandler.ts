import { createSlice } from '@reduxjs/toolkit';
import { createHook } from './createHook';

export type SliceSchema = {
  name: string;
  initialState?: any;
  queries: { [key: string]: any };
  mutations?: { [key: string]: any };
};

const defaultReducer = (state: any, action: { payload: any }) => action.payload;
const defaultSelector = (name: string) => (state: any) => state[name];

export function createStoreHandler(Schema: SliceSchema) {
  const name = Schema.name;
  const initialState = Schema.initialState || {};

  const reducers: { [key: string]: any } = {};
  const hooks: { [key: string]: any } = {};

  const actions = { ...Schema.queries, ...Schema.mutations };

  const hooksData: { [key: string]: any } = {};

  for (const query in actions) {
    const reducer = actions[query].reducer || defaultReducer;
    const selector = actions[query].selector || defaultSelector(name);
    const caller = actions[query]?.caller;
    hooksData[query] = { query, selector, caller };
    reducers[query] = reducer;
  }

  const slice = createSlice({
    name,
    initialState,
    reducers,
  });

  for (const action in slice.actions) {
    const hookName = `use` + action[0].toUpperCase() + action.substring(1);
    hooksData[action].reducer = slice.actions[action];
    hooks[hookName] = createHook(hooksData[action]);
  }

  const result = {
    ...hooks,
    [name + 'Reducer']: slice.reducer,
  };

  return result;
}
