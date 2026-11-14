import React from 'react';
import { siteContent } from '../../data/siteContent';
import { conPeso } from '../../components/Prosa';
import type { RoutePath } from '../../types';

interface ChiSonoPageProps {
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

const { brand, chiSono, cta, home } = siteContent;

const PILASTRO_ICONS = ['visibility', 'favorite', 'spa'] as const;

export const ChiSonoPage: React.FC<ChiSonoPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            self_improvement
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {chiSono.kicker}
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          {brand.titolare}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          {conPeso(chiSono.sottotitolo)}
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-surface-container-low">
        <div
          className="w-full h-full bg-cover bg-center"
          role="img"
          aria-label={chiSono.immagini.hero.alt}
          style={{ backgroundImage: `url('${chiSono.immagini.hero.src}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/35 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-on-surface">
            {brand.city}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-primary font-semibold">
            {chiSono.immagini.teresa.caption}
          </span>
        </div>
      </div>

      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-lg flex flex-col gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">
              auto_stories
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider block">
              {chiSono.visione.kicker}
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              {chiSono.visione.titolo}
            </h2>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/30 to-transparent" />
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {conPeso(chiSono.visione.testo)}
        </p>
      </section>

      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-lg flex flex-col gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">
              menu_book
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider block">
              {chiSono.metodo.kicker}
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              {chiSono.metodo.titolo}
            </h2>
          </div>
        </div>
        <p className="font-label-md text-label-md text-primary">
          {conPeso(chiSono.metodo.sottotitolo)}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {conPeso(chiSono.metodo.testo)}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {conPeso(chiSono.metodo.ponte)}
        </p>
        <div className="flex flex-col gap-space-sm">
          {chiSono.metodo.categorie.map((categoria) => (
            <div
              key={categoria.titolo}
              className="rounded-lg p-space-md bg-surface-container-lowest/70 flex flex-col gap-1"
            >
              <h3 className="font-title-md text-title-md text-on-surface">
                {categoria.titolo}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {conPeso(categoria.lettura)}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {conPeso(categoria.serve)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-space-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {home.visione.kicker}
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            {home.visione.titolo}
          </h2>
        </div>

        <div className="flex flex-col gap-space-sm">
          {home.visione.pilastri.map((item, index) => (
            <div
              key={item.titolo}
              className="rounded-xl p-space-md bg-surface-container/75 backdrop-blur-md shadow-md flex items-start gap-space-md"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  {PILASTRO_ICONS[index] ?? 'spa'}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                  {item.etichetta}
                </span>
                <h3 className="font-title-md text-title-md text-on-surface">
                  {item.titolo}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {conPeso(item.testo)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            {chiSono.formazione.kicker}
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            {chiSono.formazione.titolo}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {conPeso(chiSono.formazione.lead)}
          </p>
        </div>
        {chiSono.formazione.testi.map((testo) => (
          <p
            key={testo.slice(0, 32)}
            className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
          >
            {conPeso(testo)}
          </p>
        ))}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            {chiSono.percorsoKicker}
          </span>
          {chiSono.percorsoDisciplinare.map((voce) => (
            <div
              key={voce.titolo}
              className="rounded-lg p-space-sm bg-surface-container-lowest/70 flex flex-col gap-0.5"
            >
              <span className="font-title-md text-[15px] text-on-surface">
                {voce.titolo}
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                {conPeso(voce.dettaglio)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-md flex items-start gap-space-sm shadow-inner">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-primary text-[18px]">
            verified
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide">
            {chiSono.etica.titolo}
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            {conPeso(chiSono.etica.testo)}
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {conPeso(brand.deontologia)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-space-sm">
        <button
          type="button"
          onClick={() => onNavigate('prenota', 'focus')}
          className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined material-symbols-filled text-[20px]">
            calendar_month
          </span>
          {cta.consultoWhatsapp}
        </button>
        <button
          type="button"
          onClick={() => onNavigate('consulti')}
          className="w-full min-h-[48px] rounded-lg bg-surface-container-high/60 backdrop-blur-md text-on-surface font-title-md text-title-md font-medium flex items-center justify-center gap-space-xs active:scale-[0.98] transition-all hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">
            visibility
          </span>
          {chiSono.ctaConsulti}
        </button>
      </div>
    </div>
  );
};
