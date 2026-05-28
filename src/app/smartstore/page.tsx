import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { PlatformHero } from '@/components/landing/PlatformHero';
import { PlatformServices, type ServiceItem } from '@/components/landing/PlatformServices';
import { Pricing } from '@/components/landing/Pricing';
import { CTA } from '@/components/landing/CTA';
import { SITE_ALT_NAME, SITE_URL } from '@/lib/seo';

const TITLE = '스마트스토어 가구매·스스 리뷰·스스 상위노출';
const DESCRIPTION =
  '스마트스토어(스스) 가구매, 스스 리뷰, 스스 상위노출까지 — 전담 매니저가 스마트스토어에 특화된 리뷰체험단·구매리뷰 캠페인을 운영합니다. 페이백 체험단, 리뷰대행, 리뷰마케팅을 한 곳에서.';

export const metadata: Metadata = {
  title: `${TITLE} | ${SITE_ALT_NAME}`,
  description: DESCRIPTION,
  keywords: [
    '스마트스토어',
    '스스 가구매',
    '스마트스토어 가구매',
    '스스 리뷰',
    '스마트스토어 리뷰',
    '스스 상위노출',
    '스마트스토어 상위노출',
    '스마트스토어 체험단',
    '구매리뷰',
    '가구매리뷰',
    '리뷰대행',
    '리뷰마케팅',
    '체험단마케팅',
    '페이백 체험단',
  ],
  alternates: { canonical: '/smartstore' },
  openGraph: {
    title: `${TITLE} | ${SITE_ALT_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/smartstore`,
    type: 'website',
    locale: 'ko_KR',
  },
};

const SERVICES: ServiceItem[] = [
  {
    tag: '스스 가구매',
    title: '스마트스토어 가구매 캠페인',
    body: '선구매·기타배송·구매확정·구매평까지 정형화된 절차로 스마트스토어 판매 지표를 안정적으로 끌어올립니다.',
    bullets: [
      '페이백 + 구매평(기타배송) 형태로 진행',
      '리뷰어 컨디션 분산으로 안정적 운영',
      '제공형 캠페인과 혼합 운영 가능',
      '전담 매니저의 키워드·일정 설계',
    ],
  },
  {
    tag: '스스 리뷰',
    title: '스마트스토어 구매리뷰·체험단',
    body: '실 구매가 일어나는 구매리뷰부터 제공형 체험단까지, 스마트스토어 가이드라인에 맞춘 양질의 리뷰를 확보합니다.',
    bullets: [
      '구매리뷰 / 가구매리뷰 / 페이백 체험단',
      '리뷰 퀄리티 사전 가이드 제공',
      '리뷰 등록 여부 100% 체크',
      '리뷰 작성 형태 다양화',
    ],
  },
  {
    tag: '스스 상위노출',
    title: '스마트스토어 상위노출 마케팅',
    body: '목표 키워드 기반 가구매·구매리뷰 운영으로 스마트스토어 검색 노출과 랭킹을 단계적으로 끌어올립니다.',
    bullets: [
      '키워드별 전략 수립 및 시뮬레이션',
      '구매·리뷰 분산 일정으로 자연스러운 노출',
      '진행 결과 리포트 및 리포지셔닝',
      '리뷰마케팅 / 체험단마케팅 통합 운영',
    ],
  },
];

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '스마트스토어 가구매·리뷰·상위노출 마케팅',
  serviceType: '스마트스토어 리뷰체험단·가구매·상위노출',
  provider: {
    '@type': 'Organization',
    name: 'GOOD TO GREAT',
    url: SITE_URL,
  },
  areaServed: { '@type': 'Country', name: '대한민국' },
  description: DESCRIPTION,
};

export default function SmartstorePage(): JSX.Element {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <Header />
      <main>
        <PlatformHero
          eyebrow="스마트스토어 리뷰체험단 / 가구매·상위노출"
          highlight="스마트스토어 리뷰체험단"
          title="가구매부터 상위노출까지"
          description="스마트스토어 가구매, 스스 리뷰, 스스 상위노출을 한 곳에서 — 전담 매니저가 캠페인 설계부터 결과 리포트까지 운영합니다."
          chips={[
            '스스 가구매',
            '스스 리뷰',
            '스스 상위노출',
            '스마트스토어 체험단',
            '구매리뷰',
            '가구매리뷰',
            '리뷰대행',
            '리뷰마케팅',
          ]}
        />
        <PlatformServices platform="스마트스토어" services={SERVICES} />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
