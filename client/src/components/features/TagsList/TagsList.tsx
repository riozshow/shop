import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../../api/api';
import TagItem, { TagItemType } from '../TagItem/TagItem';
import styles from './TagsList.module.scss';

function TagsList() {
  const [tags, setTags] = useState<TagItemType[]>([]);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      API.tags
        .getByCategoryId(categoryId)
        .then(({ data }: { data: TagItemType[] }) => setTags(data));
    }
  }, [categoryId]);

  return (
    <div className="list-wrapper">
      <h5>Tags</h5>
      <div className={styles.tags}>
        {tags.map((tag: TagItemType) => (
          <TagItem key={tag} name={tag} />
        ))}
      </div>
    </div>
  );
}

export default TagsList;
