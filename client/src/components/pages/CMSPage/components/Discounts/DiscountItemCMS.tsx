import withEditSwitch from '../HOC/withEditSwitch';
import ModifierWrapper from '../ModifierWrapper/ModifierWrapper';
import DiscountForm from './Discount.form';
import {
  useDeleteDiscount,
  useUpdateDiscount,
} from '../../../../../store/discountsSlice';

type DiscountItemCMSType = {
  close: Function;
  id: string;
  description: string;
  percent: number;
  expires: string;
  DiscountOnCategory: [];
  DiscountOnProduct: [];
};

function DiscountItemCMS({ close, id, ...discount }: DiscountItemCMSType) {
  const { updateDiscount } = useUpdateDiscount();
  const { deleteDiscount } = useDeleteDiscount();

  return (
    <ModifierWrapper
      close={close}
      save={updateDiscount}
      remove={() => deleteDiscount(id)}
    >
      <DiscountForm initialValues={{ id, ...discount }} />
    </ModifierWrapper>
  );
}

export default withEditSwitch(DiscountItemCMS);
