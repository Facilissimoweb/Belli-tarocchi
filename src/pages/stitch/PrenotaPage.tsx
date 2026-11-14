import React, { useMemo, useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { TARIFFE } from '../../data/catalogo';
import { conPeso } from '../../components/Prosa';
import type { BookingRecord, ClientProfile, RoutePath } from '../../types';

interface PrenotaPageProps {
  initialServiceId?: string;
  profile: ClientProfile;
  onCreateBooking: (booking: BookingRecord) => void;
  onNavigate: (path: RoutePath) => void;
}

const { brand, consulti, cta, nav, percorsi } = siteContent;

type BookableService = {
  id: string;
  title: string;
  duration: string;
  modality: string;
  price: number | null;
  kind: 'consulto' | 'percorso';
};

const CONSULT_SERVICES: BookableService[] = TARIFFE.map((tariffa) => {
  const opzione = consulti.opzioni.find((o) => o.id === tariffa.id);
  return {
    id: tariffa.id,
    title: opzione?.titolo ?? tariffa.name,
    duration: `${tariffa.minutes} min`,
    modality: `${consulti.modalita.presenza} / ${consulti.modalita.distanza}`,
    price: tariffa.price,
    kind: 'consulto',
  };
});

const PATHWAY_SERVICES: BookableService[] = percorsi.tipologie.map((tipologia) => ({
  id: tipologia.id,
  title: tipologia.titolo,
  duration: percorsi.sezione,
  modality: brand.modalitaLettura,
  price: null,
  kind: 'percorso',
}));

const ALL_SERVICES = [...CONSULT_SERVICES, ...PATHWAY_SERVICES];

const MODALITIES = [
  {
    id: 'distanza' as const,
    label: `${consulti.modalita.distanza} — ${consulti.modalita.distanzaNota}`,
  },
  {
    id: 'presenza' as const,
    label: `${consulti.modalita.presenza} — ${consulti.modalita.presenzaNota}`,
  },
] as const;

type ModalityId = (typeof MODALITIES)[number]['id'];

const TIME_SLOTS = ['09:30', '11:00', '14:30', '16:00', '18:00', '19:00', '20:00'];

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
      : ALL_SERVICES[0].id,
  );
  const [modalityId, setModalityId] = useState<ModalityId>('distanza');
  const [selectedDate, setSelectedDate] = useState<string>(
    upcomingDays[0]?.label || '',
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
  const modalityLabel =
    MODALITIES.find((m) => m.id === modalityId)?.label ?? MODALITIES[0].label;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMsg(consulti.accessoObbligatorio);
      return;
    }
    setErrorMsg('');

    const record: BookingRecord = {
      id: `TI-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      price: selectedService.price ?? 0,
      modality: modalityLabel,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || brand.whatsapp,
      intention: intention.trim() || consulti.intro,
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
              {consulti.successoKicker} · {confirmedBooking.id}
            </span>
            <h1 className="font-headline-sm text-headline-sm text-on-surface">
              {consulti.successoTitolo}
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {conPeso(consulti.avvisoConferma)}
          </p>

          <div className="w-full p-space-md rounded-lg bg-surface-container-lowest/80 flex flex-col gap-space-xs text-left">
            <div className="flex justify-between font-body-md text-body-md gap-2">
              <span className="text-on-surface-variant">{nav.consulti}</span>
              <span className="text-on-surface font-semibold text-right">
                {confirmedBooking.serviceTitle}
              </span>
            </div>
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">
                {consulti.calendario.giorno}
              </span>
              <span className="text-primary font-semibold">
                {confirmedBooking.date} · {confirmedBooking.time}
              </span>
            </div>
            <div className="flex justify-between font-body-md text-body-md gap-2">
              <span className="text-on-surface-variant shrink-0">Modalità</span>
              <span className="text-on-surface text-right">
                {confirmedBooking.modality}
              </span>
            </div>
            {confirmedBooking.price > 0 && (
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-on-surface-variant">Totale</span>
                <span className="text-primary font-semibold">
                  € {confirmedBooking.price}
                </span>
              </div>
            )}
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
              {nav.riservata}
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmedBooking(null);
                onNavigate('home');
              }}
              className="w-full min-h-[48px] rounded-lg bg-surface-container-high/60 text-on-surface font-title-md text-title-md font-medium flex items-center justify-center gap-space-xs"
            >
              {nav.home}
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
            {cta.consultoWhatsapp}
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          {cta.consultoWhatsapp}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          {conPeso(consulti.intro)}
        </p>
      </div>

      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-sm">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
          1. {nav.consulti} / {nav.percorsi}
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
                    {srv.duration}
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-semibold shrink-0">
                  {srv.price != null ? `€ ${srv.price}` : percorsi.inviaWhatsapp}
                </span>
              </button>
            );
          })}
        </div>
        {selectedService.kind === 'percorso' && (
          <p className="font-body-md text-body-md text-on-surface-variant">
            {conPeso(percorsi.chiacchierata)}
          </p>
        )}
      </section>

      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            2. Modalità
          </span>
          <div className="grid grid-cols-1 gap-space-xs">
            {MODALITIES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setModalityId(m.id)}
                className={`py-2.5 px-space-sm rounded-lg font-label-md text-label-md transition-colors text-left ${
                  modalityId === m.id
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high/80 text-on-surface'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {conPeso(consulti.seraOnline)}
          </p>
        </div>

        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            {consulti.calendario.giorno}
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
            {consulti.calendario.orario}
          </span>
          <div className="flex flex-wrap gap-space-xs">
            {TIME_SLOTS.map((slot) => {
              const active = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`px-space-md py-2 rounded-lg font-label-md text-label-md transition-colors ${
                    active
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container-lowest/80 text-on-surface'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-sm">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
          3. Contatti
        </span>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {conPeso(consulti.accessoObbligatorio)}
        </p>
        <input
          type="text"
          required
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder={percorsi.nome}
          className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
        />
        <input
          type="email"
          required
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          placeholder={siteContent.pages.contatti.form.email}
          className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
        />
        <input
          type="tel"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          placeholder={consulti.recapito}
          className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
        />
        <textarea
          rows={3}
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder={percorsi.nota}
          className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary resize-none"
        />
        {errorMsg && (
          <p className="font-body-md text-body-md text-error">{errorMsg}</p>
        )}
        <button
          type="submit"
          className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition-all"
        >
          {consulti.conferma}
        </button>
      </section>
    </form>
  );
};
