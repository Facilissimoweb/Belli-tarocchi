import React, { useState } from 'react';
import type {
  BookingRecord,
  ClientProfile,
  JournalEntry,
  OrderRecord,
  RoutePath,
} from '../../types';

interface AreaRiservataPageProps {
  profile: ClientProfile;
  bookings: BookingRecord[];
  journal: JournalEntry[];
  orders: OrderRecord[];
  onSaveProfile: (profile: ClientProfile) => void;
  onCancelBooking: (bookingId: string) => void;
  onDeleteJournal: (entryId: string) => void;
  onNavigate: (path: RoutePath) => void;
}

export const AreaRiservataPage: React.FC<AreaRiservataPageProps> = ({
  profile,
  bookings,
  journal,
  orders,
  onSaveProfile,
  onCancelBooking,
  onDeleteJournal,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'consulti' | 'diario' | 'ordini'>(
    'consulti'
  );
  const [nameInput, setNameInput] = useState(profile.name);
  const [emailInput, setEmailInput] = useState(profile.email);
  const [phoneInput, setPhoneInput] = useState(profile.phone);
  const [editingProfile, setEditingProfile] = useState(!profile.isSignedIn);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;
    onSaveProfile({
      name: nameInput.trim(),
      email: emailInput.trim(),
      phone: phoneInput.trim(),
      isSignedIn: true,
    });
    setEditingProfile(false);
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-lg pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            lock_open
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Santuario Personale
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Area Riservata
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Custodisci qui i tuoi consulti prenotati, il diario personale degli Arcani e i tuoi ordini.
        </p>
      </div>

      {/* Profile Card */}
      <section className="rounded-xl p-space-lg bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col gap-space-sm">
        {editingProfile ? (
          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                {profile.isSignedIn ? 'Aggiorna Profilo' : 'Accedi al Tuo Spazio'}
              </span>
              {profile.isSignedIn && (
                <button
                  type="button"
                  onClick={() => setEditingProfile(false)}
                  className="font-label-sm text-label-sm text-on-surface-variant"
                >
                  Annulla
                </button>
              )}
            </div>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Nome e Cognome"
              className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Email personale"
              className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
            />
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Telefono (facoltativo)"
              className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-full min-h-[44px] rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
            >
              Salva Profilo Riservato
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  person
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface">
                  {profile.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {profile.email}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEditingProfile(true)}
              className="px-3 py-1.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm"
            >
              Modifica
            </button>
          </div>
        )}
      </section>

      {/* Tabs */}
      <div className="p-1 rounded-full bg-surface-container-high/80 flex items-center gap-1">
        {(
          [
            { id: 'consulti', label: `Consulti (${bookings.length})` },
            { id: 'diario', label: `Diario (${journal.length})` },
            { id: 'ordini', label: `Ordini (${orders.length})` },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 rounded-full font-label-sm text-label-sm transition-all ${
              activeTab === tab.id
                ? 'bg-primary-container text-on-primary'
                : 'text-on-surface-variant'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'consulti' && (
        <div className="flex flex-col gap-space-sm">
          {bookings.length === 0 ? (
            <div className="rounded-xl p-space-lg bg-surface-container/60 text-center flex flex-col items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[28px]">
                calendar_month
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Non hai ancora consulti prenotati in agenda.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('prenota')}
                className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
              >
                Prenota Consulto
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <article
                key={b.id}
                className="rounded-xl p-space-md bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col gap-space-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary">
                    {b.id} • {b.date} alle {b.time}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] ${
                      b.status === 'Confermato'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-error-container/60 text-on-error-container'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface">
                  {b.serviceTitle}
                </h3>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  {b.modality} • € {b.price}
                </span>
                {b.intention && (
                  <p className="font-body-md text-[13px] text-outline italic">
                    “{b.intention}”
                  </p>
                )}
                {b.status === 'Confermato' && (
                  <button
                    type="button"
                    onClick={() => onCancelBooking(b.id)}
                    className="self-end mt-1 font-label-sm text-label-sm text-error hover:underline"
                  >
                    Annulla appuntamento
                  </button>
                )}
              </article>
            ))
          )}
        </div>
      )}

      {activeTab === 'diario' && (
        <div className="flex flex-col gap-space-sm">
          {journal.length === 0 ? (
            <div className="rounded-xl p-space-lg bg-surface-container/60 text-center flex flex-col items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[28px]">
                auto_awesome
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Il tuo Diario degli Arcani è vuoto. Estrai una carta nella sezione Tarocchi (Chat).
              </p>
              <button
                type="button"
                onClick={() => onNavigate('tarocchi-chat')}
                className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
              >
                Estrai un Arcano
              </button>
            </div>
          ) : (
            journal.map((entry) => (
              <article
                key={entry.id}
                className="rounded-xl p-space-md bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col gap-space-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary">
                    {entry.date}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeleteJournal(entry.id)}
                    className="text-outline hover:text-error"
                    aria-label="Elimina nota"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
                <p className="font-title-md text-[15px] text-on-surface">
                  {entry.question}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.cards.map((c, idx) => (
                    <span
                      key={`${c.number}-${idx}`}
                      className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-label-sm"
                    >
                      {c.number} • {c.name}
                    </span>
                  ))}
                </div>
                {entry.note && (
                  <p className="font-body-md text-body-md text-on-surface-variant pt-1">
                    {entry.note}
                  </p>
                )}
              </article>
            ))
          )}
        </div>
      )}

      {activeTab === 'ordini' && (
        <div className="flex flex-col gap-space-sm">
          {orders.length === 0 ? (
            <div className="rounded-xl p-space-lg bg-surface-container/60 text-center flex flex-col items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[28px]">
                shopping_bag
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Nessun ordine registrato dallo Shop.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
              >
                Visita lo Shop
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <article
                key={ord.id}
                className="rounded-xl p-space-md bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col gap-space-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary">
                    {ord.id} • {ord.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-[10px]">
                    {ord.status}
                  </span>
                </div>
                {ord.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between font-body-md text-body-md text-on-surface-variant"
                  >
                    <span>
                      {it.quantity}× {it.title}
                    </span>
                    <span className="text-on-surface">
                      € {it.price * it.quantity}
                    </span>
                  </div>
                ))}
                <div className="pt-1 border-t border-outline-variant/30 flex justify-between font-title-md text-[15px] text-primary">
                  <span>Totale</span>
                  <span>€ {ord.total}</span>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
};
