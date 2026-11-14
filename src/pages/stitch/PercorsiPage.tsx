import React, { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { conPeso } from '../../components/Prosa';
import type { RoutePath } from '../../types';

interface PercorsiPageProps {
  initialPathwayId?: string;
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

const { brand, cta, pages, percorsi } = siteContent;

export const PercorsiPage: React.FC<PercorsiPageProps> = ({
  initialPathwayId,
  onNavigate,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    initialPathwayId && percorsi.tipologie.some((t) => t.id === initialPathwayId)
      ? initialPathwayId
      : percorsi.tipologie[0]?.id ?? null,
  );

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            explore
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {pages.percorsi.kicker}
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          {pages.percorsi.titolo}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          {conPeso(percorsi.intro)}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          {conPeso(percorsi.descrizione)}
        </p>
      </div>

      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-surface-container-low shadow-md">
        <div
          className="w-full h-full bg-cover bg-center"
          role="img"
          aria-label={percorsi.immagini.hero.alt}
          style={{ backgroundImage: `url('${percorsi.immagini.hero.src}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-primary font-semibold">
            {percorsi.sezione}
          </span>
        </div>
      </div>

      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-sm text-left">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
          {percorsi.introKicker}
        </span>
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          {percorsi.titoloSezione}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {conPeso(percorsi.mediazione)}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {conPeso(percorsi.chiacchierata)}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant italic">
          {conPeso(percorsi.citazione)}
        </p>
      </section>

      <div className="flex flex-col gap-space-md w-full">
        <div className="flex flex-col text-left">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {percorsi.percorsiKicker}
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            {percorsi.titoloElenco}
          </h2>
        </div>

        {percorsi.tipologie.map((pathway) => {
          const isExpanded = expandedId === pathway.id;
          return (
            <article
              key={pathway.id}
              className="relative rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col"
            >
              <div className="relative w-full h-32 bg-surface-container-low">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${percorsi.immagine.src}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
              </div>

              <div className="p-space-lg flex flex-col gap-space-sm -mt-2 relative text-left">
                <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                  {pathway.titolo}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {conPeso(pathway.testo)}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : pathway.id)
                  }
                  className="self-start font-label-md text-label-md text-primary flex items-center gap-1 pt-1"
                >
                  {isExpanded ? 'Chiudi' : percorsi.titoloWidget}
                  <span className="material-symbols-outlined text-[16px]">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-space-md rounded-lg bg-surface-container-lowest/75 flex flex-col gap-space-xs">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {conPeso(percorsi.chiacchierata)}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {brand.studioDiTeresa}
                    </p>
                  </div>
                )}

                <div className="pt-space-xs flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => onNavigate('prenota', pathway.id)}
                    className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
                  >
                    {cta.prenotaPercorso}
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

      <section className="rounded-xl p-space-lg bg-surface-container/60 backdrop-blur-md shadow-md flex flex-col gap-space-md text-left">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {percorsi.faq.kicker}
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            {percorsi.faq.titolo}
          </h2>
        </div>
        {percorsi.faq.voci.map((voce) => (
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
