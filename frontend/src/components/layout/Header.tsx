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
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: var(--primary);
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: var(--primary);
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 40px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--gray-50);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    background: var(--white);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    color: var(--primary);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 18px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<MobileMenuProps>`
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  padding: 20px;
  z-index: 99;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 12px 0;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid var(--border);
  
  &:hover {
    color: var(--primary);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo>LOOPI</Logo>
          
          <Nav>
            <NavLink href="/">HOME</NavLink>
            <NavLink href="/style">STYLE</NavLink>
            <NavLink href="/shop">SHOP</NavLink>
          </Nav>
          
          <SearchContainer>
            <SearchInput placeholder="브랜드, 상품, 프로필, 태그 등" />
          </SearchContainer>
          
          <UserActions>
            <ActionButton>로그인</ActionButton>
            <ActionButton>회원가입</ActionButton>
            <MobileMenuButton 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </MobileMenuButton>
          </UserActions>
        </HeaderContent>
      </HeaderContainer>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLink href="/">HOME</MobileNavLink>
        <MobileNavLink href="/style">STYLE</MobileNavLink>
        <MobileNavLink href="/shop">SHOP</MobileNavLink>
        <MobileNavLink href="/login">로그인</MobileNavLink>
        <MobileNavLink href="/register">회원가입</MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Header;