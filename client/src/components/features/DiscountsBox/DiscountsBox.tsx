import { useGetDiscounts } from '../../../store/discountsSlice';
import DiscountItem from '../DiscountItem/DiscountItem';

function DiscountsBox() {
  const { data: discounts } = useGetDiscounts();

  if (discounts.length === 0) return <></>;

  return (
    <div>
      {discounts.map((discount: any) => (
        <DiscountItem key={discount.id} {...discount} />
      ))}
    </div>
  );
}

export default DiscountsBox;
