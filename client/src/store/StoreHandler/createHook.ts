import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { Selector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Store } from '@reduxjs/toolkit';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type StoreHookArgs = {
  callOnMount?: boolean;
  select?: any;
  modify?: any;
};

export function createHook({
  query,
  selector,
  reducer,
  caller,
}: {
  query: string;
  selector: Function;
  reducer: Function;
  caller: Function;
}) {
  return function (
    args: StoreHookArgs = { callOnMount: false, select: null, modify: null },
  ) {
    const { select, callOnMount, modify } = args;
    const dispatch = useAppDispatch();
    const data = useAppSelector(
      (state: RootState) => selector(state, select) as Selector<Store, any>,
      (a: any, b: any) => {
        return JSON.stringify(a) === JSON.stringify(b);
      },
    );
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    let onSuccess = (data: any) => {};

    const call = async (data: any = select) => {
      if (!caller) return;
      setIsLoading(true);
      await caller(data)
        .then(({ data }: { data: any }) => {
          onSuccess(data);
          dispatch(reducer(data));
          setIsSuccess(true);
        })
        .catch(({ message }: { message: 'string' }) => setError(message));
      setIsLoading(false);
    };

    useEffect(() => {
      if (callOnMount && selector && (!data || data.length === 0)) {
        call(select || {});
      }
    }, [select]);

    const result: { [key: string]: any } = {
      error,
      isLoading,
      isSuccess,
      isError: error?.length > 0,
    };

    return {
      ...result,
      data,
      [query]: caller
        ? call
        : (data: any) => dispatch(reducer(modify ? modify : data)),
      onSuccess: (cb: (data: any) => any) => (onSuccess = cb),
    };
  };
}
