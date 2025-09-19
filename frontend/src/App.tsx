import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/LOOPIHeader';
import Footer from './components/layout/Footer';
import HomePage from './pages/LOOPIHomePage';
import ProductListPage from './pages/ITAssetListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TradingFlowPage from './pages/TradingFlowPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MyPage from './pages/MyPage';
import SavedProductsPage from './pages/SavedProductsPage';
import RecentProductsPage from './pages/RecentProductsPage';
import CartPage from './pages/CartPage';
import NotificationsPage from './pages/NotificationsPage';
import InquiryPage from './pages/InquiryPage';
import FAQPage from './pages/FAQPage';
import OrderPage from './pages/OrderPage';
import AdminPage from './pages/admin/AdminPage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

// 페이지 이동 시 스크롤 초기화 컴포넌트
const ScrollToTop: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

function App() {
  return (
    <AuthProvider>
      <AppContainer>
        <Header />
        <Main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id/trade" element={<TradingFlowPage />} />
          <Route path="/saved" element={<SavedProductsPage />} />
          <Route path="/recent" element={<RecentProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Main>
      <Footer />
    </AppContainer>
    </AuthProvider>
  );
}

export default App;
