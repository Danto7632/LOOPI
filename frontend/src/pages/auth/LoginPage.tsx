import React, { useEffect } from 'react';

const LoginPage: React.FC = () => {
  // 페이지 진입 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      minHeight: 'calc(100vh - 160px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '48px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '28px',
          color: '#333'
        }}>
          로그인
        </h1>
        
        <form>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            로그인
          </button>
        </form>
        
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#666'
        }}>
          계정이 없으신가요?{' '}
          <a href="/register" style={{
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;