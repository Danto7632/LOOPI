import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface SearchSuggestion {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
}

interface SearchComponentProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

// Mock data - 실제로는 API에서 가져와야 함
const mockProducts: SearchSuggestion[] = [
  {
    id: 1,
    name: "ThinkPad T480",
    brand: "Lenovo",
    category: "노트북",
    image: "/images/thinkpad-t480.jpg",
    price: 850000
  },
  {
    id: 2,
    name: "MacBook Pro 13",
    brand: "Apple",
    category: "노트북",
    image: "/images/macbook-pro-13.jpg",
    price: 1500000
  },
  {
    id: 3,
    name: "iPad Air",
    brand: "Apple",
    category: "태블릿",
    image: "/images/ipad-air.jpg",
    price: 650000
  },
  {
    id: 4,
    name: "Galaxy Tab S8",
    brand: "Samsung",
    category: "태블릿",
    image: "/images/galaxy-tab-s8.jpg",
    price: 700000
  },
  {
    id: 5,
    name: "iPhone 14 Pro",
    brand: "Apple",
    category: "스마트폰",
    image: "/images/iphone-14-pro.jpg",
    price: 1200000
  }
];

const SearchComponent: React.FC<SearchComponentProps> = ({ 
  placeholder = "브랜드, 모델명, 제품명 검색", 
  onSearch,
  className 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      // 검색어에 따른 필터링
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        } else if (searchQuery.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion.name);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  return (
    <SearchContainer ref={searchRef} className={className}>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery && setShowSuggestions(true)}
        />
        <SearchButton onClick={handleSearch}>
          🔍
        </SearchButton>
      </SearchInputWrapper>
      
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsDropdown>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={suggestion.id}
              isHighlighted={index === highlightedIndex}
              onClick={() => handleSuggestionClick(suggestion)}
              as={Link}
              to={`/products/${suggestion.id}`}
            >
              <ProductImage src={suggestion.image} alt={suggestion.name} />
              <ProductInfo>
                <ProductName>{suggestion.name}</ProductName>
                <ProductDetails>
                  <ProductBrand>{suggestion.brand}</ProductBrand>
                  <ProductCategory>{suggestion.category}</ProductCategory>
                </ProductDetails>
                <ProductPrice>{formatPrice(suggestion.price)}</ProductPrice>
              </ProductInfo>
            </SuggestionItem>
          ))}
        </SuggestionsDropdown>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 50px 12px 16px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  font-size: 14px;
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

const SearchButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 4px;
`;

const SuggestionItem = styled.div<{ isHighlighted: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  ${props => props.isHighlighted && `
    background-color: #f8f9fa;
  `}

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
  background-color: #f5f5f5;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #000;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductDetails = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
`;

const ProductBrand = styled.span`
  font-size: 12px;
  color: #666;
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
`;

const ProductCategory = styled.span`
  font-size: 12px;
  color: #666;
`;

const ProductPrice = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #ff6b35;
`;

export default SearchComponent;