import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TradingContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
`;

const Container = styled.div`
  max-width: var(--wide);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`;

// KREAM 스타일 탭 네비게이션
const TabContainer = styled.div`
  background: var(--white);
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 70px;
  z-index: 50;
`;

const TabNav = styled.div`
  display: flex;
  max-width: var(--wide);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: var(--spacing-lg) 0;
  border: none;
  background: transparent;
  font-size: var(--font-size-base);
  font-weight: ${props => props.active ? 'var(--font-semibold)' : 'var(--font-normal)'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--gray-600)'};
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;

  &:hover {
    color: var(--primary);
  }

  ${props => props.active && `
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: var(--primary);
    }
  `}

  @media (max-width: 640px) {
    font-size: var(--font-size-sm);
    padding: var(--spacing-md) 0;
  }
`;

const TabContent = styled.div`
  padding: var(--spacing-3xl) 0;

  @media (max-width: 640px) {
    padding: var(--spacing-lg) 0;
  }
`;

// 상품 그리드 (KREAM 스타일)
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-3xl);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  @media (max-width: 480px) {
    gap: var(--spacing-sm);
  }
`;

const ProductCard = styled(Link)`
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-fast);
  border: 1px solid var(--border-light);
  min-height: 280px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 768px) {
    min-height: 240px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 480px) {
    min-height: 200px;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 180px;
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  background-image: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);

  @media (max-width: 768px) {
    height: 140px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    height: 120px;
    font-size: 0.9rem;
  }
`;

const ProductBadge = styled.div<{ type: string }>`
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-bold);
  color: var(--white);
  
  ${props => {
    switch (props.type) {
      case 'instant': return 'background: var(--success);';
      case 'reserve': return 'background: var(--data-purple);';
      case 'group': return 'background: var(--enterprise-orange);';
      default: return 'background: var(--gray-400);';
    }
  }}
`;

const ProductInfo = styled.div`
  padding: var(--spacing-lg);

  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
`;

const ProductBrand = styled.div`
  font-size: var(--font-size-xs);
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-xs);
`;

const ProductName = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-medium);
  color: var(--primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
    margin-bottom: var(--spacing-xs);
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.3;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xxs);
  }
`;

const PriceLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--gray-500);

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const PriceValue = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-semibold);
  color: var(--primary);

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// 필터 및 정렬
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
  padding: 0 var(--spacing-sm);

  @media (max-width: 640px) {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);

  @media (max-width: 640px) {
    justify-content: space-between;
  }
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid ${props => props.active ? 'var(--primary)' : 'var(--border)'};
  background: ${props => props.active ? 'var(--primary)' : 'var(--white)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--gray-700)'};
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--primary);
    color: ${props => props.active ? 'var(--white)' : 'var(--primary)'};
  }
`;

const SortSelect = styled.select`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: var(--white);

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const TradingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('instant');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const tabs = [
    { id: 'instant', label: '즉시거래' },
    { id: 'reserve', label: '예약거래' },
    { id: 'group', label: '공동구매' }
  ];

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'desktop', label: '데스크톱' },
    { id: 'laptop', label: '노트북' },
    { id: 'monitor', label: '모니터' },
    { id: 'network', label: '네트워크' }
  ];

  const instantProducts = [
    {
      id: 1,
      brand: 'Dell',
      name: 'OptiPlex 7090 Mini',
      image: 'Dell OptiPlex 7090',
      price: '450,000',
      badge: 'instant',
      category: 'desktop'
    },
    {
      id: 2,
      brand: 'Lenovo',
      name: 'ThinkPad T480',
      image: 'Lenovo ThinkPad',
      price: '320,000',
      badge: 'instant',
      category: 'laptop'
    },
    {
      id: 3,
      brand: 'Samsung',
      name: '27인치 QHD 모니터',
      image: 'Samsung 모니터',
      price: '180,000',
      badge: 'instant',
      category: 'monitor'
    },
    {
      id: 4,
      brand: 'HP',
      name: 'EliteBook 840 G8',
      image: 'HP EliteBook',
      price: '380,000',
      badge: 'instant',
      category: 'laptop'
    }
  ];

  const reserveProducts = [
    {
      id: 5,
      brand: 'Dell',
      name: 'OptiPlex 7090 (50대 이상)',
      image: 'Dell OptiPlex 대량',
      price: '최대 450,000',
      badge: 'reserve',
      category: 'desktop'
    },
    {
      id: 6,
      brand: 'Apple',
      name: 'MacBook Pro 14인치',
      image: 'MacBook Pro',
      price: '최대 1,200,000',
      badge: 'reserve',
      category: 'laptop'
    }
  ];

  const groupProducts = [
    {
      id: 7,
      brand: 'Lenovo',
      name: 'ThinkCentre M920 (78/100명)',
      image: 'Lenovo ThinkCentre',
      price: '290,000 (18% 할인)',
      badge: 'group',
      category: 'desktop'
    },
    {
      id: 8,
      brand: 'LG',
      name: '24인치 모니터 (156/200명)',
      image: 'LG 모니터',
      price: '140,000 (22% 할인)',
      badge: 'group',
      category: 'monitor'
    }
  ];

  const getCurrentProducts = () => {
    let products;
    switch (activeTab) {
      case 'instant':
        products = instantProducts;
        break;
      case 'reserve':
        products = reserveProducts;
        break;
      case 'group':
        products = groupProducts;
        break;
      default:
        products = instantProducts;
    }

    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }

    return products;
  };

  const renderTabContent = () => {
    const products = getCurrentProducts();

    return (
      <>
        <FilterContainer>
          <FilterGroup>
            {categories.map((category) => (
              <FilterButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </FilterButton>
            ))}
          </FilterGroup>
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="price-low">가격 낮은순</option>
            <option value="price-high">가격 높은순</option>
            <option value="popular">인기순</option>
          </SortSelect>
        </FilterContainer>

        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} to={`/products/${product.id}`}>
              <ProductImage>
                {product.image}
                <ProductBadge type={product.badge}>
                  {activeTab === 'instant' && '즉시거래'}
                  {activeTab === 'reserve' && '예약거래'}  
                  {activeTab === 'group' && '공동구매'}
                </ProductBadge>
              </ProductImage>
              <ProductInfo>
                <ProductBrand>{product.brand}</ProductBrand>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  <PriceLabel>
                    {activeTab === 'instant' && '즉시 구매가'}
                    {activeTab === 'reserve' && '희망 가격'}
                    {activeTab === 'group' && '공동구매가'}
                  </PriceLabel>
                  <PriceValue>₩{product.price}</PriceValue>
                </ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </>
    );
  };

  return (
    <TradingContainer>
      <TabContainer>
        <TabNav>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabNav>
      </TabContainer>

      <Container>
        <TabContent>
          {renderTabContent()}
        </TabContent>
      </Container>
    </TradingContainer>
  );
};

export default TradingPage;