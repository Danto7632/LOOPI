import React, { useState } from 'react';
import styled from 'styled-components';

const GroupBuyContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  padding-top: var(--spacing-lg);
`;

const Container = styled.div`
  max-width: var(--wide);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`;

const PageHeader = styled.div`
  background: var(--white);
  padding: var(--spacing-3xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-3xl);
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-bold);
  color: var(--enterprise-orange);
  margin-bottom: var(--spacing-lg);
`;

const HeaderSubtitle = styled.p`
  font-size: var(--font-size-lg);
  color: var(--gray-600);
  line-height: 1.6;
`;

const TabContainer = styled.div`
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  margin-bottom: var(--spacing-3xl);
`;

const TabNav = styled.div`
  display: flex;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: var(--spacing-lg) var(--spacing-xl);
  border: none;
  background: ${props => props.active ? 'var(--enterprise-orange)' : 'transparent'};
  color: ${props => props.active ? 'var(--white)' : 'var(--gray-600)'};
  font-size: var(--font-size-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: ${props => props.active ? 'var(--warning)' : 'var(--white)'};
  }

  @media (max-width: 640px) {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-sm);
  }
`;

const TabContent = styled.div`
  padding: var(--spacing-3xl);

  @media (max-width: 640px) {
    padding: var(--spacing-lg);
  }
`;

// 진행 중인 공동구매
const GroupBuyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
`;

const GroupBuyCard = styled.div`
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-fast);
  background: var(--white);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-500);
  font-size: var(--font-size-sm);
  position: relative;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: var(--enterprise-orange);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-bold);
`;

const CardContent = styled.div`
  padding: var(--spacing-lg);
`;

const ProductBrand = styled.div`
  font-size: var(--font-size-sm);
  color: var(--enterprise-orange);
  font-weight: var(--font-medium);
  margin-bottom: var(--spacing-xs);
`;

const ProductName = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: var(--font-semibold);
  color: var(--primary);
  margin-bottom: var(--spacing-md);
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const OriginalPrice = styled.div`
  font-size: var(--font-size-sm);
  color: var(--gray-500);
  text-decoration: line-through;
`;

const DiscountPrice = styled.div`
  font-size: var(--font-size-lg);
  font-weight: var(--font-bold);
  color: var(--enterprise-orange);
`;

const ProgressSection = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

const ProgressLabel = styled.div`
  font-size: var(--font-size-sm);
  color: var(--gray-600);
`;

const ProgressPercentage = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-semibold);
  color: var(--enterprise-orange);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: linear-gradient(90deg, var(--enterprise-orange), var(--warning));
  transition: width var(--transition-smooth);
`;

const ParticipantInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--gray-600);
`;

const TimeLeft = styled.div`
  color: var(--accent);
  font-weight: var(--font-medium);
`;

const JoinButton = styled.button`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--enterprise-orange);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--warning);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

// 공동구매 신청 폼
const CreateForm = styled.div`
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;
`;

const FormHeader = styled.div`
  background: var(--enterprise-orange);
  color: var(--white);
  padding: var(--spacing-2xl) var(--spacing-3xl);
  text-align: center;
`;

const FormTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--spacing-sm);
`;

const FormSubtitle = styled.p`
  font-size: var(--font-size-sm);
  opacity: 0.9;
`;

const FormContent = styled.div`
  padding: var(--spacing-3xl);
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-2xl);
`;

const Label = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-medium);
  color: var(--gray-700);
  margin-bottom: var(--spacing-sm);
`;

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--enterprise-orange);
    box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background: var(--white);
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--enterprise-orange);
    box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  resize: vertical;
  min-height: 120px;
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--enterprise-orange);
    box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--enterprise-orange);
  color: var(--white);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--warning);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const GroupBuyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    targetQuantity: '',
    maxPrice: '',
    deadline: '',
    description: ''
  });

  const ongoingGroupBuys = [
    {
      id: 1,
      brand: 'Dell',
      name: 'OptiPlex 7090 미니 PC',
      originalPrice: 550000,
      discountPrice: 450000,
      discount: 18,
      currentParticipants: 87,
      targetParticipants: 100,
      timeLeft: '3일 12시간',
      progress: 87
    },
    {
      id: 2,
      brand: 'HP',
      name: 'EliteBook 840 G8',
      originalPrice: 420000,
      discountPrice: 350000,
      discount: 17,
      currentParticipants: 156,
      targetParticipants: 200,
      timeLeft: '5일 8시간',
      progress: 78
    },
    {
      id: 3,
      brand: 'Samsung',
      name: '27인치 QHD 모니터',
      originalPrice: 180000,
      discountPrice: 140000,
      discount: 22,
      currentParticipants: 234,
      targetParticipants: 300,
      timeLeft: '2일 15시간',
      progress: 78
    },
    {
      id: 4,
      brand: 'Lenovo',
      name: 'ThinkPad T14s Gen 3',
      originalPrice: 480000,
      discountPrice: 390000,
      discount: 19,
      currentParticipants: 67,
      targetParticipants: 150,
      timeLeft: '6일 22시간',
      progress: 45
    }
  ];

  const tabs = [
    { id: 'ongoing', label: '진행 중인 공동구매' },
    { id: 'create', label: '공동구매 신청' },
    { id: 'my', label: '내 참여 내역' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('공동구매 신청:', formData);
    // 실제로는 API 호출
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ongoing':
        return (
          <div>
            <GroupBuyGrid>
              {ongoingGroupBuys.map((item) => (
                <GroupBuyCard key={item.id}>
                  <CardImage>
                    {item.name} 이미지
                    <DiscountBadge>{item.discount}% 할인</DiscountBadge>
                  </CardImage>
                  <CardContent>
                    <ProductBrand>{item.brand}</ProductBrand>
                    <ProductName>{item.name}</ProductName>
                    <PriceInfo>
                      <div>
                        <OriginalPrice>₩{item.originalPrice.toLocaleString()}</OriginalPrice>
                        <DiscountPrice>₩{item.discountPrice.toLocaleString()}</DiscountPrice>
                      </div>
                    </PriceInfo>
                    <ProgressSection>
                      <ProgressHeader>
                        <ProgressLabel>참여 현황</ProgressLabel>
                        <ProgressPercentage>{item.progress}%</ProgressPercentage>
                      </ProgressHeader>
                      <ProgressBar>
                        <ProgressFill percentage={item.progress} />
                      </ProgressBar>
                    </ProgressSection>
                    <ParticipantInfo>
                      <span>{item.currentParticipants}/{item.targetParticipants}명 참여</span>
                      <TimeLeft>{item.timeLeft} 남음</TimeLeft>
                    </ParticipantInfo>
                    <JoinButton>
                      공동구매 참여하기
                    </JoinButton>
                  </CardContent>
                </GroupBuyCard>
              ))}
            </GroupBuyGrid>
          </div>
        );
      
      case 'create':
        return (
          <CreateForm>
            <FormHeader>
              <FormTitle>공동구매 신청</FormTitle>
              <FormSubtitle>새로운 공동구매를 제안해보세요</FormSubtitle>
            </FormHeader>
            <FormContent>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>제품 카테고리</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">카테고리 선택</option>
                    <option value="desktop">데스크톱</option>
                    <option value="laptop">노트북</option>
                    <option value="monitor">모니터</option>
                    <option value="printer">프린터</option>
                    <option value="network">네트워크 장비</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>브랜드</Label>
                  <Input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="예: Dell, HP, Lenovo"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>모델명</Label>
                  <Input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="예: OptiPlex 7090"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>목표 수량</Label>
                  <Input
                    type="number"
                    name="targetQuantity"
                    value={formData.targetQuantity}
                    onChange={handleInputChange}
                    placeholder="100"
                    min="10"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>희망 최대 단가 (원)</Label>
                  <Input
                    type="number"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleInputChange}
                    placeholder="500000"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>모집 마감일</Label>
                  <Input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>공동구매 설명</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="공동구매의 목적, 예상 할인율, 특별 조건 등을 설명해주세요"
                    required
                  />
                </FormGroup>

                <SubmitButton type="submit">
                  공동구매 신청하기
                </SubmitButton>
              </form>
            </FormContent>
          </CreateForm>
        );

      case 'my':
        return (
          <div>
            <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: 'var(--font-size-lg)' }}>
              참여한 공동구매가 없습니다.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <GroupBuyContainer>
      <Container>
        <PageHeader>
          <HeaderTitle>공동구매</HeaderTitle>
          <HeaderSubtitle>
            여러 기업이 함께 구매해서 더 좋은 가격에 IT 자산을 확보하세요.<br />
            대량 구매를 통한 할인 혜택과 물류비 절약 효과를 누릴 수 있습니다.
          </HeaderSubtitle>
        </PageHeader>

        <TabContainer>
          <TabNav>
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </TabNav>
          <TabContent>
            {renderTabContent()}
          </TabContent>
        </TabContainer>
      </Container>
    </GroupBuyContainer>
  );
};

export default GroupBuyPage;