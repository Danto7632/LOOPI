# LOOPI Backend

LOOPI 기업형 크림 서비스의 백엔드 API 서버입니다.

## 🚀 기술 스택

- **Framework**: NestJS
- **Database**: MySQL
- **ORM**: TypeORM
- **Language**: TypeScript
- **Authentication**: JWT
- **Documentation**: Swagger

## 📋 설치 및 실행

### 환경 설정

1. 환경 변수 파일 설정
```bash
cp .env.example .env
```

2. `.env` 파일에서 데이터베이스 및 기타 설정 변경

### 의존성 설치
```bash
npm install
```

### 데이터베이스 설정
```bash
# MySQL 데이터베이스 생성
CREATE DATABASE loopi;

# 마이그레이션 실행 (TypeORM 동기화)
npm run start:dev
```

### 개발 서버 실행
```bash
npm run start:dev
```

서버가 실행되면:
- API 서버: http://localhost:8000
- API 문서: http://localhost:8000/api/docs

## 📁 프로젝트 구조

```
src/
├── main.ts              # 애플리케이션 진입점
├── app.module.ts        # 루트 모듈
├── database/            # 데이터베이스 설정
│   └── database.module.ts
└── modules/             # 기능별 모듈
    ├── auth/            # 인증/인가
    ├── users/           # 사용자 관리
    ├── products/        # 상품 관리
    ├── reservations/    # 예약 판매/구매
    ├── orders/          # 주문 관리
    ├── payments/        # 결제 관리
    └── reviews/         # 리뷰 관리
```

## 🔑 주요 기능

### 1. 회원 시스템
- 통합 계정 (판매자/구매자 구분 없음)
- 사업자 인증
- 신뢰도/평판 관리

### 2. 예약 시스템
- 예약 판매 등록
- 예약 구매 등록
- 자동 매칭 알고리즘

### 3. 결제 시스템
- 에스크로 방식 안전거래
- 다양한 결제 수단 지원
- 자동 정산 처리

### 4. 거래 관리
- 주문 생성 및 관리
- 배송 추적
- 거래 완료 처리

## 🗃️ 데이터베이스 스키마

### 주요 엔티티
- **User**: 사용자 정보 및 신뢰도
- **Product**: 상품 정보
- **ReservationSale**: 예약 판매
- **ReservationPurchase**: 예약 구매
- **Order**: 주문 정보
- **Payment**: 결제 정보
- **Review**: 거래 후기

## 📚 API 문서

서버 실행 후 http://localhost:8000/api/docs 에서 Swagger 문서를 확인할 수 있습니다.

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run start:dev

# 빌드
npm run build

# 프로덕션 실행
npm run start:prod

# 테스트
npm run test

# 린트
npm run lint

# 타입체크
npm run build
```

## 🚀 배포

### Docker 배포
```bash
# Dockerfile 생성 후
docker build -t loopi-backend .
docker run -p 8000:8000 loopi-backend
```

### 환경별 설정
- **개발**: `NODE_ENV=development`
- **스테이징**: `NODE_ENV=staging`
- **프로덕션**: `NODE_ENV=production`