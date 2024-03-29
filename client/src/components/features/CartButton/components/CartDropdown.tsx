import { SyntheticEvent } from 'react';
import styles from './CartDropdown.module.scss';
import { useGetCart } from '../../../../store/cartSlice';
import CartProduct from '../../CartProduct/CartProduct';
import useCartSumarize from '../../../../hooks/useCartSumarize';
import { currencyConvert } from '../../../../utils/currencyConvert';
import { useNavigate } from 'react-router';

function CartDropdown({ close }: { close: Function }) {
  const { data: cart } = useGetCart();
  const { totalPrice, totalDiscount } = useCartSumarize(cart);
  const navigate = useNavigate();
  const lockClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onClick={lockClick} className={styles.container}>
      <ul className="m-0 flex-column">
        {cart.map((product: any) => (
          <CartProduct key={product.id} {...product} />
        ))}
        {cart.length === 0 && <div className="p-4 opacity-50">No products</div>}
      </ul>
      <div className={styles.sumarize}>
        <h5>Total: {currencyConvert(totalPrice - totalDiscount)}</h5>
        {totalDiscount > 0 && (
          <p style={{ color: 'green', fontWeight: '600' }}>
            Discount: {currencyConvert(totalDiscount)}
          </p>
        )}
      </div>
      <button
        onClick={() => {
          navigate('/checkout');
          close();
        }}
        className={`${cart.length > 0 ? 'primary' : 'disabled'}`}
      >
        Checkout
      </button>
    </div>
  );
}

export default CartDropdown;
