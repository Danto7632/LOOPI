# 🚂 Railway 빌드 오류 해결 가이드

## 🚨 문제: "Error creating build plan with Railpac"

### 📋 오류 상황
```
Build › Build image
(00:05)
Error creating build plan with Railpac
```

이 오류는 Railway가 프로젝트 구조를 제대로 인식하지 못할 때 발생합니다.

---

## 🔧 해결 방법

### 🚀 방법 1: railway.toml 수정 (추천)

Railway 설정 파일을 수정하여 빌드 경로를 명확히 지정합니다.

#### 1️⃣ railway.toml 파일 확인
```toml
[build]
builder = "nixpacks"
buildCommand = "cd backend && npm ci && npm run build"

[deploy]
startCommand = "cd backend && npm run start:prod"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 10
```

#### 2️⃣ 수정된 설정 (더 명확한 경로 지정)
```toml
[build]
builder = "nixpacks"
buildCommand = "npm ci && npm run build"
watchPatterns = ["backend/**"]

[deploy]
startCommand = "npm run start:prod"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 10

[environments.production.variables]
NODE_ENV = "production"
```

### 🚀 방법 2: Root Directory 설정

Railway 대시보드에서 직접 설정:

#### 1️⃣ Railway 프로젝트 설정 변경
```
1. Railway 대시보드 접속
2. LOOPI 프로젝트 클릭
3. Settings → General
4. Root Directory: backend/
5. Build Command: npm ci && npm run build
6. Start Command: npm run start:prod
```

### 🚀 방법 3: Dockerfile 사용 (가장 안정적)

Railway에서 Dockerfile을 사용하면 더 정확한 빌드가 가능합니다.

#### 1️⃣ backend/Dockerfile 생성
```dockerfile
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 애플리케이션 시작
CMD ["npm", "run", "start:prod"]
```

#### 2️⃣ .dockerignore 생성
```
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
.env.test
.nyc_output
coverage
.coverage
```

### 🚀 방법 4: 프로젝트 재배포

때로는 Railway 캐시 문제일 수 있습니다.

#### 1️⃣ 캐시 클리어 및 재배포
```
1. Railway 대시보드
2. 프로젝트 → Deployments
3. 최신 배포 → "Redeploy"
4. 또는 "Deploy Latest"
```

#### 2️⃣ 새 서비스 생성
```
1. Railway 대시보드
2. "New Project" → "Deploy from GitHub repo"
3. LOOPI 저장소 선택
4. Root Directory: backend/
```

---

## ⚡ 즉시 해결 방법 (5분)

### 단계별 실행

#### 1️⃣ railway.toml 수정 (가장 쉬운 방법)
```bash
# 현재 backend 폴더의 railway.toml 확인
cat backend/railway.toml
```

#### 2️⃣ 수정된 내용으로 교체
```toml
[build]
builder = "nixpacks"
buildCommand = "npm ci && npm run build"
watchPatterns = ["**"]

[deploy]
startCommand = "npm run start:prod"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 10

[environments.production.variables]
NODE_ENV = "production"
```

#### 3️⃣ 변경사항 커밋 및 푸시
```bash
git add backend/railway.toml
git commit -m "Fix: Railway 빌드 설정 수정"
git push origin main
```

#### 4️⃣ Railway에서 자동 재배포 확인
- Railway가 변경사항을 감지하고 자동으로 재배포를 시작합니다.

---

## 🔍 추가 문제 해결

### 문제 A: Node.js 버전 불일치
**해결**: package.json에 엔진 버전 명시
```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

### 문제 B: 빌드 타임아웃
**해결**: 더 간단한 빌드 명령 사용
```toml
[build]
buildCommand = "npm install && npm run build"
```

### 문제 C: 메모리 부족
**해결**: Railway 플랜 업그레이드 또는 빌드 최적화

---

## 📊 성공 확인

### 빌드 성공 시 로그 예시
```
✅ Build completed successfully
✅ Starting deployment
✅ Service is now live at: https://[project-name].railway.app
```

### 배포 URL 확인
```
Railway 대시보드 → 프로젝트 → Settings → Domains
```

---

## 💡 예방 팁

### 1️⃣ 로컬 테스트
배포 전 로컬에서 빌드 테스트:
```bash
cd backend
npm ci
npm run build
npm run start:prod
```

### 2️⃣ 환경 변수 확인
Railway에서 필요한 환경 변수가 모두 설정되었는지 확인

### 3️⃣ 정기적인 의존성 업데이트
오래된 패키지가 빌드 문제를 일으킬 수 있음

---

**🎯 먼저 railway.toml 수정부터 시도해보세요!**
대부분의 경우 이것만으로도 해결됩니다.