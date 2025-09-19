# GitHub Actions 배포 설정 가이드

## 🚨 현재 오류 해결 방법

최근 배포에서 발생한 오류들:
1. **Railway CLI**: `--token` 인수 문법 오류 → 수정됨
2. **Vercel CLI**: 토큰이 설정되지 않음 → 조건부 실행으로 수정됨

## 📋 배포 워크플로우 옵션

### 1. 간단한 배포 (simple-deploy.yml) - 추천
- ✅ 빌드만 수행하고 GitHub Pages에 프론트엔드 배포
- ❌ 백엔드는 수동 배포 필요
- 🔧 추가 설정 불필요

### 2. 자동 배포 (deploy-production.yml)
- ✅ Vercel + Railway 자동 배포
- ❌ 토큰 설정 필수
- 🔧 복잡한 설정 필요

## 🛠️ 토큰 설정 방법 (자동 배포 사용시)

### GitHub Repository Secrets 설정
1. GitHub 리포지토리 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 아래 토큰들을 각각 추가

### Vercel 토큰 획득
```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인
vercel login

# 3. 토큰 생성
vercel --token
```

### Railway 토큰 획득
```bash
# 1. Railway CLI 설치
npm install -g @railway/cli

# 2. 로그인
railway login

# 3. 토큰 확인 (대시보드에서)
# https://railway.app/account/tokens
```

## 백엔드 관련 Secrets

### 데이터베이스 설정
- `PROD_DB_HOST`: 프로덕션 데이터베이스 호스트
- `PROD_DB_PORT`: 프로덕션 데이터베이스 포트 (기본값: 3306)
- `PROD_DB_USERNAME`: 프로덕션 데이터베이스 사용자명
- `PROD_DB_PASSWORD`: 프로덕션 데이터베이스 비밀번호
- `PROD_DB_DATABASE`: 프로덕션 데이터베이스명

### JWT 설정
- `PROD_JWT_SECRET`: 프로덕션용 JWT 시크릿 키 (강력한 랜덤 문자열)
- `PROD_JWT_EXPIRES_IN`: JWT 토큰 만료 시간 (예: 7d)

## 프론트엔드 관련 Secrets
- `REACT_APP_API_URL`: 백엔드 API 서버 URL

## 배포 서비스 관련 Secrets

### Vercel (프론트엔드 배포시)
- `VERCEL_TOKEN`: Vercel 배포 토큰
- `VERCEL_ORG_ID`: Vercel 조직 ID
- `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID

### AWS (백엔드 배포시)
- `AWS_ACCESS_KEY_ID`: AWS 액세스 키 ID
- `AWS_SECRET_ACCESS_KEY`: AWS 시크릿 액세스 키
- `AWS_REGION`: AWS 리전 (예: ap-northeast-2)

### Railway/Heroku (백엔드 배포시)
- `RAILWAY_TOKEN`: Railway 배포 토큰 (Railway 사용시)
- `HEROKU_API_KEY`: Heroku API 키 (Heroku 사용시)
- `HEROKU_APP_NAME`: Heroku 앱 이름 (Heroku 사용시)

## 예시 설정값

```bash
# 개발환경 (이미 .env에 설정됨)
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=loopi

# 프로덕션환경 (GitHub Secrets에 설정 필요)
PROD_DB_HOST=your-production-db-host.com
PROD_DB_PORT=3306
PROD_DB_USERNAME=prod_user
PROD_DB_PASSWORD=super_secure_password
PROD_DB_DATABASE=loopi_production
PROD_JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
```

## 다음 단계
1. 위의 secrets를 GitHub에 설정
2. 실제 배포 서비스 (Vercel, Railway, AWS 등) 선택 및 계정 설정
3. ci-cd.yml 파일의 배포 섹션을 선택한 서비스에 맞게 수정
4. main 브랜치에 코드를 푸시하여 배포 테스트