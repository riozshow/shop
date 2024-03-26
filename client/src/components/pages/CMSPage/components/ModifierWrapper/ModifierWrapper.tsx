import { ReactNode, useEffect, useRef, useState } from 'react';

function ModifierWrapper({
  children,
  save,
  remove,
  close,
}: {
  children: ReactNode | ReactNode[];
  save: Function;
  remove: Function;
  close: Function;
}) {
  const [currentForm, setCurrentForm] = useState<any>();

  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('onUpdateForm', (e: any) => {
        e.stopPropagation();
        setCurrentForm(e.detail);
      });
    }
  }, []);

  return (
    <li ref={ref} className="d-flex flex-column gap-2">
      {children}
      <div className="d-flex gap-2 w-100">
        <button className="w-100" onClick={() => close()}>
          Close
        </button>
        <button onClick={() => remove()} className="w-100">
          Delete
        </button>
        <button
          onClick={() => save(currentForm).then(() => setCurrentForm(null))}
          className={`${currentForm ? 'primary' : 'disabled'} w-100`}
        >
          Save
        </button>
      </div>
    </li>
  );
}

export default ModifierWrapper;
