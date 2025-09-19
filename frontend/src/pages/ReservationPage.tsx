import React from 'react';

const ReservationPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '32px', fontSize: '32px', color: '#333' }}>
          예약 서비스
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {/* 예약 판매 */}
          <div style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#667eea',
              borderRadius: '50%',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              📤
            </div>
            <h2 style={{ marginBottom: '16px', fontSize: '24px', color: '#333' }}>
              예약 판매
            </h2>
            <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
              상품을 등록하고 구매자가 나타날 때까지 대기합니다.
              자동 매칭으로 편리하게 거래하세요.
            </p>
            <button style={{
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              예약 판매 등록
            </button>
          </div>

          {/* 예약 구매 */}
          <div style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#51cf66',
              borderRadius: '50%',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              📥
            </div>
            <h2 style={{ marginBottom: '16px', fontSize: '24px', color: '#333' }}>
              예약 구매
            </h2>
            <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
              원하는 상품을 미리 등록하고 판매자가 나타날 때
              자동으로 알림을 받으세요.
            </p>
            <button style={{
              backgroundColor: '#51cf66',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              예약 구매 등록
            </button>
          </div>
        </div>

        {/* 예약 현황 */}
        <section>
          <h2 style={{ marginBottom: '24px', fontSize: '28px', color: '#333' }}>
            내 예약 현황
          </h2>
          
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              padding: '16px 24px',
              backgroundColor: '#f8f9fa',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#666'
            }}>
              <div>상품명</div>
              <div>타입</div>
              <div>가격</div>
              <div>상태</div>
              <div>등록일</div>
            </div>
            
            {/* 예약 목록 */}
            {[1, 2, 3].map((item) => (
              <div key={item} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                padding: '16px 24px',
                borderBottom: '1px solid #e9ecef',
                alignItems: 'center'
              }}>
                <div>iPhone 15 Pro 256GB</div>
                <div>
                  <span style={{
                    backgroundColor: item % 2 === 0 ? '#e7f5ff' : '#e8f5e8',
                    color: item % 2 === 0 ? '#1971c2' : '#2f9e44',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {item % 2 === 0 ? '예약구매' : '예약판매'}
                  </span>
                </div>
                <div>{(item * 100000).toLocaleString()}원</div>
                <div>
                  <span style={{
                    backgroundColor: '#fff3cd',
                    color: '#856404',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    대기중
                  </span>
                </div>
                <div>2024.03.1{item}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReservationPage;