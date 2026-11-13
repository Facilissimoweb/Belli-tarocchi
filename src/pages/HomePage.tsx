import React, { useState } from 'react';
import {
  CARD_1_IMAGE_URL,
  CARD_2_IMAGE_URL,
  HERO_IMAGE_URL,
  REFLECTION_HINTS,
} from '../data/tarotData';
import { RoutePath } from '../types';

interface HomePageProps {
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

const AFFIRMATION_TOPICS: { label: string; topic: string }[] = [
  { label: 'Chiarezza Relazionale', topic: 'Chiarezza nelle Relazioni' },
  { label: 'Svolta Professionale', topic: 'Blocchi nel Lavoro' },
  { label: 'Pace Emotiva', topic: 'Pace Emotiva' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl">
      {/* Top Ambient Sacred Aura */}
      <div className="relative w-full pt-space-md flex flex-col items-center text-center">
        {/* Hero Sacred Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm mb-space-lg">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="material-symbols-outlined material-symbols-filled text-[14px] text-primary">
            arrow_back_ios_new
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Maria Teresa Rogani • Operatore Olistico
          </span>
        </div>

        {/* Editorial Hero Visual with Atmospheric Scrim */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-space-lg shadow-xl bg-surface-container-low">
          <div
            className="w-full h-full bg-cover bg-center"
            role="img"
            aria-label="Mystical tarot sanctuary desk bathed in warm candlelight and volumetric golden incense smoke."
            style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
          {/* Ritual Micro-Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[14px]">
                auto_awesome
              </span>
              Lettura Evolutiva Simbolica
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-primary font-semibold">
              Sessione Individuale
            </span>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="flex flex-col gap-space-sm mb-space-lg">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
            L&apos;Arte Sacra dell&apos;Ascolto Interiore
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Un ponte archetipico tra conscio e inconscio per ritrovare orientamento, chiarezza interiore e autentica armonia evolutiva.
          </p>
        </div>

        {/* CTA Button Group */}
        <div className="flex flex-col w-full gap-space-sm">
          <button
            type="button"
            onClick={() => onNavigate('prenota', 'consulto-evolutivo')}
            className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined material-symbols-filled text-[20px]">
              calendar_month
            </span>
            Prenota Consulto
          </button>
          <button
            type="button"
            onClick={() => onNavigate('percorsi')}
            className="w-full min-h-[48px] rounded-lg bg-surface-container-high/60 backdrop-blur-md text-on-surface font-title-md text-title-md font-medium flex items-center justify-center gap-space-xs active:scale-[0.98] transition-all hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">
              explore
            </span>
            Scopri i Percorsi
          </button>
        </div>
      </div>

      {/* Editorial Sacred Intro Card (Tier 1 Glass) */}
      <section className="relative w-full rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-lg flex flex-col gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">
              self_improvement
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider block">
              Il Metodo Olistico
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Specchio dell&apos;Anima, Guida nel Presente
            </h2>
          </div>
        </div>

        {/* Atmospheric Divider Gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/30 to-transparent" />

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          I Tarocchi non svelano destini immutabili: sono antiche lenti simboliche attraverso cui osservare con limpidezza i nodi emotivi, le risorse taciute e le correnti del presente. Nel nostro spazio protetto, ogni arcano diviene uno specchio accogliente per ricongiungerti con il tuo centro vitale.
        </p>

        {/* Stat/Value Highlights */}
        <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
          <div className="p-space-sm rounded-lg bg-surface-container-lowest/70 flex flex-col gap-0.5">
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">
              15+
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant leading-snug">
              Anni di studio simbolico e transpersonale
            </span>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-lowest/70 flex flex-col gap-0.5">
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">
              100%
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant leading-snug">
              Spazio intimo, etico e confidenziale
            </span>
          </div>
        </div>
      </section>

      {/* Consultations & Pathways Section */}
      <section className="flex flex-col gap-space-md w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
              Incontri di Consapevolezza
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Esperienze Guidate
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('consulti')}
            className="font-label-md text-label-md text-primary flex items-center gap-0.5"
          >
            Tutti
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
          </button>
        </div>

        {/* Vertical Stacked Rich Cards */}
        <div className="flex flex-col gap-space-md w-full">
          {/* Card 1: Consulto Evolutivo Singolo */}
          <article className="relative rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col">
            <div className="relative w-full h-40 bg-surface-container-low">
              <div
                className="w-full h-full bg-cover bg-center"
                role="img"
                aria-label="Tre carte dei tarocchi su seta bronzo con pendolo di cristallo"
                style={{ backgroundImage: `url('${CARD_1_IMAGE_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-primary font-semibold shadow-sm">
                  Disponibile Oggi
                </span>
              </div>
            </div>
            <div className="p-space-lg flex flex-col gap-space-sm -mt-2 relative">
              <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    schedule
                  </span>
                  60 Minuti
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    videocam
                  </span>
                  Online o Studio
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                Consulto Evolutivo degli Arcani
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                Un&apos;indagine approfondita sul momento presente per sciogliere dubbi decisionali, comprendere dinamiche relazionali e fare luce sulla direzione dell&apos;anima.
              </p>
              <div className="pt-space-xs flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Quota Rituale
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                    € 80
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('prenota', 'consulto-evolutivo')}
                  className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
                >
                  Approfondisci
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Card 2: Percorso Archetipi di Trasformazione */}
          <article className="relative rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col">
            <div className="relative w-full h-40 bg-surface-container-low">
              <div
                className="w-full h-full bg-cover bg-center"
                role="img"
                aria-label="Grimorio in pelle dorata, selenite e geometria sacra"
                style={{ backgroundImage: `url('${CARD_2_IMAGE_URL}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-tertiary-fixed font-semibold shadow-sm">
                  Posti Limitati
                </span>
              </div>
            </div>
            <div className="p-space-lg flex flex-col gap-space-sm -mt-2 relative">
              <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    all_inclusive
                  </span>
                  4 Sessioni
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    psychology
                  </span>
                  Tutoraggio Diretto
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                Il Viaggio del Matto: Percorso di Rinascita
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                Un percorso a moduli personalizzato per attraversare fasi di transizione, ritrovare autostima e allineare le scelte quotidiane ai tuoi valori più profondi.
              </p>
              <div className="pt-space-xs flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Ciclo Completo
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                    € 290
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('percorsi', 'viaggio-matto')}
                  className="px-space-md py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-medium flex items-center gap-1 active:scale-95 transition-transform hover:bg-surface-bright"
                >
                  Dettagli
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Sacred Ethical Callout Banner */}
        <div className="mt-space-xs p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-md flex items-start gap-space-sm shadow-inner">
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
              “Nessuna predizione del futuro, solo consapevolezza ed evoluzione dell&apos;essere.”
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Question Drawer Micro-Widget */}
      <section className="rounded-xl p-space-lg bg-surface-container/60 backdrop-blur-md shadow-md flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
              Spunti di Riflessione
            </span>
            <h3 className="font-title-md text-title-md text-on-surface">
              Cosa ti sta chiamando ora?
            </h3>
          </div>
          <span className="material-symbols-outlined text-primary text-[24px]">
            balance
          </span>
        </div>

        <div className="flex flex-wrap gap-space-xs">
          {AFFIRMATION_TOPICS.map(({ label, topic }) => {
            const isSelected = selectedTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`px-space-md py-2 rounded-full font-label-md text-label-md transition-colors active:scale-95 text-left ${
                  isSelected
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high/80 text-on-surface'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {selectedTopic && (
          <div className="p-space-sm rounded-lg bg-surface-container-lowest/80 text-on-surface-variant font-body-md text-body-md">
            <span className="text-primary font-semibold block mb-1">
              Spunto per la tua meditazione:
            </span>
            <span>
              {REFLECTION_HINTS[selectedTopic] ||
                'Ascolta il silenzio che precede la tua prossima scelta.'}
            </span>
          </div>
        )}
      </section>
    </div>
  );
};
