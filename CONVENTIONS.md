# CONVENTIONS.md — 스타일씨(STYLE C) 개발 컨벤션

> 이 문서는 스타일씨 플랫폼 개발팀이 공통으로 따르는 코딩 규칙, 네이밍 컨벤션, 협업 방식을 정의합니다.

---

## 1. 프로젝트 기술 스택 (Recommended)

| 분류 | 기술 |
|------|------|
| 프론트엔드 | React.js (또는 Next.js) + TypeScript |
| 상태관리 | Zustand 또는 Redux Toolkit |
| 스타일링 | Tailwind CSS 또는 CSS Modules |
| 백엔드 | Node.js (Express / NestJS) 또는 Java Spring Boot |
| 데이터베이스 | MySQL 8.x |
| 캐시 | Redis |
| 앱 | React Native (iOS / Android) |
| API 형식 | RESTful API (+ Swagger 문서화) |
| 버전관리 | Git (GitHub / GitLab) |
| CI/CD | GitHub Actions 또는 Jenkins |

---

## 2. 파일 및 디렉토리 네이밍

### 2-1. 공통 원칙
- 디렉토리명: **kebab-case** (소문자, 하이픈 구분)
- 컴포넌트 파일: **PascalCase** (`CampaignCard.tsx`)
- 유틸/훅/서비스 파일: **camelCase** (`useInfluencer.ts`, `campaignService.ts`)
- 상수 파일: **UPPER_SNAKE_CASE** (`CAMPAIGN_STATUS.ts`)
- 테스트 파일: 대상 파일명 + `.test.ts(x)` (`CampaignCard.test.tsx`)

### 2-2. 예시
```
src/
├── components/
│   ├── campaign/
│   │   ├── CampaignCard.tsx       ✅ PascalCase
│   │   ├── CampaignList.tsx       ✅ PascalCase
│   │   └── CampaignCard.test.tsx  ✅ 테스트 파일
│   └── common/
│       ├── Button.tsx
│       └── Modal.tsx
├── hooks/
│   ├── useCampaign.ts             ✅ camelCase
│   └── useInfluencer.ts
├── services/
│   ├── campaignService.ts         ✅ camelCase
│   └── paymentService.ts
└── constants/
    ├── CAMPAIGN_STATUS.ts         ✅ UPPER_SNAKE_CASE
    └── ROUTE_PATHS.ts
```

---

## 3. 코드 네이밍 컨벤션

### 3-1. 변수 및 함수
```typescript
// ✅ 변수: camelCase
const campaignList = [];
const isLoading = false;
const influencerCount = 0;

// ✅ 함수: camelCase, 동사로 시작
function fetchCampaignList() {}
function handleInfluencerSelect() {}
function formatCurrency(amount: number) {}

// ✅ 불리언 변수: is/has/can 접두어
const isSubscribed = true;
const hasReview = false;
const canApply = true;

// ✅ 이벤트 핸들러: handle 접두어
const handleSubmit = () => {};
const handleModalClose = () => {};
```

### 3-2. 컴포넌트 (React)
```typescript
// ✅ PascalCase, 명사 또는 명사구
export const CampaignCard = () => {};
export const InfluencerProfile = () => {};
export const SubscriptionPlanModal = () => {};

// ✅ Props 타입명: 컴포넌트명 + Props
interface CampaignCardProps {
  campaignId: string;
  title: string;
  platform: PlatformType;
}
```

### 3-3. 상수
```typescript
// ✅ UPPER_SNAKE_CASE
const MAX_INFLUENCER_COUNT = 1000;
const SUBSCRIPTION_PRICE = 300000;

// ✅ Enum: PascalCase, 값은 UPPER_SNAKE_CASE
enum CampaignStatus {
  RECRUITING = 'RECRUITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

enum CampaignType {
  PAYBACK_REVIEW = 'PAYBACK_REVIEW',
  PURCHASE_REVIEW = 'PURCHASE_REVIEW',
  PRODUCT_PROVIDE = 'PRODUCT_PROVIDE',
  VISIT = 'VISIT',
  PRESS = 'PRESS',
  MISSION = 'MISSION',
}
```

### 3-4. API 및 서비스
```typescript
// ✅ API 엔드포인트: kebab-case, RESTful
GET    /api/v1/campaigns
POST   /api/v1/campaigns
GET    /api/v1/campaigns/:id
PATCH  /api/v1/campaigns/:id
DELETE /api/v1/campaigns/:id

GET    /api/v1/influencers
POST   /api/v1/influencers/:id/apply
GET    /api/v1/advertisers/:id/reports
POST   /api/v1/subscriptions
```

---

## 4. 주요 도메인 용어 정의 (Ubiquitous Language)

| 한국어 | 영어 (코드에서 사용) | 설명 |
|--------|---------------------|------|
| 체험단 | Campaign | 인플루언서 마케팅 캠페인 |
| 광고주 | Advertiser | 체험단을 의뢰하는 브랜드/사업자 |
| 인플루언서 | Influencer | 체험단에 참여하는 창작자 |
| 구독 | Subscription | 광고주의 월 정액 이용권 |
| 페이백 | Payback | 인플루언서 구매금액 환급 |
| 모집인원 | RecruitCount | 체험단 모집 목표 인원 |
| 신청자 | Applicant | 체험단에 신청한 인플루언서 |
| 당첨자 | Selected | 광고주가 선택한 인플루언서 |
| 결과레포트 | Report | 체험단 진행 결과 데이터 |
| 원고료 | WritingFee | 기자단형 체험단 지급 비용 |
| 광고주 센터 | AdvertiserCenter | 광고주 전용 관리 대시보드 |
| 모집률 | RecruitRate | 신청인원 / 모집인원 * 100 |

---

## 5. Git 컨벤션

### 5-1. 브랜치 전략 (Git Flow)
```
main          # 프로덕션 배포 브랜치
develop       # 개발 통합 브랜치
feature/*     # 기능 개발 브랜치
hotfix/*      # 긴급 버그 수정 브랜치
release/*     # 릴리즈 준비 브랜치
```

### 5-2. 브랜치 네이밍
```
feature/campaign-registration
feature/influencer-direct-select
feature/subscription-payment
hotfix/payback-calculation-error
release/v2.1.0
```

### 5-3. 커밋 메시지 (Conventional Commits)
```
<type>(<scope>): <subject>

[optional body]
[optional footer]
```

**타입 목록:**

| 타입 | 설명 |
|------|------|
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| refactor | 코드 리팩토링 (기능 변경 없음) |
| style | 코드 포맷, 세미콜론 등 스타일 변경 |
| docs | 문서 수정 |
| test | 테스트 코드 추가/수정 |
| chore | 빌드, 패키지 설정 변경 |
| perf | 성능 개선 |

**예시:**
```
feat(campaign): 체험단 유형 선택 UI 추가
fix(payment): 구독 결제 실패 시 오류 메시지 표시 버그 수정
docs(prd): 체험단 유형 요구사항 상세화
refactor(influencer): 인플루언서 선택 컴포넌트 분리
```

### 5-4. PR (Pull Request) 규칙
- 제목은 커밋 메시지 형식을 따름
- 리뷰어 최소 1명 이상 지정 필수
- PR 본문에 변경 사항 요약, 테스트 방법 명시
- CI 통과 후 머지

---

## 6. 코드 스타일

### 6-1. 일반 규칙
- 들여쓰기: **2 spaces**
- 세미콜론: **사용 (TypeScript 기준)**
- 따옴표: **single quote (\')**
- 최대 줄 길이: **120자**
- 함수는 **단일 책임 원칙** 준수 (한 함수 = 한 가지 역할)

### 6-2. TypeScript
- `any` 타입 사용 금지 (부득이한 경우 `unknown` 사용 후 타입 가드)
- 모든 함수 파라미터 및 반환값에 타입 명시
- Interface와 Type 구분 사용: 객체 형태는 `interface`, 유니언/교차 타입은 `type`

### 6-3. React
- 함수형 컴포넌트만 사용 (클래스 컴포넌트 금지)
- Hook은 컴포넌트 최상단에서만 호출
- Props drilling 3단계 이상 시 Context 또는 상태관리 라이브러리 사용
- 컴포넌트 파일 1개당 1개 컴포넌트 원칙

### 6-4. 린터/포맷터 설정
```json
// .eslintrc
{
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 120
}
```

---

## 7. API 응답 형식

### 7-1. 성공 응답
```json
{
  "success": true,
  "data": { ... },
  "message": "캠페인이 성공적으로 등록되었습니다."
}
```

### 7-2. 목록 응답 (페이지네이션)
```json
{
  "success": true,
  "data": {
    "items": [ ... ],
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "totalPages": 5
  }
}
```

### 7-3. 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "CAMPAIGN_NOT_FOUND",
    "message": "해당 체험단을 찾을 수 없습니다.",
    "details": {}
  }
}
```

---

## 8. 환경 변수 관리

```bash
# .env.example (레포지토리에 포함, 실제 값 미포함)
NODE_ENV=development
DATABASE_URL=mysql://user:password@localhost:3306/stylec
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
CHANNEL_IO_KEY=your_channel_io_key
INSTAGRAM_API_KEY=your_instagram_api_key
NAVER_API_KEY=your_naver_api_key
PG_MERCHANT_ID=your_pg_merchant_id
AWS_S3_BUCKET=stylec-uploads
```

- `.env` 파일은 절대 Git에 커밋하지 않음
- 환경 변수명: **UPPER_SNAKE_CASE**
- 민감 정보는 반드시 환경 변수로 관리

---

## 9. 테스트 컨벤션

### 9-1. 테스트 범위
- **Unit Test:** 서비스 로직, 유틸리티 함수 (커버리지 80% 이상)
- **Integration Test:** API 엔드포인트
- **E2E Test:** 핵심 플로우 (체험단 등록, 인플루언서 신청, 결제)

### 9-2. 테스트 파일 구조
```typescript
describe('CampaignService', () => {
  describe('createCampaign', () => {
    it('유효한 데이터로 체험단 생성에 성공한다', () => {});
    it('구독 중이 아닌 광고주는 체험단 생성에 실패한다', () => {});
    it('필수 항목 누락 시 유효성 검사 오류를 반환한다', () => {});
  });
});
```

---

## 10. 문서화 규칙

- 복잡한 비즈니스 로직에는 반드시 JSDoc 주석 작성
- API는 Swagger/OpenAPI 3.0 형식으로 문서화
- 주요 컴포넌트에는 Storybook 스토리 작성
- README.md에는 프로젝트 실행 방법, 환경 설정, 기여 방법 포함

---

## 11. 코드 리뷰 기준

| 항목 | 기준 |
|------|------|
| 기능 동작 | 요구사항대로 동작하는가 |
| 네이밍 | 이 문서의 컨벤션을 따르는가 |
| 타입 안전성 | TypeScript 타입이 적절히 정의되었는가 |
| 성능 | 불필요한 리렌더링, N+1 쿼리 등이 없는가 |
| 보안 | 민감 정보 노출, XSS, SQL Injection 위험이 없는가 |
| 테스트 | 핵심 로직에 테스트가 작성되었는가 |
| 주석 | 복잡한 로직에 설명이 있는가 |
