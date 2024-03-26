import { useGetCoupons } from '../../../store/couponsSlice';
import CouponItem from '../CouponItem/CouponItem';
import styles from './CouponsBox.module.scss';

function CouponsBox() {
  const { data: coupons } = useGetCoupons({ select: { isPublic: true } });

  if (coupons.length === 0) return <></>;

  return (
    <div className={styles.container}>
      {coupons
        .filter(
          (c: any) => new Date(c.expires).getTime() > Date.now() && c.isPublic,
        )
        .map((coupon: any) => (
          <CouponItem key={coupon.id} {...coupon} />
        ))}
    </div>
  );
}

export default CouponsBox;
