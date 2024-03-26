import CategoryItem from '../CategoryItem/CategoryItem';
import { CategoryItemType } from '../CategoryItem/CategoryItem';
import { useGetCategories } from '../../../store/categoriesSlice';
import { getDiscount } from '../../../utils/getDiscount';

function CategoriesList() {
  const { data: categories } = useGetCategories({ callOnMount: true });

  return (
    <div className={'list-wrapper'}>
      <h5>Categories</h5>
      <ul className="d-flex flex-column">
        {categories.map((category: CategoryItemType) => (
          <CategoryItem
            key={category.id}
            {...category}
            discount={getDiscount({ categoryId: category.id })}
          />
        ))}
      </ul>
    </div>
  );
}

export default CategoriesList;
