import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #ebebeb;
  padding: 24px 0;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #222;
`;

const MarkAllRead = styled.button`
  background: none;
  border: 1px solid #d3d3d3;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  color: #222;
  cursor: pointer;

  &:hover {
    background: #f8f8f8;
  }
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const FilterTabs = styled.div`
  display: flex;
  margin-bottom: 32px;
  border-bottom: 1px solid #ebebeb;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 16px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.active ? '#222' : '#8e8e93'};
  border-bottom: 2px solid ${props => props.active ? '#222' : 'transparent'};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #222;
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const NotificationItem = styled.div<{ isRead: boolean }>`
  background: ${props => props.isRead ? 'white' : '#f8f9fa'};
  border: 1px solid #ebebeb;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  &:hover {
    background: #f8f9fa;
    transform: translateX(4px);
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const NotificationIcon = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 18px;
  background: ${props => {
    switch (props.type) {
      case 'trade': return '#e3f2fd';
      case 'price': return '#f3e5f5';
      case 'order': return '#e8f5e8';
      case 'system': return '#fff3e0';
      default: return '#f5f5f5';
    }
  }};
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #222;
  margin-bottom: 4px;
  line-height: 1.4;
`;

const NotificationMessage = styled.p`
  font-size: 14px;
  color: #8e8e93;
  line-height: 1.4;
  margin-bottom: 8px;
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: #bbb;
`;

const UnreadBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 8px;
  height: 8px;
  background: #ff4757;
  border-radius: 50%;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #ebebeb;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #f8f8f8;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

interface Notification {
  id: string;
  type: 'trade' | 'price' | 'order' | 'system';
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
}

const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'trade': return '💱';
    case 'price': return '💰';
    case 'order': return '📦';
    case 'system': return '⚙️';
    default: return '📢';
  }
};

const formatNotificationTime = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else {
    return date.toLocaleDateString();
  }
};

const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'trade' | 'system'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'trade',
      title: '구매 입찰이 체결되었습니다',
      message: 'MacBook Pro 14인치 M3 스페이스 그레이 512GB 구매 입찰이 성공적으로 체결되었습니다.',
      time: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
    },
    {
      id: '2',
      type: 'price',
      title: '관심 상품 가격 변동 알림',
      message: 'iPad Pro 12.9인치 6세대 실버 128GB 가격이 1,200,000원으로 하락했습니다.',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: '3',
      type: 'order',
      title: '상품이 발송되었습니다',
      message: 'iPhone 15 Pro 내추럴 티타늄 256GB 주문 상품이 발송되었습니다. 운송장번호: 1234567890',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: '4',
      type: 'trade',
      title: '판매 입찰이 등록되었습니다',
      message: 'Galaxy S24 Ultra 티타늄 그레이 512GB 판매 입찰이 성공적으로 등록되었습니다.',
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: '5',
      type: 'system',
      title: '서비스 점검 안내',
      message: '2024년 1월 15일 02:00~06:00 시스템 점검이 예정되어 있습니다.',
      time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isRead: true,
    },
  ]);

  const filteredNotifications = notifications.filter(notification => {
    switch (activeTab) {
      case 'unread':
        return !notification.isRead;
      case 'trade':
        return notification.type === 'trade' || notification.type === 'order';
      case 'system':
        return notification.type === 'system' || notification.type === 'price';
      default:
        return true;
    }
  });

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>알림</Title>
          {unreadCount > 0 && (
            <MarkAllRead onClick={markAllAsRead}>
              모두 읽음
            </MarkAllRead>
          )}
        </HeaderContent>
      </Header>

      <Content>
        <FilterTabs>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            전체 ({notifications.length})
          </Tab>
          <Tab 
            active={activeTab === 'unread'} 
            onClick={() => setActiveTab('unread')}
          >
            읽지 않음 ({unreadCount})
          </Tab>
          <Tab 
            active={activeTab === 'trade'} 
            onClick={() => setActiveTab('trade')}
          >
            거래/주문
          </Tab>
          <Tab 
            active={activeTab === 'system'} 
            onClick={() => setActiveTab('system')}
          >
            시스템/가격
          </Tab>
        </FilterTabs>

        {filteredNotifications.length > 0 ? (
          <NotificationList>
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                isRead={notification.isRead}
                onClick={() => markAsRead(notification.id)}
              >
                <NotificationHeader>
                  <NotificationIcon type={notification.type}>
                    {getNotificationIcon(notification.type)}
                  </NotificationIcon>
                  <NotificationContent>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationMessage>{notification.message}</NotificationMessage>
                    <NotificationTime>{formatNotificationTime(notification.time)}</NotificationTime>
                  </NotificationContent>
                  {!notification.isRead && <UnreadBadge />}
                </NotificationHeader>
              </NotificationItem>
            ))}
          </NotificationList>
        ) : (
          <EmptyState>
            <EmptyIcon>🔔</EmptyIcon>
            <h3 style={{ color: '#8e8e93', marginBottom: '8px' }}>알림이 없습니다</h3>
            <p style={{ color: '#8e8e93', fontSize: '14px' }}>새로운 알림이 도착하면 여기에 표시됩니다</p>
          </EmptyState>
        )}
      </Content>
    </Container>
  );
};

export default NotificationsPage;