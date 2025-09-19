import React, { useState } from 'react';
import styled from 'styled-components';
import { MOCK_PRODUCTS, formatPrice } from '../data/products';

const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const Header = styled.div`
  background: white;
  border-bottom: 1px solid #ebebeb;
  padding: 20px 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #8e8e93;
  font-size: 13px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const CartItems = styled.div``;

const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 20px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const SelectAllText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #222;
`;

const DeleteSelected = styled.button`
  background: none;
  border: 1px solid #d3d3d3;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: #666;
  cursor: pointer;

  &:hover {
    background: #f8f8f8;
  }
`;

// KREAM 스타일 카트 아이템
const CartItem = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #ebebeb;
  padding: 20px;
  margin-bottom: 12px;
`;

const ItemRow = styled.div`
  display: flex;
  gap: 20px;
`;

const ItemCheckbox = styled(Checkbox)`
  margin-top: 60px;
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemBrand = styled.div`
  font-size: 13px;
  color: #8e8e93;
  margin-bottom: 4px;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #222;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const ItemSpecs = styled.div`
  font-size: 14px;
  color: #8e8e93;
  margin-bottom: 16px;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
`;

const QuantityBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  font-size: 18px;
  color: #222;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f8f8f8;
  }

  &:disabled {
    color: #d3d3d3;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
`;

const ItemPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #222;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #8e8e93;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;

  &:hover {
    color: #222;
  }
`;

// KREAM 스타일 주문 요약
const OrderSummary = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #ebebeb;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin-bottom: 16px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
`;

const SummaryLabel = styled.span`
  color: #8e8e93;
`;

const SummaryValue = styled.span`
  color: #222;
  font-weight: 500;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ebebeb;
  margin: 16px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;
`;

const CheckoutBtn = styled.button`
  width: 100%;
  background: #222;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #d3d3d3;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ebebeb;
`;

const EmptyIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #f8f8f8;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #8e8e93;
`;

interface CartItemType {
  id: string;
  product: any;
  variantId: string;
  quantity: number;
  selected: boolean;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: '1',
      product: MOCK_PRODUCTS[0],
      variantId: MOCK_PRODUCTS[0].variants[0].id,
      quantity: 1,
      selected: true,
    },
    {
      id: '2',
      product: MOCK_PRODUCTS[1],
      variantId: MOCK_PRODUCTS[1].variants[0].id,
      quantity: 2,
      selected: true,
    },
    {
      id: '3',
      product: MOCK_PRODUCTS[2],
      variantId: MOCK_PRODUCTS[2].variants[0].id,
      quantity: 1,
      selected: false,
    },
  ]);

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(items => items.map(item => ({ ...item, selected: !allSelected })));
  };

  const toggleItemSelect = (itemId: string) => {
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => 
    sum + (item.product.variants[0].price.instant * item.quantity), 0
  );
  const shipping = subtotal > 300000 ? 0 : 3000;
  const total = subtotal + shipping;

  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  if (cartItems.length === 0) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Title>장바구니</Title>
            <Subtitle>선택한 상품을 확인하고 주문하세요</Subtitle>
          </HeaderContent>
        </Header>
        <Content>
          <EmptyCart>
            <EmptyIcon>🛒</EmptyIcon>
            <h3 style={{ color: '#8e8e93', marginBottom: '8px' }}>장바구니가 비어있습니다</h3>
            <p style={{ color: '#8e8e93', fontSize: '14px' }}>원하는 상품을 장바구니에 담아보세요</p>
          </EmptyCart>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>장바구니</Title>
          <Subtitle>선택한 상품을 확인하고 주문하세요</Subtitle>
        </HeaderContent>
      </Header>

      <Content>
        <CartItems>
          <SelectAllContainer>
            <CheckboxGroup>
              <Checkbox 
                type="checkbox" 
                checked={allSelected}
                onChange={toggleSelectAll}
              />
              <SelectAllText>
                전체 선택 ({selectedItems.length}/{cartItems.length})
              </SelectAllText>
            </CheckboxGroup>
            <DeleteSelected onClick={() => setCartItems([])}>
              선택 삭제
            </DeleteSelected>
          </SelectAllContainer>

          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemRow>
                <ItemCheckbox 
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItemSelect(item.id)}
                />
                <ItemImage src={item.product.baseImage} alt={item.product.name} />
                <ItemInfo>
                  <ItemBrand>{item.product.brand}</ItemBrand>
                  <ItemName>{item.product.name}</ItemName>
                  <ItemSpecs>
                    {Object.entries(item.product.variants[0].specs)
                      .slice(0, 2)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(', ')}
                  </ItemSpecs>
                  <ItemActions>
                    <QuantityControl>
                      <QuantityBtn 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </QuantityBtn>
                      <QuantityDisplay>{item.quantity}</QuantityDisplay>
                      <QuantityBtn 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </QuantityBtn>
                    </QuantityControl>
                    <ItemPrice>
                      {formatPrice(item.product.variants[0].price.instant * item.quantity)}
                    </ItemPrice>
                  </ItemActions>
                </ItemInfo>
                <RemoveBtn onClick={() => removeItem(item.id)}>
                  ×
                </RemoveBtn>
              </ItemRow>
            </CartItem>
          ))}
        </CartItems>

        <OrderSummary>
          <SummaryTitle>주문 요약</SummaryTitle>
          <SummaryRow>
            <SummaryLabel>상품 수량</SummaryLabel>
            <SummaryValue>{selectedItems.length}개</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>상품 금액</SummaryLabel>
            <SummaryValue>{formatPrice(subtotal)}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>배송비</SummaryLabel>
            <SummaryValue>{formatPrice(shipping)}</SummaryValue>
          </SummaryRow>
          <Divider />
          <TotalRow>
            <span>총 결제 금액</span>
            <span>{formatPrice(total)}</span>
          </TotalRow>
          <CheckoutBtn disabled={selectedItems.length === 0}>
            {selectedItems.length > 0 ? '주문하기' : '상품을 선택해주세요'}
          </CheckoutBtn>
        </OrderSummary>
      </Content>
    </Container>
  );
};

export default CartPage;