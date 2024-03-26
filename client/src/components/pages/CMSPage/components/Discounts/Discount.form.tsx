import { FormProps, withForm } from '../../../../HOC/withForm';
import { validators } from '../../../../../utils/validators';
import DateSelector from '../DateSelector/DateSelector';
import PromotionTarget from '../PromotionTarget/PromotionTarget';

export type DiscountCMSType = {
  updateForm: Function;
  DiscountOnProduct: [];
  DiscountOnCategory: [];
};

function DiscountForm({
  field,
  updateForm,
  selectForm,
}: DiscountCMSType & FormProps) {
  return (
    <>
      <div className="d-flex flex-column gap-2">
        <DateSelector
          date={selectForm('expires')}
          onChange={(date: Date) => updateForm('expires', date)}
        />
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
      <PromotionTarget
        property={{ discountId: selectForm('id') }}
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
          DiscountOnProduct: selectForm('DiscountOnProduct'),
          DiscountOnCategory: selectForm('DiscountOnCategory'),
        }}
      />
    </>
  );
}

export default withForm(DiscountForm, {
  description: validators.name,
  percent: validators.percent,
  expires: validators.date,
});
