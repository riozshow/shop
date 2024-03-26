import styles from './SearchBar.module.scss';

function SearchBar() {
  return (
    <div className={styles.container}>
      <i className="bi bi-search"></i>
      <input placeholder="Search..."></input>
    </div>
  );
}

export default SearchBar;
