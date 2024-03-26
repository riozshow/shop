import {
  BaseSyntheticEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react';

type UseFormType = {
  onSubmit?: Function;
  filters?: { [key: string]: Function };
  initialValues?: { [key: string]: any };
  eventEmiter?: HTMLElement | null;
};

function useForm({
  filters = {},
  initialValues = {},
  onSubmit = () => {},
  eventEmiter,
}: UseFormType) {
  const [form, setForm] = useState(initialValues);
  const [isAllCorrect, setIsAllCorrect] = useState<boolean>(false);

  const field = (name: string, isFile?: boolean) => {
    const handlers: {
      onChange: ChangeEventHandler;
      onKeyDown?: KeyboardEventHandler;
      value?: string;
      checked?: boolean;
    } = {
      onChange: (e: BaseSyntheticEvent) => {
        const value =
          e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const currentForm = {
          ...form,
          [name]: !isFile ? value : e.target.files[0],
        };
        emitCurrentForm(currentForm);
        setForm(currentForm);
      },
      onKeyDown: (e: any) => {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
          onSubmit();
        }
      },
    };

    if (!isFile) {
      handlers.value = form[name] ? form[name] : '';
      if (typeof handlers.value === 'boolean') {
        if (handlers.value) {
          handlers.checked = handlers.value;
        }
      }
    } else {
      delete handlers.onKeyDown;
    }

    return handlers;
  };

  const emitCurrentForm = (form: any) => {
    if (!eventEmiter) return;
    const event = new CustomEvent('onUpdateForm', {
      detail: form,
      bubbles: true,
    });
    eventEmiter.dispatchEvent(event);
  };

  const isCorrect = (field: string) =>
    filters[field] && form[field] && filters[field](form[field], form);

  useEffect(() => {
    const isAllCorrect = !Object.keys(filters).some((key) => !isCorrect(key));
    setIsAllCorrect(isAllCorrect);
  }, [form]);

  useEffect(() => {
    if (!eventEmiter) return;
    const eventName = isAllCorrect ? 'onFormCorrect' : 'onFormNotCorrect';
    eventEmiter.dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
  }, [isAllCorrect]);

  return {
    form,
    isAllCorrect,
    field,
    isCorrect,
    selectForm: (key: string) => (form ? form[key] : null),
    updateForm: (key: string, value: any) => {
      const currentForm = { ...form, [key]: value };
      emitCurrentForm(currentForm);
      setForm(currentForm);
    },
  };
}

export default useForm;
