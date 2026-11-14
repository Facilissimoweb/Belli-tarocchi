import React, { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { TARIFFE } from '../../data/catalogo';
import { conPeso } from '../../components/Prosa';
import type { RoutePath } from '../../types';

interface HomePageProps {
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

const { brand, cta, home, nav, consulti } = siteContent;

function BloccoMetodo({
  parti,
}: {
  parti: readonly (string | { chiave: string })[];
}) {
  return parti.map((parte, i) =>
    typeof parte === 'string' ? (
      <span key={i}>{parte}</span>
    ) : (
      <strong key={i} className="font-semibold text-on-surface">
        {parte.chiave}
      </strong>
    ),
  );
}

const LETTURE = home.percorsi.letture.map((lettura) => {
  const tariffa = TARIFFE.find((t) => t.id === lettura.id);
  return {
    ...lettura,
    minutes: tariffa?.minutes ?? (lettura.id === 'deep' ? 60 : 30),
    price: tariffa?.price ?? (lettura.id === 'deep' ? 60 : 40),
    image:
      lettura.id === 'deep'
        ? '/consulti/hero.webp?v=3'
        : '/hero-home.webp',
    imageAlt:
      lettura.id === 'deep'
        ? consulti.immagini.hero.alt
        : home.seo.immagineAlt,
  };
});

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl">
      <div className="relative w-full pt-space-md flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm mb-space-lg">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {brand.titolare} · {brand.city}
          </span>
        </div>

        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-space-lg shadow-xl bg-surface-container-low">
          <div
            className="w-full h-full bg-cover bg-center"
            role="img"
            aria-label={home.seo.immagineAlt}
            style={{ backgroundImage: "url('/hero-home.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[14px]">
                auto_awesome
              </span>
              {consulti.modalita.presenza}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-primary font-semibold">
              {consulti.modalita.distanza}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-space-sm mb-space-lg">
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {home.kicker}
          </p>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
            {brand.wordmark}
          </h1>
          <p className="font-label-md text-label-md text-on-surface-variant">
            {home.firma}
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            {conPeso(home.benvenuto)}
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant max-w-sm mx-auto">
            {home.competenze}
          </p>
        </div>

        <div className="flex flex-col w-full gap-space-sm">
          <button
            type="button"
            onClick={() => onNavigate('prenota', 'focus')}
            className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined material-symbols-filled text-[20px]">
              calendar_month
            </span>
            {home.ctaConsulto}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('percorsi')}
            className="w-full min-h-[48px] rounded-lg bg-surface-container-high/60 backdrop-blur-md text-on-surface font-title-md text-title-md font-medium flex items-center justify-center gap-space-xs active:scale-[0.98] transition-all hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">
              explore
            </span>
            {cta.percorsi}
          </button>
        </div>
      </div>

      <section className="relative w-full rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-lg flex flex-col gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">
              self_improvement
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider block">
              {home.chiSono.kicker}
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface whitespace-pre-line">
              {home.chiSono.titolo}
            </h2>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/30 to-transparent" />

        {home.chiSono.blocchi.map((blocco, i) => (
          <p
            key={i}
            className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-left"
          >
            <BloccoMetodo parti={blocco} />
          </p>
        ))}

        <div className="grid grid-cols-1 gap-space-sm pt-space-xs">
          {home.visione.pilastri.map((pilastro) => (
            <div
              key={pilastro.titolo}
              className="p-space-sm rounded-lg bg-surface-container-lowest/70 flex flex-col gap-0.5 text-left"
            >
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                {pilastro.etichetta}
              </span>
              <span className="font-title-md text-[15px] text-on-surface">
                {pilastro.titolo}
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant leading-snug">
                {conPeso(pilastro.testo)}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('chi-sono')}
          className="self-start font-label-md text-label-md text-primary flex items-center gap-0.5"
        >
          {cta.leggiChiSono}
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </button>
      </section>

      <section className="flex flex-col gap-space-md w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
              {nav.consulti}
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              {home.percorsi.titolo}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('consulti')}
            className="font-label-md text-label-md text-primary flex items-center gap-0.5"
          >
            {nav.consulti}
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-space-md w-full">
          {LETTURE.map((lettura) => (
            <article
              key={lettura.id}
              className="relative rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col"
            >
              <div className="relative w-full h-40 bg-surface-container-low">
                <div
                  className="w-full h-full bg-cover bg-center"
                  role="img"
                  aria-label={lettura.imageAlt}
                  style={{ backgroundImage: `url('${lettura.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-primary font-semibold shadow-sm">
                    {lettura.meta}
                  </span>
                </div>
              </div>
              <div className="p-space-lg flex flex-col gap-space-sm -mt-2 relative">
                <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      schedule
                    </span>
                    {lettura.minutes} min
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      call
                    </span>
                    {consulti.modalita.presenza} / {consulti.modalita.distanza}
                  </span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold text-left">
                  {lettura.titolo}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 text-left">
                  {conPeso(lettura.testo)}
                </p>
                <div className="pt-space-xs flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                      {lettura.meta}
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                      € {lettura.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('prenota', lettura.id)}
                    className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
                  >
                    {lettura.cta}
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-space-xs p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-md flex items-start gap-space-sm shadow-inner text-left">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              verified
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide">
              {home.visione.kicker}
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant italic mt-0.5">
              {conPeso(home.visione.lead)}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              {conPeso(brand.deontologia)}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl p-space-lg bg-surface-container/60 backdrop-blur-md shadow-md flex flex-col gap-space-md text-left">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
              {home.chiSono.faq.titolo}
            </span>
            <h3 className="font-title-md text-title-md text-on-surface">
              {home.visione.titolo}
            </h3>
          </div>
          <span className="material-symbols-outlined text-primary text-[24px]">
            balance
          </span>
        </div>

        <div className="flex flex-wrap gap-space-xs">
          {home.chiSono.faq.voci.map((voce, index) => {
            const isSelected = selectedFaq === index;
            return (
              <button
                key={voce.domanda}
                type="button"
                onClick={() => setSelectedFaq(isSelected ? null : index)}
                className={`px-space-md py-2 rounded-full font-label-md text-label-md transition-colors active:scale-95 text-left ${
                  isSelected
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high/80 text-on-surface'
                }`}
              >
                {voce.domanda}
              </button>
            );
          })}
        </div>

        {selectedFaq !== null && (
          <div className="p-space-sm rounded-lg bg-surface-container-lowest/80 text-on-surface-variant font-body-md text-body-md">
            <span className="text-primary font-semibold block mb-1">
              {home.chiSono.faq.voci[selectedFaq].domanda}
            </span>
            <span>{conPeso(home.chiSono.faq.voci[selectedFaq].risposta)}</span>
          </div>
        )}
      </section>
    </div>
  );
};
