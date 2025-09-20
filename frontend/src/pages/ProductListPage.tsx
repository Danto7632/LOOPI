import React from 'react';
import { MOCK_PRODUCTS as products, Product } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductListPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '32px', fontSize: '32px', color: '#333' }}>
          상품 목록
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              showHeartIcon={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;