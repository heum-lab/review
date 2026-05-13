# GOOD TO GREAT — 랜딩 페이지

PRD / ARCHITECTURE / CONVENTIONS 문서를 기반으로 만든 Phase 1 광고주용 랜딩 페이지입니다.

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Pretendard (CDN)

## 실행 방법

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인합니다.

## 빌드 / 프로덕션

```bash
npm run build
npm run start
```

## 디렉토리 구조 (CONVENTIONS.md 준수)

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (metadata, fonts)
│   ├── page.tsx            # 랜딩 페이지 컴포지션
│   └── globals.css         # Tailwind + 전역 스타일
├── components/
│   ├── common/             # Header, Footer, Button
│   └── landing/            # Hero, ProblemSolution, Features, CampaignTypes, Metrics, Pricing, CTA
└── constants/
    ├── CAMPAIGN_TYPES.ts   # 체험단 6종 + Enum
    └── METRICS.ts          # 핵심 KPI 지표
```

## 섹션 구성

| 섹션 | 내용 출처 |
|------|-----------|
| Hero | PRD §1 제품 목적, §7 수익 모델 |
| ProblemSolution | PRD §2 배경 및 문제 정의 |
| Features | PRD §4-1 광고주 기능 (F-A-01 ~ F-A-03) |
| CampaignTypes | PRD §5 체험단 유형 6종 |
| Metrics | PRD §8 성공 지표 KPI |
| Pricing | PRD §7 수익 모델, §10 제약 사항 |
| CTA | PRD §6-3 보안 (90일 파기 고지) |
