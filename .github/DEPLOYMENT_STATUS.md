# 🌐 배포 URL 및 상태 확인 가이드

## 📊 현재 배포 상태

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

### 2. 백엔드 (현재 배포된 곳 없음)

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

## 🚀 다음 단계

1. **GitHub Pages 수정 적용**: 다음 푸시 때 정상 배포 예상
2. **백엔드 배포 선택**: Railway, Heroku, 또는 기타 플랫폼
3. **도메인 연결**: 커스텀 도메인 설정 (선택사항)
4. **HTTPS 설정**: 자동 적용됨 (GitHub Pages)

## 📞 긴급 문제 발생시

1. **Actions 탭**에서 오류 로그 확인
2. **Issues**에 오류 내용 보고
3. **롤백**: 이전 성공한 커밋으로 되돌리기