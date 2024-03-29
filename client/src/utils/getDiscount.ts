import { store } from '../store/store';

type GetDiscount = {
  categoryId?: string;
  product?: { id: string; categoryId: string };
};

export const getDiscount = ({ categoryId, product }: GetDiscount) => {
  const { discounts } = store.getState() as { discounts: Array<any> };

  let totalDiscount = 0;

  const dateFilter = (date: string) => {
    return new Date(date).getTime() > Date.now();
  };

  const getByCategoryId = (categoryId: string) => {
    return discounts
      .filter((d) =>
        d.DiscountOnCategory.some(
          (dc: any) => dateFilter(dc) && dc.categoryId === categoryId,
        ),
      )
      .reduce(
        (percent: number, discount: any) => (percent += discount.percent),
        0,
      );
  };

  const getByProductId = (productId: string) => {
    return discounts
      .filter((d) =>
        d.DiscountOnProduct.some(
          (dc: any) => dateFilter(dc) && dc.productId === productId,
        ),
      )
      .reduce(
        (percent: number, discount: any) => (percent += discount.percent),
        0,
      );
  };

  if (product) {
    totalDiscount += getByCategoryId(product.categoryId);
    totalDiscount += getByProductId(product.id);
    return totalDiscount;
  }

  if (categoryId) {
    totalDiscount += getByCategoryId(categoryId);
  }

  return totalDiscount;
};
