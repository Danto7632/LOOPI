import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS, formatPrice } from '../data/products';

const ProductListContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

// KREAM 스타일 메인 배너
const MainBanner = styled.div`
  background: linear-gradient(135deg, #222 0%, #444 100%);
  border-radius: 16px;
  padding: 60px 40px;
  margin: 24px 0;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/메인.jpeg') center/cover;
    opacity: 0.1;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
    margin: 16px 0;
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 1;
`;

const BannerTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const BannerButton = styled(Link)`
  display: inline-block;
  background: white;
  color: #222;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

// 검색 및 필터 헤더
const SearchHeader = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #ebebeb;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  font-size: 16px;
  background: #fafafa;

  &:focus {
    outline: none;
    border-color: #222;
    background: white;
  }

  &::placeholder {
    color: #8e8e93;
  }
`;

// 카테고리 및 필터 - KREAM 스타일
const FilterSection = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => props.active ? '#222' : '#ebebeb'};
  background: ${props => props.active ? '#222' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: #222;
  }
`;

// 정렬 및 뷰 옵션
const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 4px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const SortOptions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SortButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  border: none;
  background: none;
  color: ${props => props.active ? '#222' : '#8e8e93'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  position: relative;

  ${props => props.active && `
    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: #222;
    }
  `}
`;

const ProductCount = styled.div`
  color: #8e8e93;
  font-size: 14px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

// 상품 그리드 - KREAM 스타일
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const ProductCard = styled(Link)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border: 1px solid #ebebeb;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #fafafa;
  overflow: hidden;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #8e8e93;
  background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
`;

const ProductBadge = styled.span<{ type: string }>`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  background: ${props => {
    switch (props.type) {
      case '즉시거래': return '#31b96e';
      case '공동구매': return '#4a90e2';
      case '호가등록': return '#ff6b35';
      default: return '#8e8e93';
    }
  }};
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const ProductBrand = styled.div`
  font-size: 11px;
  color: #888;
  font-weight: 600;
  margin-bottom: 2px;
`;

const ProductName = styled.h3`
  font-size: 13px;
  font-weight: 400;
  color: #222;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ProductSpecs = styled.div`
  font-size: 10px;
  color: #aaa;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// KREAM 스타일 가격 표시
const ProductPrices = styled.div`
  margin-top: 8px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const PriceLabel = styled.div`
  font-size: 10px;
  color: #8e8e93;
`;

const PriceValue = styled.div<{ type?: 'buy' | 'sell' }>`
  font-size: 12px;
  font-weight: 700;
  color: ${props => {
    if (props.type === 'buy') return '#ef4444';
    if (props.type === 'sell') return '#22c55e';
    return '#222';
  }};
`;

// 상품 메타 정보 (관심, 리뷰)
const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HeartIcon = styled.span`
  font-size: 12px;
  color: #ff6b6b;
`;

const ReviewIcon = styled.span`
  font-size: 10px;
  color: #ffc107;
`;

const MetaText = styled.span`
  font-size: 11px;
  color: #8e8e93;
  font-weight: 500;
`;

// 빈 상태
const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #8e8e93;

  h3 {
    font-size: 18px;
    margin-bottom: 8px;
    color: #222;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const ProductListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('laptop');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'laptop', name: '노트북' },
    { id: 'desktop', name: '데스크톱' }, 
    { id: 'monitor', name: '모니터' },
    { id: 'mobile', name: '모바일' },
    { id: 'tablet', name: '태블릿' }
  ];

  const sortOptions = [
    { id: 'latest', name: '최신순' },
    { id: 'price-low', name: '가격 낮은순' },
    { id: 'price-high', name: '가격 높은순' },
    { id: 'popular', name: '인기순' }
  ];

  // 실제 제품 데이터를 목록 표시용으로 변환
  const convertToListData = () => {
    return MOCK_PRODUCTS.map(product => {
      const baseVariant = product.variants[0];
      
      // 호가 시뮬레이션
      const hasBuyOrders = Math.random() > 0.3;
      const hasSellOrders = Math.random() > 0.3;
      const isGroupBuy = Math.random() > 0.7;
      
      let badge = '';
      if (hasBuyOrders && hasSellOrders) {
        badge = '즉시거래';
      } else if (hasBuyOrders || hasSellOrders) {
        badge = '호가등록';
      } else if (isGroupBuy) {
        badge = '공동구매';
      } else {
        badge = '예약거래';
      }

      return {
        id: product.id,
        category: product.category,
        brand: product.brand,
        name: product.name,
        specs: Object.entries(baseVariant.specs).slice(0, 3).map(([key, value]) => 
          `${key}: ${Array.isArray(value) ? value[0] : value}`
        ).join(', '),
        instantBuy: baseVariant.price.instant,
        instantSell: baseVariant.price.reserve,
        badge: badge,
        image: `${product.name} 이미지`,
        hasBuyOrders,
        hasSellOrders,
        isGroupBuy
      };
    });
  };

  const products = convertToListData();

  // 필터링 및 정렬
  const filteredProducts = products
    .filter(product => {
      const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
      const searchMatch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.instantBuy - b.instantBuy;
        case 'price-high':
          return b.instantBuy - a.instantBuy;
        case 'popular':
          return Math.random() - 0.5; // 임시 랜덤 정렬
        default:
          return 0; // 최신순은 기본 순서 유지
      }
    });

  return (
    <ProductListContainer>
      <Container>
        {/* KREAM 스타일 메인 배너 */}
        <MainBanner>
          <BannerContent>
            <BannerTitle>LOOPI</BannerTitle>
            <BannerSubtitle>IT 자산의 새로운 거래 경험</BannerSubtitle>
            <BannerButton to="/products">지금 거래하기</BannerButton>
          </BannerContent>
        </MainBanner>

        {/* 검색 헤더 */}
        <SearchHeader>
          <SearchInput 
            type="text"
            placeholder="브랜드, 모델명, 제품명 검색 (예: ThinkPad T480)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchHeader>

        {/* 카테고리 필터 */}
        <FilterSection>
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </FilterChip>
          ))}
        </FilterSection>

        {/* 정렬 및 결과 수 */}
        <ControlBar>
          <SortOptions>
            {sortOptions.map((option) => (
              <SortButton
                key={option.id}
                active={sortBy === option.id}
                onClick={() => setSortBy(option.id)}
              >
                {option.name}
              </SortButton>
            ))}
          </SortOptions>
          <ProductCount>
            총 {filteredProducts.length}개 상품
          </ProductCount>
        </ControlBar>

        {/* 상품 그리드 */}
        {filteredProducts.length > 0 ? (
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} to={`/products/${product.id}`}>
                <ProductImageContainer>
                  <ProductImage>{product.image}</ProductImage>
                  <ProductBadge type={product.badge}>
                    {product.badge}
                  </ProductBadge>
                </ProductImageContainer>
                <ProductInfo>
                  <ProductBrand>{product.brand}</ProductBrand>
                  <ProductName>{product.name}</ProductName>
                  <ProductSpecs>{product.specs}</ProductSpecs>
                  <ProductPrices>
                    <PriceRow>
                      <PriceLabel>즉시 구매가</PriceLabel>
                      <PriceValue type="buy">{formatPrice(product.instantBuy)}</PriceValue>
                    </PriceRow>
                    <PriceRow>
                      <PriceLabel>즉시 판매가</PriceLabel>
                      <PriceValue type="sell">{formatPrice(product.instantSell)}</PriceValue>
                    </PriceRow>
                  </ProductPrices>
                  <ProductMeta>
                    <MetaItem>
                      <HeartIcon>♡</HeartIcon>
                      <MetaText>{Math.floor(Math.random() * 500) + 50}</MetaText>
                    </MetaItem>
                    <MetaItem>
                      <ReviewIcon>⭐</ReviewIcon>
                      <MetaText>{Math.floor(Math.random() * 100) + 10}</MetaText>
                    </MetaItem>
                  </ProductMeta>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        ) : (
          <EmptyState>
            <h3>검색 결과가 없습니다</h3>
            <p>다른 검색어를 입력하거나 필터를 변경해보세요.</p>
          </EmptyState>
        )}
      </Container>
    </ProductListContainer>
  );
};

export default ProductListPage;