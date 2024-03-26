import { useNavigate, useParams } from 'react-router';
import { useGetByPaymentId, usePayOrder } from '../../../store/ordersSlice';
import PaymentProduct from '../../features/PaymentProduct/PaymentProduct';
import styles from './PaymentPage.module.scss';
import { currencyConvert } from '../../../utils/currencyConvert';

function PaymentPage() {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const { payOrder } = usePayOrder();
  const { data: order } = useGetByPaymentId({
    select: paymentId,
    callOnMount: true,
  });

  if (!order) return <></>;

  const payed = order.status !== 'WAITING_FOR_PAYMENT';

  return (
    <div className={styles.container}>
      <h4>Payment</h4>
      <h5>Order: {order.id}</h5>
      <p>
        Status:{' '}
        <b
          style={{ color: order.Payment.status === 'PAYED' ? 'green' : 'red' }}
        >
          {order.Payment.status}
        </b>
      </p>
      <ul>
        {order.Products.map((product: any) => (
          <PaymentProduct key={product.productId} {...product} />
        ))}
      </ul>
      <h5>Total: {currencyConvert(order.Payment.amount)}</h5>
      {
        <div className="d-flex gap-3 justify-content-center">
          <button
            className={`${!payed ? 'primary' : ''} w-100`}
            onClick={() => (payed ? navigate('/orders') : payOrder(order.id))}
          >
            {payed ? 'Done!' : 'Pay!'}
          </button>
          {!payed && (
            <button className="w-100" onClick={() => navigate('/')}>
              Pay later
            </button>
          )}
        </div>
      }
    </div>
  );
}

export default PaymentPage;
