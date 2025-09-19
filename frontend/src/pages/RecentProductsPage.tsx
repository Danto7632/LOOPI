import React, { useState, useEffect } from 'react';
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

const ClearBtn = styled.button`
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

const FilterTabs = styled.div`
  display: flex;
  margin-bottom: 32px;
  border-bottom: 1px solid #ebebeb;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 16px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.active ? '#222' : '#8e8e93'};
  border-bottom: 2px solid ${props => props.active ? '#222' : 'transparent'};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #222;
  }
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

const ViewedTime = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  z-index: 10;
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

interface ViewedProduct {
  id: string;
  viewedAt: Date;
  product: any;
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return `${diffInDays}일 전`;
  }
};

const RecentProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'week'>('all');
  const [recentProducts, setRecentProducts] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    // 실제로는 로컬스토리지나 서버에서 최근 본 상품 데이터를 가져와야 함
    const mockRecentProducts: ViewedProduct[] = MOCK_PRODUCTS.slice(0, 8).map((product, index) => ({
      id: product.id,
      viewedAt: new Date(Date.now() - index * 3600000), // 1시간씩 차이나게
      product
    }));
    setRecentProducts(mockRecentProducts);
  }, []);

  const filteredProducts = recentProducts.filter(item => {
    const now = new Date();
    const viewedAt = item.viewedAt;
    
    switch (activeTab) {
      case 'today':
        return viewedAt.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return viewedAt >= weekAgo;
      default:
        return true;
    }
  });

  const clearHistory = () => {
    setRecentProducts([]);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>최근 본 상품</Title>
          {recentProducts.length > 0 && (
            <ClearBtn onClick={clearHistory}>
              전체 삭제
            </ClearBtn>
          )}
        </HeaderContent>
      </Header>

      <Content>
        <FilterTabs>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            전체
          </Tab>
          <Tab 
            active={activeTab === 'today'} 
            onClick={() => setActiveTab('today')}
          >
            오늘
          </Tab>
          <Tab 
            active={activeTab === 'week'} 
            onClick={() => setActiveTab('week')}
          >
            1주일
          </Tab>
        </FilterTabs>

        {filteredProducts.length > 0 ? (
          <>
            <Stats>
              {activeTab === 'all' ? '전체' : activeTab === 'today' ? '오늘' : '최근 1주일'} {filteredProducts.length}개의 상품을 확인했습니다.
            </Stats>
            
            <ProductGrid>
              {filteredProducts.map((item) => (
                <ProductCard key={`${item.id}-${item.viewedAt.getTime()}`}>
                  <ViewedTime>{formatTimeAgo(item.viewedAt)}</ViewedTime>
                  <Link to={`/products/${item.product.id}`}>
                    <ProductImage src={item.product.baseImage} alt={item.product.name} />
                    <ProductInfo>
                      <Brand>{item.product.brand}</Brand>
                      <ProductName>{item.product.name}</ProductName>
                      <Price>{formatPrice(item.product.variants[0].price.instant)}</Price>
                    </ProductInfo>
                  </Link>
                </ProductCard>
              ))}
            </ProductGrid>
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>👀</EmptyIcon>
            <EmptyText>최근 본 상품이 없습니다</EmptyText>
            <EmptySubText>상품을 둘러보고 관심 있는 제품을 찾아보세요</EmptySubText>
          </EmptyState>
        )}
      </Content>
    </Container>
  );
};

export default RecentProductsPage;