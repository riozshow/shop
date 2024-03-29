import { NavLink } from 'react-router-dom';
import { useGetCart } from '../../../store/cartSlice';
import { useEffect } from 'react';
import { saveLocalStorage } from '../../../utils/localStorage';
import { useLoggedUser } from '../../../store/userSlice';
import CartDropdown from './components/CartDropdown';
import useShowDropdown from '../../../hooks/useShowDropdown';

function CartButton() {
  const { isVisible, toggleShow, hide } = useShowDropdown();
  const { data: cart } = useGetCart();
  const { data: user } = useLoggedUser();
  const hasProducts = cart.length > 0;

  useEffect(() => {
    saveLocalStorage('cart', cart);
  }, [cart]);

  return (
    <div className="position-relative overflow-visible ms-auto">
      <ul>
        <li
          onClick={toggleShow}
          className={`d-flex gap-2 ${hasProducts ? 'primary' : ''}`}
        >
          <i className="bi bi-cart-fill"></i>
          {hasProducts && <p>{cart.length}</p>}
        </li>
        {user && (
          <NavLink to={'/orders/'}>
            <li>My Orders</li>
          </NavLink>
        )}
      </ul>
      {isVisible && <CartDropdown close={hide} />}
    </div>
  );
}

export default CartButton;
