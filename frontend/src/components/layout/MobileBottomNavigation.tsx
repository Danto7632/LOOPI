import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      icon: '🏠',
      label: 'HOME',
    },
    {
      path: '/products',
      icon: '🔍',
      label: 'SHOP',
    },
    {
      path: '/saved',
      icon: '🔖',
      label: 'SAVED',
    },
    {
      path: '/mypage',
      icon: '👤',
      label: 'MY',
    },
  ];

  return (
    <BottomNav>
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          as={Link}
          to={item.path}
          $isActive={location.pathname === item.path}
        >
          <NavIcon $isActive={location.pathname === item.path}>{item.icon}</NavIcon>
          <NavLabel>{item.label}</NavLabel>
          {location.pathname === item.path && <ActiveDot />}
        </NavItem>
      ))}
    </BottomNav>
  );
};

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  border-top: 1px solid #ebebeb;
  display: none;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-decoration: none;
  color: ${props => props.$isActive ? '#222' : '#999'};
  transition: color 0.2s ease;
  padding: 8px 12px;
  min-width: 50px;
`;

const NavIcon = styled.div<{ $isActive: boolean }>`
  font-size: 20px;
  margin-bottom: 4px;
  filter: grayscale(${props => props.$isActive ? '0%' : '100%'});
`;

const NavLabel = styled.div`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ActiveDot = styled.div`
  position: absolute;
  top: 4px;
  right: 8px;
  width: 4px;
  height: 4px;
  background: #ff6b35;
  border-radius: 50%;
`;

export default MobileBottomNavigation;