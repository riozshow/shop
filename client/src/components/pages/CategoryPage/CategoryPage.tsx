import CategoryBack from '../../features/CategoryBack/CategoryBack';
import ProductsBox from '../../features/ProductsBox/ProductsBox';
import TagsList from '../../features/TagsList/TagsList';
import PageLayout from '../../layout/PageLayout/PageLayout';

function CategoryPage() {
  return (
    <PageLayout>
      <div>
        <CategoryBack />
        <TagsList />
      </div>
      <ProductsBox />
    </PageLayout>
  );
}

export default CategoryPage;
