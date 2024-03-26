import { NavLink } from 'react-router-dom';
import styles from './ContentsList.module.scss';

function ContentsList() {
  return (
    <div className={` list-wrapper ${styles.container}`}>
      <h5>Contents</h5>
      <ul className={` ${styles.categories} d-flex flex-column`}>
        <NavLink to={'categories'}>
          <li>Categories</li>
        </NavLink>
        <NavLink to={'products'}>
          <li>Products</li>
        </NavLink>
        <NavLink to={'coupons'}>
          <li>Coupons</li>
        </NavLink>
        <NavLink to={'discounts'}>
          <li>Discounts</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default ContentsList;
