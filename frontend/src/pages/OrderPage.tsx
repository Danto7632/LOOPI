import React, { useEffect } from 'react';

const OrderPage: React.FC = () => {
  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h1>주문 내역</h1>
      <p>주문 내역과 배송 정보가 여기에 표시됩니다.</p>
    </div>
  );
};

export default OrderPage;