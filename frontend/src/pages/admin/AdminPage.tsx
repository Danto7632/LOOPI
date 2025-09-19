import React, { useEffect } from 'react';

const AdminPage: React.FC = () => {
  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h1>관리자 페이지</h1>
      <p>관리자 기능이 여기에 구현됩니다.</p>
    </div>
  );
};

export default AdminPage;