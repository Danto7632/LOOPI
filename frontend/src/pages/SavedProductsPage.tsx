import React, { useState } from 'react';
import styled from 'styled-components';
import { MOCK_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 100px; /* 모바일 네비게이션 공간 확보 */
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #ebebeb;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 16px 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #222;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const DeleteAllButton = styled.button`
  padding: 8px 16px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #222;
    color: #222;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #8e8e93;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.3;

  @media (max-width: 768px) {
    font-size: 48px;
    margin-bottom: 16px;
  }
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const EmptyDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SavedProductsPage: React.FC = () => {
  const [savedProducts, setSavedProducts] = useState(MOCK_PRODUCTS.slice(0, 8)); // 처음 8개 상품을 저장된 상품으로 표시

  const handleHeartClick = (productId: string, isLiked: boolean) => {
    if (!isLiked) {
      // 좋아요가 해제되면 목록에서 제거
      setSavedProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleDeleteAll = () => {
    setSavedProducts([]);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Saved ({savedProducts.length})</Title>
          {savedProducts.length > 0 && (
            <DeleteAllButton onClick={handleDeleteAll}>
              전체 삭제
            </DeleteAllButton>
          )}
        </HeaderContent>
      </Header>

      <Content>
        {savedProducts.length > 0 ? (
          <ProductGrid>
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showHeartIcon={true}
                initialIsLiked={true}
                onHeartClick={handleHeartClick}
              />
            ))}
          </ProductGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>🤍</EmptyIcon>
            <EmptyTitle>저장된 상품이 없어요</EmptyTitle>
            <EmptyDescription>
              관심 있는 상품의 하트를 눌러<br />
              언제든 다시 볼 수 있게 저장해보세요
            </EmptyDescription>
          </EmptyState>
        )}
      </Content>
    </Container>
  );
};

export default SavedProductsPage;