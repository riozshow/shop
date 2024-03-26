import { useNavigate } from 'react-router-dom';
import { useGetCategories } from '../../../../../store/categoriesSlice';
import useQuery from '../../../../../hooks/useQuery';
import { useGetByCategory } from '../../../../../store/productsSlice';
import ProductItemCMS from './ProductItemCMS';
import { useEffect } from 'react';
import CreatorWrapper from '../CreatorWrapper/CreatorWrapper';
import ProductForm from './Product.form';
import { useCreateProduct } from '../../../../../store/productsSlice';

function ProductListCMS() {
  const categoryId = useQuery('categoryId');
  const navigate = useNavigate();

  const { data: categories } = useGetCategories({ callOnMount: true });
  const { data: products, getByCategory } = useGetByCategory({
    select: categoryId,
  });
  const { createProduct } = useCreateProduct();

  useEffect(() => {
    if (!categoryId && categories.length > 0)
      navigate(`?categoryId=${categories[0].id}`);
    if (categoryId) getByCategory(categoryId);
  }, [categories, categoryId]);

  return (
    <div className="d-flex flex-row">
      <ul
        className="w-25 align-self-start d-flex flex-column"
        style={{ gap: '1px' }}
      >
        {categories.map((category: any) => (
          <li
            key={category.id}
            className={`${categoryId === category.id ? 'active' : ''} p-3`}
            onClick={() => navigate(`?categoryId=${category.id}`)}
          >
            {category.name}
          </li>
        ))}
      </ul>
      <div className="d-flex flex-column gap-2 w-75">
        <CreatorWrapper
          creator={(form: any) => createProduct({ ...form, categoryId })}
          Form={() => (
            <ProductForm
              categories={categories}
              initialValues={{ categoryId }}
            />
          )}
        >
          {products.map((product: any) => (
            <ProductItemCMS
              categories={categories}
              key={product.id}
              {...product}
            />
          ))}
        </CreatorWrapper>
      </div>
    </div>
  );
}

export default ProductListCMS;
