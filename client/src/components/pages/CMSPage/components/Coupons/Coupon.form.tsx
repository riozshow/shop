import { FormProps, withForm } from '../../../../HOC/withForm';
import { validators } from '../../../../../utils/validators';
import DateSelector from '../DateSelector/DateSelector';
import PromotionTarget from '../PromotionTarget/PromotionTarget';

export type CouponCMSType = {
  updateForm: Function;
  CouponOnProduct: [];
  CouponOnCategory: [];
};

function CouponForm({
  field,
  updateForm,
  selectForm,
}: CouponCMSType & FormProps) {
  return (
    <>
      <div className="d-flex flex-column gap-2">
        Code:
        <div className="d-flex gap-2">
          <input
            className="w-100"
            placeholder="Coupon code..."
            {...field('name')}
          />
          <DateSelector
            date={selectForm('expires')}
            onChange={(date: Date) => updateForm('expires', date)}
          />
        </div>
        Discount (%):
        <div className="d-flex gap-2">
          <input min="1" max="99" type="number" {...field('percent')} />
          <input
            className="w-100"
            placeholder="Description...."
            {...field('description')}
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-2">
        <input type="checkbox" {...field('isPublic')} />
        <p>Is coupon public</p>
      </div>
      <PromotionTarget
        property={{ couponId: selectForm('id') }}
        update={(key: string, value: any) => {
          const formValue = selectForm(key);
          updateForm(key, formValue ? [...formValue, value] : [value]);
        }}
        remove={(key: string, value: any) => {
          const formValue = selectForm(key);
          const [valueKey] = Object.keys(value);
          updateForm(
            key,
            formValue.filter((val: any) => val[valueKey] !== value[valueKey]),
          );
        }}
        relations={{
          CouponOnProduct: selectForm('CouponOnProduct'),
          CouponOnCategory: selectForm('CouponOnCategory'),
        }}
      />
    </>
  );
}

export default withForm(CouponForm, {
  name: validators.name,
  percent: validators.percent,
  expires: validators.date,
});
