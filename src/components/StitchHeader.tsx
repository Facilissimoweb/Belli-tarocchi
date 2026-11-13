import React from 'react';
import type { RoutePath } from '../types';

interface HeaderProps {
  onNavigate: (path: RoutePath) => void;
  onOpenDrawer: () => void;
  isSignedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenDrawer,
  isSignedIn,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[rgba(26,22,21,0.85)] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      <div className="pt-safe">
        <div className="h-16 px-margin-mobile max-w-md mx-auto w-full flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-space-sm text-left focus:outline-none active:scale-[0.99] transition-transform"
          >
            <img
              alt="Tarot Italia Emblem Logo"
              className="h-8 w-auto object-contain"
              src="/logo.png"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-wide leading-none">
                Tarot Italia
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                M.T. Rogani
              </span>
            </div>
          </button>

          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              aria-label="Area Riservata"
              onClick={() => onNavigate('area-riservata')}
              className="relative w-9 h-9 rounded-full bg-primary flex items-center justify-center transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
              {isSignedIn && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary-fixed ring-2 ring-surface" />
              )}
            </button>
            <button
              type="button"
              aria-label="Menu di navigazione"
              onClick={onOpenDrawer}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-primary hover:text-primary-fixed-dim active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[26px]">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
