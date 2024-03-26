import { useEffect } from 'react';
import { useGetOrders } from '../../../store/ordersSlice';
import { useLoggedUser } from '../../../store/userSlice';
import { useNavigate } from 'react-router';
import OrderItem from '../../features/OrderItem/OrderItem';
import styles from './OrdersPage.module.scss';

function OrdersPage() {
  const navigate = useNavigate();

  const { data: user } = useLoggedUser();
  const { data: orders, getOrders } = useGetOrders({ callOnMount: true });

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      getOrders();
    }
  }, [user]);

  if (orders.length === 0) return <></>;

  return (
    <div className={styles.container}>
      <h4>My Orders</h4>
      <ul>
        {orders.map((order: any) => (
          <OrderItem key={order.id} {...order} />
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
