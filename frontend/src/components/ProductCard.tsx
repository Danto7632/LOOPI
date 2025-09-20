import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatPrice, Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  showHeartIcon?: boolean;
  initialIsLiked?: boolean;
  onHeartClick?: (productId: string, isLiked: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showHeartIcon = true,
  initialIsLiked = false,
  onHeartClick 
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  
  // 첫 번째 variant의 가격 정보 사용
  const variant = product.variants[0];
  const instantPrice = variant?.price.instant || 0;
  const reservePrice = variant?.price.reserve || 0;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    
    if (onHeartClick) {
      onHeartClick(product.id, newIsLiked);
    }
  };

  return (
    <CardContainer to={`/products/${product.id}`}>
      <ProductImageContainer>
        <ProductImage>
          {product.baseImage ? (
            <img src={product.baseImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            `${product.name} 이미지`
          )}
        </ProductImage>
        
        <ProductBadge type="즉시거래">
          즉시거래
        </ProductBadge>
        
        {showHeartIcon && (
          <HeartButton onClick={handleHeartClick} $isLiked={isLiked}>
            {isLiked ? '❤️' : '🤍'}
          </HeartButton>
        )}
      </ProductImageContainer>
      
      <ProductInfo>
        <ProductBrand>{product.brand}</ProductBrand>
        <ProductName>{product.name}</ProductName>
        <ProductCategory>{product.category}</ProductCategory>
        
        <PriceSection>
          <PriceLabel>즉시 거래가</PriceLabel>
          <PriceValue>{formatPrice(instantPrice)}</PriceValue>
        </PriceSection>
        
        {reservePrice !== instantPrice && (
          <ReservePrice>
            예약가 {formatPrice(reservePrice)}
          </ReservePrice>
        )}
        
        <InteractionSection>
          <InteractionItem>
            <InteractionIcon>❤️</InteractionIcon>
            <span>{product.likes}</span>
          </InteractionItem>
          <InteractionItem>
            <InteractionIcon>⭐</InteractionIcon>
            <span>{product.reviews.count}</span>
          </InteractionItem>
        </InteractionSection>
      </ProductInfo>
    </CardContainer>
  );
};

const CardContainer = styled(Link)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border: 1px solid #ebebeb;
  display: block;

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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const HeartButton = styled.button<{ $isLiked: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${props => props.$isLiked ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)'};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ProductInfo = styled.div`
  padding: 8px;
`;

const ProductBrand = styled.div`
  font-size: 11px;
  color: #8e8e93;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const ProductName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #222;
  margin-bottom: 2px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductCategory = styled.div`
  font-size: 10px;
  color: #8e8e93;
  margin-bottom: 6px;
`;

const PriceSection = styled.div`
  margin-top: 6px;
`;

const PriceLabel = styled.div`
  font-size: 9px;
  color: #8e8e93;
  margin-bottom: 2px;
`;

const PriceValue = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #222;
`;

const ReservePrice = styled.div`
  font-size: 11px;
  color: #ff6b35;
  font-weight: 600;
  margin-top: 4px;
`;

const InteractionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
`;

const InteractionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #8e8e93;
`;

const InteractionIcon = styled.span`
  font-size: 12px;
`;

export default ProductCard;