import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: var(--white);
`;

const HeroSection = styled.section`
  position: relative;
  height: 400px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-3xl);

  @media (max-width: 768px) {
    height: 300px;
    margin-bottom: var(--spacing-2xl);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 0 var(--spacing-md);
`;

const HeroTitle = styled.h1`
  font-size: var(--font-3xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: var(--font-2xl);
  }
`;

const HeroSubtitle = styled.p`
  font-size: var(--font-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: var(--font-base);
  }
`;

const HeroButton = styled.button`
  background: var(--primary);
  color: var(--white);
  border: none;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-md);
  font-size: var(--font-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--secondary);
    transform: translateY(-1px);
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);

  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm);
  }
`;

const SectionTitle = styled.h2`
  font-size: var(--font-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;

  @media (max-width: 768px) {
    font-size: var(--font-xl);
    margin-bottom: var(--spacing-md);
  }
`;

const CategorySection = styled.section`
  margin-bottom: var(--spacing-3xl);

  @media (max-width: 768px) {
    margin-bottom: var(--spacing-2xl);
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  overflow-x: auto;
  padding: var(--spacing-sm) 0;

  @media (max-width: 768px) {
    gap: var(--spacing-md);
    justify-content: flex-start;
    padding-left: var(--spacing-sm);
  }
`;

const CategoryTab = styled.button<{ active?: boolean }>`
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-secondary)'};
  font-size: var(--font-sm);
  font-weight: var(--font-medium);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.active ? 'var(--secondary)' : 'var(--gray-100)'};
    color: ${props => props.active ? 'var(--white)' : 'var(--text-primary)'};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: var(--white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-lg);
  color: var(--text-tertiary);

  @media (max-width: 768px) {
    height: 160px;
  }
`;

const ProductInfo = styled.div`
  padding: var(--spacing-md);
`;

const ProductBrand = styled.div`
  font-size: var(--font-xs);
  color: var(--text-tertiary);
  font-weight: var(--font-medium);
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
`;

const ProductName = styled.h3`
  font-size: var(--font-sm);
  color: var(--text-primary);
  font-weight: var(--font-medium);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-size: var(--font-base);
  color: var(--primary);
  font-weight: var(--font-bold);
`;

const StatsSection = styled.section`
  background: var(--gray-50);
  padding: var(--spacing-3xl) 0;
  margin-bottom: var(--spacing-3xl);

  @media (max-width: 768px) {
    padding: var(--spacing-2xl) 0;
    margin-bottom: var(--spacing-2xl);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  text-align: center;
`;

const StatItem = styled.div`
  padding: var(--spacing-lg);
`;

const StatNumber = styled.div`
  font-size: var(--font-3xl);
  font-weight: var(--font-bold);
  color: var(--primary);
  margin-bottom: var(--spacing-xs);
`;

const StatLabel = styled.div`
  font-size: var(--font-base);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
`;

const HomePage: React.FC = () => {
  const categories = ['추천', '신상', '러닝', '랭킹', '중고', '럭셔리'];
  
  const products = [
    { id: 1, brand: 'Nike', name: 'Air Jordan 1 Retro High OG', price: '200,000원' },
    { id: 2, brand: 'Adidas', name: 'Yeezy Boost 350 V2', price: '350,000원' },
    { id: 3, brand: 'Supreme', name: 'Box Logo Hoodie', price: '800,000원' },
    { id: 4, brand: 'Off-White', name: 'Industrial Belt', price: '150,000원' },
    { id: 5, brand: 'Balenciaga', name: 'Triple S Sneakers', price: '900,000원' },
    { id: 6, brand: 'Gucci', name: 'GG Marmont Bag', price: '1,200,000원' },
    { id: 7, brand: 'Louis Vuitton', name: 'Neverfull MM', price: '1,800,000원' },
    { id: 8, brand: 'Hermès', name: 'Birkin 30', price: '15,000,000원' },
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>LOOPI에서 만나는 한정판</HeroTitle>
          <HeroSubtitle>
            국내외 브랜드의 정품만을 엄선하여 제공합니다.<br />
            검증된 상품으로 안전한 거래를 경험하세요.
          </HeroSubtitle>
          <HeroButton>쇼핑 시작하기</HeroButton>
        </HeroContent>
      </HeroSection>

      <Container>
        <CategorySection>
          <SectionTitle>카테고리별 인기 상품</SectionTitle>
          
          <CategoryTabs>
            {categories.map((category, index) => (
              <CategoryTab key={category} active={index === 0}>
                {category}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage>
                  📸
                </ProductImage>
                <ProductInfo>
                  <ProductBrand>{product.brand}</ProductBrand>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.price}</ProductPrice>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        </CategorySection>
      </Container>

      <StatsSection>
        <Container>
          <SectionTitle>LOOPI 통계</SectionTitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>1M+</StatNumber>
              <StatLabel>월 방문자 수</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>500K+</StatNumber>
              <StatLabel>누적 회원 수</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>100K+</StatNumber>
              <StatLabel>월 거래 건수</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>99.9%</StatNumber>
              <StatLabel>정품 판별률</StatLabel>
            </StatItem>
          </StatsGrid>
        </Container>
      </StatsSection>
    </HomeContainer>
  );
};

export default HomePage;