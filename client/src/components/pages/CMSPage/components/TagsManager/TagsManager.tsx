import { useState } from 'react';
import { validators } from '../../../../../utils/validators';

export type Tag = {
  name: string;
};

function TagsManager({
  Tags = [],
  update,
}: {
  Tags: Array<Tag>;
  update: Function;
}) {
  const [tags, setTags] = useState<Array<Tag>>(Tags);

  const handleInput = {
    onChange: (e: any) => e.stopPropagation(),
    onKeyDown: (e: any) => {
      if (
        e.key === 'Enter' &&
        validators.tag(e.target.value) &&
        !tags.some((t: Tag) => t.name === e.target.value)
      ) {
        const newTags = [{ name: e.target.value }, ...tags];
        setTags(newTags);
        update(newTags);
        e.target.value = '';
      }
    },
  };

  return (
    <div className="d-flex flex-column gap-2 w-100">
      <input placeholder="Tag..." {...handleInput} />
      <ul className="flex-wrap gap-1 d-flex p-2">
        {tags.map((t: Tag) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TagsManager;
