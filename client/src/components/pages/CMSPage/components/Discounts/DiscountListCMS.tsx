import CreatorWrapper from '../CreatorWrapper/CreatorWrapper';
import {
  useGetDiscounts,
  useCreateDiscount,
} from '../../../../../store/discountsSlice';
import DiscountItemCMS from './DiscountItemCMS';
import DiscountForm from './Discount.form';

type DiscountItemType = {
  id: string;
  description: string;
  expires: string;
  percent: string;
};

function DiscountListCMS() {
  const { data: discounts } = useGetDiscounts({ callOnMount: true });
  const { createDiscount } = useCreateDiscount();

  return (
    <CreatorWrapper creator={createDiscount} Form={DiscountForm}>
      {discounts.map((discount: DiscountItemType) => (
        <DiscountItemCMS key={discount.id} {...discount} />
      ))}
    </CreatorWrapper>
  );
}

export default DiscountListCMS;
