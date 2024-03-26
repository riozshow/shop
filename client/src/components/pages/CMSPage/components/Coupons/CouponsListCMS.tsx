import { useGetCoupons } from '../../../../../store/couponsSlice';
import { useCreateCoupon } from '../../../../../store/couponsSlice';
import CreatorWrapper from '../CreatorWrapper/CreatorWrapper';
import CouponForm from './Coupon.form';
import CouponItemCMS from './CouponItemCMS';

type CouponItemType = {
  id: string;
  description: string;
  expires: string;
  isPublic: true;
  name: string;
  percent: string;
};

function CouponsListCMS() {
  const { data: coupons } = useGetCoupons({ callOnMount: true });
  const { createCoupon } = useCreateCoupon();

  return (
    <CreatorWrapper creator={createCoupon} Form={CouponForm}>
      {coupons.map((coupon: CouponItemType) => (
        <CouponItemCMS key={coupon.id} {...coupon} />
      ))}
    </CreatorWrapper>
  );
}

export default CouponsListCMS;
