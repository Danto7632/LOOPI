import React, { useEffect } from 'react';

const HomePage: React.FC = () => {
  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '48px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 히어로 섹션 */}
        <section style={{
          textAlign: 'center',
          padding: '80px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          color: 'white',
          marginBottom: '80px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            기업형 크림 플랫폼<br />
            <span style={{ color: '#ffd700' }}>LOOPI</span>
          </h1>
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            예약 판매/구매 시스템으로 안전하고 효율적인 거래를 경험하세요
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{
              background: '#fff',
              color: '#667eea',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              예약 판매하기
            </button>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid white',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              예약 구매하기
            </button>
          </div>
        </section>

        {/* 주요 기능 섹션 */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            textAlign: 'center',
            marginBottom: '48px',
            color: '#333'
          }}>
            주요 기능
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            <div style={{
              padding: '32px',
              borderRadius: '12px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#667eea',
                borderRadius: '50%',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🔄
              </div>
              <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>예약 매칭</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                판매자와 구매자의 예약을 자동으로 매칭하여 
                효율적인 거래를 지원합니다.
              </p>
            </div>
            
            <div style={{
              padding: '32px',
              borderRadius: '12px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#51cf66',
                borderRadius: '50%',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🔒
              </div>
              <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>안전 거래</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                에스크로 방식으로 안전한 결제와 정산을 
                보장하는 신뢰할 수 있는 거래 환경을 제공합니다.
              </p>
            </div>
            
            <div style={{
              padding: '32px',
              borderRadius: '12px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#ffd43b',
                borderRadius: '50%',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
              🏢
              </div>
              <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>기업 인증</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                사업자 인증을 통한 신뢰할 수 있는 
                B2B 거래 환경을 구축합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 통계 섹션 */}
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: '64px 32px',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '36px',
            marginBottom: '48px',
            color: '#333'
          }}>
            LOOPI와 함께하는 거래
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px'
          }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#667eea', marginBottom: '8px' }}>
                1,234
              </div>
              <div style={{ color: '#666' }}>총 거래 건수</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#51cf66', marginBottom: '8px' }}>
                567
              </div>
              <div style={{ color: '#666' }}>등록된 기업</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffd43b', marginBottom: '8px' }}>
                98%
              </div>
              <div style={{ color: '#666' }}>거래 만족도</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ff6b6b', marginBottom: '8px' }}>
                24/7
              </div>
              <div style={{ color: '#666' }}>고객 지원</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;