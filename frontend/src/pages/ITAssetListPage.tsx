import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

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

// 슬라이더 배너 컨테이너
const BannerSliderContainer = styled.div`
  position: relative;
  margin: 24px 0;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 16px 0;
  }
`;

const BannerSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const BannerSlide = styled.div<{ backgroundImage?: string; backgroundColor?: string }>`
  min-width: 100%;
  height: 280px;
  padding: 60px 40px;
  color: white;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.backgroundColor || 'linear-gradient(135deg, #222 0%, #444 100%)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.backgroundImage ? `url(${props.backgroundImage}) center/cover` : 'none'};
    opacity: 0.3;
    z-index: 0;
  }

  @media (max-width: 768px) {
    height: 220px;
    padding: 40px 24px;
  }
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
`;

const SlideTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SlideSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const SlideButton = styled(Link)`
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

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;
  }
`;

// 슬라이더 네비게이션 (좌하단 1/4 형태)
const SliderNavigation = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    bottom: 12px;
    left: 12px;
    padding: 6px 12px;
  }
`;

const SlideCounter = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 12px;
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

const CategoryTabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 8px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => props.active ? '#222' : '#ddd'};
  background: ${props => props.active ? '#222' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: #222;
    background: ${props => props.active ? '#222' : '#f8f8f8'};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

const SearchControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: #f8f8f8;

  &:focus {
    outline: none;
    border-color: #222;
    background: white;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* iOS 줌 방지 */
  }
`;

const SortSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #222;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// 컨트롤 바
const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 4px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const ProductCount = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

// 상품 그리드
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
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
  const [currentSlide, setCurrentSlide] = useState(0);

  // 슬라이더 배너 데이터
  const bannerSlides = [
    {
      id: 1,
      title: "IT 자산 거래",
      subtitle: "기업용 IT 자산을 안전하고 투명하게 거래하세요",
      buttonText: "거래 시작하기",
      buttonLink: "/register",
      backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "예약 거래 시스템",
      subtitle: "원하는 시기에 맞춰 예약하고 안전하게 거래하세요",
      buttonText: "예약하기",
      buttonLink: "/reservation",
      backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "기업 인증 거래",
      subtitle: "사업자 인증을 통한 신뢰할 수 있는 B2B 거래",
      buttonText: "인증하기",
      buttonLink: "/verification",
      backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "스페셜 이벤트",
      subtitle: "지금 가입하면 첫 거래 수수료 무료!",
      buttonText: "이벤트 참여",
      buttonLink: "/event",
      backgroundColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    }
  ];

  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 자동 슬라이드 효과
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
    }, 5000); // 5초마다 슬라이드 변경

    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  // 마우스 휠 이벤트 핸들러
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // 세로 스크롤이 더 클 때는 페이지 스크롤
      return;
    }
    
    e.preventDefault();
    if (e.deltaX > 0) {
      // 오른쪽으로 스크롤 - 다음 슬라이드
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
    } else if (e.deltaX < 0) {
      // 왼쪽으로 스크롤 - 이전 슬라이드
      setCurrentSlide(prev => prev === 0 ? bannerSlides.length - 1 : prev - 1);
    }
  };

  const categories = [
    { id: 'laptop', name: '노트북', icon: '💻' },
    { id: 'desktop', name: '데스크탑', icon: '🖥️' },
    { id: 'monitor', name: '모니터', icon: '📺' },
    { id: 'mobile', name: '모바일', icon: '📱' },
    { id: 'tablet', name: '태블릿', icon: '📱' },
    { id: 'accessory', name: '액세서리', icon: '⌨️' }
  ];

  // 필터링 로직
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // 정렬 로직
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.variants[0]?.price.instant || 0) - (b.variants[0]?.price.instant || 0);
      case 'price-high':
        return (b.variants[0]?.price.instant || 0) - (a.variants[0]?.price.instant || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default: // latest
        return 0;
    }
  });

  const handleHeartClick = (productId: string, isLiked: boolean) => {
    console.log(`Product ${productId} ${isLiked ? 'liked' : 'unliked'}`);
  };

  return (
    <ProductListContainer>
      <Container>
        {/* 슬라이더 배너 */}
        <BannerSliderContainer onWheel={handleWheel}>
          <BannerSlider style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {bannerSlides.map((slide) => (
              <BannerSlide key={slide.id} backgroundColor={slide.backgroundColor}>
                <SlideContent>
                  <SlideTitle>{slide.title}</SlideTitle>
                  <SlideSubtitle>{slide.subtitle}</SlideSubtitle>
                  <SlideButton to={slide.buttonLink}>{slide.buttonText}</SlideButton>
                </SlideContent>
              </BannerSlide>
            ))}
          </BannerSlider>
          
          {/* 좌하단 슬라이드 카운터 */}
          <SliderNavigation>
            <SlideCounter>
              {currentSlide + 1} / {bannerSlides.length}
            </SlideCounter>
          </SliderNavigation>
        </BannerSliderContainer>

        <SearchHeader>
          <CategoryTabs>
            {categories.map(category => (
              <CategoryTab
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon} {category.name}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <SearchControls>
            <SearchInput
              type="text"
              placeholder="상품명, 브랜드, 모델명으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SortSelect 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">최신순</option>
              <option value="price-low">낮은 가격순</option>
              <option value="price-high">높은 가격순</option>
              <option value="name">이름순</option>
            </SortSelect>
          </SearchControls>
        </SearchHeader>

        <ControlBar>
          <ProductCount>
            총 {sortedProducts.length}개 상품
          </ProductCount>
        </ControlBar>

        {/* 상품 그리드 */}
        {sortedProducts.length > 0 ? (
          <ProductGrid>
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showHeartIcon={true}
                onHeartClick={handleHeartClick}
              />
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