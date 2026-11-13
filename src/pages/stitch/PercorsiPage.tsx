import React, { useState } from 'react';
import { PATHWAYS } from '../data/tarotData';
import { RoutePath } from '../types';

interface PercorsiPageProps {
  initialPathwayId?: string;
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

export const PercorsiPage: React.FC<PercorsiPageProps> = ({
  initialPathwayId,
  onNavigate,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    initialPathwayId || PATHWAYS[0].id
  );

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            explore
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Cammini Evolutivi a Moduli
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Percorsi di Trasformazione
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Cicli personalizzati di più incontri per accompagnarti passo dopo passo nei momenti di rinascita, cambiamento e radicamento.
        </p>
      </div>

      <div className="flex flex-col gap-space-md w-full">
        {PATHWAYS.map((pathway) => {
          const isExpanded = expandedId === pathway.id;
          return (
            <article
              key={pathway.id}
              className="relative rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col"
            >
              <div className="relative w-full h-40 bg-surface-container-low">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${pathway.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
                {pathway.badge && (
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm font-semibold shadow-sm ${
                        pathway.badgeVariant === 'tertiary'
                          ? 'text-tertiary-fixed'
                          : 'text-primary'
                      }`}
                    >
                      {pathway.badge}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-space-lg flex flex-col gap-space-sm -mt-2 relative">
                <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      all_inclusive
                    </span>
                    {pathway.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      psychology
                    </span>
                    {pathway.modality}
                  </span>
                </div>

                <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                  {pathway.title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {pathway.description}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : pathway.id)
                  }
                  className="self-start font-label-md text-label-md text-primary flex items-center gap-1 pt-1"
                >
                  {isExpanded ? 'Chiudi programma' : 'Esplora i moduli del percorso'}
                  <span className="material-symbols-outlined text-[16px]">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-space-md rounded-lg bg-surface-container-lowest/75 flex flex-col gap-space-sm">
                    {pathway.modules && (
                      <div className="flex flex-col gap-space-xs">
                        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                          Struttura del Cammino
                        </span>
                        {pathway.modules.map((mod) => (
                          <div
                            key={mod}
                            className="flex items-start gap-space-sm text-on-surface font-body-md text-body-md"
                          >
                            <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                              adjust
                            </span>
                            <span>{mod}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/30 to-transparent" />
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Incluso nel Ciclo
                      </span>
                      {pathway.highlights.map((hl) => (
                        <div
                          key={hl}
                          className="flex items-start gap-space-sm text-on-surface-variant font-body-md text-body-md"
                        >
                          <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                            verified
                          </span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-space-xs flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                      {pathway.subtitle}
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                      € {pathway.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('prenota', pathway.id)}
                    className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
                  >
                    Inizia Percorso
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
    </div>
  );
};
