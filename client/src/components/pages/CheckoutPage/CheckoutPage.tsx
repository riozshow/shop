import { useClearCart, useGetCart } from '../../../store/cartSlice';
import AddressesBox from '../../features/AddressesBox/AddressesBox';
import CartProduct from '../../features/CartProduct/CartProduct';
import useValidateCoupon from './hooks/useValidateCoupon';
import { useGetDefault as getSelectedAddress } from '../../../store/addressesSlice';
import { useCreateOrder } from '../../../store/ordersSlice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import styles from './CheckoutPage.module.scss';
import useCartSumarize from '../../../hooks/useCartSumarize';
import { currencyConvert } from '../../../utils/currencyConvert';
import { useLoggedUser } from '../../../store/userSlice';
import { showModal } from '../../common/Modal/showModal';
import LoginModal from '../../modals/Login.modal';
import { useState } from 'react';

function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart } = useGetCart();
  const { data: address } = getSelectedAddress();
  const {
    checkCoupon,
    getCouponDiscount,
    isValid,
    couponName,
    couponDiscounts,
  } = useValidateCoupon();
  const [message, setMessage] = useState<string>('');
  const { createOrder, onSuccess } = useCreateOrder();
  const { clearCart } = useClearCart();
  const { totalPrice, totalDiscount } = useCartSumarize(cart, couponDiscounts);
  const { data: user } = useLoggedUser();

  onSuccess(({ paymentId }: { paymentId: string }) => {
    clearCart();
    navigate('/payments/' + paymentId);
  });

  useEffect(() => {
    if (cart && cart.length === 0) {
      navigate('/');
    }
  }, []);

  const handleOrder = () => {
    createOrder({
      addressId: address?.id,
      products: cart,
      couponName,
      message,
    });
  };

  return (
    <div className={styles.container}>
      <h3>Checkout</h3>
      <ul>
        {cart.map((cartProduct: CartProduct) => (
          <CartProduct
            key={cartProduct.id}
            {...cartProduct}
            couponDiscount={getCouponDiscount(cartProduct.id)}
            showMessage={true}
          />
        ))}
        {cart.length === 0 && (
          <div className="d-flex align-items-center justify-content-center p-5">
            No products
          </div>
        )}
      </ul>
      <ul>
        <input
          className={`${isValid ? 'valid' : ''}`}
          placeholder="Coupon"
          onBlur={(e) => checkCoupon(cart, e.target.value)}
        ></input>
      </ul>

      <ul>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ height: '100px' }}
          placeholder="Message..."
        ></textarea>
      </ul>

      {user?.id && user.role !== 'ADMIN' && <AddressesBox />}
      <div className={styles.sumarize}>
        <h3>Total: {currencyConvert(totalPrice - totalDiscount)}</h3>
        {totalDiscount > 0 && (
          <h5 style={{ color: 'green' }}>
            Discount: {currencyConvert(totalDiscount)}
          </h5>
        )}
      </div>
      <button
        className={`${cart.length > 0 ? (address && user?.id && user.role !== 'ADMIN' ? 'primary' : 'disabled') : 'disabled'} align-self-center px-4`}
        onClick={
          user?.id ? handleOrder : () => showModal(<LoginModal />, 'Sign in')
        }
      >
        {user?.id
          ? user.role === 'ADMIN'
            ? 'Sign in as regular user'
            : 'Order!'
          : 'Sign in and order!'}
      </button>
    </div>
  );
}

export default CheckoutPage;
