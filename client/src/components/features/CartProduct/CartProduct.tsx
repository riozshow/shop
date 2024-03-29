import { useGetById } from '../../../store/productsSlice';
import { getDiscount } from '../../../utils/getDiscount';
import AmountBox from '../AmountBox/AmountBox';
import styles from './CartProduct.module.scss';
import { currencyConvert } from '../../../utils/currencyConvert';
import { useSetProductMessage } from '../../../store/cartSlice';

type CartProduct = {
  id: string;
  amount: number;
  couponDiscount: number;
  message: string;
  showMessage?: boolean;
};

function CartProduct({
  id,
  amount,
  message = '',
  showMessage,
  couponDiscount = 0,
}: CartProduct) {
  const { data: product } = useGetById({
    select: id,
    callOnMount: true,
  });

  const { setProductMessage } = useSetProductMessage();

  if (!product) return <></>;

  const discount = getDiscount({ product }) + couponDiscount;
  const dicountAmount = product.price * amount * (discount / 100);

  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <p>{product.name}</p>
        <h5>{currencyConvert(product.price * amount - dicountAmount)}</h5>
        {discount > 0 && (
          <p style={{ color: 'green' }}>
            <b>-{currencyConvert(dicountAmount)}</b>
          </p>
        )}
        {showMessage && (
          <input
            value={message}
            onChange={(e) => setProductMessage({ id, message: e.target.value })}
            style={{ fontSize: '14px' }}
            placeholder="Message..."
          />
        )}
      </div>
      <div className="ms-auto d-flex align-items-center">
        <AmountBox noIcon={true} productId={id} />
      </div>
    </div>
  );
}

export default CartProduct;
