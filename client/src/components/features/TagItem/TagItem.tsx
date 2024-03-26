import styles from './TagItem.module.scss';
export type TagItemType = string;

function TagItem({ name }: { name: TagItemType }) {
  return <div className={styles.container}>{name}</div>;
}

export default TagItem;
