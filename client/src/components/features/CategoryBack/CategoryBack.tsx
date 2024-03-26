import { useParams } from 'react-router';
import { useGetById } from '../../../store/categoriesSlice';
import styles from './CategoryBack.module.scss';
import { NavLink } from 'react-router-dom';

function CategoryBack() {
  const { categoryId } = useParams();
  const { data: category } = useGetById({ select: categoryId });

  if (!category) return <></>;
  return (
    <NavLink to={'/'}>
      <div className={styles.container}>
        <ul className="d-flex">
          <li className="gap-3 w-100 p-3">
            <i className="bi bi-chevron-left"></i>
            <h5>Categories</h5>
          </li>
        </ul>
      </div>
    </NavLink>
  );
}

export default CategoryBack;
