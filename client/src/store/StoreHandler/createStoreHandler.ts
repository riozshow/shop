import { Reducer, createSlice } from '@reduxjs/toolkit';
import { createHook } from './createHook';

type Actions = {
  [key: string]: {
    caller?: (...args: any[]) => any;
    reducer?: (...args: any[]) => any;
    selector?: (...args: any[]) => any;
  };
};

type ReducerName<T extends string> = `${T}Reducer`;

type HookName<T extends string> = `use${Capitalize<T>}`;
type Hook = (...args: any[]) => any;

type StoreHandler<T extends string, U> = Record<ReducerName<T>, Reducer> &
  Record<HookName<Extract<keyof U, string>>, Hook>;

export type SliceSchema<T, U> = {
  name: T;
  actions: U;
  initialState?: any;
};

const defaultReducer = (state: any, action: { payload: any }) => action.payload;
const defaultSelector = (name: string) => (state: any) => state[name];

export function createStoreHandler<T extends string, U extends Actions>(
  Schema: SliceSchema<T, U>,
): StoreHandler<T, U> {
  const { name, initialState = null, actions } = Schema;

  const reducers: { [key: string]: any } = {};
  const hooks: { [key: string]: any } = {};

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

  return result as any;
}
