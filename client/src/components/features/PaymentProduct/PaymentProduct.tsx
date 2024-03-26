import { currencyConvert } from '../../../utils/currencyConvert';

type PaymentProduct = {
  amount: number;
  cost: number;
  discount: number;
  message?: string;
  Product: {
    name: string;
  };
};

function PaymentProduct({ amount, cost, discount, Product }: PaymentProduct) {
  return (
    <li className="d-flex gap-2">
      <p>{amount} x</p>
      <p>{Product.name}</p>
      <p className="ms-auto">
        <b>
          {currencyConvert(cost * amount - (discount / 100) * cost * amount)}
        </b>
      </p>
    </li>
  );
}

export default PaymentProduct;
