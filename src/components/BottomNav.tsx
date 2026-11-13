import React from 'react';
import { ContactChannel } from '../types';

interface BottomNavProps {
  activeChannel: ContactChannel | null;
  onSelectChannel: (channel: ContactChannel) => void;
}

const CHANNELS: { id: ContactChannel; label: string; icon: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp', icon: 'chat' },
  { id: 'telegram', label: 'Telegram', icon: 'send' },
  { id: 'telefono', label: 'Telefono', icon: 'call' },
  { id: 'email', label: 'Email', icon: 'mail' },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeChannel,
  onSelectChannel,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe px-margin-mobile pointer-events-none">
      <div className="pointer-events-auto max-w-sm mx-auto mb-space-sm rounded-full bg-[rgba(26,22,21,0.85)] backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.65)] p-1.5 flex items-center justify-between gap-1">
        {CHANNELS.map((ch) => {
          const isActive = activeChannel === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              aria-label={ch.label}
              onClick={() => onSelectChannel(ch.id)}
              className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-primary bg-primary/10 shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {ch.icon}
              </span>
              <span className="font-label-sm text-[10px] tracking-tight">
                {ch.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
