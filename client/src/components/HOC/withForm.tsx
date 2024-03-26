import useForm from '../../hooks/useForm';
import { FC, useRef } from 'react';

export type FormProps = {
  selectForm: Function;
  updateForm: Function;
  isCorrect: Function;
  isAllCorrect: boolean;
  initialValues: any;
  filters: { [key: string]: Function };
  field: Function;
  form: any;
};

export const withForm =
  (Component: FC<any>, filters?: { [key: string]: Function }) =>
  (props: any) => {
    const ref = useRef<HTMLDivElement>(null);

    const { field, updateForm, selectForm, form, isCorrect, isAllCorrect } =
      useForm({
        eventEmiter: ref.current,
        initialValues: props.initialValues,
        filters,
      });

    return (
      <div
        ref={ref}
        className="d-flex flex-column gap-2 form-wrapper w-100 p-2"
      >
        <Component
          selectForm={selectForm}
          updateForm={updateForm}
          field={field}
          form={form}
          isCorrect={isCorrect}
          isAllCorrect={isAllCorrect}
          {...props}
        />
      </div>
    );
  };
