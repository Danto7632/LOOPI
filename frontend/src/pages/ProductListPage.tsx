import React from 'react';

const ProductListPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '32px', fontSize: '32px', color: '#333' }}>
          상품 목록
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {/* 임시 상품 카드들 */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}>
              <div style={{
                height: '200px',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6c757d'
              }}>
                상품 이미지 {item}
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>
                  상품명 {item}
                </h3>
                <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
                  상품 설명입니다...
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                    {(item * 100000).toLocaleString()}원
                  </span>
                  <span style={{
                    backgroundColor: '#e7f5ff',
                    color: '#1971c2',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    예약 가능
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;