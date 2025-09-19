import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const MyPageContainer = styled.div`
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

// KREAM 스타일 프로필 헤더
const ProfileHeader = styled.div`
  background: white;
  border-bottom: 1px solid #ebebeb;
  padding: 32px 0;

  @media (max-width: 768px) {
    padding: 24px 0;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: white;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin-bottom: 4px;
`;

const UserEmail = styled.div`
  font-size: 13px;
  color: #8e8e93;
  margin-bottom: 12px;
`;

const UserStats = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #222;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: #8e8e93;
  margin-top: 2px;
`;

// KREAM 스타일 액션 버튼
const ProfileActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ebebeb;
  background: white;
  color: #222;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f8f8;
  }
`;

// KREAM 스타일 메뉴 섹션
const MenuSection = styled.div`
  padding: 24px 0;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const MenuCard = styled.div`
  background: white;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d3d3d3;
    transform: translateY(-2px);
  }
`;

const MenuTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #222;
  margin-bottom: 12px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
  border: none;
  background: none;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: #222;
  }
`;

// 탭 네비게이션 - KREAM 스타일
const TabNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 16px 24px;
  border: none;
  background: none;
  color: ${props => props.active ? '#222' : '#8e8e93'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#222' : 'transparent'};
  white-space: nowrap;

  &:hover {
    color: #222;
  }
`;

// 콘텐츠 영역
const ContentArea = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #ebebeb;
`;

const ContentHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ebebeb;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ContentTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

const ContentBody = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// 거래 내역 카드 - KREAM 스타일
const TradeCard = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d3d3d3;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const TradeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TradeType = styled.span<{ type: 'buy' | 'sell' }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${props => props.type === 'buy' ? '#007aff' : '#34c759'};
`;

const TradeStatus = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'completed': return '#34c759';
      case 'pending': return '#ff9500';
      case 'cancelled': return '#ff3b30';
      default: return '#8e8e93';
    }
  }};
  color: white;
`;

const TradeInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
`;

const ProductDetails = styled.div`
  font-size: 12px;
  color: #8e8e93;
`;

const TradeAmount = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #222;
`;

const TradeDate = styled.div`
  font-size: 12px;
  color: #8e8e93;
  margin-top: 4px;
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

const MyPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('trades');

  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 임시 데이터
  const mockTrades = [
    {
      id: '1',
      type: 'buy' as const,
      status: 'completed',
      productName: 'MacBook Pro M3 14인치',
      productDetails: '512GB SSD, 18GB RAM, 스페이스 그레이',
      amount: 2790000,
      date: '2024.09.15'
    },
    {
      id: '2',
      type: 'sell' as const,
      status: 'pending',
      productName: 'ThinkPad X1 Carbon',
      productDetails: '256GB SSD, 16GB RAM, 블랙',
      amount: 1890000,
      date: '2024.09.10'
    },
    {
      id: '3',
      type: 'buy' as const,
      status: 'cancelled',
      productName: 'Apple Studio Display',
      productDetails: '27인치, 5K 레티나, 표준 글래스',
      amount: 2090000,
      date: '2024.09.05'
    }
  ];

  const tabs = [
    { id: 'trades', label: '거래내역', count: mockTrades.length },
    { id: 'wishlist', label: '관심상품', count: 12 },
    { id: 'bids', label: '입찰내역', count: 5 },
    { id: 'reviews', label: '리뷰', count: 8 }
  ];

  const handleLogout = () => {
    logout();
    alert('로그아웃되었습니다.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'trades':
        return (
          <>
            <ContentHeader>
              <ContentTitle>거래내역</ContentTitle>
            </ContentHeader>
            <ContentBody>
              {mockTrades.length > 0 ? (
                mockTrades.map((trade) => (
                  <TradeCard key={trade.id}>
                    <TradeHeader>
                      <TradeType type={trade.type}>
                        {trade.type === 'buy' ? '구매' : '판매'}
                      </TradeType>
                      <TradeStatus status={trade.status}>
                        {trade.status === 'completed' ? '완료' :
                         trade.status === 'pending' ? '진행중' : '취소'}
                      </TradeStatus>
                    </TradeHeader>
                    <TradeInfo>
                      <ProductInfo>
                        <ProductName>{trade.productName}</ProductName>
                        <ProductDetails>{trade.productDetails}</ProductDetails>
                      </ProductInfo>
                      <TradeAmount>
                        <Amount>{trade.amount.toLocaleString()}원</Amount>
                        <TradeDate>{trade.date}</TradeDate>
                      </TradeAmount>
                    </TradeInfo>
                  </TradeCard>
                ))
              ) : (
                <EmptyState>
                  <h3>거래내역이 없습니다</h3>
                  <p>첫 거래를 시작해보세요!</p>
                </EmptyState>
              )}
            </ContentBody>
          </>
        );
      
      case 'wishlist':
        return (
          <>
            <ContentHeader>
              <ContentTitle>관심상품</ContentTitle>
            </ContentHeader>
            <ContentBody>
              <EmptyState>
                <h3>관심상품이 없습니다</h3>
                <p>관심있는 상품을 추가해보세요.</p>
              </EmptyState>
            </ContentBody>
          </>
        );
      
      case 'bids':
        return (
          <>
            <ContentHeader>
              <ContentTitle>입찰내역</ContentTitle>
            </ContentHeader>
            <ContentBody>
              <EmptyState>
                <h3>입찰내역이 없습니다</h3>
                <p>상품에 입찰해보세요.</p>
              </EmptyState>
            </ContentBody>
          </>
        );
      
      case 'reviews':
        return (
          <>
            <ContentHeader>
              <ContentTitle>리뷰</ContentTitle>
            </ContentHeader>
            <ContentBody>
              <EmptyState>
                <h3>작성한 리뷰가 없습니다</h3>
                <p>거래 완료 후 리뷰를 작성할 수 있습니다.</p>
              </EmptyState>
            </ContentBody>
          </>
        );
      
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <MyPageContainer>
        <Container>
          <EmptyState>
            <h3>로그인이 필요합니다</h3>
            <p>마이페이지를 이용하려면 로그인해주세요.</p>
          </EmptyState>
        </Container>
      </MyPageContainer>
    );
  }

  return (
    <MyPageContainer>
      <Container>
        {/* 프로필 헤더 */}
        <ProfileHeader>
          <ProfileInfo>
            <Avatar>
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <UserDetails>
              <UserName>{user.name || '사용자'}</UserName>
              <UserEmail>{user.email}</UserEmail>
              <UserStats>
                <StatItem>
                  <StatValue>8</StatValue>
                  <StatLabel>총 거래</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>4.8</StatValue>
                  <StatLabel>평점</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>12</StatValue>
                  <StatLabel>관심상품</StatLabel>
                </StatItem>
              </UserStats>
            </UserDetails>
          </ProfileInfo>
          <ProfileActions>
            <ActionButton>프로필 수정</ActionButton>
            <ActionButton>계정 설정</ActionButton>
            <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
          </ProfileActions>
        </ProfileHeader>

        {/* KREAM 스타일 메뉴 섹션 */}
        <MenuSection>
          <MenuGrid>
            <MenuCard>
              <MenuTitle>쇼핑 정보</MenuTitle>
              <MenuList>
                <MenuItem>
                  구매내역 <span>→</span>
                </MenuItem>
                <MenuItem>
                  판매내역 <span>→</span>
                </MenuItem>
                <MenuItem>
                  관심상품 <span>→</span>
                </MenuItem>
                <MenuItem>
                  최근 본 상품 <span>→</span>
                </MenuItem>
              </MenuList>
            </MenuCard>
            
            <MenuCard>
              <MenuTitle>내 정보</MenuTitle>
              <MenuList>
                <MenuItem>
                  프로필 관리 <span>→</span>
                </MenuItem>
                <MenuItem>
                  주소록 <span>→</span>
                </MenuItem>
                <MenuItem>
                  결제 정보 <span>→</span>
                </MenuItem>
                <MenuItem>
                  알림 설정 <span>→</span>
                </MenuItem>
              </MenuList>
            </MenuCard>
            
            <MenuCard>
              <MenuTitle>고객지원</MenuTitle>
              <MenuList>
                <MenuItem>
                  1:1 문의 <span>→</span>
                </MenuItem>
                <MenuItem>
                  자주 묻는 질문 <span>→</span>
                </MenuItem>
                <MenuItem>
                  공지사항 <span>→</span>
                </MenuItem>
                <MenuItem>
                  서비스 정책 <span>→</span>
                </MenuItem>
              </MenuList>
            </MenuCard>
          </MenuGrid>
        </MenuSection>

        {/* 탭 네비게이션 */}
        <TabNavigation>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label} ({tab.count})
            </TabButton>
          ))}
        </TabNavigation>

        {/* 콘텐츠 영역 */}
        <ContentArea>
          {renderContent()}
        </ContentArea>
      </Container>
    </MyPageContainer>
  );
};

export default MyPage;