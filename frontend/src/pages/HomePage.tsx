import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 스타일 컴포넌트
const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 80px 0 60px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const MainTitle = styled.h1`
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const LogoHighlight = styled.span`
  color: #fbbf24;
  font-weight: 900;
`;

const Subtitle = styled.p`
  font-size: 22px;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.5;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 32px;
  }
`;

const CTAButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
`;

const CTAButton = styled(Link)<{ variant: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: 160px;

  ${props => props.variant === 'primary' ? `
    background: white;
    color: #4f46e5;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
    }
  ` : `
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.8);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
  `}

  @media (max-width: 768px) {
    width: 280px;
    padding: 14px 28px;
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 0;
  background: white;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  text-align: center;
  margin-bottom: 16px;
  color: #1f2937;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 50px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: #f9fafb;
  padding: 32px 24px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #4f46e5;
  }

  @media (max-width: 768px) {
    padding: 28px 20px;
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 12px;
  color: #1f2937;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  font-size: 15px;
`;

const StatsSection = styled.section`
  background: #1f2937;
  padding: 80px 0;
  color: white;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;

  @media (max-width: 768px) {
    gap: 32px;
  }
`;

const StatItem = styled.div``;

const StatNumber = styled.div`
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #fbbf24;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const StatLabel = styled.div`
  color: #d1d5db;
  font-size: 16px;
  font-weight: 500;
`;

const HomePage: React.FC = () => {
  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      {/* 히어로 섹션 */}
      <HeroSection>
        <ContentWrapper>
          <MainTitle>
            기업 IT자산 거래의 새로운 기준<br />
            <LogoHighlight>LOOPI</LogoHighlight>
          </MainTitle>
          <Subtitle>
            안전하고 투명한 예약 거래 시스템으로<br />
            기업 간 IT자산 거래를 혁신합니다
          </Subtitle>
          <CTAButtonGroup>
            <CTAButton to="/shop" variant="primary">
              거래 시작하기
            </CTAButton>
            <CTAButton to="/register" variant="secondary">
              사업자 인증
            </CTAButton>
          </CTAButtonGroup>
        </ContentWrapper>
      </HeroSection>

      {/* 주요 기능 섹션 */}
      <FeaturesSection>
        <ContentWrapper>
          <SectionTitle>믿을 수 있는 거래 플랫폼</SectionTitle>
          <SectionDescription>
            안전하고 투명한 기업 IT자산 거래를 경험하세요
          </SectionDescription>
          
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>빠른 거래</FeatureTitle>
              <FeatureDescription>
                즉시 거래와 예약 거래로<br />
                원하는 방식의 거래 선택
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>안전 보장</FeatureTitle>
              <FeatureDescription>
                검증된 기업만 참여하는<br />
                안전한 거래 환경
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>💰</FeatureIcon>
              <FeatureTitle>투명한 가격</FeatureTitle>
              <FeatureDescription>
                시장 기반 공정한 가격과<br />
                안전한 결제 시스템
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </ContentWrapper>
      </FeaturesSection>

      {/* 통계 섹션 */}
      <StatsSection>
        <ContentWrapper>
          <SectionTitle style={{ color: 'white', marginBottom: '60px' }}>
            신뢰받는 거래 플랫폼
          </SectionTitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>1,200+</StatNumber>
              <StatLabel>총 거래 건수</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>580+</StatNumber>
              <StatLabel>인증 기업</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>98.5%</StatNumber>
              <StatLabel>거래 만족도</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24시간</StatNumber>
              <StatLabel>고객 지원</StatLabel>
            </StatItem>
          </StatsGrid>
        </ContentWrapper>
      </StatsSection>
    </Container>
  );
};

export default HomePage;