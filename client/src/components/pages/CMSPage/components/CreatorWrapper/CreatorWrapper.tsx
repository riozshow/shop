import { FC, useEffect, useState } from 'react';
import { useRef } from 'react';

function CreatorWrapper({
  creator,
  Form,
  children,
}: {
  creator: Function;
  Form: FC;
  children: any;
}) {
  const [showCreator, setShowCreator] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('onUpdateForm', (e: any) => {
        e.stopPropagation();
        setForm(e.detail);
      });
      ref.current.addEventListener('onFormCorrect', (e: any) => {
        e.stopPropagation();
        setIsAllCorrect(true);
      });
      ref.current.addEventListener('onFormNotCorrect', (e: any) => {
        e.stopPropagation();
        setIsAllCorrect(false);
      });
    }
  }, [ref]);

  return (
    <div className="d-flex flex-column gap-2">
      <button onClick={() => setShowCreator(true)}>+ Create</button>
      <ul className="d-flex flex-column gap-1">
        <li
          ref={ref}
          className={` ${showCreator ? 'd-flex' : 'd-none'} flex-column`}
        >
          <Form />
          <div className="d-flex gap-2 w-100">
            <button
              className={`${isAllCorrect ? 'primary' : 'disabled'} w-100`}
              onClick={() =>
                creator(form).then(() => {
                  setShowCreator(false);
                  setIsAllCorrect(false);
                })
              }
            >
              Create
            </button>
            <button className="w-100" onClick={() => setShowCreator(false)}>
              Cancel
            </button>
          </div>
        </li>
        {children}
      </ul>
    </div>
  );
}

export default CreatorWrapper;
