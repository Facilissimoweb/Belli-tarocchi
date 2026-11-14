import React, { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { openMailto } from '../../lib/mailto';
import {
  getPhoneHref,
  getWhatsAppNumber,
  telegramHref,
  whatsappChatHref,
} from '../../lib/whatsapp';
import type { ContactChannel } from '../../types';

interface ContattiPageProps {
  highlightedChannel: ContactChannel | null;
  onSelectChannel: (channel: ContactChannel) => void;
}

const { brand, cta, pages } = siteContent;
const contatti = pages.contatti;

function formatWhatsAppDisplay(raw: string) {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('39') && digits.length >= 11) {
    const local = digits.slice(2);
    return `+39 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6, 8)} ${local.slice(8)}`.trim();
  }
  return brand.whatsapp;
}

export const ContattiPage: React.FC<ContattiPageProps> = ({
  highlightedChannel,
  onSelectChannel,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oggetto, setOggetto] = useState('');
  const [message, setMessage] = useState('');

  const phoneDisplay = formatWhatsAppDisplay(getWhatsAppNumber() || brand.whatsapp);
  const phoneHref = getPhoneHref() || `tel:${brand.whatsapp.replace(/\s/g, '')}`;
  const waHref = whatsappChatHref();
  const tgHref = telegramHref();

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    const body = [
      `${contatti.form.nome}: ${name.trim()}`,
      `${contatti.form.email}: ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n');
    openMailto(brand.email, {
      subject: (oggetto.trim() || contatti.form.oggetto).slice(0, 120),
      body,
    });
  };

  const channelCards: {
    id: ContactChannel;
    title: string;
    value: string;
    subtitle: string;
    icon: string;
    href: string;
    cta: string;
    external?: boolean;
  }[] = [
    {
      id: 'whatsapp',
      title: cta.whatsappRapido,
      value: phoneDisplay,
      subtitle: brand.modalitaLettura,
      icon: 'chat',
      href: waHref,
      cta: cta.whatsappRapido,
      external: true,
    },
    {
      id: 'telegram',
      title: cta.telegram,
      value: phoneDisplay,
      subtitle: contatti.appuntamento,
      icon: 'send',
      href: tgHref,
      cta: cta.telegram,
      external: true,
    },
    {
      id: 'telefono',
      title: cta.chiama,
      value: phoneDisplay,
      subtitle: contatti.appuntamento,
      icon: 'call',
      href: phoneHref,
      cta: cta.chiama,
    },
    {
      id: 'email',
      title: contatti.form.email,
      value: brand.email,
      subtitle: contatti.intro,
      icon: 'mail',
      href: `mailto:${brand.email}`,
      cta: cta.scriviStudio,
    },
  ];

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-lg pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            contact_mail
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {contatti.kicker}
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          {contatti.titolo}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          {contatti.intro}
        </p>
      </div>

      <div className="flex flex-col gap-space-sm">
        {channelCards.map((card) => {
          const isHighlighted = highlightedChannel === card.id;
          return (
            <div
              key={card.id}
              onClick={() => onSelectChannel(card.id)}
              className={`rounded-xl p-space-md backdrop-blur-md shadow-md flex flex-col gap-space-sm transition-all ${
                isHighlighted
                  ? 'bg-surface-container-high/95 border border-primary/50 shadow-[0_0_20px_rgba(212,175,55,0.18)]'
                  : 'bg-surface-container/75 border border-transparent'
              }`}
            >
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      {card.icon}
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <h2 className="font-title-md text-[16px] text-on-surface">
                      {card.title}
                    </h2>
                    <span className="font-label-md text-label-md text-primary">
                      {card.value}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(card.id, card.value);
                  }}
                  className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 font-label-sm text-[11px] text-on-surface-variant hover:text-primary"
                >
                  {copiedKey === card.id ? 'Copiato' : 'Copia'}
                </button>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-left">
                {card.subtitle}
              </p>
              <a
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noreferrer' : undefined}
                className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 active:scale-[0.98] transition-transform"
              >
                {card.cta}
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </a>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl p-space-md bg-surface-container-low/90 backdrop-blur-md flex items-start gap-space-sm text-left">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
          location_on
        </span>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            {contatti.recapitiTitolo}
          </span>
          <span className="font-body-md text-body-md text-on-surface">
            {contatti.sede}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
            {contatti.appuntamento}
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant mt-1">
            {brand.studioDiTeresa}
          </span>
        </div>
      </div>

      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-sm text-left">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
          {contatti.moduloKicker}
        </span>
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          {contatti.moduloTitolo}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={contatti.form.nome}
            className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={contatti.form.email}
            className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            value={oggetto}
            onChange={(e) => setOggetto(e.target.value)}
            placeholder={contatti.form.oggetto}
            className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
          />
          <textarea
            rows={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={contatti.form.messaggio}
            className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary resize-none"
          />
          <button
            type="submit"
            className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-1"
          >
            {contatti.form.invia}
          </button>
        </form>
      </section>
    </div>
  );
};
