import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #ebebeb;
  padding: 24px 0;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #222;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  color: #8e8e93;
  font-size: 16px;
  margin-bottom: 32px;
`;

const SearchBox = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px 16px 50px;
  border: 2px solid #ebebeb;
  border-radius: 50px;
  font-size: 16px;
  background: #f8f8f8;

  &:focus {
    outline: none;
    border-color: #222;
    background: white;
  }

  &::placeholder {
    color: #8e8e93;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #8e8e93;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
  gap: 8px;
  flex-wrap: wrap;
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border: 1px solid ${props => props.active ? '#222' : '#d3d3d3'};
  background: ${props => props.active ? '#222' : 'white'};
  color: ${props => props.active ? 'white' : '#222'};
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #222;
    background: ${props => props.active ? '#333' : '#f8f8f8'};
  }
`;

const FAQList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #ebebeb;
  margin-bottom: 16px;
  overflow: hidden;
`;

const FAQQuestion = styled.div<{ isOpen: boolean }>`
  padding: 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: #f8f8f8;
  }
`;

const QuestionText = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #222;
  line-height: 1.5;
  margin: 0;
`;

const ToggleIcon = styled.div<{ isOpen: boolean }>`
  font-size: 20px;
  color: #8e8e93;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s;
`;

const FAQAnswer = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '0 24px 24px 24px' : '0'};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  background: #f8f9fa;
`;

const AnswerText = styled.div`
  color: #555;
  line-height: 1.6;
  font-size: 14px;

  p {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: #222;
    font-weight: 600;
  }

  ul {
    margin: 12px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #8e8e93;
`;

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    id: '1',
    category: 'trade',
    question: '구매 입찰은 어떻게 하나요?',
    answer: `
      <p><strong>구매 입찰 방법:</strong></p>
      <ul>
        <li>원하는 상품 상세 페이지에서 '구매' 버튼을 클릭합니다</li>
        <li>사이즈를 선택하고 희망 가격을 입력합니다</li>
        <li>입찰 기간을 설정합니다 (1일 ~ 30일)</li>
        <li>결제 정보를 확인하고 입찰을 완료합니다</li>
      </ul>
      <p>판매자가 입찰가에 동의하면 자동으로 거래가 체결됩니다.</p>
    `
  },
  {
    id: '2',
    category: 'trade',
    question: '판매는 어떻게 하나요?',
    answer: `
      <p><strong>판매 방법:</strong></p>
      <ul>
        <li>상품 등록: 판매할 상품의 정확한 정보를 입력합니다</li>
        <li>검수 신청: LOOPI 검수센터에 상품을 발송합니다</li>
        <li>검수 완료: 전문가가 정품 여부와 상태를 확인합니다</li>
        <li>판매 완료: 검수 통과 시 즉시 판매가 완료됩니다</li>
      </ul>
      <p>검수비용은 상품 가격의 5%입니다.</p>
    `
  },
  {
    id: '3',
    category: 'payment',
    question: '결제 방법에는 어떤 것들이 있나요?',
    answer: `
      <p><strong>지원하는 결제 방법:</strong></p>
      <ul>
        <li>신용카드 (모든 카드사 지원)</li>
        <li>체크카드</li>
        <li>계좌이체</li>
        <li>카카오페이</li>
        <li>네이버페이</li>
        <li>토스</li>
      </ul>
      <p>무이자 할부는 카드사별로 다르니 결제 시 확인해주세요.</p>
    `
  },
  {
    id: '4',
    category: 'delivery',
    question: '배송은 얼마나 걸리나요?',
    answer: `
      <p><strong>배송 소요시간:</strong></p>
      <ul>
        <li>즉시구매: 검수 완료 후 1-2일</li>
        <li>구매입찰: 판매자 발송 → 검수 → 배송 (3-7일)</li>
        <li>지역별 차이가 있을 수 있습니다</li>
      </ul>
      <p>모든 상품은 LOOPI 검수센터를 거쳐 안전하게 배송됩니다.</p>
    `
  },
  {
    id: '5',
    category: 'inspection',
    question: '검수는 어떻게 진행되나요?',
    answer: `
      <p><strong>검수 과정:</strong></p>
      <ul>
        <li>상품 접수: 검수센터 도착 시 알림 발송</li>
        <li>정품 확인: 브랜드별 전문가가 정품 여부 확인</li>
        <li>상태 검사: 외관, 기능, 구성품 등 꼼꼼히 확인</li>
        <li>검수 완료: 통과 시 즉시 거래 완료, 불통과 시 반송</li>
      </ul>
      <p>검수 기준은 브랜드와 상품에 따라 다를 수 있습니다.</p>
    `
  },
  {
    id: '6',
    category: 'return',
    question: '교환이나 환불이 가능한가요?',
    answer: `
      <p><strong>교환/환불 정책:</strong></p>
      <ul>
        <li>구매 확정 전: 상품 수령 후 7일 이내 신청 가능</li>
        <li>단순 변심: 왕복 배송비 고객 부담</li>
        <li>상품 하자: 전액 환불 및 무료 교환</li>
        <li>검수 실수: 전액 환불 및 배상</li>
      </ul>
      <p>구매 확정 후에는 교환/환불이 불가능합니다.</p>
    `
  },
  {
    id: '7',
    category: 'account',
    question: '회원가입은 어떻게 하나요?',
    answer: `
      <p><strong>회원가입 방법:</strong></p>
      <ul>
        <li>이메일로 가입: 이메일 인증 후 개인정보 입력</li>
        <li>소셜 로그인: 카카오, 네이버, 구글 계정으로 간편 가입</li>
        <li>휴대폰 인증: 본인 확인을 위한 휴대폰 번호 인증</li>
      </ul>
      <p>만 14세 이상부터 가입 가능하며, 실명 인증이 필요합니다.</p>
    `
  },
  {
    id: '8',
    category: 'account',
    question: '비밀번호를 잊어버렸어요',
    answer: `
      <p><strong>비밀번호 재설정:</strong></p>
      <ul>
        <li>로그인 페이지에서 '비밀번호 찾기' 클릭</li>
        <li>가입한 이메일 주소 입력</li>
        <li>이메일로 발송된 링크를 통해 비밀번호 재설정</li>
        <li>새로운 비밀번호로 로그인</li>
      </ul>
      <p>이메일이 오지 않으면 스팸함을 확인하거나 고객센터에 문의해주세요.</p>
    `
  }
];

const categories = [
  { id: 'all', name: '전체' },
  { id: 'trade', name: '거래' },
  { id: 'payment', name: '결제' },
  { id: 'delivery', name: '배송' },
  { id: 'inspection', name: '검수' },
  { id: 'return', name: '교환/환불' },
  { id: 'account', name: '계정' }
];

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>자주 묻는 질문</Title>
          <Subtitle>궁금한 내용을 빠르게 찾아보세요</Subtitle>
          
          <SearchBox>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="찾고 있는 내용을 검색해보세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
        </HeaderContent>
      </Header>

      <Content>
        <CategoryTabs>
          {categories.map(category => (
            <CategoryTab
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <FAQList>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => (
              <FAQItem key={faq.id}>
                <FAQQuestion
                  isOpen={openItems.has(faq.id)}
                  onClick={() => toggleItem(faq.id)}
                >
                  <QuestionText>{faq.question}</QuestionText>
                  <ToggleIcon isOpen={openItems.has(faq.id)}>
                    ▼
                  </ToggleIcon>
                </FAQQuestion>
                <FAQAnswer isOpen={openItems.has(faq.id)}>
                  <AnswerText dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </FAQAnswer>
              </FAQItem>
            ))
          ) : (
            <NoResults>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <div style={{ fontSize: '18px', marginBottom: '8px' }}>검색 결과가 없습니다</div>
              <div style={{ fontSize: '14px' }}>다른 키워드로 검색해보거나 1:1 문의를 이용해주세요</div>
            </NoResults>
          )}
        </FAQList>
      </Content>
    </Container>
  );
};

export default FAQPage;