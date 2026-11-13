import React, { useState } from 'react';
import { CONSULTATIONS } from '../data/tarotData';
import { RoutePath } from '../types';

interface ConsultiPageProps {
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

export const ConsultiPage: React.FC<ConsultiPageProps> = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    CONSULTATIONS[0].id
  );

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            visibility
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Incontri Individuali
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Consulti di Tarologia Evolutiva
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Sessioni individuali online in videochiamata protetta o in presenza nello studio olistico, dedicate al tuo ascolto interiore.
        </p>
      </div>

      <div className="flex flex-col gap-space-md w-full">
        {CONSULTATIONS.map((service) => {
          const isExpanded = expandedId === service.id;
          return (
            <article
              key={service.id}
              className="relative rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col"
            >
              <div className="relative w-full h-40 bg-surface-container-low">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
                {service.badge && (
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
                )}
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
                      videocam
                    </span>
                    {service.modality}
                  </span>
                </div>

                <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                  {service.title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {service.description}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : service.id)
                  }
                  className="self-start font-label-md text-label-md text-primary flex items-center gap-1 pt-1"
                >
                  {isExpanded ? 'Nascondi dettagli' : 'Cosa include la sessione'}
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
                        <span>{item}</span>
                      </div>
                    ))}
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
                    Prenota Ora
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
