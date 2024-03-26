import { NavLink } from 'react-router-dom';
import { useGetCart } from '../../../store/cartSlice';
import { useEffect, useState } from 'react';
import { saveLocalStorage } from '../../../utils/localStorage';
import { useLoggedUser } from '../../../store/userSlice';
import CartDropdown from './components/CartDropdown';

function CartButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: cart } = useGetCart();
  const { data: user } = useLoggedUser();

  useEffect(() => {
    saveLocalStorage('cart', cart);
  }, [cart]);

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setShowDropdown(false);
    });
  }, []);

  const hasProducts = cart.length > 0;
  const isLogged = user?.id !== undefined;

  return (
    <div className="position-relative overflow-visible ms-auto">
      <ul>
        <li
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((show) => !show);
          }}
          className={`d-flex gap-2 ${hasProducts ? 'primary' : ''}`}
        >
          <i className="bi bi-cart-fill"></i>
          {hasProducts && <p>{cart.length}</p>}
        </li>
        {isLogged && (
          <NavLink to={'/orders/'}>
            <li>My Orders</li>
          </NavLink>
        )}
      </ul>
      <CartDropdown close={() => setShowDropdown(false)} show={showDropdown} />
    </div>
  );
}

export default CartButton;
