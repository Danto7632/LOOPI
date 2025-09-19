import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS, formatPrice } from '../data/products';

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #ebebeb;
  padding: 24px 0;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #222;
`;

const DeleteAllBtn = styled.button`
  background: none;
  border: 1px solid #d3d3d3;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  color: #222;
  cursor: pointer;

  &:hover {
    background: #f8f8f8;
  }
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Stats = styled.div`
  margin-bottom: 32px;
  font-size: 14px;
  color: #8e8e93;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #ebebeb;
  overflow: hidden;
  transition: all 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const Brand = styled.div`
  font-size: 13px;
  color: #8e8e93;
  margin-bottom: 4px;
`;

const ProductName = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: #222;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #222;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #f8f8f8;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

const EmptyText = styled.div`
  font-size: 18px;
  color: #8e8e93;
  margin-bottom: 8px;
`;

const EmptySubText = styled.div`
  font-size: 14px;
  color: #8e8e93;
`;

const SavedProductsPage: React.FC = () => {
  // 실제로는 사용자의 저장된 상품 데이터를 가져와야 함
  const [savedProducts, setSavedProducts] = useState(MOCK_PRODUCTS.slice(0, 6));

  const removeProduct = (productId: string) => {
    setSavedProducts(prev => prev.filter(product => product.id !== productId));
  };

  const removeAllProducts = () => {
    setSavedProducts([]);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>저장된 상품</Title>
          {savedProducts.length > 0 && (
            <DeleteAllBtn onClick={removeAllProducts}>
              전체 삭제
            </DeleteAllBtn>
          )}
        </HeaderContent>
      </Header>

      <Content>
        {savedProducts.length > 0 ? (
          <>
            <Stats>
              총 {savedProducts.length}개의 상품이 저장되어 있습니다.
            </Stats>
            
            <ProductGrid>
              {savedProducts.map((product) => (
                <ProductCard key={product.id}>
                  <RemoveBtn onClick={() => removeProduct(product.id)}>
                    ×
                  </RemoveBtn>
                  <Link to={`/products/${product.id}`}>
                    <ProductImage src={product.baseImage} alt={product.name} />
                    <ProductInfo>
                      <Brand>{product.brand}</Brand>
                      <ProductName>{product.name}</ProductName>
                      <Price>{formatPrice(product.variants[0].price.instant)}</Price>
                    </ProductInfo>
                  </Link>
                </ProductCard>
              ))}
            </ProductGrid>
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>💾</EmptyIcon>
            <EmptyText>저장된 상품이 없습니다</EmptyText>
            <EmptySubText>관심 있는 상품을 저장해보세요</EmptySubText>
          </EmptyState>
        )}
      </Content>
    </Container>
  );
};

export default SavedProductsPage;