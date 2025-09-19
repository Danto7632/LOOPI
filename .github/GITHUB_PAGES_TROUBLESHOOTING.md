# 🔧 GitHub Pages 404 오류 해결 가이드

## 🚨 발생한 문제

```
Failed to load resource: the server responded with a status of 404 ()
main.1a6aa03b.js:1  Failed to load resource: the server responded with a status of 404 ()
manifest.json:1  Failed to load resource: the server responded with a status of 404 ()
main.2a9a26f2.css:1  Failed to load resource: the server responded with a status of 404 ()
```

## 🔍 문제 원인

GitHub Pages에서 React 앱을 배포할 때 다음 문제들이 발생:

1. **경로 문제**: GitHub Pages는 `/{username}.github.io/{repository}/` 경로로 배포됨
2. **정적 리소스 경로**: React 빌드 시 절대 경로(`/`)로 리소스를 찾음
3. **SPA 라우팅**: GitHub Pages는 기본적으로 SPA 라우팅을 지원하지 않음

## ✅ 해결 방법 (적용됨)

### 1. package.json에 homepage 추가
```json
{
  "homepage": "https://danto7632.github.io/LOOPI"
}
```

### 2. React Router basename 설정
```tsx
<BrowserRouter basename="/LOOPI">
```

### 3. SPA 지원을 위한 404.html 추가
GitHub Pages에서 SPA 라우팅이 작동하도록 리다이렉트 스크립트 추가

### 4. index.html에 SPA 스크립트 추가
URL 파라미터를 올바르게 처리하도록 스크립트 추가

## 🎯 예상 결과

수정 후 다음이 정상 작동해야 함:

- ✅ 메인 페이지 로딩
- ✅ CSS 스타일 적용
- ✅ JavaScript 번들 로딩
- ✅ manifest.json 로딩
- ✅ React Router 네비게이션

## 🚀 배포 및 테스트

1. **코드 푸시**: 수정된 내용을 main 브랜치에 푸시
2. **Actions 확인**: GitHub Actions에서 배포 완료 대기
3. **사이트 접속**: `https://danto7632.github.io/LOOPI/`
4. **기능 테스트**: 페이지 네비게이션 및 기능 확인

## 📋 체크리스트

배포 후 다음 항목들을 확인:

- [ ] 메인 페이지가 백지가 아닌 실제 콘텐츠 표시
- [ ] 브라우저 개발자 도구에서 404 오류 없음
- [ ] CSS 스타일이 정상 적용됨
- [ ] 헤더/푸터 등 레이아웃 컴포넌트 표시
- [ ] 링크 클릭 시 페이지 이동 정상 작동
- [ ] 새로고침 시에도 페이지가 정상 로딩

## 🆘 추가 문제 발생시

### 여전히 404 오류가 발생한다면:

1. **캐시 지우기**: Ctrl+F5 또는 Cmd+Shift+R로 강력 새로고침
2. **빌드 확인**: 로컬에서 `npm run build` 후 `build` 폴더 내용 확인
3. **경로 재확인**: 모든 경로가 상대 경로 또는 올바른 basename 사용하는지 확인

### 라우팅이 작동하지 않는다면:

1. **404.html 확인**: 파일이 올바르게 업로드되었는지 확인
2. **basename 확인**: React Router의 basename이 올바른지 확인
3. **SPA 스크립트 확인**: index.html의 스크립트가 포함되었는지 확인

## 📞 도움이 필요하면

GitHub Repository의 Issues 탭에 다음 정보와 함께 문의:
- 브라우저 개발자 도구의 Console 오류 메시지
- Network 탭의 실패한 요청 목록
- 현재 접속하려는 URL