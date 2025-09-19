import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getProductById, formatPrice } from '../data/products';

const TradingContainer = styled.div`
  min-height: 100vh;
  background: #fafafa;
  padding: 20px 0;
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

// 헤더
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #222;
  margin-right: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #222;
`;

// 상품 정보 카드
const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 16px;
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #8e8e93;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductBrand = styled.div`
  font-size: 12px;
  color: #8e8e93;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const SelectedVariant = styled.div`
  font-size: 12px;
  color: #666;
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  display: inline-block;
`;

// 거래 타입 선택
const TradingTypeSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
`;

const TradingOptions = styled.div`
  display: grid;
  gap: 12px;
`;

const TradingOption = styled.div<{ selected: boolean; disabled?: boolean }>`
  padding: 16px;
  border: 2px solid ${props => props.selected ? '#222' : '#e5e5e5'};
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    border-color: ${props => props.disabled ? '#e5e5e5' : '#222'};
  }
`;

const OptionHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 8px;
`;

const OptionTitle = styled.div`
  font-weight: 600;
  color: #222;
`;

const OptionPrice = styled.div`
  font-weight: 700;
  color: #222;
`;

const OptionDescription = styled.div`
  font-size: 12px;
  color: #8e8e93;
  line-height: 1.4;
`;

const OptionBadge = styled.span<{ type: 'instant' | 'group' | 'bid' }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  margin-left: 8px;
  background: ${props => {
    switch (props.type) {
      case 'instant': return '#34c759';
      case 'group': return '#007aff';
      case 'bid': return '#ff9500';
      default: return '#8e8e93';
    }
  }};
`;

// 가격 입력
const PriceSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PriceInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #222;
  }
`;

const PriceGuide = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  color: #666;
  line-height: 1.4;
`;

// 수수료 정보
const FeeSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FeeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;

  &.total {
    border-top: 1px solid #f0f0f0;
    padding-top: 12px;
    font-weight: 600;
    font-size: 16px;
  }
`;

const FeeLabel = styled.div`
  color: #666;
`;

const FeeValue = styled.div`
  color: #222;
  font-weight: 500;
`;

// 액션 버튼
const ActionButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 16px;
  background: ${props => props.disabled ? '#e5e5e5' : '#222'};
  color: ${props => props.disabled ? '#8e8e93' : 'white'};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.disabled ? '#e5e5e5' : '#333'};
  }
`;

// 안내 메시지
const NoticeBox = styled.div`
  background: #f0f8ff;
  border: 1px solid #cce7ff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  font-size: 12px;
  line-height: 1.4;
  color: #666;

  strong {
    color: #222;
  }
`;

interface TradingPageProps {}

const TradingPage: React.FC<TradingPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'buy'; // 'buy' or 'sell'
  const variantId = searchParams.get('variant');

  const [selectedTradingType, setSelectedTradingType] = useState<'instant' | 'bid' | 'group'>('instant');
  const [price, setPrice] = useState('');

  const product = getProductById(id || '');
  const selectedVariant = product?.variants.find(v => v.id === variantId) || product?.variants[0];

  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedVariant) {
      if (mode === 'buy') {
        setPrice(selectedVariant.price.instant.toString());
      } else {
        setPrice(selectedVariant.price.reserve.toString());
      }
    }
  }, [selectedVariant, mode]);

  if (!product || !selectedVariant) {
    return (
      <TradingContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#8e8e93' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#222' }}>상품을 찾을 수 없습니다</h2>
            <p>요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
          </div>
        </Container>
      </TradingContainer>
    );
  }

  const currentPrice = parseInt(price) || 0;
  const serviceFee = Math.floor(currentPrice * 0.05); // 5% 서비스 수수료
  const paymentFee = mode === 'buy' ? Math.floor(currentPrice * 0.025) : 0; // 구매시 2.5% 결제 수수료
  const totalAmount = mode === 'buy' 
    ? currentPrice + serviceFee + paymentFee 
    : currentPrice - serviceFee;

  const handleSubmit = () => {
    if (!price || currentPrice <= 0) {
      alert('올바른 가격을 입력해주세요.');
      return;
    }

    // 실제로는 거래 API 호출
    alert(`${mode === 'buy' ? '구매' : '판매'} 요청이 등록되었습니다.`);
    navigate(`/products/${id}`);
  };

  const tradingOptions = mode === 'buy' ? [
    {
      id: 'instant' as const,
      title: '즉시 구매',
      price: selectedVariant.price.instant,
      description: '판매자가 등록한 가격으로 즉시 구매',
      badge: 'instant' as const,
      available: true
    },
    {
      id: 'bid' as const,
      title: '구매 입찰',
      price: selectedVariant.price.instant * 0.9,
      description: '원하는 가격으로 입찰 등록 후 판매자 매칭 대기',
      badge: 'bid' as const,
      available: true
    },
    {
      id: 'group' as const,
      title: '공동 구매',
      price: selectedVariant.price.instant * 0.8,
      description: '여러 구매자와 함께 구매하여 할인 혜택',
      badge: 'group' as const,
      available: Math.random() > 0.5 // 50% 확률로 공동구매 가능
    }
  ] : [
    {
      id: 'instant' as const,
      title: '즉시 판매',
      price: selectedVariant.price.reserve,
      description: '구매자가 등록한 가격으로 즉시 판매',
      badge: 'instant' as const,
      available: true
    },
    {
      id: 'bid' as const,
      title: '판매 입찰',
      price: selectedVariant.price.reserve * 1.1,
      description: '원하는 가격으로 입찰 등록 후 구매자 매칭 대기',
      badge: 'bid' as const,
      available: true
    }
  ];

  return (
    <TradingContainer>
      <Container>
        {/* 헤더 */}
        <Header>
          <BackButton onClick={() => navigate(-1)}>←</BackButton>
          <Title>{mode === 'buy' ? '구매하기' : '판매하기'}</Title>
        </Header>

        {/* 상품 정보 */}
        <ProductCard>
          <ProductInfo>
            <ProductImage>{selectedVariant.name} 이미지</ProductImage>
            <ProductDetails>
              <ProductBrand>{product.brand}</ProductBrand>
              <ProductName>{product.name}</ProductName>
              <SelectedVariant>{selectedVariant.name}</SelectedVariant>
            </ProductDetails>
          </ProductInfo>
        </ProductCard>

        {/* 거래 방식 선택 */}
        <TradingTypeSection>
          <SectionTitle>거래 방식 선택</SectionTitle>
          <TradingOptions>
            {tradingOptions.map((option) => (
              <TradingOption
                key={option.id}
                selected={selectedTradingType === option.id}
                disabled={!option.available}
                onClick={() => option.available && setSelectedTradingType(option.id)}
              >
                <OptionHeader>
                  <OptionTitle>
                    {option.title}
                    <OptionBadge type={option.badge}>
                      {option.badge === 'instant' ? '즉시' : 
                       option.badge === 'group' ? '공동' : '입찰'}
                    </OptionBadge>
                  </OptionTitle>
                  <OptionPrice>{formatPrice(option.price)}</OptionPrice>
                </OptionHeader>
                <OptionDescription>{option.description}</OptionDescription>
              </TradingOption>
            ))}
          </TradingOptions>
        </TradingTypeSection>

        {/* 가격 입력 (입찰일 때만) */}
        {selectedTradingType === 'bid' && (
          <PriceSection>
            <SectionTitle>희망 가격</SectionTitle>
            <PriceInput
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="가격을 입력하세요"
            />
            <PriceGuide>
              💡 <strong>가격 가이드</strong><br/>
              • 현재 시세: {formatPrice(selectedVariant.price.instant)}<br/>
              • 최근 거래가: {formatPrice(selectedVariant.price.reserve)}<br/>
              • 합리적인 가격을 제시하면 빠른 매칭이 가능합니다
            </PriceGuide>
          </PriceSection>
        )}

        {/* 수수료 정보 */}
        <FeeSection>
          <SectionTitle>예상 {mode === 'buy' ? '결제' : '정산'} 금액</SectionTitle>
          <FeeRow>
            <FeeLabel>{mode === 'buy' ? '상품가격' : '판매가격'}</FeeLabel>
            <FeeValue>{formatPrice(currentPrice)}</FeeValue>
          </FeeRow>
          <FeeRow>
            <FeeLabel>서비스 수수료 (5%)</FeeLabel>
            <FeeValue>{mode === 'buy' ? '+' : '-'}{formatPrice(serviceFee)}</FeeValue>
          </FeeRow>
          {mode === 'buy' && (
            <FeeRow>
              <FeeLabel>결제 수수료 (2.5%)</FeeLabel>
              <FeeValue>+{formatPrice(paymentFee)}</FeeValue>
            </FeeRow>
          )}
          <FeeRow className="total">
            <FeeLabel>{mode === 'buy' ? '총 결제금액' : '정산 예정금액'}</FeeLabel>
            <FeeValue>{formatPrice(totalAmount)}</FeeValue>
          </FeeRow>
        </FeeSection>

        {/* 확인 버튼 */}
        <ActionButton 
          disabled={!price || currentPrice <= 0}
          onClick={handleSubmit}
        >
          {mode === 'buy' ? '구매 확정' : '판매 등록'}
        </ActionButton>

        {/* 안내사항 */}
        <NoticeBox>
          <strong>🔒 안전거래 안내</strong><br/>
          • 모든 거래는 LOOPI 에스크로를 통해 안전하게 진행됩니다<br/>
          • 상품 검수 후 이상이 없을 경우에만 거래가 완료됩니다<br/>
          • {mode === 'buy' ? '구매 확정' : '판매 등록'} 후 7일 이내 취소가 가능합니다
        </NoticeBox>
      </Container>
    </TradingContainer>
  );
};

export default TradingPage;