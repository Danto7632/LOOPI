import React, { useState } from 'react';
import styled from 'styled-components';

const ReservationContainer = styled.div`
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
  color: var(--data-purple);
  margin-bottom: var(--spacing-lg);
`;

const HeaderSubtitle = styled.p`
  font-size: var(--font-size-lg);
  color: var(--gray-600);
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// 예약 주문 폼
const OrderForm = styled.div`
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;

const FormHeader = styled.div`
  background: var(--data-purple);
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
    border-color: var(--data-purple);
    box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
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
    border-color: var(--data-purple);
    box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
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
    border-color: var(--data-purple);
    box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--data-purple);
  color: var(--white);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--business-secondary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

// 현재 예약 주문 목록
const ReservationList = styled.div`
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;

const ListHeader = styled.div`
  background: var(--business-primary);
  color: var(--white);
  padding: var(--spacing-2xl) var(--spacing-3xl);
  text-align: center;
`;

const ListContent = styled.div`
  padding: var(--spacing-3xl);
`;

const ReservationCard = styled.div`
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  transition: all var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const ProductName = styled.h4`
  font-size: var(--font-size-base);
  font-weight: var(--font-semibold);
  color: var(--primary);
  flex: 1;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  
  ${props => {
    switch (props.status) {
      case 'active': return 'background: var(--success); color: var(--white);';
      case 'pending': return 'background: var(--warning); color: var(--gray-900);';
      case 'matched': return 'background: var(--data-purple); color: var(--white);';
      default: return 'background: var(--gray-400); color: var(--white);';
    }
  }}
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--gray-600);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  strong {
    color: var(--gray-800);
  }
`;

// 예약 거래 가이드
const GuideSection = styled.div`
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  margin-top: var(--spacing-6xl);
  overflow: hidden;
`;

const GuideHeader = styled.div`
  background: var(--enterprise-orange);
  color: var(--white);
  padding: var(--spacing-2xl) var(--spacing-3xl);
  text-align: center;
`;

const GuideContent = styled.div`
  padding: var(--spacing-3xl);
`;

const GuideSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-2xl);
`;

const StepCard = styled.div`
  text-align: center;
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  background: var(--enterprise-orange);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-bold);
  margin: 0 auto var(--spacing-md);
`;

const StepTitle = styled.h4`
  font-size: var(--font-size-base);
  font-weight: var(--font-semibold);
  color: var(--primary);
  margin-bottom: var(--spacing-sm);
`;

const StepDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  line-height: 1.5;
`;

const ReservationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    quantity: '',
    maxPrice: '',
    condition: '',
    deadline: '',
    requirements: ''
  });

  const reservations = [
    {
      id: 1,
      product: 'Dell OptiPlex 7090',
      category: '데스크톱',
      quantity: 50,
      maxPrice: 450000,
      condition: 'A급 이상',
      status: 'active',
      deadline: '2024-02-15'
    },
    {
      id: 2,
      product: 'HP EliteBook 840',
      category: '노트북',
      quantity: 20,
      maxPrice: 380000,
      condition: 'S급',
      status: 'matched',
      deadline: '2024-02-10'
    },
    {
      id: 3,
      product: 'Samsung 24인치 모니터',
      category: '모니터',
      quantity: 100,
      maxPrice: 120000,
      condition: 'B급 이상',
      status: 'pending',
      deadline: '2024-02-20'
    }
  ];

  const guideSteps = [
    {
      number: 1,
      title: '조건 설정',
      description: '원하는 제품의 사양, 수량, 최대 가격 등을 설정합니다'
    },
    {
      number: 2,
      title: '예약 등록',
      description: '설정한 조건으로 예약 주문을 등록하고 대기합니다'
    },
    {
      number: 3,
      title: '매칭 대기',
      description: '조건에 맞는 판매자가 나타날 때까지 자동으로 매칭을 시도합니다'
    },
    {
      number: 4,
      title: '거래 체결',
      description: '조건이 매칭되면 자동으로 거래가 체결되고 배송이 시작됩니다'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('예약 주문 등록:', formData);
    // 실제로는 API 호출
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '매칭 대기';
      case 'pending': return '검토 중';
      case 'matched': return '매칭 완료';
      default: return status;
    }
  };

  return (
    <ReservationContainer>
      <Container>
        <PageHeader>
          <HeaderTitle>예약 거래</HeaderTitle>
          <HeaderSubtitle>
            원하는 조건을 설정하고 매칭될 때까지 기다리세요.<br />
            조건에 맞는 상품이 등록되면 자동으로 거래가 체결됩니다.
          </HeaderSubtitle>
        </PageHeader>

        <ContentGrid>
          {/* 예약 주문 등록 폼 */}
          <OrderForm>
            <FormHeader>
              <FormTitle>새 예약 주문</FormTitle>
              <FormSubtitle>원하는 제품 조건을 설정하세요</FormSubtitle>
            </FormHeader>
            <FormContent>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>카테고리</Label>
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
                  />
                </FormGroup>

                <FormGroup>
                  <Label>희망 수량</Label>
                  <Input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="1"
                    min="1"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>최대 단가 (원)</Label>
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
                  <Label>최소 상태 등급</Label>
                  <Select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">등급 선택</option>
                    <option value="S">S급 (거의 새 제품)</option>
                    <option value="A">A급 이상</option>
                    <option value="B">B급 이상</option>
                    <option value="C">C급 이상</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>마감일</Label>
                  <Input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>추가 요구사항</Label>
                  <Textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="특별한 요구사항이나 참고사항을 입력하세요"
                  />
                </FormGroup>

                <SubmitButton type="submit">
                  예약 주문 등록
                </SubmitButton>
              </form>
            </FormContent>
          </OrderForm>

          {/* 현재 예약 주문 목록 */}
          <ReservationList>
            <ListHeader>
              <FormTitle>내 예약 주문</FormTitle>
              <FormSubtitle>현재 진행 중인 예약 주문 목록</FormSubtitle>
            </ListHeader>
            <ListContent>
              {reservations.map((reservation) => (
                <ReservationCard key={reservation.id}>
                  <CardHeader>
                    <ProductName>{reservation.product}</ProductName>
                    <StatusBadge status={reservation.status}>
                      {getStatusText(reservation.status)}
                    </StatusBadge>
                  </CardHeader>
                  <CardContent>
                    <InfoItem>
                      <strong>카테고리:</strong> {reservation.category}
                    </InfoItem>
                    <InfoItem>
                      <strong>수량:</strong> {reservation.quantity}대
                    </InfoItem>
                    <InfoItem>
                      <strong>최대 단가:</strong> ₩{reservation.maxPrice.toLocaleString()}
                    </InfoItem>
                    <InfoItem>
                      <strong>조건:</strong> {reservation.condition}
                    </InfoItem>
                    <InfoItem>
                      <strong>마감일:</strong> {reservation.deadline}
                    </InfoItem>
                    <InfoItem>
                      <strong>총 예산:</strong> ₩{(reservation.maxPrice * reservation.quantity).toLocaleString()}
                    </InfoItem>
                  </CardContent>
                </ReservationCard>
              ))}
            </ListContent>
          </ReservationList>
        </ContentGrid>

        {/* 예약 거래 가이드 */}
        <GuideSection>
          <GuideHeader>
            <FormTitle>예약 거래 진행 과정</FormTitle>
            <FormSubtitle>예약 거래가 어떻게 진행되는지 확인하세요</FormSubtitle>
          </GuideHeader>
          <GuideContent>
            <GuideSteps>
              {guideSteps.map((step) => (
                <StepCard key={step.number}>
                  <StepNumber>{step.number}</StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepCard>
              ))}
            </GuideSteps>
          </GuideContent>
        </GuideSection>
      </Container>
    </ReservationContainer>
  );
};

export default ReservationPage;