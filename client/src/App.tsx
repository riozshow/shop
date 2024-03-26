import './style/style.scss';
import Modal from './components/common/Modal/Modal';
import Navbar from './components/layout/Navbar/Navbar';
import { useLoggedUser as restoreSession } from './store/userSlice';
import { useGetDiscounts as loadDiscounts } from './store/discountsSlice';
import { useGetCategories as loadCategories } from './store/categoriesSlice';
import { useGetCoupons as loadCoupons } from './store/couponsSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import CategoryPage from './components/pages/CategoryPage/CategoryPage';
import CheckoutPage from './components/pages/CheckoutPage/CheckoutPage';
import PaymentPage from './components/pages/PaymentPage/PaymentPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import OrdersPage from './components/pages/OrdersPage/OrdersPage';
import Container from './components/layout/Container/Container';
import CMSPage from './components/pages/CMSPage/CMSPage';

function App() {
  const callOnMount = true;
  restoreSession({ callOnMount });
  loadCategories({ callOnMount });
  loadDiscounts({ callOnMount });
  loadCoupons({ callOnMount });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/payments/:paymentId" element={<PaymentPage />} />
            <Route path="/cms/*" element={<CMSPage />} />
          </Routes>
        </Container>
        {Modal()}
      </BrowserRouter>
    </div>
  );
}

export default App;
