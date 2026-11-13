import React, { useMemo, useState } from 'react';
import { CONSULTATIONS, PATHWAYS } from '../../data/tarotData';
import type { BookingRecord, ClientProfile, RoutePath } from '../../types';

interface PrenotaPageProps {
  initialServiceId?: string;
  profile: ClientProfile;
  onCreateBooking: (booking: BookingRecord) => void;
  onNavigate: (path: RoutePath) => void;
}

const ALL_SERVICES = [...CONSULTATIONS, ...PATHWAYS];
const TIME_SLOTS = ['09:30', '11:00', '14:30', '16:00', '18:00'];

function buildUpcomingDays() {
  const days: { iso: string; label: string; weekday: string }[] = [];
  const formatterDay = new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
  });
  const formatterWeek = new Intl.DateTimeFormat('it-IT', {
    weekday: 'short',
  });

  let offset = 1;
  while (days.length < 6) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    if (d.getDay() !== 0) {
      days.push({
        iso: d.toISOString().split('T')[0],
        label: formatterDay.format(d),
        weekday: formatterWeek.format(d),
      });
    }
    offset += 1;
  }
  return days;
}

export const PrenotaPage: React.FC<PrenotaPageProps> = ({
  initialServiceId,
  profile,
  onCreateBooking,
  onNavigate,
}) => {
  const upcomingDays = useMemo(() => buildUpcomingDays(), []);

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId && ALL_SERVICES.some((s) => s.id === initialServiceId)
      ? initialServiceId
      : ALL_SERVICES[0].id
  );
  const [modality, setModality] = useState<
    'Online (Videochiamata)' | 'Studio (In Presenza)'
  >('Online (Videochiamata)');
  const [selectedDate, setSelectedDate] = useState<string>(
    upcomingDays[0]?.label || ''
  );
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[1]);
  const [clientName, setClientName] = useState<string>(profile.name || '');
  const [clientEmail, setClientEmail] = useState<string>(profile.email || '');
  const [clientPhone, setClientPhone] = useState<string>(profile.phone || '');
  const [intention, setIntention] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingRecord | null>(null);

  const selectedService =
    ALL_SERVICES.find((s) => s.id === selectedServiceId) || ALL_SERVICES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMsg('Inserisci almeno il tuo nome e un indirizzo email valido.');
      return;
    }
    setErrorMsg('');

    const record: BookingRecord = {
      id: `TI-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      price: selectedService.price,
      modality,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || 'Non indicato',
      intention:
        intention.trim() || 'Ascolto generale sul momento presente.',
      status: 'Confermato',
      createdAt: new Date().toLocaleDateString('it-IT'),
    };

    onCreateBooking(record);
    setConfirmedBooking(record);
  };

  if (confirmedBooking) {
    return (
      <div className="flex flex-col w-full px-margin-mobile gap-space-xl pt-space-md">
        <div className="rounded-xl p-space-lg bg-surface-container/75 backdrop-blur-md shadow-xl flex flex-col items-center text-center gap-space-md">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="material-symbols-outlined material-symbols-filled text-primary text-[30px]">
              verified
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
              Spazio Riservato • Codice {confirmedBooking.id}
            </span>
            <h1 className="font-headline-sm text-headline-sm text-on-surface">
              Incontro Confermato
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Grazie {confirmedBooking.clientName}. La tua richiesta è stata registrata nella tua Area Riservata. Riceverai i dettagli di accesso prima dell&apos;incontro.
          </p>

          <div className="w-full p-space-md rounded-lg bg-surface-container-lowest/80 flex flex-col gap-space-xs text-left">
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Esperienza</span>
              <span className="text-on-surface font-semibold text-right">
                {confirmedBooking.serviceTitle}
              </span>
            </div>
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Data e Ora</span>
              <span className="text-primary font-semibold">
                {confirmedBooking.date} • {confirmedBooking.time}
              </span>
            </div>
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Modalità</span>
              <span className="text-on-surface">{confirmedBooking.modality}</span>
            </div>
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Quota Rituale</span>
              <span className="text-primary font-semibold">
                € {confirmedBooking.price}
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-space-sm pt-space-xs">
            <button
              type="button"
              onClick={() => onNavigate('area-riservata')}
              className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                lock_open
              </span>
              Vai all&apos;Area Riservata
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmedBooking(null);
                onNavigate('home');
              }}
              className="w-full min-h-[48px] rounded-lg bg-surface-container-high/60 text-on-surface font-title-md text-title-md font-medium flex items-center justify-center gap-space-xs"
            >
              Torna alla Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full px-margin-mobile gap-space-lg pt-space-md"
    >
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            calendar_month
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Agenda Riservata
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Prenota il Tuo Consulto
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Scegli l&apos;esperienza, il giorno e la modalità più accogliente per il tuo momento.
        </p>
      </div>

      {/* Step 1: Service */}
      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-sm">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
          1. Seleziona Esperienza
        </span>
        <div className="flex flex-col gap-space-xs">
          {ALL_SERVICES.map((srv) => {
            const active = srv.id === selectedServiceId;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedServiceId(srv.id)}
                className={`p-space-sm rounded-lg flex items-center justify-between text-left transition-all ${
                  active
                    ? 'bg-primary/15 border border-primary/50 text-on-surface'
                    : 'bg-surface-container-lowest/70 border border-transparent text-on-surface-variant hover:bg-surface-container-high/50'
                }`}
              >
                <div className="flex flex-col pr-2">
                  <span className="font-title-md text-[15px] text-on-surface font-semibold">
                    {srv.title}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {srv.duration} • {srv.modality}
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-semibold shrink-0">
                  € {srv.price}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Modality, Date & Time */}
      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            2. Modalità d&apos;Incontro
          </span>
          <div className="grid grid-cols-2 gap-space-xs">
            {(
              ['Online (Videochiamata)', 'Studio (In Presenza)'] as const
            ).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModality(m)}
                className={`py-2.5 px-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                  modality === m
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high/80 text-on-surface'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            Giorno Disponibile
          </span>
          <div className="grid grid-cols-3 gap-space-xs">
            {upcomingDays.map((day) => {
              const active = selectedDate === day.label;
              return (
                <button
                  key={day.iso}
                  type="button"
                  onClick={() => setSelectedDate(day.label)}
                  className={`py-2 px-2 rounded-lg flex flex-col items-center transition-colors ${
                    active
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container-lowest/80 text-on-surface'
                  }`}
                >
                  <span className="font-label-sm text-[10px] uppercase opacity-80">
                    {day.weekday}
                  </span>
                  <span className="font-label-md text-label-md font-semibold">
                    {day.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            Fascia Oraria
          </span>
          <div className="flex flex-wrap gap-space-xs">
            {TIME_SLOTS.map((slot) => {
              const active = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`px-space-md py-2 rounded-full font-label-md text-label-md transition-colors ${
                    active
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container-high/80 text-on-surface'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step 3: Client Details */}
      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-sm">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
          3. I Tuoi Riferimenti
        </span>

        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Nome e Cognome *
          </span>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Es. Chiara Rossi"
            className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Email *
          </span>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="tua@email.it"
            className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Telefono / WhatsApp
          </span>
          <input
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="+39 ..."
            className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Tema o Intenzione dell&apos;Incontro (facoltativo)
          </span>
          <textarea
            rows={3}
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Condividi brevemente cosa ti porta qui oggi..."
            className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary resize-none"
          />
        </label>

        {errorMsg && (
          <p className="text-error font-label-sm text-label-sm">{errorMsg}</p>
        )}
      </section>

      {/* Summary & Submit */}
      <button
        type="submit"
        className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition-all"
      >
        <span className="material-symbols-outlined material-symbols-filled text-[20px]">
          calendar_month
        </span>
        Conferma Prenotazione • € {selectedService.price}
      </button>
    </form>
  );
};
