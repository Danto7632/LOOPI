# 🚀 5분만에 무료 백엔드 배포하기

## 🎯 Railway로 빠른 배포 (추천)

### 1️⃣ Railway 가입 (2분)
1. [Railway.app](https://railway.app) 방문
2. "Login with GitHub" 클릭
3. ✅ $5 무료 크레딧 확인

### 2️⃣ 프로젝트 배포 (2분)
1. "New Project" → "Deploy from GitHub repo"
2. `Danto7632/LOOPI` 선택
3. `backend` 폴더 선택
4. ✅ 자동 빌드 시작

### 3️⃣ 데이터베이스 추가 (1분)
1. 프로젝트에서 "➕ Add Service"
2. "🗄️ MySQL" 선택
3. ✅ 자동으로 DATABASE_URL 생성

### 4️⃣ 환경변수 설정 (1분)
프로젝트 → Variables 탭에서 추가:
```bash
JWT_SECRET=loopi-super-secret-jwt-key-production-2024
JWT_EXPIRES_IN=7d
NODE_ENV=production
FRONTEND_URL=https://danto7632.github.io
```

### 5️⃣ 배포 완료! 🎉
- 📋 배포 URL: `https://loopi-backend-production.up.railway.app`
- 🔗 API 테스트: `https://your-app.railway.app/api`
- 💾 데이터베이스: 자동 연결됨

## 🔗 프론트엔드 연결

### frontend/src에 API URL 설정
```typescript
// src/services/auth.service.ts
const API_BASE_URL = 'https://your-railway-app.railway.app/api';
```

## 🔄 자동 배포 설정

### GitHub Actions 연동
1. Railway → Settings → Tokens → "Create Token"
2. GitHub → Settings → Secrets → Add Secret:
   - Name: `RAILWAY_TOKEN`
   - Value: 복사한 토큰

이제 main 브랜치에 푸시할 때마다 자동 배포됩니다! 🚀

## 💰 비용 및 제한

### 무료 플랜 ($5 크레딧/월)
- ✅ 백엔드 서버: ~$3-4/월
- ✅ MySQL 데이터베이스: ~$1-2/월
- ✅ 24/7 가동
- ✅ 자동 백업

### 리소스 제한
- 💾 RAM: 512MB
- 💿 디스크: 1GB
- 🌐 대역폭: 100GB/월

**소규모 프로젝트에는 충분합니다!**

## 🆘 문제 해결

### 배포 실패시
1. Railway 대시보드 → Deployments → 로그 확인
2. 환경변수가 모두 설정되었는지 확인
3. `npm run build`가 로컬에서 성공하는지 확인

### 데이터베이스 연결 실패시
1. DATABASE_URL이 자동 생성되었는지 확인
2. MySQL 서비스가 시작되었는지 확인
3. SSL 설정이 올바른지 확인

### API 접근 안됨
1. CORS 설정에 프론트엔드 URL이 포함되었는지 확인
2. 방화벽이나 네트워크 제한 확인
3. HTTPS 사용 확인

## 📞 도움이 필요하면
- Railway 문서: https://docs.railway.app
- Discord: Railway Community
- GitHub Issues: 프로젝트 이슈 탭