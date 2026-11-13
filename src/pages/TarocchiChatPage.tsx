import React, { useState } from 'react';
import { CONTACT_INFO, MAJOR_ARCANA } from '../data/tarotData';
import { ArcanaCard, ChatMessage, JournalEntry, RoutePath } from '../types';

interface TarocchiChatPageProps {
  onSaveJournal: (entry: JournalEntry) => void;
  onNavigate: (path: RoutePath, serviceId?: string) => void;
}

export const TarocchiChatPage: React.FC<TarocchiChatPageProps> = ({
  onSaveJournal,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'estrazione' | 'chat'>('estrazione');

  // Card Draw state
  const [drawMode, setDrawMode] = useState<1 | 3>(1);
  const [question, setQuestion] = useState<string>('');
  const [drawnCards, setDrawnCards] = useState<ArcanaCard[]>([]);
  const [personalNote, setPersonalNote] = useState<string>('');
  const [savedToast, setSavedToast] = useState<boolean>(false);

  // Studio Chat Desk state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'guide',
      text: 'Benvenuto nello spazio di ascolto di Tarot Italia. Puoi estrarre una carta riflessiva oppure scrivere qui la tua richiesta per orientarti verso il consulto più adatto con Maria Teresa Rogani.',
      timestamp: 'Ora',
    },
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  const handleDrawCards = () => {
    const pool = [...MAJOR_ARCANA];
    const picked: ArcanaCard[] = [];
    for (let i = 0; i < drawMode; i += 1) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    setDrawnCards(picked);
    setSavedToast(false);
  };

  const handleSaveToJournal = () => {
    if (drawnCards.length === 0) return;
    onSaveJournal({
      id: `J-${Date.now()}`,
      date: new Date().toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      cards: drawnCards,
      question: question.trim() || 'Messaggio evolutivo del giorno',
      note: personalNote.trim(),
    });
    setSavedToast(true);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const suggestedArcana =
      MAJOR_ARCANA[Math.floor(Math.random() * MAJOR_ARCANA.length)];

    const replyMsg: ChatMessage = {
      id: `g-${Date.now() + 1}`,
      sender: 'guide',
      text: `Grazie per aver condiviso questo passaggio. Come spunto iniziale, l’archetipo "${suggestedArcana.name}" suggerisce: "${suggestedArcana.reflectionQuestion}" Se desideri approfondire dal vivo con Maria Teresa, puoi aprire WhatsApp/Telegram o fissare un consulto individuale.`,
      timestamp: new Date().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      drawnCards: [suggestedArcana],
    };

    setMessages((prev) => [...prev, userMsg, replyMsg]);
    setChatInput('');
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-lg pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            forum
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Tarocchi (Chat) • Spazio Interattivo
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Dialogo con gli Arcani
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Estrai un Arcano Maggiore per la tua riflessione interiore oppure avvia un dialogo orientativo con lo studio.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="p-1 rounded-full bg-surface-container-high/80 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('estrazione')}
          className={`flex-1 py-2 rounded-full font-label-md text-label-md transition-all ${
            activeTab === 'estrazione'
              ? 'bg-primary-container text-on-primary shadow-sm'
              : 'text-on-surface-variant'
          }`}
        >
          Estrazione Arcani
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 rounded-full font-label-md text-label-md transition-all ${
            activeTab === 'chat'
              ? 'bg-primary-container text-on-primary shadow-sm'
              : 'text-on-surface-variant'
          }`}
        >
          Chat Studio
        </button>
      </div>

      {activeTab === 'estrazione' ? (
        <div className="flex flex-col gap-space-md">
          <section className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                Prepara la Tua Domanda
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setDrawMode(1)}
                  className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${
                    drawMode === 1
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface-variant'
                  }`}
                >
                  1 Carta
                </button>
                <button
                  type="button"
                  onClick={() => setDrawMode(3)}
                  className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${
                    drawMode === 3
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface-variant'
                  }`}
                >
                  3 Carte
                </button>
              </div>
            </div>

            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Es. Cosa chiede la mia energia oggi?"
              className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
            />

            <button
              type="button"
              onClick={handleDrawCards}
              className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                auto_awesome
              </span>
              {drawnCards.length > 0
                ? 'Estrai Nuovamente'
                : drawMode === 1
                  ? 'Estrai Arcano del Momento'
                  : 'Estrai Stesa a 3 Carte'}
            </button>
          </section>

          {drawnCards.length > 0 && (
            <div className="flex flex-col gap-space-md">
              {drawnCards.map((card, idx) => {
                const positions = ['Radice', 'Presente', 'Direzione'];
                return (
                  <article
                    key={`${card.number}-${idx}`}
                    className="rounded-xl p-space-lg bg-surface-container/80 backdrop-blur-md shadow-lg border border-primary/20 flex flex-col gap-space-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-primary uppercase tracking-wider">
                        {drawMode === 3
                          ? `${positions[idx]} • Arcano ${card.number}`
                          : `Arcano ${card.number}`}
                      </span>
                      <span className="material-symbols-outlined text-primary text-[22px]">
                        {card.symbolIcon}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      {card.name}
                    </h2>
                    <span className="font-label-md text-label-md text-primary">
                      {card.archetype}
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                      {card.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2.5 py-0.5 rounded-full bg-surface-container-high/80 font-label-sm text-[11px] text-on-surface-variant"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {card.meaning}
                    </p>

                    <div className="p-space-sm rounded-lg bg-surface-container-lowest/80">
                      <span className="font-label-sm text-label-sm text-primary block mb-0.5">
                        Domanda per te:
                      </span>
                      <p className="font-body-md text-body-md text-on-surface italic">
                        “{card.reflectionQuestion}”
                      </p>
                    </div>
                  </article>
                );
              })}

              {/* Save to Personal Journal */}
              <div className="rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-md shadow-md flex flex-col gap-space-sm">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                  Annota nel Tuo Diario Riservato
                </span>
                <textarea
                  rows={2}
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="Scrivi cosa risuona dentro di te..."
                  className="w-full rounded-lg bg-surface-container-lowest/85 border border-outline-variant/40 px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary resize-none"
                />
                <div className="flex items-center gap-space-sm">
                  <button
                    type="button"
                    onClick={handleSaveToJournal}
                    className="flex-1 min-h-[44px] rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1 hover:bg-surface-bright"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      bookmark_add
                    </span>
                    {savedToast ? 'Salvato nel Diario!' : 'Salva in Area Riservata'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('prenota', 'consulto-evolutivo')}
                    className="px-space-md min-h-[44px] rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
                  >
                    Approfondisci
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-space-md">
          <div className="rounded-xl p-space-md bg-surface-container/75 backdrop-blur-md shadow-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
              <div className="flex items-center gap-space-sm">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    self_improvement
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-[15px] text-on-surface">
                    Accoglienza Studio Rogani
                  </span>
                  <span className="font-label-sm text-[11px] text-primary">
                    Orientamento &amp; Spunti Simbolici
                  </span>
                </div>
              </div>
              <a
                href={CONTACT_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  chat
                </span>
                WhatsApp
              </a>
            </div>

            <div className="flex flex-col gap-space-sm max-h-[340px] overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-space-sm rounded-xl max-w-[88%] flex flex-col gap-1 ${
                    msg.sender === 'user'
                      ? 'self-end bg-primary-container text-on-primary'
                      : 'self-start bg-surface-container-lowest/85 text-on-surface'
                  }`}
                >
                  <p className="font-body-md text-body-md leading-relaxed">
                    {msg.text}
                  </p>
                  {msg.drawnCards && msg.drawnCards.length > 0 && (
                    <div className="mt-1 p-2 rounded-lg bg-surface-container/90 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        {msg.drawnCards[0].symbolIcon}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-primary">
                          Arcano {msg.drawnCards[0].number} •{' '}
                          {msg.drawnCards[0].name}
                        </span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">
                          {msg.drawnCards[0].archetype}
                        </span>
                      </div>
                    </div>
                  )}
                  <span
                    className={`font-label-sm text-[10px] self-end ${
                      msg.sender === 'user'
                        ? 'text-on-primary/70'
                        : 'text-outline'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex items-center gap-space-xs pt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Scrivi un pensiero o una domanda..."
                className="flex-1 rounded-full bg-surface-container-lowest/90 border border-outline-variant/40 px-4 py-2.5 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Invia messaggio"
                className="w-11 h-11 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>
              </button>
            </form>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('prenota', 'consulto-evolutivo')}
            className="w-full min-h-[48px] rounded-lg bg-surface-container-high/70 text-on-surface font-title-md text-title-md font-medium flex items-center justify-center gap-space-xs hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">
              calendar_month
            </span>
            Prenota una Sessione Completa (60 min)
          </button>
        </div>
      )}
    </div>
  );
};
