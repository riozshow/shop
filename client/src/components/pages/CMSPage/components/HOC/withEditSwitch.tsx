import { FC, useState } from 'react';

const withEditSwitch = (Component: FC<any>) => (props: any) => {
  const [isEditing, setIsEditing] = useState(false);

  const name = props.name || props.title || props.description;

  return (
    <>
      {isEditing && <Component close={() => setIsEditing(false)} {...props} />}
      {!isEditing && (
        <li className="gap-3">
          <button onClick={() => setIsEditing(true)}>
            <i className="bi bi-pencil-fill"></i>
          </button>
          {name}
        </li>
      )}
    </>
  );
};

export default withEditSwitch;
