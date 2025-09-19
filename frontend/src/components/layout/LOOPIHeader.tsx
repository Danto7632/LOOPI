import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SearchComponent from '../SearchComponent';

interface MobileMenuProps {
  isOpen: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'register';
}

// Auth Modal Component
const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type }) => {
  const [isLogin, setIsLogin] = useState(type === 'login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  // type이 변경될 때 isLogin 상태 업데이트
  useEffect(() => {
    setIsLogin(type === 'login');
    // 폼 데이터도 초기화
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      agreeTerms: false
    });
    setError('');
  }, [type]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        // Validation for register
        if (formData.password !== formData.confirmPassword) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }
        if (!formData.agreeTerms) {
          throw new Error('이용약관에 동의해주세요.');
        }
        await register(formData.email, formData.password, formData.name, formData.phone || undefined);
      }
      onClose();
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        agreeTerms: false
      });
    } catch (error: any) {
      setError(error.message || '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{isLogin ? '로그인' : '회원가입'}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <AuthForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <InputGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              required
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
              required
              disabled={isLoading}
            />
          </InputGroup>

          {!isLogin && (
            <>
              <InputGroup>
                <Label>비밀번호 확인</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                  disabled={isLoading}
                />
              </InputGroup>

              <InputGroup>
                <Label>이름</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력하세요"
                  required
                  disabled={isLoading}
                />
              </InputGroup>

              <InputGroup>
                <Label>전화번호 (선택사항)</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-1234-5678"
                  disabled={isLoading}
                />
              </InputGroup>

              <CheckboxGroup>
                <Checkbox
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
                <CheckboxLabel>이용약관 및 개인정보처리방침에 동의합니다</CheckboxLabel>
              </CheckboxGroup>
            </>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '처리중...' : (isLogin ? '로그인' : '회원가입')}
          </SubmitButton>

          <AuthToggle>
            {isLogin ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            <ToggleButton type="button" onClick={() => setIsLogin(!isLogin)} disabled={isLoading}>
              {isLogin ? '회원가입' : '로그인'}
            </ToggleButton>
          </AuthToggle>
        </AuthForm>
      </ModalContent>
    </ModalOverlay>
  );
};

// Modal Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
`;

const ModalContent = styled.div`
  background: var(--white);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--border);
`;

const ModalTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: var(--font-semibold);
  color: var(--primary);
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--gray-500);
  cursor: pointer;
  padding: var(--spacing-xs);
  line-height: 1;
  
  &:hover {
    color: var(--primary);
  }
`;

const AuthForm = styled.form`
  padding: var(--spacing-xl);
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);
  border: 1px solid #fcc;
`;

const InputGroup = styled.div`
  margin-bottom: var(--spacing-lg);
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
  padding: var(--spacing-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--business-primary);
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
  
  &::placeholder {
    color: var(--gray-500);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
`;

const Checkbox = styled.input`
  margin-top: 2px;
`;

const CheckboxLabel = styled.label`
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  line-height: 1.4;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: var(--business-primary);
  color: var(--white);
  border: none;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: var(--spacing-lg);
  
  &:hover {
    background: var(--business-secondary);
  }
  
  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
  }
`;

const AuthToggle = styled.div`
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--gray-600);
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--business-primary);
  font-weight: var(--font-semibold);
  cursor: pointer;
  margin-left: var(--spacing-xs);
  
  &:hover {
    color: var(--business-secondary);
  }
`;

const HeaderContainer = styled.header`
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled(Link)`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-black);
  color: var(--business-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--business-secondary);
  }
  text-decoration: none;
  cursor: pointer;
  
  .highlight {
    color: var(--accent);
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-3xl);

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--gray-700);
  text-decoration: none;
  font-weight: var(--font-medium);
  font-size: var(--font-size-base);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;

  &:hover {
    color: var(--business-primary);
    background-color: var(--bg-secondary);
  }

  &.active {
    color: var(--business-primary);
    font-weight: var(--font-semibold);
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    gap: var(--spacing-md);
  }
`;

const SearchComponentWrapper = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 var(--spacing-3xl);

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const UserName = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-medium);
  color: var(--primary);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--gray-700);
  font-size: var(--font-size-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    color: var(--business-primary);
    background-color: var(--bg-secondary);
  }

  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
  }
`;

const PrimaryButton = styled.button`
  background: var(--business-primary);
  color: var(--white);
  border: none;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--business-secondary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-xs);
  }
`;

const MobileMenuButton = styled.button`
  display: none; /* 모바일 하단 네비게이션으로 대체 */
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--gray-700);
  cursor: pointer;
  padding: var(--spacing-sm);
`;

const MobileMenu = styled.div<MobileMenuProps>`
  display: none; /* 모바일 하단 네비게이션으로 대체 */
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all var(--transition-normal);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuContent = styled.div`
  padding: var(--spacing-lg);
`;

const MobileSearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-lg);
  background-color: var(--bg-secondary);

  &:focus {
    outline: none;
    border-color: var(--business-primary);
    background-color: var(--white);
  }

  &::placeholder {
    color: var(--gray-500);
  }
`;

const MobileNavLink = styled.a`
  display: block;
  color: var(--gray-700);
  text-decoration: none;
  font-weight: var(--font-medium);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-light);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--business-primary);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const BusinessBadge = styled.span`
  background: var(--tech-green);
  color: var(--white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-bold);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  margin-left: var(--spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{isOpen: boolean, type: 'login' | 'register'}>({
    isOpen: false,
    type: 'login'
  });
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuthModal = (type: 'login' | 'register') => {
    setAuthModal({ isOpen: true, type });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, type: 'login' });
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          L<span className="highlight">OO</span>PI
          <BusinessBadge>B2B</BusinessBadge>
        </Logo>

        <Navigation>
          <NavLink as={Link} to="/products" className="active">상품목록</NavLink>
          <NavLink as={Link} to="/mypage">마이페이지</NavLink>
          <NavLink as={Link} to="/cart">장바구니</NavLink>
          <NavLink as={Link} to="/faq">고객지원</NavLink>
        </Navigation>

        <SearchComponentWrapper>
          <SearchComponent 
            placeholder="브랜드, 모델명, 제품명 검색 (예: ThinkPad T480, i5-8세대)"
            onSearch={(query) => {
              // 검색 결과 페이지로 이동하는 로직 추가 가능
              console.log('검색:', query);
            }}
          />
        </SearchComponentWrapper>

        <UserActions>
          {isAuthenticated ? (
            <>
              <UserInfo>
                <UserName>{user?.name}님</UserName>
                <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
              </UserInfo>
              <PrimaryButton as={Link} to="/sell">판매하기</PrimaryButton>
            </>
          ) : (
            <>
              <ActionButton onClick={() => openAuthModal('login')}>로그인</ActionButton>
              <ActionButton onClick={() => openAuthModal('register')}>회원가입</ActionButton>
              <PrimaryButton>판매하기</PrimaryButton>
            </>
          )}
        </UserActions>

        <MobileMenuButton onClick={toggleMobileMenu}>
          ☰
        </MobileMenuButton>
      </HeaderContent>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuContent>
          <MobileSearchInput 
            type="text" 
            placeholder="제품 검색..."
          />
          <MobileNavLink as={Link} to="/products" onClick={() => setIsMobileMenuOpen(false)}>상품목록</MobileNavLink>
          <MobileNavLink as={Link} to="/mypage" onClick={() => setIsMobileMenuOpen(false)}>마이페이지</MobileNavLink>
          <MobileNavLink as={Link} to="/cart" onClick={() => setIsMobileMenuOpen(false)}>장바구니</MobileNavLink>
          <MobileNavLink as={Link} to="/faq" onClick={() => setIsMobileMenuOpen(false)}>고객지원</MobileNavLink>
        </MobileMenuContent>
      </MobileMenu>

      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={closeAuthModal} 
        type={authModal.type} 
      />
    </HeaderContainer>
  );
};

export default Header;