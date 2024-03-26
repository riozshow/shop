import { useEffect, useState } from 'react';
import { showModal } from '../../../../common/Modal/showModal';
import SelectPromotionTarget from '../Modals/SelectPromotionTarget';
import PromotionTargetItem from './PromotionTargetItem';

type RelationTypes = {
  CouponOnProduct?: { Product: { id: string } }[];
  CouponOnCategory?: { Category: { id: string } }[];
  DiscountOnProduct?: { Product: { id: string } }[];
  DiscountOnCategory?: { Category: { id: string } }[];
};

type TPromotionTarget = {
  update: Function;
  remove: Function;
  property: { [key in 'couponId' | 'discountId']?: string };
  relations: RelationTypes;
};

function PromotionTarget({
  update,
  remove,
  property,
  relations,
}: TPromotionTarget) {
  const [type] = useState<'Coupon' | 'Discount'>(
    property.couponId ? 'Coupon' : 'Discount',
  );
  const [targetsIds, setTargetsIds] = useState<string[]>([]);

  useEffect(() => {
    let ids: string[] = [];

    const {
      CouponOnCategory,
      CouponOnProduct,
      DiscountOnCategory,
      DiscountOnProduct,
    } = relations;

    if (CouponOnCategory) {
      CouponOnCategory?.map((cc: any) => ids.push(cc.Category.id));
    }

    if (CouponOnProduct) {
      CouponOnProduct?.map((cc: any) => ids.push(cc.Product.id));
    }

    if (DiscountOnCategory) {
      DiscountOnCategory?.map((cc: any) => ids.push(cc.Category.id));
    }

    if (DiscountOnProduct) {
      DiscountOnProduct?.map((cc: any) => ids.push(cc.Product.id));
    }

    if (ids.length > 0) {
      setTargetsIds(ids);
    }
  }, [relations]);

  if (!type) return <></>;
  return (
    <div className="d-flex gap-2">
      <div className="d-flex flex-column gap-2 w-100">
        <button
          onClick={() =>
            showModal(
              <SelectPromotionTarget
                targetsIds={targetsIds}
                type={type}
                update={(key: string, value: any) => {
                  update(key, {
                    ...value,
                    ...property,
                  });
                }}
              />,
              'Select promotion target...',
            )
          }
        >
          Add target
        </button>
        <ul>
          {(Object.keys(relations) as Array<keyof typeof relations>).map(
            (key) =>
              relations[key]?.map((rel: any) => (
                <PromotionTargetItem
                  {...rel}
                  key={rel.productId || rel.categoryId}
                  handleRemove={(property: any) => remove(key, property)}
                />
              )),
          )}
        </ul>
      </div>
    </div>
  );
}

export default PromotionTarget;
