import { useEffect, useState } from 'react';
import { useGetCategories } from '../../../../../store/categoriesSlice';
import { useGetByCategory } from '../../../../../store/productsSlice';
import { closeModal } from '../../../../common/Modal/closeModal';

function SelectPromotionTarget({
  update,
  type,
  targetsIds,
}: {
  targetsIds: string[];
  update: Function;
  type: 'Coupon' | 'Discount';
}) {
  const [productId, setProductId] = useState<string | null>();
  const [categoryId, setCategoryId] = useState<string | null>();

  const { data: categories } = useGetCategories({ callOnMount: true });
  const { data: products } = useGetByCategory({
    select: categoryId,
    callOnMount: true,
  });

  const getCategory = (categoryId: string) =>
    categories.find((c: any) => c.id === categoryId);

  const getProduct = (productId: string) =>
    products.find((c: any) => c.id === productId);

  useEffect(() => {
    categories.length > 0
      ? setCategoryId(categories[0].id)
      : setCategoryId(null);
  }, [categories]);

  useEffect(() => {
    products.length > 0 ? setProductId(products[0].id) : setProductId(null);
  }, [products]);

  return (
    <div className="d-flex gap-2">
      <div className="d-flex flex-column gap-2">
        <select onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className={`${categoryId && !targetsIds.includes(categoryId) ? '' : 'disabled'}`}
          onClick={() => {
            if (!categoryId) return;
            update(`${type}OnCategory`, {
              categoryId,
              Category: getCategory(categoryId),
            });
            closeModal();
          }}
        >
          Select category
        </button>
      </div>
      <div className="d-flex flex-column gap-2">
        <select onChange={(e) => setProductId(e.target.value)}>
          {products.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          className={`${productId && !targetsIds.includes(productId) ? '' : 'disabled'}`}
          onClick={() => {
            if (!productId) return;
            update(`${type}OnProduct`, {
              productId,
              Product: getProduct(productId),
            });
            closeModal();
          }}
        >
          Select product
        </button>
      </div>
    </div>
  );
}

export default SelectPromotionTarget;
