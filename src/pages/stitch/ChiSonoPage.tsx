import React from 'react';
import { HERO_IMAGE_URL } from '../../data/tarotData';
import type { RoutePath } from '../../types';

interface ChiSonoPageProps {
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

export const ChiSonoPage: React.FC<ChiSonoPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl pt-space-md">
      {/* Header Badge & Title */}
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            self_improvement
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Chi Sono • Biografia &amp; Vocazione
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Maria Teresa Rogani
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Operatore Olistico, studiosa di Tarologia Evolutiva e accompagnamento simbolico transpersonale.
        </p>
      </div>

      {/* Portrait / Sanctuary Image */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-surface-container-low">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/35 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-on-surface">
            Oltre 15 anni di pratica
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-primary font-semibold">
            Milano &amp; Online
          </span>
        </div>
      </div>

      {/* Story Card */}
      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-lg flex flex-col gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">
              auto_stories
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider block">
              Il Mio Cammino
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Dalla Simbologia all&apos;Ascolto Profondo
            </h2>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/30 to-transparent" />
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Il mio incontro con i Tarocchi di Marsiglia e la tradizione simbolica mediterranea risale a più di quindici anni fa. Fin dall&apos;inizio ho sentito l&apos;urgenza di liberare le carte dal peso della divinazione fatalistica per restituirle alla loro funzione originaria: un alfabeto sacro dell&apos;anima.
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Formata in discipline olistiche, ascolto attivo e psicologia degli archetipi, accompagno chi attraversa momenti di svolta, dubbio o ricerca interiore offrendo uno spazio protetto, privo di giudizio e profondamente umano.
        </p>
      </section>

      {/* Pillars */}
      <section className="flex flex-col gap-space-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            I Pilastri del Metodo
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Come Lavoriamo Insieme
          </h2>
        </div>

        <div className="flex flex-col gap-space-sm">
          {[
            {
              icon: 'visibility',
              title: 'Lettura Simbolica e non Predittiva',
              text: 'Ogni arcano rispecchia dinamiche vive nel presente. Non esistono sentenze rigide, ma chiavi di lettura per esercitare il libero arbitrio.',
            },
            {
              icon: 'favorite',
              title: 'Accoglienza e Riservatezza Assoluta',
              text: 'Ogni colloquio si svolge in un clima intimo e confidenziale, rispettando i tuoi tempi emotivi e il tuo vissuto.',
            },
            {
              icon: 'spa',
              title: 'Integrazione Olistica Concreta',
              text: 'Al termine dell’incontro porti con te domande guida, pratiche di radicamento e passi chiari per la vita quotidiana.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-space-md bg-surface-container/75 backdrop-blur-md shadow-md flex items-start gap-space-md"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  {item.icon}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-title-md text-title-md text-on-surface">
                  {item.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ethical Pact */}
      <div className="p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-md flex items-start gap-space-sm shadow-inner">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-primary text-[18px]">
            verified
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide">
            Patto Etico Deontologico
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant italic mt-0.5">
            “Nessuna predizione del futuro, solo consapevolezza ed evoluzione dell&apos;essere. I consulti non sostituiscono pareri medici o psicoterapeutici.”
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-space-sm">
        <button
          type="button"
          onClick={() => onNavigate('prenota', 'consulto-evolutivo')}
          className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined material-symbols-filled text-[20px]">
            calendar_month
          </span>
          Prenota il Tuo Incontro
        </button>
        <button
          type="button"
          onClick={() => onNavigate('consulti')}
          className="w-full min-h-[48px] rounded-lg bg-surface-container-high/60 backdrop-blur-md text-on-surface font-title-md text-title-md font-medium flex items-center justify-center gap-space-xs active:scale-[0.98] transition-all hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">
            visibility
          </span>
          Esplora i Consulti
        </button>
      </div>
    </div>
  );
};
