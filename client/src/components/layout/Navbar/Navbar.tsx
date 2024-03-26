import { useLoggedUser } from '../../../store/userSlice';
import styles from './Navbar.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import AccountButtons from './components/AccountButtons/AccountButtons';
import CartButton from '../../features/CartButton/CartButton';

function Navbar() {
  const { data: user } = useLoggedUser();

  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <NavLink to={'/'}>
          <h4>.Shop</h4>
        </NavLink>
        <CartButton />
        {user?.role === 'ADMIN' && (
          <button onClick={() => navigate('/cms/categories')}>CMS</button>
        )}
        <AccountButtons user={user} />
      </div>
    </nav>
  );
}

export default Navbar;
