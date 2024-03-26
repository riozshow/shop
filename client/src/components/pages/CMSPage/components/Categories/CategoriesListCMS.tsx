import CategoryForm from './Category.form';
import {
  useCreateCategory,
  useGetCategories,
} from '../../../../../store/categoriesSlice';
import CreatorWrapper from '../CreatorWrapper/CreatorWrapper';
import CategoryItemCMS from './CategoryItemCMS';
import { CategoryItemType } from '../../../../features/CategoryItem/CategoryItem';

function CategoriesListCMS() {
  const { data: categories } = useGetCategories({ callOnMount: true });
  const { createCategory } = useCreateCategory();

  return (
    <CreatorWrapper creator={createCategory} Form={CategoryForm}>
      {categories.map((category: CategoryItemType) => (
        <CategoryItemCMS key={category.id} {...category} />
      ))}
    </CreatorWrapper>
  );
}

export default CategoriesListCMS;
