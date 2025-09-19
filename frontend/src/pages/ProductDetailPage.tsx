import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, formatPrice, ProductVariant } from '../data/products';

const DetailContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  
  @media (max-width: 768px) {
    padding-bottom: 120px; /* 모바일 푸터 공간 확보 */
    padding-top: 60px; /* 모바일 헤더 공간 확보 */
  }
`;

// 모바일 전용 헤더
const MobileHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  border-bottom: 1px solid #ebebeb;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 300; /* 기존 헤더보다 높은 z-index */
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
`;

const MobileHeaderTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

// 브레드크럼 - KREAM 스타일
const Breadcrumb = styled.div`
  padding: 16px 0;
  font-size: 13px;
  color: #9e9e9e;
  border-bottom: 1px solid #f0f0f0;

  a {
    color: #9e9e9e;
    text-decoration: none;
    
    &:hover {
      color: #222;
    }
  }

  span {
    margin: 0 6px;
    color: #d3d3d3;
  }
`;

// 메인 상품 섹션 - KREAM 레이아웃
const ProductSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 80px;
  padding: 40px 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// 이미지 섹션 - KREAM 스타일 (모바일 고려)
const ImageSection = styled.div`
  position: sticky;
  top: 80px;
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
    top: auto;
  }
`;

const MainImageContainer = styled.div`
  background: #fafafa;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
  aspect-ratio: 1;
`;

const MainImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #8e8e93;
  font-weight: 500;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const Thumbnail = styled.div<{ active: boolean }>`
  aspect-ratio: 1;
  background: #fafafa;
  border-radius: 8px;
  border: 2px solid ${props => props.active ? '#222' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #8e8e93;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #222;
  }
`;

// 상품 정보 섹션 - KREAM 레이아웃
const InfoSection = styled.div``;

const ProductHeader = styled.div`
  margin-bottom: 24px;
`;

const ProductBrand = styled.div`
  font-size: 14px;
  color: #555;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ProductName = styled.h1`
  font-size: 18px;
  font-weight: 400;
  color: #222;
  line-height: 1.4;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ProductCode = styled.div`
  font-size: 14px;
  color: #8e8e93;
  margin-bottom: 16px;
`;

const ReviewSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #007aff;
    font-size: 16px;
  }

  .count {
    color: #8e8e93;
  }
`;

// KREAM 스타일 가격 섹션
const PriceSection = styled.div`
  margin-bottom: 32px;
  padding: 20px;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  background: #fff;
  
  @media (max-width: 768px) {
    display: none; /* 모바일에서 숨김 */
  }
`;

const PriceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PriceTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

const MarketPriceInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`;

const PriceCard = styled.div<{ type: 'buy' | 'sell' }>`
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: ${props => props.type === 'buy' ? '#fff5f5' : '#f5fff5'};
  border: 1px solid ${props => props.type === 'buy' ? '#ffebeb' : '#ebffeb'};
`;

const PriceType = styled.div<{ type: 'buy' | 'sell' }>`
  font-size: 12px;
  color: ${props => props.type === 'buy' ? '#f15746' : '#31b96e'};
  font-weight: 600;
  margin-bottom: 4px;
`;

const PriceAmount = styled.div<{ type: 'buy' | 'sell' }>`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.type === 'buy' ? '#f15746' : '#31b96e'};
`;

// 옵션 선택 - KREAM 스타일
const OptionSection = styled.div`
  margin-bottom: 24px;
`;

const OptionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #222;
  margin-bottom: 12px;
`;

const OptionGrid = styled.div`
  display: grid;
  gap: 8px;
`;

const OptionCard = styled.div<{ selected: boolean }>`
  padding: 16px;
  border: 1px solid ${props => props.selected ? '#222' : '#ebebeb'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#fafafa' : 'white'};

  &:hover {
    border-color: #222;
  }
`;

const OptionName = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 14px;
  color: #222;
`;

const OptionSpecs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
`;

const SpecChip = styled.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #f0f0f0;
  color: #666;
`;

const OptionPrices = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;

const PriceInfo = styled.div`
  text-align: center;
`;

const PriceLabel = styled.div`
  color: #8e8e93;
  margin-bottom: 2px;
`;

const PriceValue = styled.div`
  font-weight: 600;
  color: #222;
`;

// 거래 버튼 섹션 - KREAM 스타일
const TradingSection = styled.div`
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    display: none; /* 모바일에서 숨김 */
  }
`;

const TradingButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 16px;
`;

const TradeButton = styled.button<{ type: 'buy' | 'sell' }>`
  padding: 18px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background: ${props => props.type === 'buy' ? '#ef4444' : '#22c55e'};
  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TradingInfo = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const TradingTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const QuickActionButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid #e5e5e5;
  background: white;
  color: #222;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #222;
  }
`;

// 상세 거래 정보 섹션
const TradingDetailSection = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  /* 시세 그래프와 체결 거래는 전체 너비 */
  > div:first-child,
  > div:nth-child(2) {
    grid-column: 1 / -1;
  }
`;

const TradingCard = styled.div`
  background: white;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  padding: 20px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
`;

// 체결 거래 테이블 - 상품.jpeg 스타일
const TradeHistorySection = styled.div``;

const TradeHistoryTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 16px;
`;

const HistoryTab = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>`
  padding: 12px 16px;
  border: none;
  background: none;
  color: ${props => props.active ? '#222' : '#999'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#222' : 'transparent'};
`;

const TradeTable = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  min-height: 300px; /* 최소 높이 설정으로 여백 문제 해결 */
`;

const TradeTableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 60px;
  gap: 8px;
  padding: 12px 16px;
  background: #f9f9f9;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  border-bottom: 1px solid #ebebeb;

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 4px;
    padding: 10px 12px;
    font-size: 11px;
    
    > div:last-child {
      display: none;
    }
  }
`;

const TradeTableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 60px;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #f5f5f5;
  font-size: 13px;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 4px;
    padding: 10px 12px;
    font-size: 12px;
    
    > div:last-child {
      display: none;
    }
  }
`;

const ModelInfo = styled.div`
  font-weight: 500;
  color: #222;
`;

const TradePrice = styled.div.withConfig({
  shouldForwardProp: (prop) => !['trend', 'type'].includes(prop)
})<{ trend?: 'up' | 'down' | 'same', type?: 'sell' | 'buy' }>`
  font-weight: 600;
  color: ${props => {
    if (props.type === 'sell') return '#ef4444';
    if (props.type === 'buy') return '#3b82f6';
    switch (props.trend) {
      case 'up': return '#22c55e';
      case 'down': return '#ef4444';
      default: return '#222';
    }
  }};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TrendIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'trend'
})<{ trend: 'up' | 'down' | 'same' }>`
  font-size: 10px;
  color: ${props => {
    switch (props.trend) {
      case 'up': return '#22c55e';
      case 'down': return '#ef4444';
      default: return '#666';
    }
  }};
`;

// 배송 정보
const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DeliveryOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 6px;
`;

const DeliveryType = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #222;
`;

const DeliveryInfo = styled.span`
  font-size: 12px;
  color: #666;
`;

// 시세 그래프 영역 - 실제 차트처럼
const PriceChartSection = styled.div`
  margin-bottom: 20px;
`;

const ChartTabs = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 16px;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 2px;
`;

const ChartTab = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>`
  flex: 1;
  padding: 8px 12px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#222' : '#666'};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const PriceChartArea = styled.div`
  height: 200px;
  background: white;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  margin-bottom: 16px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PriceAxis = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  color: #999;
  padding: 8px 4px;
`;

const ChartLine = styled.svg`
  width: calc(100% - 60px);
  height: 100%;
`;

// 하단 정보 탭
const InfoTabs = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 32px; /* 체결거래 섹션과의 여백 추가 */
`;

const TabNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
`;

const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>`
  flex: 1;
  padding: 20px;
  border: none;
  background: ${props => props.active ? '#222' : 'white'};
  color: ${props => props.active ? 'white' : '#8e8e93'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#222' : '#f8f9fa'};
    color: ${props => props.active ? 'white' : '#222'};
  }
`;

const TabContent = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

// 모바일 푸터 스타일
const MobileFooter = styled.div`
  position: fixed;
  bottom: 60px; /* 모바일 네비게이션 바로 위에 위치 */
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #ebebeb;
  padding: 12px 16px;
  display: none;
  z-index: 1001; /* 모바일 네비게이션보다 높게 설정 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const FooterActionGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const WishButton = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid #ebebeb;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HeartIcon = styled.span`
  font-size: 20px;
  color: #666;
`;

const FooterButtonGroup = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const FooterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant'
})<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 8px;
  background: ${props => props.variant === 'primary' ? '#ef4444' : '#22c55e'};
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
`;

const ButtonPrice = styled.span`
  font-size: 11px;
  font-weight: 400;
  opacity: 0.9;
  margin-top: 1px;
`;

const SpecsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SpecRow = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SpecLabel = styled.td`
  padding: 16px 0;
  font-weight: 600;
  color: #666;
  width: 30%;
  vertical-align: top;
`;

const SpecValue = styled.td`
  padding: 16px 0;
  color: #222;
`;

const NoticeBox = styled.div`
  background: #f0f8ff;
  border: 1px solid #cce7ff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #666;

  strong {
    color: #222;
  }
`;

interface ProductDetailPageProps {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tradeHistoryTab, setTradeHistoryTab] = useState('completed'); // 체결거래, 판매입찰, 구매입찰

  const product = getProductById(id || '');
  
  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // 구매 클릭 핸들러
  const handleBuyClick = (type: 'instant' | 'bid') => {
    if (!selectedVariant) return;
    
    if (type === 'instant') {
      // 즉시 구매 페이지로 이동
      navigate(`/products/${id}/trade?mode=buy&type=instant&variant=${selectedVariant.id}`);
    } else {
      // 구매 입찰 페이지로 이동
      navigate(`/products/${id}/trade?mode=buy&type=bid&variant=${selectedVariant.id}`);
    }
  };

  // 판매 클릭 핸들러
  const handleSellClick = (type: 'instant' | 'bid') => {
    if (!selectedVariant) return;
    
    if (type === 'instant') {
      // 즉시 판매 페이지로 이동
      navigate(`/products/${id}/trade?mode=sell&type=instant&variant=${selectedVariant.id}`);
    } else {
      // 판매 입찰 페이지로 이동
      navigate(`/products/${id}/trade?mode=sell&type=bid&variant=${selectedVariant.id}`);
    }
  };

  if (!product) {
    return (
      <DetailContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#8e8e93' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#222' }}>상품을 찾을 수 없습니다</h2>
            <p>요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
          </div>
        </Container>
      </DetailContainer>
    );
  }

  // 모든 이미지 (메인 + 변형별)
  const allImages = [
    `${product.name} 메인`,
    ...product.variants.map(v => `${v.name} 이미지`)
  ];

  const renderTabContent = () => {
    if (!selectedVariant) return null;

    switch (activeTab) {
      case 'specs':
        return (
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#222' }}>
              상세 스펙
            </h4>
            <SpecsTable>
              <tbody>
                {Object.entries(selectedVariant.specs).map(([key, value]) => (
                  <SpecRow key={key}>
                    <SpecLabel>{key}</SpecLabel>
                    <SpecValue>{Array.isArray(value) ? value.join(', ') : value}</SpecValue>
                  </SpecRow>
                ))}
              </tbody>
            </SpecsTable>
          </div>
        );
      case 'reviews':
        return (
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#222' }}>
              상품 리뷰 ({product.reviews.count}개)
            </h4>
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#8e8e93' }}>
              <p>평점: ⭐ {product.reviews.rating}/5.0</p>
              <p style={{ marginTop: '16px' }}>리뷰 시스템이 곧 추가될 예정입니다.</p>
            </div>
          </div>
        );
      case 'trading':
        return (
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#222' }}>
              거래 정보
            </h4>
            <div style={{ lineHeight: '1.6', color: '#666' }}>
              <p style={{ marginBottom: '16px' }}><strong style={{ color: '#222' }}>거래 방식:</strong></p>
              <ul style={{ marginLeft: '16px', marginBottom: '20px' }}>
                <li>• <strong>즉시거래:</strong> 상대방이 등록한 호가가 있으면 바로 거래 성사</li>
                <li>• <strong>호가등록:</strong> 원하는 가격으로 구매/판매 희망 등록</li>
                <li>• <strong>공동구매:</strong> 통판매로 올라온 상품을 여러명이 나누어 구매</li>
              </ul>
              
              <p style={{ marginBottom: '16px' }}><strong style={{ color: '#222' }}>공동구매 성사 조건:</strong></p>
              <ul style={{ marginLeft: '16px', marginBottom: '20px' }}>
                <li>• 통판매 수량을 구매희망자들이 모두 채우는 경우</li>
                <li>• 통구매 희망자가 전체 수량을 구매하는 경우</li>
              </ul>
              
              <NoticeBox>
                <strong>🔒 거래 안전</strong><br/>
                모든 거래는 LOOPI 에스크로 시스템을 통해 안전하게 진행됩니다. 
                상품 검수 후 정상 확인되면 거래가 완료됩니다.
              </NoticeBox>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DetailContainer>
      {/* 모바일 전용 헤더 */}
      <MobileHeader>
        <BackButton onClick={() => navigate(-1)}>
          ←
        </BackButton>
        <MobileHeaderTitle>상품 상세</MobileHeaderTitle>
        <div style={{ width: '24px' }}></div>
      </MobileHeader>

      <Container>
        {/* 브레드크럼 */}
        <Breadcrumb>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            홈
          </a>
          <span></span>
          <a href="/products" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>
            상품
          </a>
          <span></span>
          <span>{product.name}</span>
        </Breadcrumb>

        {/* 메인 상품 섹션 */}
        <ProductSection>
          {/* 이미지 섹션 */}
          <ImageSection>
            <MainImageContainer>
              <MainImage>
                {allImages[selectedImage]}
              </MainImage>
            </MainImageContainer>
            <ThumbnailGrid>
              {allImages.map((image, index) => (
                <Thumbnail
                  key={index}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                >
                  {index + 1}
                </Thumbnail>
              ))}
            </ThumbnailGrid>
          </ImageSection>

          {/* 상품 정보 섹션 */}
          <InfoSection>
            <ProductHeader>
              <ProductBrand>{product.brand}</ProductBrand>
              <ProductName>{product.name}</ProductName>
              <ProductCode>상품번호: {product.id}</ProductCode>
              <ReviewSummary>
                <div className="rating">
                  ⭐ {product.reviews.rating}
                </div>
                <div className="count">
                  ({product.reviews.count}개 리뷰)
                </div>
              </ReviewSummary>
            </ProductHeader>

            {/* 옵션 선택 */}
            <OptionSection>
              <OptionTitle>옵션 선택</OptionTitle>
              <OptionGrid>
                {product.variants.map((variant) => (
                  <OptionCard
                    key={variant.id}
                    selected={selectedVariant?.id === variant.id}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <OptionName>{variant.name}</OptionName>
                    <OptionSpecs>
                      {Object.entries(variant.specs).map(([key, value]) => (
                        <SpecChip key={key}>
                          {key}: {Array.isArray(value) ? value.join(', ') : value}
                        </SpecChip>
                      ))}
                    </OptionSpecs>
                    <OptionPrices>
                      <PriceInfo>
                        <PriceLabel>구매 호가</PriceLabel>
                        <PriceValue>{formatPrice(variant.price.instant)}</PriceValue>
                      </PriceInfo>
                      <PriceInfo>
                        <PriceLabel>판매 호가</PriceLabel>
                        <PriceValue>{formatPrice(variant.price.reserve)}</PriceValue>
                      </PriceInfo>
                    </OptionPrices>
                  </OptionCard>
                ))}
              </OptionGrid>
            </OptionSection>

            {/* KREAM 스타일 가격 정보 */}
            {selectedVariant && (
              <PriceSection>
                <PriceHeader>
                  <PriceTitle>현재 시세</PriceTitle>
                </PriceHeader>
                <MarketPriceInfo>
                  <PriceCard type="buy">
                    <PriceType type="buy">즉시 구매가</PriceType>
                    <PriceAmount type="buy">{formatPrice(selectedVariant.price.instant)}</PriceAmount>
                  </PriceCard>
                  <PriceCard type="sell">
                    <PriceType type="sell">즉시 판매가</PriceType>
                    <PriceAmount type="sell">{formatPrice(selectedVariant.price.reserve)}</PriceAmount>
                  </PriceCard>
                </MarketPriceInfo>
              </PriceSection>
            )}

            {/* KREAM 스타일 거래 버튼 */}
            {selectedVariant && (
              <TradingSection>
                <TradingButtons>
                  <TradeButton 
                    type="buy"
                    onClick={() => navigate(`/products/${id}/trade?mode=buy&variant=${selectedVariant.id}`)}
                  >
                    구매
                    <div style={{fontSize: '12px', opacity: 0.8}}>
                      {formatPrice(selectedVariant.price.instant)}
                    </div>
                  </TradeButton>
                  <TradeButton 
                    type="sell"
                    onClick={() => navigate(`/products/${id}/trade?mode=sell&variant=${selectedVariant.id}`)}
                  >
                    판매
                    <div style={{fontSize: '12px', opacity: 0.8}}>
                      {formatPrice(selectedVariant.price.reserve)}
                    </div>
                  </TradeButton>
                </TradingButtons>

                <TradingInfo>
                  <TradingTitle>거래 정보</TradingTitle>
                  <div style={{fontSize: '12px', color: '#8e8e93', lineHeight: '1.4'}}>
                    • 모든 거래는 KREAM에서 검수한 뒤 배송됩니다.<br/>
                    • 구매 후 24시간 이내 검수가 시작됩니다.<br/>
                    • 배송비 무료 (5만원 이상 구매시)
                  </div>
                </TradingInfo>

                {/* 빠른 액션 */}
                <QuickActions>
                  <QuickActionButton>관심상품</QuickActionButton>
                  <QuickActionButton>가격 알림</QuickActionButton>
                  <QuickActionButton>공유하기</QuickActionButton>
                </QuickActions>
              </TradingSection>
            )}
          </InfoSection>
        </ProductSection>

        {/* 상세 거래 정보 섹션 - 상품.jpeg 스타일 */}
        {selectedVariant && (
          <TradingDetailSection>
            {/* 배송 정보 */}
            <TradingCard>
              <CardTitle>배송 정보</CardTitle>
              <DeliveryOptions>
                <DeliveryOption>
                  <DeliveryType>빠른배송</DeliveryType>
                  <DeliveryInfo>오늘 오후 6시 이전 주문시 내일 도착</DeliveryInfo>
                </DeliveryOption>
                <DeliveryOption>
                  <DeliveryType>일반배송</DeliveryType>
                  <DeliveryInfo>검수 후 1-2일 소요</DeliveryInfo>
                </DeliveryOption>
                <DeliveryOption>
                  <DeliveryType>창고보관</DeliveryType>
                  <DeliveryInfo>최대 30일 무료 보관</DeliveryInfo>
                </DeliveryOption>
              </DeliveryOptions>
            </TradingCard>

            {/* 시세 그래프 */}
            <TradingCard style={{gridColumn: '1 / -1'}}>
              <PriceChartSection>
                <ChartTabs>
                  <ChartTab active={true}>1개월</ChartTab>
                  <ChartTab active={false}>3개월</ChartTab>
                  <ChartTab active={false}>6개월</ChartTab>
                  <ChartTab active={false}>1년</ChartTab>
                  <ChartTab active={false}>전체</ChartTab>
                </ChartTabs>
                <PriceChartArea>
                  <ChartContainer>
                    <ChartLine viewBox="0 0 400 150" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        points="0,120 50,110 100,130 150,80 200,90 250,100 300,85 350,95 400,90"
                      />
                    </ChartLine>
                    <PriceAxis>
                      <span>200,000</span>
                      <span>180,000</span>
                      <span>160,000</span>
                      <span>140,000</span>
                      <span>120,000</span>
                      <span>100,000</span>
                    </PriceAxis>
                  </ChartContainer>
                </PriceChartArea>
              </PriceChartSection>
            </TradingCard>

            {/* 체결 거래 */}
            <TradingCard style={{gridColumn: '1 / -1'}}>
              <TradeHistorySection>
                <TradeHistoryTabs>
                  <HistoryTab 
                    active={tradeHistoryTab === 'completed'}
                    onClick={() => setTradeHistoryTab('completed')}
                  >
                    체결 거래
                  </HistoryTab>
                  <HistoryTab 
                    active={tradeHistoryTab === 'sell'}
                    onClick={() => setTradeHistoryTab('sell')}
                  >
                    판매 입찰
                  </HistoryTab>
                  <HistoryTab 
                    active={tradeHistoryTab === 'buy'}
                    onClick={() => setTradeHistoryTab('buy')}
                  >
                    구매 입찰
                  </HistoryTab>
                </TradeHistoryTabs>
                
                {tradeHistoryTab === 'completed' && (
                  <TradeTable>
                    <TradeTableHeader>
                      <div>옵션</div>
                      <div>거래가</div>
                      <div>거래일</div>
                      <div></div>
                    </TradeTableHeader>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 512GB SSD</ModelInfo>
                      <TradePrice trend="up">
                        {selectedVariant ? formatPrice(selectedVariant.price.instant) : '-'}
                        <TrendIcon trend="up">⚡</TrendIcon>
                      </TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>25/09/20</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 1TB SSD</ModelInfo>
                      <TradePrice trend="up">
                        {selectedVariant ? formatPrice(selectedVariant.price.instant + 200000) : '-'}
                        <TrendIcon trend="up">⚡</TrendIcon>
                      </TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>25/09/19</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 512GB SSD</ModelInfo>
                      <TradePrice trend="up">
                        {selectedVariant ? formatPrice(selectedVariant.price.instant + 100000) : '-'}
                        <TrendIcon trend="up">⚡</TrendIcon>
                      </TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>25/09/19</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 256GB SSD</ModelInfo>
                      <TradePrice>
                        {selectedVariant ? formatPrice(selectedVariant.price.instant - 200000) : '-'}
                      </TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>25/09/18</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 2TB SSD</ModelInfo>
                      <TradePrice trend="up">
                        {selectedVariant ? formatPrice(selectedVariant.price.instant + 400000) : '-'}
                        <TrendIcon trend="up">⚡</TrendIcon>
                      </TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>25/09/18</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 1TB SSD</ModelInfo>
                      <TradePrice trend="down">
                        {selectedVariant ? formatPrice(selectedVariant.price.instant - 50000) : '-'}
                        <TrendIcon trend="down">📉</TrendIcon>
                      </TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>25/09/17</div>
                      <div></div>
                    </TradeTableRow>
                  </TradeTable>
                )}

                {tradeHistoryTab === 'sell' && (
                  <TradeTable>
                    <TradeTableHeader>
                      <div>옵션</div>
                      <div>판매 희망가</div>
                      <div>수량</div>
                      <div></div>
                    </TradeTableHeader>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 512GB SSD</ModelInfo>
                      <TradePrice type="sell">{selectedVariant ? formatPrice(selectedVariant.price.reserve) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>3개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 1TB SSD</ModelInfo>
                      <TradePrice type="sell">{selectedVariant ? formatPrice(selectedVariant.price.reserve + 50000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>5개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 512GB SSD</ModelInfo>
                      <TradePrice type="sell">{selectedVariant ? formatPrice(selectedVariant.price.reserve + 30000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>2개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 256GB SSD</ModelInfo>
                      <TradePrice type="sell">{selectedVariant ? formatPrice(selectedVariant.price.reserve - 100000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>7개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 2TB SSD</ModelInfo>
                      <TradePrice type="sell">{selectedVariant ? formatPrice(selectedVariant.price.reserve + 150000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>1개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 1TB SSD</ModelInfo>
                      <TradePrice type="sell">{selectedVariant ? formatPrice(selectedVariant.price.reserve + 20000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>4개</div>
                      <div></div>
                    </TradeTableRow>
                  </TradeTable>
                )}

                {tradeHistoryTab === 'buy' && (
                  <TradeTable>
                    <TradeTableHeader>
                      <div>옵션</div>
                      <div>구매 희망가</div>
                      <div>수량</div>
                      <div></div>
                    </TradeTableHeader>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 512GB SSD</ModelInfo>
                      <TradePrice type="buy">{selectedVariant ? formatPrice(selectedVariant.price.instant) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>4개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 1TB SSD</ModelInfo>
                      <TradePrice type="buy">{selectedVariant ? formatPrice(selectedVariant.price.instant - 20000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>7개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 512GB SSD</ModelInfo>
                      <TradePrice type="buy">{selectedVariant ? formatPrice(selectedVariant.price.instant - 50000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>3개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 256GB SSD</ModelInfo>
                      <TradePrice type="buy">{selectedVariant ? formatPrice(selectedVariant.price.instant - 150000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>6개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>32GB RAM / 2TB SSD</ModelInfo>
                      <TradePrice type="buy">{selectedVariant ? formatPrice(selectedVariant.price.instant + 100000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>2개</div>
                      <div></div>
                    </TradeTableRow>
                    <TradeTableRow>
                      <ModelInfo>16GB RAM / 1TB SSD</ModelInfo>
                      <TradePrice type="buy">{selectedVariant ? formatPrice(selectedVariant.price.instant - 80000) : '-'}</TradePrice>
                      <div style={{fontSize: '12px', color: '#666'}}>5개</div>
                      <div></div>
                    </TradeTableRow>
                  </TradeTable>
                )}
                
                <div style={{textAlign: 'center', padding: '16px', borderTop: '1px solid #ebebeb'}}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}>
                    {tradeHistoryTab === 'completed' ? '체결 내역 더보기' : 
                     tradeHistoryTab === 'sell' ? '판매 입찰 더보기' : '구매 입찰 더보기'}
                  </button>
                </div>
              </TradeHistorySection>
            </TradingCard>
          </TradingDetailSection>
        )}

        {/* 상세 정보 탭 */}
        <InfoTabs>
          <TabNavigation>
            <TabButton 
              active={activeTab === 'specs'} 
              onClick={() => setActiveTab('specs')}
            >
              상세스펙
            </TabButton>
            <TabButton 
              active={activeTab === 'reviews'} 
              onClick={() => setActiveTab('reviews')}
            >
              리뷰 ({product.reviews.count})
            </TabButton>
            <TabButton 
              active={activeTab === 'trading'} 
              onClick={() => setActiveTab('trading')}
            >
              거래정보
            </TabButton>
          </TabNavigation>
          <TabContent>
            {renderTabContent()}
          </TabContent>
        </InfoTabs>

        {/* 모바일 고정 푸터 */}
        <MobileFooter>
          <FooterActionGroup>
            <WishButton>
              <HeartIcon>♡</HeartIcon>
            </WishButton>
            <FooterButtonGroup>
              <FooterButton variant="secondary" onClick={() => handleBuyClick('instant')}>
                즉시 구매
                <ButtonPrice>{selectedVariant ? formatPrice(selectedVariant.price.instant) : '-'}</ButtonPrice>
              </FooterButton>
              <FooterButton variant="primary" onClick={() => handleSellClick('instant')}>
                즉시 판매
                <ButtonPrice>{selectedVariant ? formatPrice(selectedVariant.price.reserve) : '-'}</ButtonPrice>
              </FooterButton>
            </FooterButtonGroup>
          </FooterActionGroup>
        </MobileFooter>
      </Container>
    </DetailContainer>
  );
};

export default ProductDetailPage;