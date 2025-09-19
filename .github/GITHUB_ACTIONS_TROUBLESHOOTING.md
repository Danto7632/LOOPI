# 🚨 GitHub Actions 오류 해결 가이드

## 🔧 해결된 오류들

### ✅ 1. Invalid workflow file 오류
**문제**: `Unrecognized named-value: 'secrets'`
**원인**: GitHub Actions 조건문에서 `secrets` 직접 사용
**해결**: `${{ secrets.NAME }}` 형태로 수정

### ✅ 2. Vercel CLI --token 오류
**문제**: `option requires argument: --token`
**원인**: VERCEL_TOKEN이 빈 값으로 전달됨
**해결**: 조건부 실행으로 토큰 없을 때 안전하게 처리

## 🚀 현재 워크플로우 상태

### 1. `build-and-guide.yml` (메인) ⭐
- ✅ **항상 작동**: 토큰 없어도 성공
- ✅ **빌드 검증**: 프론트엔드 빌드 확인
- ✅ **배포 가이드**: 수동 배포 방법 안내
- ✅ **아티팩트**: 빌드 결과 저장

### 2. `deploy-vercel.yml` (고급)
- ⚙️ **조건부 작동**: VERCEL_TOKEN 있을 때만 자동 배포
- 🔧 **토큰 없으면**: 수동 배포 가이드 표시

### 3. `deploy-production.yml` (백엔드)
- 🛠️ **수정됨**: 문법 오류 해결
- 🔧 **백엔드 배포**: Railway/Vercel 지원

## 📋 추천 워크플로우

### 🥇 지금 당장 (토큰 설정 없이)
1. **코드 푸시** → `build-and-guide.yml` 자동 실행
2. **빌드 성공** → Actions 탭에서 배포 가이드 확인
3. **Vercel 수동 배포** → 5분만에 완료

### 🥈 나중에 (자동화 원할 때)
1. **Vercel 토큰 생성** → Vercel 대시보드
2. **GitHub Secrets 설정** → 리포지토리 Settings
3. **자동 배포 활성화** → 푸시할 때마다 자동 배포

## 🎯 즉시 배포 방법

### Vercel 수동 배포 (5분)
1. [Vercel.com](https://vercel.com) → GitHub 로그인
2. "Add New Project" → LOOPI 선택
3. **Root Directory**: `frontend` ⭐
4. Deploy 클릭 → 완료!

**결과**: `https://loopi-xxxxx.vercel.app`

### 빌드 확인
현재 Actions 탭에서 빌드가 성공하는지 확인:
- ✅ 빌드 성공 → 배포 준비 완료
- ❌ 빌드 실패 → 코드 수정 필요

## 🔄 향후 개선 계획

### 단계 1: 프론트엔드 배포 (현재)
- [x] GitHub Actions 빌드 자동화
- [x] Vercel 수동 배포 가이드
- [ ] Vercel 자동 배포 (토큰 설정 후)

### 단계 2: 백엔드 배포
- [ ] Railway 수동 배포
- [ ] 백엔드 자동 배포 설정
- [ ] 프론트엔드-백엔드 연결

### 단계 3: 전체 자동화
- [ ] 풀 스택 자동 배포
- [ ] 커스텀 도메인 연결
- [ ] 모니터링 설정

## 📞 문제 발생시

### GitHub Actions 실패
1. **Actions 탭** → 실패한 워크플로우 클릭
2. **로그 확인** → 오류 메시지 분석
3. **Issues 탭** → 문제 보고

### 배포 실패
1. **로컬 빌드 테스트**: `cd frontend && npm run build`
2. **종속성 확인**: `npm ci` 성공하는지 확인
3. **Node.js 버전**: package.json engines 확인

## 🎉 성공 체크리스트

- [x] GitHub Actions 빌드 성공
- [ ] Vercel 수동 배포 완료
- [ ] 사이트 URL 접속 확인
- [ ] 모든 페이지 정상 작동
- [ ] 모바일 반응형 확인