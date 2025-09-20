import React, { useState } from 'react';
import styled from 'styled-components';

interface MobileMenuProps {
  isOpen: boolean;
}

const HeaderContainer = styled.header`
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm);
    height: 56px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  margin: 0 var(--spacing-lg);

  @media (max-width: 768px) {
    max-width: none;
    margin: 0 var(--spacing-md);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 var(--spacing-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--gray-50);
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--white);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    gap: var(--spacing-sm);
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--white);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--gray-50);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background: var(--primary);
  color: var(--white);
  border-color: var(--primary);

  &:hover {
    background: var(--gray-800);
    border-color: var(--gray-800);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 18px;
  color: var(--text-primary);
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<MobileMenuProps>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-md);
  flex-direction: column;
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const MobileNavLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: var(--accent);
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>LOOPI <span style={{fontSize: '12px', color: '#666', fontWeight: 'normal'}}>Beta</span></Logo>
        
        <Navigation>
          <NavLink href="/">HOME</NavLink>
          <NavLink href="/products">STYLE</NavLink>
          <NavLink href="/products">SHOP</NavLink>
        </Navigation>

        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="브랜드, 상품, 프로필, 태그 등"
          />
        </SearchContainer>

        <UserActions>
          <ActionButton>로그인</ActionButton>
          <PrimaryButton>회원가입</PrimaryButton>
          <MobileMenuButton onClick={toggleMobileMenu}>
            ☰
          </MobileMenuButton>
        </UserActions>
      </HeaderContent>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLink href="/">HOME</MobileNavLink>
        <MobileNavLink href="/products">STYLE</MobileNavLink>
        <MobileNavLink href="/products">SHOP</MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;