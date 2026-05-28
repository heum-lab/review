import { Button } from '@/components/common/Button';

interface PlatformHeroProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  chips: string[];
}

export function PlatformHero({
  eyebrow,
  title,
  highlight,
  description,
  chips,
}: PlatformHeroProps): JSX.Element {
  return (
    <section className="relative overflow-hidden bg-[#A7EDFF]">
      <div className="container-x relative pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] sm:text-5xl lg:text-6xl">
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">{highlight}</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-ink-900/10" />
            </span>
            <br />
            {title}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-ink-500 sm:text-base">{description}</p>

          <ul className="mt-8 flex flex-nowrap items-center justify-start gap-1.5 overflow-x-auto whitespace-nowrap pb-2 sm:justify-center sm:gap-2 sm:overflow-x-visible sm:pb-0">
            {chips.map((item) => (
              <li
                key={item}
                className="shrink-0 rounded-full border border-ink-100 bg-white/80 px-2.5 py-1 text-xs font-semibold text-ink-700 shadow-sm backdrop-blur sm:px-3 sm:py-1.5 sm:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#cta" variant="primary" size="lg">
              무료 상담 신청하기
            </Button>
            <Button href="#services" variant="ghost" size="lg">
              서비스 자세히 보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
