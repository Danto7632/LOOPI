# 🔄 LOOPI - KREAM 스타일 트레이딩 플랫폼

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

## 📖 프로젝트 개요

LOOPI는 KREAM을 벤치마킹한 현대적인 중고거래 플랫폼입니다. 실시간 거래, 입찰 시스템, 예약 매칭 등 혁신적인 기능을 통해 안전하고 편리한 거래 환경을 제공합니다.

### ✨ 주요 특징

- � **실시간 거래 시스템**: 즉시 구매/판매 가능
- 📊 **가격 차트 및 분석**: 시장 동향 시각화
- 🔒 **안전거래 보장**: 에스크로 기반 결제 시스템
- 📱 **모바일 최적화**: 반응형 웹 디자인
- ⚡ **빠른 매칭**: 자동화된 거래 매칭 시스템

## 🏗️ 기술 스택

### Backend
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: MySQL 8.0+ with TypeORM
- **Authentication**: JWT Strategy
- **Architecture**: Modular Design Pattern

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Styled-Components
- **State Management**: React Hooks
- **Routing**: React Router v6
- **UI/UX**: KREAM-inspired Design System

### DevOps & Deployment
- **CI/CD**: GitHub Actions
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Railway
- **Database**: MySQL (Production)
- **Containerization**: Docker & Docker Compose
- **Development**: Hot Reload 지원
- **Build Tools**: Webpack, Vite

## 📁 프로젝트 구조

```
LOOPI/
├── 📂 backend/                    # NestJS API 서버
│   ├── 📂 src/
│   │   ├── 📂 modules/           # 기능별 모듈
│   │   │   ├── 📂 auth/          # 인증 시스템
│   │   │   ├── 📂 users/         # 사용자 관리
│   │   │   ├── 📂 products/      # 상품 관리
│   │   │   ├── 📂 orders/        # 주문 처리
│   │   │   ├── 📂 payments/      # 결제 시스템
│   │   │   ├── 📂 reservations/  # 예약 매칭
│   │   │   └── 📂 reviews/       # 리뷰 시스템
│   │   ├── 📂 database/          # DB 설정
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── package.json
├── 📂 frontend/                   # React 클라이언트
│   ├── 📂 src/
│   │   ├── 📂 components/        # 재사용 컴포넌트
│   │   │   └── 📂 layout/        # 레이아웃 컴포넌트
│   │   ├── 📂 pages/             # 페이지 컴포넌트
│   │   │   ├── 📂 auth/          # 인증 페이지
│   │   │   └── 📂 admin/         # 관리자 페이지
│   │   ├── 📂 services/          # API 서비스
│   │   ├── 📂 hooks/             # 커스텀 훅
│   │   ├── 📂 styles/            # 글로벌 스타일
│   │   ├── 📂 types/             # TypeScript 타입
│   │   └── 📂 utils/             # 유틸리티 함수
│   └── package.json
├── 📂 docs/                      # 프로젝트 문서
├── .gitignore
└── README.md
```

## 🔑 핵심 기능

### 🛍️ 거래 시스템
- **즉시 구매/판매**: 시장가 기반 실시간 거래
- **입찰 시스템**: 원하는 가격으로 구매/판매 입찰
- **예약 매칭**: 자동화된 거래 조건 매칭
- **가격 차트**: 실시간 시세 및 거래 내역

### 👥 사용자 시스템
- **통합 계정**: 판매자/구매자 역할 자유 전환
- **프로필 관리**: 거래 내역 및 신뢰도 관리
- **비즈니스 인증**: 사업자 계정 별도 인증

### 💳 결제 시스템
- **안전거래**: 에스크로 기반 결제 보호
- **다양한 결제수단**: 카드, 계좌이체, 포인트
- **자동 정산**: 거래 완료 시 자동 정산

### 📊 데이터 분석
- **거래 통계**: 개인/전체 거래 분석
- **시장 동향**: 카테고리별 인기 상품
- **가격 예측**: 머신러닝 기반 시세 예측

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18.0+
- MySQL 8.0+
- Docker (선택사항)

### 1️⃣ 저장소 클론
```bash
git clone https://github.com/Danto7632/LOOPI.git
cd LOOPI
```

### 2️⃣ 백엔드 설정 및 실행
```bash
cd backend

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일 편집하여 데이터베이스 정보 입력

# 개발 서버 실행
npm run start:dev
```

### 3️⃣ 프론트엔드 설정 및 실행
```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 4️⃣ Docker를 이용한 실행 (선택사항)
```bash
# 백엔드 디렉토리에서
cd backend
docker-compose up -d
```

## 🌐 서비스 접속

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:3306

## � API 문서

개발 서버 실행 후 다음 주소에서 API 문서를 확인할 수 있습니다:
- **Swagger UI**: http://localhost:3001/api/docs

## 🧪 테스트

### 백엔드 테스트
```bash
cd backend
npm run test
npm run test:e2e
```

### 프론트엔드 테스트
```bash
cd frontend
npm test
```

## 🔧 개발 환경 설정

### 백엔드 환경 변수 (.env)
```env
# 데이터베이스
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=loopi

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# 서버
PORT=3001
```

### 프론트엔드 환경 변수 (.env)
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_NAME=LOOPI
```

## 📊 데이터베이스 스키마

주요 테이블 구조:
- **users**: 사용자 정보 및 인증
- **products**: 상품 정보 및 카테고리
- **orders**: 주문 및 거래 내역
- **payments**: 결제 정보 및 상태
- **reservations**: 예약 매칭 시스템
- **reviews**: 리뷰 및 평점 시스템

## 🎨 UI/UX 특징

### KREAM 스타일 디자인
- **모던한 인터페이스**: 깔끔하고 직관적인 UI
- **모바일 최적화**: 반응형 웹 디자인
- **다크/라이트 테마**: 사용자 선호도 지원

### 주요 페이지
- **홈페이지**: 인기 상품 및 실시간 거래 현황
- **상품 상세**: 실시간 시세, 입찰 현황, 거래 내역
- **거래 페이지**: 구매/판매 프로세스
- **마이페이지**: 거래 내역, 입찰 현황, 관심 상품
- **관리자 페이지**: 상품 관리, 사용자 관리, 통계

## 🔐 보안 및 인증

- **JWT 기반 인증**: 안전한 토큰 기반 인증 시스템
- **입력값 검증**: 모든 API 엔드포인트에 유효성 검사
- **SQL 인젝션 방지**: TypeORM을 통한 안전한 DB 접근
- **CORS 설정**: 크로스 오리진 요청 보안 관리

## 📈 성능 최적화

- **코드 스플리팅**: React.lazy를 통한 번들 최적화
- **이미지 최적화**: WebP 포맷 지원 및 레이지 로딩
- **캐싱 전략**: API 응답 캐싱 및 정적 자원 캐싱
- **데이터베이스 최적화**: 인덱싱 및 쿼리 최적화

## 🤝 기여하기

1. 프로젝트 포크
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## � 배포 (Deployment)

### 자동 배포 설정

이 프로젝트는 GitHub Actions를 통한 자동 CI/CD 파이프라인이 설정되어 있습니다.

#### 배포 환경
- **프론트엔드**: Vercel
- **백엔드**: Railway
- **데이터베이스**: MySQL (프로덕션)

### 📋 배포 워크플로우

1. **CI/CD Pipeline** (`ci-cd.yml`)
   - ✅ 코드 빌드 및 테스트
   - ✅ 자동 실행 (모든 브랜치)

2. **간단한 배포** (`simple-deploy.yml`) - **추천**
   - ✅ GitHub Pages에 프론트엔드 자동 배포
   - 🔧 추가 설정 불필요
   - ⚡ 즉시 사용 가능

3. **고급 배포** (`deploy-production.yml`)
   - ✅ Vercel + Railway 자동 배포
   - 🔧 토큰 설정 필요

### 🔧 배포 문제해결

**일반적인 오류:**
- `option requires argument: --token` → GitHub Secrets에 토큰 미설정
- `railway deploy --token` 오류 → Railway CLI 명령어 문법 변경됨 (수정됨)

**해결방법:**
1. 간단한 배포 사용 (GitHub Pages)
2. 또는 [배포 설정 가이드](.github/DEPLOYMENT_SETUP.md)에 따라 토큰 설정

#### 필수 설정
배포를 위해 GitHub Repository Secrets에 다음 환경변수들을 설정해야 합니다:

```bash
# Vercel (프론트엔드)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
REACT_APP_API_URL=https://your-backend-url.com

# Railway (백엔드)
RAILWAY_TOKEN=your_railway_token

# 프로덕션 데이터베이스
PROD_DB_HOST=your_production_db_host
PROD_DB_USERNAME=your_db_username
PROD_DB_PASSWORD=your_db_password
PROD_DB_DATABASE=loopi_production
PROD_JWT_SECRET=your_super_secret_jwt_key
```

자세한 설정 방법은 [배포 설정 가이드](.github/DEPLOYMENT_SETUP.md)를 참조하세요.

## �📜 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

- **개발자**: Danto7632
- **GitHub**: [https://github.com/Danto7632](https://github.com/Danto7632)
- **이슈 리포트**: [GitHub Issues](https://github.com/Danto7632/LOOPI/issues)

## 🙏 감사인사

- [KREAM](https://kream.co.kr/) - 디자인 영감
- [NestJS](https://nestjs.com/) - 강력한 백엔드 프레임워크
- [React](https://reactjs.org/) - 현대적인 프론트엔드 라이브러리

---

**⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!**