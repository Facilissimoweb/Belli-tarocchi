import { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { Drawer } from './components/Drawer';
import { Header } from './components/Header';
import { AreaRiservataPage } from './pages/AreaRiservataPage';
import { BlogPage } from './pages/BlogPage';
import { ChiSonoPage } from './pages/ChiSonoPage';
import { ConsultiPage } from './pages/ConsultiPage';
import { ContattiPage } from './pages/ContattiPage';
import { HomePage } from './pages/HomePage';
import { PercorsiPage } from './pages/PercorsiPage';
import { PrenotaPage } from './pages/PrenotaPage';
import { ShopPage } from './pages/ShopPage';
import { TarocchiChatPage } from './pages/TarocchiChatPage';
import {
  BookingRecord,
  ClientProfile,
  ContactChannel,
  JournalEntry,
  OrderRecord,
  RoutePath,
} from './types';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<
    string | undefined
  >(undefined);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<ContactChannel | null>(
    null
  );

  const [profile, setProfile] = useState<ClientProfile>(() =>
    readStorage<ClientProfile>('ti_profile', {
      name: '',
      email: '',
      phone: '',
      isSignedIn: false,
    })
  );

  const [bookings, setBookings] = useState<BookingRecord[]>(() =>
    readStorage<BookingRecord[]>('ti_bookings', [])
  );

  const [journal, setJournal] = useState<JournalEntry[]>(() =>
    readStorage<JournalEntry[]>('ti_journal', [])
  );

  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readStorage<OrderRecord[]>('ti_orders', [])
  );

  useEffect(() => {
    try {
      localStorage.setItem('ti_profile', JSON.stringify(profile));
    } catch {
      // ignore storage quota errors
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('ti_bookings', JSON.stringify(bookings));
    } catch {
      // ignore storage quota errors
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('ti_journal', JSON.stringify(journal));
    } catch {
      // ignore storage quota errors
    }
  }, [journal]);

  useEffect(() => {
    try {
      localStorage.setItem('ti_orders', JSON.stringify(orders));
    } catch {
      // ignore storage quota errors
    }
  }, [orders]);

  const handleNavigate = (path: RoutePath, serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPath(path);
    if (path !== 'contatti') {
      setActiveChannel(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBottomChannel = (channel: ContactChannel) => {
    setActiveChannel(channel);
    setCurrentPath('contatti');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateBooking = (booking: BookingRecord) => {
    setBookings((prev) => [booking, ...prev]);
    if (!profile.isSignedIn) {
      setProfile({
        name: booking.clientName,
        email: booking.clientEmail,
        phone: booking.clientPhone,
        isSignedIn: true,
      });
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'Annullato' } : b
      )
    );
  };

  const handleSaveJournal = (entry: JournalEntry) => {
    setJournal((prev) => [entry, ...prev]);
  };

  const handleDeleteJournal = (entryId: string) => {
    setJournal((prev) => prev.filter((j) => j.id !== entryId));
  };

  const handleCreateOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-on-primary min-h-screen flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_15%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />

      <Header
        onNavigate={(path) => handleNavigate(path)}
        onOpenDrawer={() => setDrawerOpen(true)}
        isSignedIn={profile.isSignedIn}
      />

      <Drawer
        isOpen={drawerOpen}
        currentPath={currentPath}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(path) => handleNavigate(path)}
      />

      <main className="flex flex-col relative w-full pt-16 pb-28 bg-surface flex-1">
        <div className="max-w-md mx-auto w-full">
          {currentPath === 'home' && (
            <HomePage onNavigate={handleNavigate} />
          )}
          {currentPath === 'chi-sono' && (
            <ChiSonoPage onNavigate={handleNavigate} />
          )}
          {currentPath === 'consulti' && (
            <ConsultiPage onNavigate={handleNavigate} />
          )}
          {currentPath === 'percorsi' && (
            <PercorsiPage
              initialPathwayId={selectedServiceId}
              onNavigate={handleNavigate}
            />
          )}
          {currentPath === 'prenota' && (
            <PrenotaPage
              initialServiceId={selectedServiceId}
              profile={profile}
              onCreateBooking={handleCreateBooking}
              onNavigate={handleNavigate}
            />
          )}
          {currentPath === 'tarocchi-chat' && (
            <TarocchiChatPage
              onSaveJournal={handleSaveJournal}
              onNavigate={handleNavigate}
            />
          )}
          {currentPath === 'shop' && (
            <ShopPage
              onCreateOrder={handleCreateOrder}
              onNavigate={handleNavigate}
            />
          )}
          {currentPath === 'blog' && (
            <BlogPage onNavigate={handleNavigate} />
          )}
          {currentPath === 'area-riservata' && (
            <AreaRiservataPage
              profile={profile}
              bookings={bookings}
              journal={journal}
              orders={orders}
              onSaveProfile={setProfile}
              onCancelBooking={handleCancelBooking}
              onDeleteJournal={handleDeleteJournal}
              onNavigate={handleNavigate}
            />
          )}
          {currentPath === 'contatti' && (
            <ContattiPage
              highlightedChannel={activeChannel}
              onSelectChannel={setActiveChannel}
            />
          )}
        </div>
      </main>

      <BottomNav
        activeChannel={activeChannel}
        onSelectChannel={handleSelectBottomChannel}
      />
    </div>
  );
}
