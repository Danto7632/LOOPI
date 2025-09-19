import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(MOCK_PRODUCTS);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    handleSearch(query);
  }, [searchParams]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setResults(MOCK_PRODUCTS);
      return;
    }

    const filtered = MOCK_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleHeartClick = (productId: string, isLiked: boolean) => {
    console.log(`Product ${productId} ${isLiked ? 'liked' : 'unliked'}`);
  };

  return (
    <Container>
      <SearchHeader>
        <BackButton onClick={handleGoBack}>
          ←
        </BackButton>
        <SearchInputContainer>
          <SearchInput
            type="text"
            placeholder="브랜드, 모델명, 제품명 검색"
            value={searchQuery}
            onChange={handleInputChange}
            autoFocus
          />
          {searchQuery && (
            <ClearButton onClick={() => {
              setSearchQuery('');
              setResults(MOCK_PRODUCTS);
            }}>
              ×
            </ClearButton>
          )}
        </SearchInputContainer>
      </SearchHeader>

      <Content>
        {searchQuery && (
          <ResultsHeader>
            <ResultCount>"{searchQuery}" 검색 결과 {results.length}개</ResultCount>
          </ResultsHeader>
        )}

        {results.length > 0 ? (
          <ProductGrid>
            {results.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showHeartIcon={true}
                onHeartClick={handleHeartClick}
              />
            ))}
          </ProductGrid>
        ) : searchQuery ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle>검색 결과가 없습니다</EmptyTitle>
            <EmptyText>다른 키워드로 검색해보세요</EmptyText>
          </EmptyState>
        ) : (
          <RecentSection>
            <SectionTitle>인기 상품</SectionTitle>
            <ProductGrid>
              {MOCK_PRODUCTS.slice(0, 6).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showHeartIcon={true}
                  onHeartClick={handleHeartClick}
                />
              ))}
            </ProductGrid>
          </RecentSection>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const SearchHeader = styled.div`
  background: white;
  padding: 16px 20px;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #222;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  background: #ddd;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #666;

  &:hover {
    background: #ccc;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
`;

const ResultsHeader = styled.div`
  margin-bottom: 24px;
`;

const ResultCount = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #222;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 12px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #8e8e93;
  line-height: 1.5;
`;

const RecentSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 24px;
`;

export default SearchPage;