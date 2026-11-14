import React, { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { TARIFFE } from '../../data/catalogo';
import { conPeso } from '../../components/Prosa';
import type { RoutePath } from '../../types';

interface ConsultiPageProps {
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

const { brand, consulti, nav } = siteContent;

const SERVICES = TARIFFE.map((tariffa, index) => {
  const opzione = consulti.opzioni.find((o) => o.id === tariffa.id);
  return {
    id: tariffa.id,
    title: opzione?.titolo ?? tariffa.name,
    subtitle: tariffa.kicker,
    duration: `${tariffa.minutes} min`,
    modality: `${consulti.modalita.presenza} / ${consulti.modalita.distanza}`,
    price: tariffa.price,
    badge: tariffa.kicker,
    badgeVariant: index === 0 ? ('primary' as const) : ('tertiary' as const),
    image: consulti.immagini.hero.src,
    imageAlt: consulti.immagini.hero.alt,
    description: tariffa.summary,
    highlights: [tariffa.details, brand.modalitaLettura, consulti.seraOnline],
  };
});

export const ConsultiPage: React.FC<ConsultiPageProps> = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(SERVICES[0]?.id ?? null);

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            visibility
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {nav.consulti}
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          {nav.consulti}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          {conPeso(consulti.intro)}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          {conPeso(consulti.letturaDalVivo)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-space-sm">
        <div className="rounded-xl p-space-md bg-surface-container/75 backdrop-blur-md text-left">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            {consulti.modalita.presenza}
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {consulti.modalita.presenzaNota}
          </p>
        </div>
        <div className="rounded-xl p-space-md bg-surface-container/75 backdrop-blur-md text-left">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            {consulti.modalita.distanza}
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {consulti.modalita.distanzaNota}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-space-md w-full">
        {SERVICES.map((service) => {
          const isExpanded = expandedId === service.id;
          return (
            <article
              key={service.id}
              className="relative rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col"
            >
              <div className="relative w-full h-40 bg-surface-container-low">
                <div
                  className="w-full h-full bg-cover bg-center"
                  role="img"
                  aria-label={service.imageAlt}
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-semibold shadow-sm ${
                      service.badgeVariant === 'tertiary'
                        ? 'text-tertiary-fixed'
                        : 'text-primary'
                    }`}
                  >
                    {service.badge}
                  </span>
                </div>
              </div>

              <div className="p-space-lg flex flex-col gap-space-sm -mt-2 relative">
                <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      schedule
                    </span>
                    {service.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      call
                    </span>
                    {service.modality}
                  </span>
                </div>

                <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                  {service.title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {conPeso(service.description)}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : service.id)
                  }
                  className="self-start font-label-md text-label-md text-primary flex items-center gap-1 pt-1"
                >
                  {isExpanded ? 'Nascondi dettagli' : consulti.faq.voci[0].domanda}
                  <span className="material-symbols-outlined text-[16px]">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-space-md rounded-lg bg-surface-container-lowest/70 flex flex-col gap-space-xs">
                    {service.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-space-sm text-on-surface-variant font-body-md text-body-md"
                      >
                        <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                          auto_awesome
                        </span>
                        <span>{conPeso(item)}</span>
                      </div>
                    ))}
                    <p className="font-body-md text-body-md text-on-surface-variant pt-1">
                      {conPeso(consulti.pdf.etichetta)} (+€{consulti.pdf.prezzo})
                    </p>
                  </div>
                )}

                <div className="pt-space-xs flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                      € {service.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('prenota', service.id)}
                    className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
                  >
                    {consulti.procedi}
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="rounded-xl p-space-lg bg-surface-container/60 backdrop-blur-md shadow-md flex flex-col gap-space-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {consulti.faq.kicker}
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            {consulti.faq.titolo}
          </h2>
        </div>
        {consulti.faq.voci.map((voce) => (
          <div
            key={voce.domanda}
            className="rounded-lg p-space-md bg-surface-container-lowest/70 flex flex-col gap-1"
          >
            <h3 className="font-title-md text-[15px] text-on-surface">
              {voce.domanda}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {conPeso(voce.risposta)}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
