import React from 'react';
import { LOGO_URL } from '../data/tarotData';
import { RoutePath } from '../types';

interface DrawerProps {
  isOpen: boolean;
  currentPath: RoutePath;
  onClose: () => void;
  onNavigate: (path: RoutePath) => void;
}

const NAV_ITEMS: { path: RoutePath; label: string; icon: string }[] = [
  { path: 'home', label: 'Home', icon: 'auto_awesome' },
  { path: 'chi-sono', label: 'Chi Sono', icon: 'self_improvement' },
  { path: 'consulti', label: 'Consulti', icon: 'visibility' },
  { path: 'percorsi', label: 'Percorsi', icon: 'explore' },
  { path: 'tarocchi-chat', label: 'Tarocchi (Chat)', icon: 'forum' },
  { path: 'shop', label: 'Shop', icon: 'shopping_bag' },
  { path: 'blog', label: 'Blog', icon: 'menu_book' },
  { path: 'area-riservata', label: 'Area Riservata', icon: 'lock_open' },
  { path: 'contatti', label: 'Contatti', icon: 'contact_mail' },
];

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  currentPath,
  onClose,
  onNavigate,
}) => {
  const handleSelect = (path: RoutePath) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>
      <div
        id="drawer-backdrop"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        id="esoteric-drawer"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-[84%] max-w-sm bg-[rgba(32,28,26,0.96)] backdrop-blur-2xl shadow-[-10px_0_30px_rgba(0,0,0,0.8)] transform transition-transform duration-300 ease-out flex flex-col pt-safe pb-safe ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-space-lg flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <img
              alt="Tarot Italia Emblem Logo"
              className="h-7 w-auto object-contain"
              src={LOGO_URL}
            />
            <span className="font-headline-sm text-headline-sm text-primary">
              Tarot Italia
            </span>
          </div>
          <button
            type="button"
            aria-label="Chiudi menu"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/40 to-transparent" />

        <nav className="flex-1 overflow-y-auto px-space-md py-space-lg flex flex-col gap-space-xs">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleSelect(item.path)}
                className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-title-md text-title-md transition-colors text-left w-full ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface hover:bg-surface-variant/40 hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-primary text-[20px]">
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-space-lg bg-surface-container-lowest/60">
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center">
            Tarot Italia • Maria Teresa Rogani
          </p>
        </div>
      </aside>
    </>
  );
};
