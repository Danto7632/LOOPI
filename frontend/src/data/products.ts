// 실제 이미지 파일 기반 상품 데이터 구조
export interface ProductSpecs {
  [key: string]: string | string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  specs: ProductSpecs;
  price: {
    instant: number;
    reserve: number;
  };
  condition: 'S' | 'A' | 'B' | 'C';
  stock: number;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'desktop' | 'laptop' | 'monitor' | 'accessory' | 'mobile' | 'tablet';
  modelYear: number;
  description: string;
  baseImage: string;
  variants: ProductVariant[];
  tags: string[];
  reviews: {
    rating: number;
    count: number;
  };
  likes: number;
  createdAt: string;
  updatedAt: string;
}

// 카테고리별 스펙 옵션 정의
export const SPEC_OPTIONS = {
  laptop: {
    ram: ['8GB', '16GB', '32GB', '64GB'],
    storage: ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'],
    color: ['스페이스 그레이', '실버', '블랙', '화이트'],
    processor: ['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    display: ['13인치', '14인치', '15인치', '16인치', '17인치']
  },
  desktop: {
    ram: ['8GB', '16GB', '32GB', '64GB', '128GB'],
    storage: ['512GB SSD', '1TB SSD', '2TB SSD', '1TB HDD', '2TB HDD'],
    processor: ['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    graphics: ['내장 그래픽', 'GTX 1660', 'RTX 3060', 'RTX 3070', 'RTX 3080', 'RTX 4060', 'RTX 4070', 'RTX 4080'],
    case: ['미니 타워', '미드 타워', '풀 타워']
  },
  monitor: {
    size: ['21인치', '24인치', '27인치', '32인치', '34인치'],
    resolution: ['FHD (1920x1080)', 'QHD (2560x1440)', '4K (3840x2160)', '5K (5120x2880)'],
    refreshRate: ['60Hz', '75Hz', '144Hz', '165Hz', '240Hz'],
    panel: ['IPS', 'VA', 'TN', 'OLED'],
    features: ['USB-C', 'HDR', '곡면', '높이조절', '회전']
  },
  mobile: {
    storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
    color: ['블랙', '화이트', '블루', '레드', '그린', '퍼플', '골드', '실버'],
    condition: ['새상품', 'A급', 'B급', 'C급']
  },
  tablet: {
    storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
    connectivity: ['Wi-Fi', 'Wi-Fi + Cellular'],
    color: ['스페이스 그레이', '실버', '골드', '로즈골드'],
    accessories: ['키보드 포함', '펜슬 포함', '케이스 포함']
  },
  accessory: {
    type: ['키보드', '마우스', '헤드셋', '웹캠', '스피커', 'USB허브', '독', '케이블'],
    connectivity: ['유선', '무선', 'Bluetooth', 'USB-C', 'Lightning'],
    color: ['블랙', '화이트', '실버', '그레이']
  }
};

// 더미 상품 데이터 (실제 이미지 기반)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'laptop-001',
    name: 'MacBook Pro 16인치',
    brand: 'Apple',
    category: 'laptop',
    modelYear: 2023,
    description: 'M2 Pro 칩이 탑재된 최신 MacBook Pro 16인치 모델',
    baseImage: '/macbook.png',
    variants: [
      {
        id: 'laptop-001-1',
        name: 'MacBook Pro 16인치 M2 Pro 16GB/512GB',
        specs: {
          processor: 'M2 Pro',
          ram: '16GB',
          storage: '512GB SSD',
          color: '스페이스 그레이',
          display: '16인치'
        },
        price: {
          instant: 2890000,
          reserve: 2850000
        },
        condition: 'S',
        stock: 5,
        images: ['/macbook.png']
      },
      {
        id: 'laptop-001-2',
        name: 'MacBook Pro 16인치 M2 Pro 32GB/1TB',
        specs: {
          processor: 'M2 Pro',
          ram: '32GB',
          storage: '1TB SSD',
          color: '실버',
          display: '16인치'
        },
        price: {
          instant: 3590000,
          reserve: 3550000
        },
        condition: 'S',
        stock: 3,
        images: ['/macbook.png']
      }
    ],
    tags: ['프리미엄', '디자인', '개발', '영상편집'],
    reviews: {
      rating: 4.8,
      count: 142
    },
    likes: 326,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'laptop-002',
    name: 'ThinkPad X1 Carbon',
    brand: 'Lenovo',
    category: 'laptop',
    modelYear: 2023,
    description: '비즈니스 프리미엄 울트라북, 14인치 터치 디스플레이',
    baseImage: '/thinkpad.avif',
    variants: [
      {
        id: 'laptop-002-1',
        name: 'ThinkPad X1 Carbon Gen 11 i7/16GB/512GB',
        specs: {
          processor: 'Intel i7-1355U',
          ram: '16GB',
          storage: '512GB SSD',
          color: '블랙',
          display: '14인치 터치'
        },
        price: {
          instant: 1890000,
          reserve: 1850000
        },
        condition: 'A',
        stock: 8,
        images: ['/thinkpad.avif']
      }
    ],
    tags: ['비즈니스', '가볍다', '터치', '키보드'],
    reviews: {
      rating: 4.6,
      count: 89
    },
    likes: 157,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 'desktop-001',
    name: 'iMac 24인치',
    brand: 'Apple',
    category: 'desktop',
    modelYear: 2023,
    description: 'M2 칩이 탑재된 올인원 데스크톱, 4.5K Retina 디스플레이',
    baseImage: '/imac.webp',
    variants: [
      {
        id: 'desktop-001-1',
        name: 'iMac 24인치 M2 8GB/256GB',
        specs: {
          processor: 'M2',
          ram: '8GB',
          storage: '256GB SSD',
          graphics: '내장 그래픽',
          color: '블루'
        },
        price: {
          instant: 1690000,
          reserve: 1650000
        },
        condition: 'S',
        stock: 6,
        images: ['/imac.webp']
      },
      {
        id: 'desktop-001-2',
        name: 'iMac 24인치 M2 16GB/512GB',
        specs: {
          processor: 'M2',
          ram: '16GB',
          storage: '512GB SSD',
          graphics: '내장 그래픽',
          color: '실버'
        },
        price: {
          instant: 2190000,
          reserve: 2150000
        },
        condition: 'S',
        stock: 4,
        images: ['/imac.webp']
      }
    ],
    tags: ['올인원', '디자인', '4K', '컴팩트'],
    reviews: {
      rating: 4.7,
      count: 76
    },
    likes: 243,
    createdAt: '2024-01-12T11:30:00Z',
    updatedAt: '2024-01-19T13:20:00Z'
  },
  {
    id: 'monitor-001',
    name: 'Studio Display',
    brand: 'Apple',
    category: 'monitor',
    modelYear: 2022,
    description: '27인치 5K Retina 디스플레이, Thunderbolt 연결',
    baseImage: '/studiodisplay.jpeg',
    variants: [
      {
        id: 'monitor-001-1',
        name: 'Studio Display 27인치 5K',
        specs: {
          size: '27인치',
          resolution: '5K (5120x2880)',
          refreshRate: '60Hz',
          panel: 'IPS',
          features: ['USB-C', 'Thunderbolt', '높이조절', '회전']
        },
        price: {
          instant: 1790000,
          reserve: 1750000
        },
        condition: 'A',
        stock: 3,
        images: ['/images/studio-display-front.jpg']
      }
    ],
    tags: ['프리미엄', '5K', 'USB-C', '디자인'],
    reviews: {
      rating: 4.5,
      count: 45
    },
    likes: 89,
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-17T10:15:00Z'
  },
  {
    id: 'mobile-001',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'mobile',
    modelYear: 2023,
    description: '티타늄 디자인의 프리미엄 스마트폰, A17 Pro 칩 탑재',
    baseImage: '/images/iphone-15-pro.jpg',
    variants: [
      {
        id: 'mobile-001-1',
        name: 'iPhone 15 Pro 128GB',
        specs: {
          storage: '128GB',
          color: '내추럴 티타늄',
          condition: 'S'
        },
        price: {
          instant: 1350000,
          reserve: 1320000
        },
        condition: 'S',
        stock: 12,
        images: ['/images/iphone-15-pro-natural.jpg']
      },
      {
        id: 'mobile-001-2',
        name: 'iPhone 15 Pro 256GB',
        specs: {
          storage: '256GB',
          color: '블루 티타늄',
          condition: 'S'
        },
        price: {
          instant: 1490000,
          reserve: 1460000
        },
        condition: 'S',
        stock: 8,
        images: ['/images/iphone-15-pro-blue.jpg']
      }
    ],
    tags: ['프리미엄', '카메라', '티타늄', '최신'],
    reviews: {
      rating: 4.9,
      count: 203
    },
    likes: 512,
    createdAt: '2024-01-05T09:30:00Z',
    updatedAt: '2024-01-21T11:45:00Z'
  }
];

// 카테고리별 제품 필터링 함수
export const getProductsByCategory = (category: string): Product[] => {
  return MOCK_PRODUCTS.filter(product => product.category === category);
};

// 제품 검색 함수
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// ID로 제품 찾기
export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find(product => product.id === id);
};

// 가격 포맷팅 함수
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);
};