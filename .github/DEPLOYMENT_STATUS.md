# 🌐 배포 URL 및 상태 확인 가## 🔗 배포 URL 확인 방법

### 🆕 Option 1: Vercel (추천) ⭐

#### URL 패턴:
```
https://loopi.vercel.app/
https://loopi.vercel.app/products
https://loopi.vercel.app/login
```

#### 장점:
- ✅ 깔끔한 URL (서브폴더 없음)
- ✅ React SPA 완벽 지원
- ✅ 빠른 배포 (몇 초)
- ✅ 무료 플랜
- ✅ 자동 HTTPS

#### 배포 방법:
1. [Vercel.com](https://vercel.com) 가입
2. GitHub 리포지토리 연결
3. Root Directory: `frontend` 선택
4. Deploy 클릭 → 완료!

**자세한 가이드**: [Vercel 배포 가이드](.github/VERCEL_DEPLOYMENT_GUIDE.md)

### 2. GitHub Pages (기존)

#### URL 패턴:
```
https://danto7632.github.io/LOOPI/#/
```

#### 확인 방법:
1. **GitHub 리포지토리** → **Settings** → **Pages**
2. "Your site is published at" 메시지에서 URL 확인
3. 또는 **Actions** 탭에서 성공한 workflow 로그 확인

#### 설정 확인:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **(root)**태

### ✅ 성공한 배포
- **CI/CD Pipeline**: ✅ 성공 (빌드 및 테스트)
- **Deploy to Production**: ✅ 성공 (Vercel/Railway 배포 시도)

### ❌ 실패한 배포
- **Simple Deploy**: ❌ 실패 (GitHub Pages 권한 오류) → **수정됨**

## � GitHub Pages 수동 활성화 (필수)

GitHub Pages가 자동으로 활성화되지 않은 경우:

1. **GitHub 리포지토리** → **Settings** → **Pages**
2. **Source**: "Deploy from a branch" 선택
3. **Branch**: "gh-pages" 선택, "/ (root)" 선택
4. **Save** 클릭
5. 몇 분 후 URL 생성: `https://danto7632.github.io/LOOPI/`

## �🔗 배포 URL 확인 방법

### 1. 프론트엔드 (GitHub Pages)

#### URL 패턴:
```
https://danto7632.github.io/LOOPI/
```

#### 확인 방법:
1. **GitHub 리포지토리** → **Settings** → **Pages**
2. "Your site is published at" 메시지에서 URL 확인
3. 또는 **Actions** 탭에서 성공한 workflow 로그 확인

#### 설정 확인:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **(root)**

### 2. 백엔드 (무료 옵션 available)

현재 백엔드는 실제 배포되지 않았습니다. 다음 옵션 중 선택:

#### Option A: Railway
```
# 배포 후 URL 예시
https://loopi-production.up.railway.app/
```

#### Option B: Heroku
```
# 배포 후 URL 예시
https://loopi-backend.herokuapp.com/
```

#### Option C: Vercel (Node.js)
```
# 배포 후 URL 예시
https://loopi-backend.vercel.app/
```

## 🔍 배포 상태 실시간 확인

### GitHub Actions
1. **리포지토리** → **Actions** 탭
2. 최근 workflow 실행 결과 확인
3. 실패 시 로그에서 오류 원인 파악

### GitHub Pages
1. **Settings** → **Pages**
2. 배포 상태 및 URL 확인
3. 빌드 히스토리 확인

## 🛠️ 문제해결

### GitHub Pages 403 오류 (해결됨)
**문제**: `Permission denied to github-actions[bot]`
**해결**: workflow에 `permissions` 추가

### 백엔드 미배포 문제
**현재 상태**: 빌드만 성공, 실제 배포 안됨
**해결 방법**:
1. Railway/Heroku 계정 생성
2. 해당 플랫폼의 토큰을 GitHub Secrets에 추가
3. 자동 배포 활성화

## 📱 배포 확인 체크리스트

### ✅ 프론트엔드 (GitHub Pages)
- [ ] 사이트 접속 확인: `https://danto7632.github.io/LOOPI/`
- [ ] 메인 페이지 로딩 확인
- [ ] 네비게이션 동작 확인
- [ ] 모바일 반응형 확인

### ⏳ 백엔드 (수동 배포 필요)
- [ ] API 서버 배포
- [ ] 데이터베이스 연결 확인
- [ ] API 엔드포인트 테스트
- [ ] CORS 설정 확인

## 🚀 추천 배포 방법

### 🥇 최고 조합 (무료)
```
프론트엔드: Vercel (https://loopi.vercel.app)
백엔드: Railway (https://loopi-backend.railway.app)
데이터베이스: Railway MySQL
```

### 🥈 간단한 시작
```
프론트엔드: Vercel (5분 배포)
백엔드: 나중에 추가
```

### 🥉 기존 방법
```
프론트엔드: GitHub Pages (복잡한 설정)
백엔드: 수동 배포 필요
```

## 🚀 다음 단계

1. **지금 즉시**: [Vercel 배포 가이드](.github/VERCEL_DEPLOYMENT_GUIDE.md) 따라하기
2. **5분 후**: 깔끔한 URL로 사이트 확인
3. **나중에**: [백엔드 무료 배포](.github/FREE_BACKEND_DEPLOYMENT.md) 추가

## 📞 긴급 문제 발생시

1. **Actions 탭**에서 오류 로그 확인
2. **Issues**에 오류 내용 보고
3. **롤백**: 이전 성공한 커밋으로 되돌리기