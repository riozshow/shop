import CategoriesList from '../../features/CategoriesList/CategoriesList';
import PageLayout from '../../layout/PageLayout/PageLayout';
import Hero from '../../features/Hero/Hero';

function HomePage() {
  return (
    <PageLayout>
      <CategoriesList />
      <Hero />
    </PageLayout>
  );
}

export default HomePage;
