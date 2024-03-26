import {
  useDeleteCoupon,
  useUpdateCoupon,
} from '../../../../../store/couponsSlice';
import withEditSwitch from '../HOC/withEditSwitch';
import ModifierWrapper from '../ModifierWrapper/ModifierWrapper';
import CouponForm from './Coupon.form';

type CouponItemCMSType = {
  close: Function;
  id: string;
  name: string;
  description: string;
  percent: number;
  expires: string;
  isPublic: boolean;
  CouponOnCategory: [];
  CouponOnProduct: [];
};

function CouponItemCMS({ close, id, ...coupon }: CouponItemCMSType) {
  const { updateCoupon } = useUpdateCoupon();
  const { deleteCoupon } = useDeleteCoupon();

  return (
    <ModifierWrapper
      close={close}
      save={(form: any) => updateCoupon({ id, form })}
      remove={() => deleteCoupon(id)}
    >
      <CouponForm initialValues={{ id, ...coupon }} />
    </ModifierWrapper>
  );
}

export default withEditSwitch(CouponItemCMS);
