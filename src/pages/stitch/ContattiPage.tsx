import React, { useState } from 'react';
import { CONTACT_INFO } from '../../data/tarotData';
import type { ContactChannel } from '../../types';

interface ContattiPageProps {
  highlightedChannel: ContactChannel | null;
  onSelectChannel: (channel: ContactChannel) => void;
}

export const ContattiPage: React.FC<ContattiPageProps> = ({
  highlightedChannel,
  onSelectChannel,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const channelCards: {
    id: ContactChannel;
    title: string;
    value: string;
    subtitle: string;
    icon: string;
    href: string;
    cta: string;
  }[] = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Diretto',
      value: CONTACT_INFO.whatsappNumber,
      subtitle: 'Risposta rapida per info su disponibilità e consulti',
      icon: 'chat',
      href: CONTACT_INFO.whatsappLink,
      cta: 'Apri Chat',
    },
    {
      id: 'telegram',
      title: 'Telegram Riservato',
      value: CONTACT_INFO.telegramHandle,
      subtitle: 'Canale diretto e note vocali di orientamento',
      icon: 'send',
      href: CONTACT_INFO.telegramLink,
      cta: 'Scrivi su Telegram',
    },
    {
      id: 'telefono',
      title: 'Contatto Telefonico',
      value: CONTACT_INFO.phoneDisplay,
      subtitle: CONTACT_INFO.hours,
      icon: 'call',
      href: CONTACT_INFO.phoneHref,
      cta: 'Chiama Ora',
    },
    {
      id: 'email',
      title: 'Email dello Studio',
      value: CONTACT_INFO.email,
      subtitle: 'Richieste percorsi, collaborazioni e buoni regalo',
      icon: 'mail',
      href: CONTACT_INFO.emailHref,
      cta: 'Invia Email',
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
            Contatti &amp; Accoglienza
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Parliamo Insieme
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Scegli il canale che senti più vicino per chiedere informazioni o fissare il tuo spazio di ascolto.
        </p>
      </div>

      {/* Direct Channels */}
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
                  <div className="flex flex-col">
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
              <p className="font-body-md text-body-md text-on-surface-variant">
                {card.subtitle}
              </p>
              <a
                href={card.href}
                target={
                  card.id === 'whatsapp' || card.id === 'telegram'
                    ? '_blank'
                    : undefined
                }
                rel="noreferrer"
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

      {/* Studio Address Card */}
      <div className="rounded-xl p-space-md bg-surface-container-low/90 backdrop-blur-md flex items-start gap-space-sm">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
          location_on
        </span>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            Studio in Presenza
          </span>
          <span className="font-body-md text-body-md text-on-surface">
            {CONTACT_INFO.studioAddress}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
            {CONTACT_INFO.hours}
          </span>
        </div>
      </div>

      {/* Contact Form */}
      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-sm">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
          Messaggio Diretto
        </span>
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          Scrivi allo Studio
        </h2>

        {sent ? (
          <div className="p-space-md rounded-lg bg-surface-container-lowest/80 flex flex-col gap-space-xs">
            <span className="font-title-md text-[15px] text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">
                verified
              </span>
              Messaggio Inviato
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Grazie per aver scritto. Maria Teresa Rogani ti risponderà entro 24 ore lavorative.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="self-start font-label-md text-label-md text-primary pt-1"
            >
              Invia un altro messaggio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Il tuo nome"
              className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
            />
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Come posso aiutarti?"
              className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary resize-none"
            />
            <button
              type="submit"
              className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-1"
            >
              Invia Richiesta
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
