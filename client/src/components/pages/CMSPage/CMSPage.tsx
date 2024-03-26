import { Route, Routes } from 'react-router';
import ContentsList from './components/ContentsList/ContentsList';
import PageLayout from '../../layout/PageLayout/PageLayout';
import CouponsListCMS from './components/Coupons/CouponsListCMS';
import ProductListCMS from './components/Products/ProductsListCMS';
import CategoriesListCMS from './components/Categories/CategoriesListCMS';
import DiscountListCMS from './components/Discounts/DiscountListCMS';

function CMSPage() {
  return (
    <PageLayout>
      <ContentsList />
      <Routes>
        <Route path="categories" element={<CategoriesListCMS />} />
        <Route path="products" element={<ProductListCMS />} />
        <Route path="coupons" element={<CouponsListCMS />} />
        <Route path="discounts" element={<DiscountListCMS />} />
      </Routes>
    </PageLayout>
  );
}

export default CMSPage;
