# 🆓 무료 백엔드 배포 가이드

## 🔍 무료 백엔드 호스팅 옵션 비교

### 1. Railway (추천) ⭐
**무료 플랜**: $5 크레딧/월 (충분함)
- ✅ NestJS 완벽 지원
- ✅ MySQL 데이터베이스 포함
- ✅ 쉬운 GitHub 연동
- ✅ 자동 배포
- ⏰ 제한: 512MB RAM, 1GB 디스크

### 2. Heroku (제한적)
**무료 플랜**: 2021년 11월 종료됨
- ❌ 더 이상 무료 플랜 없음
- 💰 최소 $7/월

### 3. Vercel (Serverless)
**무료 플랜**: 있음
- ✅ 무제한 요청 (개인 프로젝트)
- ✅ GitHub 연동 자동
- ⚠️ Serverless 함수로 변환 필요
- ⚠️ 데이터베이스 별도 필요

### 4. Netlify Functions
**무료 플랜**: 있음
- ✅ 125,000 함수 호출/월
- ⚠️ Serverless 함수로 변환 필요
- ⚠️ 데이터베이스 별도 필요

### 5. Render
**무료 플랜**: 있음
- ✅ NestJS 지원
- ✅ PostgreSQL 무료 포함
- ⚠️ 비활성 시 슬립 모드
- ⏰ 제한: 512MB RAM, 100GB 대역폭

## 🗄️ 무료 데이터베이스 옵션

### 1. Railway MySQL (Railway 사용시)
**무료 플랜**: $5 크레딧에 포함
- ✅ 백엔드와 함께 자동 설정
- ✅ 환경변수 자동 연결
- ⏰ 제한: 1GB 저장공간

### 2. PlanetScale (MySQL 호환)
**무료 플랜**: 1개 데이터베이스
- ✅ 5GB 저장공간
- ✅ 1억 행 읽기/월
- ✅ 1000만 행 쓰기/월
- ✅ 브랜치 기능 (Git for DB)

### 3. Aiven (MySQL)
**무료 플랜**: 1개월 $300 크레딧
- ✅ 완전 관리형
- ✅ 자동 백업
- ⏰ 제한: 크레딧 소진 후 유료

### 4. Supabase (PostgreSQL)
**무료 플랜**: 있음
- ✅ 500MB 데이터베이스
- ✅ 2GB 대역폭/월
- ⚠️ PostgreSQL (MySQL 아님)

## 🛠️ 설정 방법

### 옵션 1: Railway (가장 쉬움) ⭐

#### 1단계: Railway 계정 생성
1. [Railway.app](https://railway.app) 방문
2. GitHub 계정으로 로그인
3. 무료 $5 크레딧 확인

#### 2단계: 프로젝트 생성
1. "New Project" 클릭
2. "Deploy from GitHub repo" 선택
3. LOOPI 리포지토리 선택
4. `backend` 폴더 선택

#### 3단계: MySQL 데이터베이스 추가
1. 프로젝트에서 "Add Service" 클릭
2. "MySQL" 선택
3. 자동으로 DATABASE_URL 생성됨

#### 4단계: 환경변수 설정
```bash
JWT_SECRET=your-super-secret-jwt-key-32-chars-min
JWT_EXPIRES_IN=7d
NODE_ENV=production
FRONTEND_URL=https://danto7632.github.io
```

### 옵션 2: Vercel + PlanetScale

#### 1단계: PlanetScale 설정
1. [PlanetScale.com](https://planetscale.com) 계정 생성
2. 새 데이터베이스 생성: `loopi-prod`
3. 연결 문자열 복사

#### 2단계: Vercel 배포
1. [Vercel.com](https://vercel.com) 계정 생성
2. GitHub 리포지토리 연결
3. `backend` 폴더 선택
4. 환경변수 설정:
```bash
DATABASE_URL=mysql://user:pass@host/database?sslaccept=strict
JWT_SECRET=your-secret-key
NODE_ENV=production
```

## 🎯 추천 선택

### 🥇 초보자용: Railway
- 설정이 가장 쉬움
- 백엔드와 DB 한 번에 해결
- GitHub Actions와 자동 연동

### 🥈 고급 사용자용: Vercel + PlanetScale
- 더 많은 무료 리소스
- 확장성 좋음
- 더 복잡한 설정 필요