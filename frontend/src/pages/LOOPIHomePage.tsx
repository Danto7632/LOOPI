import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
`;

// Hero Section - LOOPI 메인 비즈니스 소개
const HeroSection = styled.section`
  position: relative;
  min-height: 500px;
  background: linear-gradient(135deg, var(--business-primary) 0%, var(--business-secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  margin-bottom: var(--spacing-6xl);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23ffffff05" points="0,500 250,0 500,200 750,0 1000,300 1000,1000 0,1000"/></svg>');
    background-size: cover;
  }

  @media (max-width: 768px) {
    min-height: 400px;
    margin-bottom: var(--spacing-4xl);
  }

  @media (max-width: 480px) {
    min-height: 350px;
    margin-bottom: var(--spacing-3xl);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 var(--spacing-lg);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 600px;
    padding: 0 var(--spacing-md);
  }

  @media (max-width: 480px) {
    padding: 0 var(--spacing-sm);
  }
`;

const HeroTitle = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-black);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-md);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-2xl);
    line-height: 1.2;
  }
`;

const HeroSubtitle = styled.p`
  font-size: var(--font-size-xl);
  font-weight: var(--font-normal);
  margin-bottom: var(--spacing-3xl);
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-2xl);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-xl);
    line-height: 1.4;
  }
`;

const HeroStats = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-4xl);
  margin-top: var(--spacing-3xl);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-2xl);
  }

  @media (max-width: 480px) {
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-bold);
  color: var(--accent);

  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-lg);
  }
`;

const StatLabel = styled.div`
  font-size: var(--font-size-sm);
  opacity: 0.8;

  @media (max-width: 480px) {
    font-size: var(--font-size-xs);
  }
`;

// 비즈니스 핵심 기능 섹션
const FeaturesSection = styled.section`
  padding: var(--spacing-6xl) 0;
  background: var(--bg-secondary);

  @media (max-width: 768px) {
    padding: var(--spacing-4xl) 0;
  }

  @media (max-width: 480px) {
    padding: var(--spacing-3xl) 0;
  }
`;

const FeaturesContainer = styled.div`
  max-width: var(--wide);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);

  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }

  @media (max-width: 480px) {
    padding: 0 var(--spacing-sm);
  }
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-bold);
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--primary);

  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-md);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-xl);
  }
`;

const SectionSubtitle = styled.p`
  font-size: var(--font-size-lg);
  text-align: center;
  color: var(--gray-600);
  margin-bottom: var(--spacing-5xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-3xl);
    max-width: 500px;
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-2xl);
    line-height: 1.5;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-3xl);
  margin-bottom: var(--spacing-6xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
    margin-bottom: var(--spacing-4xl);
  }

  @media (max-width: 480px) {
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }
`;

const FeatureCard = styled.div`
  background: var(--white);
  padding: var(--spacing-3xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  text-align: center;
  border: 1px solid var(--border-light);

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }

  @media (max-width: 768px) {
    padding: var(--spacing-2xl);

    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 480px) {
    padding: var(--spacing-xl);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-bold);

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-xl);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: var(--font-size-lg);
  }
`;

const FeatureTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--spacing-md);
  color: var(--primary);

  @media (max-width: 768px) {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-sm);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-base);
  }
`;

const FeatureDescription = styled.p`
  color: var(--gray-600);
  line-height: 1.6;

  @media (max-width: 480px) {
    font-size: var(--font-size-sm);
    line-height: 1.5;
  }
`;

// 시장 기회 섹션
const OpportunitySection = styled.section`
  padding: var(--spacing-6xl) 0;
  background: var(--white);

  @media (max-width: 768px) {
    padding: var(--spacing-4xl) 0;
  }

  @media (max-width: 480px) {
    padding: var(--spacing-3xl) 0;
  }
`;

const OpportunityContent = styled.div`
  max-width: var(--wide);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;

  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }

  @media (max-width: 480px) {
    padding: 0 var(--spacing-sm);
  }
`;

const OpportunityText = styled.div``;

const OpportunityTitle = styled.h2`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--spacing-lg);
  color: var(--primary);

  .highlight {
    color: var(--business-primary);
  }

  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-md);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-xl);
  }
`;

const OpportunityList = styled.ul`
  list-style: none;
  margin: var(--spacing-lg) 0;

  @media (max-width: 768px) {
    margin: var(--spacing-md) 0;
  }

  @media (max-width: 480px) {
    margin: var(--spacing-sm) 0;
  }
`;

const OpportunityItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
  
  &::before {
    content: '✓';
    color: var(--success);
    font-weight: var(--font-bold);
    margin-right: var(--spacing-md);
    margin-top: 2px;
  }

  @media (max-width: 768px) {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-sm);
  }

  @media (max-width: 480px) {
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-sm);
    
    &::before {
      margin-right: var(--spacing-sm);
    }
  }
`;

const OpportunityStats = styled.div`
  background: var(--bg-secondary);
  padding: var(--spacing-4xl);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);

  @media (max-width: 768px) {
    padding: var(--spacing-2xl);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-xl);
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  @media (max-width: 480px) {
    gap: var(--spacing-lg);
  }
`;

const BigStat = styled.div`
  text-align: center;
`;

const BigStatNumber = styled.div`
  font-size: var(--font-size-4xl);
  font-weight: var(--font-black);
  color: var(--business-primary);
  margin-bottom: var(--spacing-sm);

  @media (max-width: 768px) {
    font-size: var(--font-size-3xl);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-2xl);
  }
`;

const BigStatLabel = styled.div`
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  font-weight: var(--font-medium);

  @media (max-width: 480px) {
    font-size: var(--font-size-xs);
  }
`;

// CTA 섹션
const CTASection = styled.section`
  padding: var(--spacing-6xl) 0;
  background: linear-gradient(135deg, var(--tech-green) 0%, var(--accent) 100%);
  text-align: center;
  color: var(--white);

  @media (max-width: 768px) {
    padding: var(--spacing-4xl) 0;
  }

  @media (max-width: 480px) {
    padding: var(--spacing-3xl) 0;
  }
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);

  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }

  @media (max-width: 480px) {
    padding: 0 var(--spacing-sm);
  }
`;

const CTATitle = styled.h2`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--spacing-lg);

  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-md);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-xl);
  }
`;

const CTADescription = styled.p`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-3xl);
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-2xl);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-xl);
    line-height: 1.5;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }

  @media (max-width: 480px) {
    gap: var(--spacing-sm);
  }
`;

const CTAButton = styled(Link)`
  background: var(--white);
  color: var(--business-primary);
  border: none;
  padding: var(--spacing-lg) var(--spacing-3xl);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-lg);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  display: inline-block;
  min-height: 48px; /* 터치 친화적 높이 */
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    color: var(--business-primary);
  }

  @media (max-width: 768px) {
    padding: var(--spacing-md) var(--spacing-2xl);
    font-size: var(--font-size-base);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-sm) var(--spacing-xl);
    font-size: var(--font-size-sm);
    width: 100%;
    max-width: 280px;
    text-align: center;
  }
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>기업용 IT자산 거래의<br />새로운 표준, LOOPI</HeroTitle>
          <HeroSubtitle>
            익명 거래 • 즉시 정산 • 데이터 완전 삭제<br />
            Windows 10 지원 종료 대비, 안전한 IT자산 거래 플랫폼
          </HeroSubtitle>
          
          <HeroStats>
            <StatItem>
              <StatNumber>51,955</StatNumber>
              <StatLabel>구로구 사업체</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>1.22조</StatNumber>
              <StatLabel>연간 시장 규모</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>2025.10.14</StatNumber>
              <StatLabel>Windows 10 지원 종료</StatLabel>
            </StatItem>
          </HeroStats>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>LOOPI만의 핵심 솔루션</SectionTitle>
          <SectionSubtitle>
            기업 IT자산 거래의 모든 문제를 해결하는 4가지 핵심 기능
          </SectionSubtitle>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon className="instant">즉시</FeatureIcon>
              <FeatureTitle>즉시 판매/구매</FeatureTitle>
              <FeatureDescription>
                실시간 시세 기반 즉시 거래 체결.<br />
                번거로운 협상 과정 없이 투명한 가격으로 빠른 거래.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon className="reserve">예약</FeatureIcon>
              <FeatureTitle>예약 판매/구매</FeatureTitle>
              <FeatureDescription>
                원하는 가격과 수량을 설정하여 예약.<br />
                조건 만족 시 자동 체결로 최적 타이밍 확보.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon className="group">공동</FeatureIcon>
              <FeatureTitle>공동구매 매칭</FeatureTitle>
              <FeatureDescription>
                동일 모델 대량 구매 시 볼륨 할인.<br />
                학원, 콜센터, 기업의 다량 수요 매칭.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon className="security">보안</FeatureIcon>
              <FeatureTitle>데이터 완전 삭제</FeatureTitle>
              <FeatureDescription>
                NIST 800-88 기준 데이터 삭제 인증.<br />
                익명 거래로 기업 정보 보호 완벽 보장.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </FeaturesContainer>
      </FeaturesSection>

      {/* Market Opportunity */}
      <OpportunitySection>
        <OpportunityContent>
          <OpportunityText>
            <OpportunityTitle>
              <span className="highlight">2025년 10월</span>, 기업 IT 대전환의 기회
            </OpportunityTitle>
            <OpportunityList>
              <OpportunityItem>Windows 10 보안지원 종료로 대규모 PC 교체 수요 발생</OpportunityItem>
              <OpportunityItem>구로 G밸리 13,038개 입주기업의 IT자산 처분 니즈 급증</OpportunityItem>
              <OpportunityItem>기존 개별 거래의 한계: 가격 불투명, 보안 위험, 물류 비효율</OpportunityItem>
              <OpportunityItem>공동구매 부재로 중소기업/학원의 구매 비용 부담 가중</OpportunityItem>
            </OpportunityList>
          </OpportunityText>

          <OpportunityStats>
            <StatGrid>
              <BigStat>
                <BigStatNumber>28,056</BigStatNumber>
                <BigStatLabel>구로구 연간<br />PC 교체 예상량</BigStatLabel>
              </BigStat>
              <BigStat>
                <BigStatNumber>25.8만</BigStatNumber>
                <BigStatLabel>평균 PC<br />거래 단가</BigStatLabel>
              </BigStat>
              <BigStat>
                <BigStatNumber>4.80억</BigStatNumber>
                <BigStatLabel>구로 1년차<br />목표 GMV</BigStatLabel>
              </BigStat>
              <BigStat>
                <BigStatNumber>12%</BigStatNumber>
                <BigStatLabel>마켓 수수료<br />(+ 서비스료)</BigStatLabel>
              </BigStat>
            </StatGrid>
          </OpportunityStats>
        </OpportunityContent>
      </OpportunitySection>

      {/* CTA Section */}
      <CTASection>
        <CTAContainer>
          <CTATitle>지금 시작하세요</CTATitle>
          <CTADescription>
            안전하고 투명한 기업 IT자산 거래, LOOPI와 함께 새로운 기회를 만들어보세요.
          </CTADescription>
          <CTAButtons>
            <CTAButton to="/trading">판매 시작하기</CTAButton>
            <CTAButton to="/trading" className="secondary">구매 둘러보기</CTAButton>
          </CTAButtons>
        </CTAContainer>
      </CTASection>
    </HomeContainer>
  );
};

export default HomePage;