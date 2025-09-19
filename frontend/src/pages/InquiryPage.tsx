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
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #8e8e93;
  font-size: 14px;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const InquiryForm = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #ebebeb;
  padding: 32px;
`;

const FormSection = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #222;
  margin-bottom: 12px;
`;

const Select = styled.select`
  width: 100%;
  padding: 16px;
  border: 1px solid #d3d3d3;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #222;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #d3d3d3;
  border-radius: 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #222;
  }

  &::placeholder {
    color: #8e8e93;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 1px solid #d3d3d3;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #222;
  }

  &::placeholder {
    color: #8e8e93;
  }
`;

const FileUpload = styled.div`
  border: 2px dashed #d3d3d3;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  margin-top: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #222;
    background: #f8f8f8;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #222;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 32px;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #d3d3d3;
    cursor: not-allowed;
  }
`;

const Sidebar = styled.div``;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #ebebeb;
  padding: 24px;
  margin-bottom: 24px;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #222;
  margin-bottom: 16px;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  font-size: 14px;
  color: #8e8e93;
  line-height: 1.6;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '•';
    color: #222;
    margin-right: 8px;
  }
`;

const ContactCard = styled(InfoCard)``;

const ContactItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ContactLabel = styled.span`
  font-size: 14px;
  color: #8e8e93;
`;

const ContactValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #222;
`;

const InquiryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    content: '',
    email: '',
    orderNumber: '',
  });

  const [files, setFiles] = useState<FileList | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 API 호출을 통해 문의를 전송
    console.log('문의 내용:', formData);
    console.log('첨부 파일:', files);
    alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
  };

  const isFormValid = formData.category && formData.subject && formData.content && formData.email;

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>1:1 문의</Title>
          <Subtitle>궁금한 점이나 불편사항을 문의해 주세요</Subtitle>
        </HeaderContent>
      </Header>

      <Content>
        <InquiryForm>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <Label htmlFor="category">문의 유형 *</Label>
              <Select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">문의 유형을 선택해주세요</option>
                <option value="order">주문/결제</option>
                <option value="delivery">배송</option>
                <option value="return">교환/반품</option>
                <option value="product">상품 문의</option>
                <option value="account">계정/회원</option>
                <option value="trade">거래</option>
                <option value="other">기타</option>
              </Select>
            </FormSection>

            <FormSection>
              <Label htmlFor="email">이메일 주소 *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="답변을 받을 이메일 주소를 입력해주세요"
                required
              />
            </FormSection>

            <FormSection>
              <Label htmlFor="orderNumber">주문번호 (선택)</Label>
              <Input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
                placeholder="주문 관련 문의시 주문번호를 입력해주세요"
              />
            </FormSection>

            <FormSection>
              <Label htmlFor="subject">제목 *</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="문의 제목을 입력해주세요"
                required
              />
            </FormSection>

            <FormSection>
              <Label htmlFor="content">문의 내용 *</Label>
              <TextArea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="자세한 문의 내용을 입력해주세요. 상품명, 주문번호, 발생 상황 등을 포함하면 더 빠른 답변을 받을 수 있습니다."
                required
              />
            </FormSection>

            <FormSection>
              <Label>첨부 파일 (선택)</Label>
              <FileUpload onClick={() => document.getElementById('file-input')?.click()}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📎</div>
                <div style={{ fontSize: '14px', color: '#8e8e93' }}>
                  {files ? `${files.length}개 파일 선택됨` : '파일을 선택하거나 여기에 드래그하세요'}
                </div>
                <div style={{ fontSize: '12px', color: '#bbb', marginTop: '4px' }}>
                  JPG, PNG, PDF 파일만 업로드 가능 (최대 10MB)
                </div>
              </FileUpload>
              <FileInput
                id="file-input"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
            </FormSection>

            <SubmitButton type="submit" disabled={!isFormValid}>
              문의하기
            </SubmitButton>
          </form>
        </InquiryForm>

        <Sidebar>
          <InfoCard>
            <InfoTitle>문의 전 확인사항</InfoTitle>
            <InfoList>
              <InfoItem>자주 묻는 질문에서 답변을 먼저 확인해보세요</InfoItem>
              <InfoItem>주문/배송 관련 문의는 주문번호를 함께 적어주세요</InfoItem>
              <InfoItem>상품 관련 문의는 정확한 상품명을 포함해주세요</InfoItem>
              <InfoItem>스크린샷이나 사진을 첨부하면 더 빠른 해결이 가능합니다</InfoItem>
            </InfoList>
          </InfoCard>

          <ContactCard>
            <InfoTitle>고객센터 정보</InfoTitle>
            <ContactItem>
              <ContactLabel>운영시간</ContactLabel>
              <ContactValue>09:00 - 18:00</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>점심시간</ContactLabel>
              <ContactValue>12:00 - 13:00</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>휴무일</ContactLabel>
              <ContactValue>주말 및 공휴일</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>평균 응답시간</ContactLabel>
              <ContactValue>영업일 기준 24시간</ContactValue>
            </ContactItem>
          </ContactCard>
        </Sidebar>
      </Content>
    </Container>
  );
};

export default InquiryPage;