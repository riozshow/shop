import {
  useAddProduct,
  useGetProductAmount,
  useRemoveProduct,
} from '../../../store/cartSlice';
import styles from './AmountBox.module.scss';

function AmountBox({
  productId,
  noIcon,
}: {
  productId: string;
  noIcon?: boolean;
}) {
  const { data: amount } = useGetProductAmount({ select: productId });
  const { addProduct } = useAddProduct({ modify: productId });
  const { removeProduct } = useRemoveProduct({ modify: productId });

  return (
    <ul className={styles.container}>
      <li onClick={removeProduct}>-</li>
      <li onClick={addProduct} className={amount > 0 ? 'primary' : ''}>
        {!noIcon && <i className="bi bi-cart-fill me-2"></i>}
        <p>{amount}</p>
      </li>
      <li onClick={addProduct}>+</li>
    </ul>
  );
}

export default AmountBox;
