import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 48px 24px 24px;
  margin-top: auto;
  
  @media (max-width: 768px) {
    padding: 32px 16px 80px; /* 모바일 네비게이션 바 공간 확보 */
    display: block; /* 모바일에서도 표시 */
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>LOOPI</h3>
            <p style={{ lineHeight: '1.6', color: '#adb5bd' }}>
              기업형 크림 서비스로 안전하고 신뢰할 수 있는<br />
              예약 거래 플랫폼을 제공합니다.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '16px' }}>서비스</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="/products" style={{ color: '#adb5bd', textDecoration: 'none' }}>상품 거래</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/reservations" style={{ color: '#adb5bd', textDecoration: 'none' }}>예약 서비스</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/business" style={{ color: '#adb5bd', textDecoration: 'none' }}>기업 인증</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '16px' }}>고객지원</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="/support" style={{ color: '#adb5bd', textDecoration: 'none' }}>고객센터</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/faq" style={{ color: '#adb5bd', textDecoration: 'none' }}>자주 묻는 질문</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/terms" style={{ color: '#adb5bd', textDecoration: 'none' }}>이용약관</a>
              </li>
            </ul>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #495057',
          paddingTop: '24px',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '14px'
        }}>
          © 2024 LOOPI. All rights reserved.
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;