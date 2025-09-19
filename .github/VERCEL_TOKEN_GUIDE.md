# 🔑 VERCEL_TOKEN 생성 및 설정 완벽 가이드

## 📋 개요
VERCEL_TOKEN은 GitHub Actions에서 Vercel에 자동 배포하기 위한 인증 토큰입니다.
토큰을 설정하면 코드 푸시할 때마다 자동으로 Vercel에 배포됩니다!

---

## 🚀 1단계: Vercel 계정 생성 및 로그인

### 1️⃣ Vercel 웹사이트 접속
```
https://vercel.com
```

### 2️⃣ GitHub로 로그인
- **"Continue with GitHub"** 클릭
- GitHub 계정으로 인증
- Vercel이 GitHub 저장소 접근 권한 요청 시 **승인**

---

## 🔐 2단계: VERCEL_TOKEN 생성

### 1️⃣ Vercel 대시보드 접속
- 로그인 후 [dashboard](https://vercel.com/dashboard) 자동 이동
- 우측 상단 프로필 아이콘 클릭

### 2️⃣ Settings 메뉴 접속
```
프로필 아이콘 → Settings
```

### 3️⃣ Tokens 페이지 이동
```
좌측 메뉴: Account → Tokens
```
또는 직접 접속:
```
https://vercel.com/account/tokens
```

### 4️⃣ 새 토큰 생성
1. **"Create Token"** 버튼 클릭
2. 토큰 정보 입력:
   ```
   Token Name: LOOPI-GitHub-Actions
   Scope: Full Account
   Expiration: No Expiration (또는 1년)
   ```
3. **"Create"** 버튼 클릭

### 5️⃣ 토큰 복사 ⚠️ 중요!
```
vercel_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- 🚨 **즉시 복사하세요!** 
- 페이지를 떠나면 다시 볼 수 없습니다
- 안전한 곳에 임시 저장

---

## 🔒 3단계: GitHub Secrets 설정

### 1️⃣ GitHub 저장소 접속
```
https://github.com/Danto7632/LOOPI
```

### 2️⃣ Settings 탭 클릭
```
Code | Issues | Pull requests | Actions | Projects | Security | Insights | Settings
                                                                                    ↑
```

### 3️⃣ Secrets and variables 메뉴
```
좌측 메뉴: Security → Secrets and variables → Actions
```

### 4️⃣ 새 Secret 추가
1. **"New repository secret"** 버튼 클릭
2. Secret 정보 입력:
   ```
   Name: VERCEL_TOKEN
   Secret: vercel_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. **"Add secret"** 버튼 클릭

---

## ✅ 4단계: 설정 완료 확인

### 확인 방법
GitHub → Settings → Secrets and variables → Actions에서:
```
✅ VERCEL_TOKEN • Last updated XX minutes ago
```

---

## 🚀 5단계: 자동 배포 테스트

### 1️⃣ 코드 변경 및 푸시
간단한 변경사항을 만들어서 테스트:

```bash
# 테스트용 변경
echo "# 자동 배포 테스트" >> README.md
git add README.md
git commit -m "Test: Vercel 자동 배포 테스트"
git push origin main
```

### 2️⃣ GitHub Actions 실행 확인
- GitHub → Actions 탭
- 새 워크플로우 실행 확인
- "Deploy to Vercel" 단계에서 배포 URL 확인

### 3️⃣ 성공 시 로그 예시
```
✅ Vercel 배포 완료!
🔗 배포 URL: https://loopi-xxxxx.vercel.app
```

---

## 🎯 예상 결과

### 토큰 설정 전 (현재 상태)
```
❌ VERCEL_TOKEN not set, 수동 배포 필요
```

### 토큰 설정 후 (목표 상태)
```
✅ Vercel 배포 완료!
🔗 https://loopi-xxxxx.vercel.app
🚀 자동 배포 활성화됨
```

---

## 🔧 추가 설정 (선택사항)

### Vercel 프로젝트 설정
토큰을 설정한 후 첫 배포 시 Vercel에서 자동으로 프로젝트를 생성합니다.
하지만 수동으로 먼저 설정하면 더 정확한 배포가 가능합니다:

1. **Vercel 대시보드** → **"Add New"** → **"Project"**
2. **GitHub에서 LOOPI 저장소 선택**
3. **프로젝트 설정**:
   ```
   Project Name: loopi
   Framework: Create React App
   Root Directory: frontend/
   Build Command: npm run build
   Output Directory: build
   Install Command: npm ci
   ```

---

## 🚨 문제 해결

### 문제 1: 토큰이 작동하지 않음
**원인**: 토큰 복사 오류 또는 만료
**해결**: 새 토큰 생성 후 다시 설정

### 문제 2: 빌드 실패
**원인**: frontend 폴더 경로 문제
**해결**: Vercel 프로젝트 설정에서 Root Directory 확인

### 문제 3: 권한 오류
**원인**: Vercel GitHub 앱 권한 부족
**해결**: Vercel에서 GitHub 저장소 권한 재설정

---

## 📱 완료 후 확인사항

토큰 설정 완료 후:
- [ ] GitHub Secrets에 VERCEL_TOKEN 저장됨
- [ ] 코드 푸시 시 자동 배포 실행
- [ ] 배포 URL 생성 및 접속 가능
- [ ] 이후 모든 커밋에서 자동 배포

---

## 💡 유용한 팁

### 1️⃣ 배포 URL 패턴
```
첫 배포: https://loopi.vercel.app
브랜치별: https://loopi-git-브랜치명.vercel.app
PR별: https://loopi-git-pr번호.vercel.app
```

### 2️⃣ 환경 변수 설정
배포된 앱에서 API 연결 등이 필요하다면:
- Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

### 3️⃣ 커스텀 도메인
원하는 도메인이 있다면:
- Vercel 대시보드 → 프로젝트 → Settings → Domains

---

**🎉 이제 VERCEL_TOKEN 설정을 시작해보세요!**
단계별로 따라하시면 5분 안에 자동 배포가 완성됩니다.