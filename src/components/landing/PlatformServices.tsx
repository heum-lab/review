interface ServiceItem {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
}

interface PlatformServicesProps {
  platform: string;
  services: ServiceItem[];
}

export function PlatformServices({ platform, services }: PlatformServicesProps): JSX.Element {
  return (
    <section id="services" className="section bg-white">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{platform} 서비스</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            {platform} 가구매·리뷰·상위노출
          </h2>
          <p className="mt-4 text-ink-500">
            {platform}에 특화된 캠페인 운영으로 빠르게 매출과 노출을 끌어올립니다.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.tag}
              className="flex flex-col rounded-3xl bg-white p-8 shadow-card"
            >
              <div className="text-sm font-bold text-brand-500">{service.tag}</div>
              <h3 className="mt-3 text-2xl font-bold leading-tight">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{service.body}</p>
              <ul className="mt-6 space-y-2 border-t border-ink-100 pt-6 text-sm">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span className="text-ink-700">{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export type { ServiceItem };
