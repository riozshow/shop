import { dateConvert } from '../../../utils/dateConvert';
import { currencyConvert } from '../../../utils/currencyConvert';
import { NavLink } from 'react-router-dom';

type OrderItem = {
  id: string;
  message: string;
  orderAddress: string;
  status: string;
  createdAt: string;
  Payment: { id: string; amount: number };
  Products: Array<any>;
};

function OrderItem({
  id,
  orderAddress,
  status,
  Payment,
  createdAt,
}: OrderItem) {
  return (
    <NavLink to={'/payments/' + Payment.id}>
      <li className="d-flex flex-column gap-3 align-items-start">
        <div className="d-flex gap-3">
          <p>{dateConvert.date(createdAt)}</p>
          <p>{dateConvert.time(createdAt)}</p>
        </div>
        <p style={{ fontWeight: '500' }}>Order: {id}</p>
        <p>
          <b
            style={{
              color: status === 'WAITING_FOR_PAYMENT' ? 'red' : 'green',
            }}
          >
            {status}
          </b>
        </p>
        <h5>{currencyConvert(Payment.amount)}</h5>
        <p>{orderAddress}</p>
      </li>
    </NavLink>
  );
}

export default OrderItem;
