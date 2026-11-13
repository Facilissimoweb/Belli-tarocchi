import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthModal } from "./components/AuthModal";
import { CookieBanner } from "./components/CookieBanner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StitchLayout } from "./components/StitchLayout";
import { useStitchContactCtx, useStitchNavigate, useStitchServiceId } from "./components/StitchPageBridge";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ConsentProvider } from "./context/ConsentContext";
import { LanguageProvider } from "./context/LanguageContext";
import { PercorsiProvider } from "./context/PercorsiContext";
import { shopLive } from "./lib/launchFlags";
import { useSiteAccess } from "./lib/useSiteAccess";
import { ComingSoon } from "./components/ComingSoon";
import type { BookingRecord, ClientProfile, JournalEntry, OrderRecord } from "./types";
import { BlogPage } from "./pages/stitch/BlogPage";
import { ChiSonoPage } from "./pages/stitch/ChiSonoPage";
import { ConsultiPage } from "./pages/stitch/ConsultiPage";
import { ContattiPage } from "./pages/stitch/ContattiPage";
import { HomePage } from "./pages/stitch/HomePage";
import { PercorsiPage } from "./pages/stitch/PercorsiPage";
import { PrenotaPage } from "./pages/stitch/PrenotaPage";
import { ShopPage } from "./pages/stitch/ShopPage";
import { TarocchiChatPage } from "./pages/stitch/TarocchiChatPage";

const AccessibilityPanel = lazy(() =>
  import("./components/AccessibilityWidget").then((m) => ({ default: m.AccessibilityPanel })),
);
const PercorsiModal = lazy(() =>
  import("./components/PercorsiModal").then((m) => ({ default: m.PercorsiModal })),
);
const TarotChat = lazy(() =>
  import("./components/TarotChat").then((m) => ({ default: m.TarotChat })),
);
const UtilityCapsule = lazy(() =>
  import("./components/UtilityCapsule").then((m) => ({ default: m.UtilityCapsule })),
);

const Login = lazy(() => import("./pages/Login").then((m) => ({ default: m.Login })));
const Admin = lazy(() => import("./pages/Admin").then((m) => ({ default: m.Admin })));
const Carrello = lazy(() => import("./pages/Carrello").then((m) => ({ default: m.Carrello })));
const Privacy = lazy(() => import("./pages/Privacy").then((m) => ({ default: m.Privacy })));
const Disclaimer = lazy(() => import("./pages/Disclaimer").then((m) => ({ default: m.Disclaimer })));
const TerminiDiServizio = lazy(() =>
  import("./pages/TerminiDiServizio").then((m) => ({ default: m.TerminiDiServizio })),
);
const NonTrovata = lazy(() => import("./pages/NonTrovata").then((m) => ({ default: m.NonTrovata })));
const ProductionConsulti = lazy(() =>
  import("./pages/Consulti").then((m) => ({ default: m.Consulti })),
);
const ProductionRiservata = lazy(() =>
  import("./pages/Riservata").then((m) => ({ default: m.Riservata })),
);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6 text-sm text-on-surface-variant" aria-hidden>
      …
    </div>
  );
}

function StitchHome() {
  const onNavigate = useStitchNavigate();
  return <HomePage onNavigate={onNavigate} />;
}
function StitchChiSono() {
  const onNavigate = useStitchNavigate();
  return <ChiSonoPage onNavigate={onNavigate} />;
}
function StitchConsulti() {
  const onNavigate = useStitchNavigate();
  return <ConsultiPage onNavigate={onNavigate} />;
}
function StitchPercorsi() {
  const onNavigate = useStitchNavigate();
  const initialPathwayId = useStitchServiceId();
  return <PercorsiPage initialPathwayId={initialPathwayId} onNavigate={onNavigate} />;
}
function StitchBlog() {
  const onNavigate = useStitchNavigate();
  return <BlogPage onNavigate={onNavigate} />;
}
function StitchContatti() {
  const { activeChannel, setActiveChannel } = useStitchContactCtx();
  return (
    <ContattiPage highlightedChannel={activeChannel} onSelectChannel={setActiveChannel} />
  );
}
function StitchShop() {
  const onNavigate = useStitchNavigate();
  const [orders, setOrders] = useState(() => readStorage<OrderRecord[]>("ti_orders", []));
  useEffect(() => {
    localStorage.setItem("ti_orders", JSON.stringify(orders));
  }, [orders]);
  return (
    <ShopPage
      onCreateOrder={(order) => setOrders((prev) => [order, ...prev])}
      onNavigate={onNavigate}
    />
  );
}
function StitchTarocchiChat() {
  const onNavigate = useStitchNavigate();
  const [journal, setJournal] = useState(() => readStorage<JournalEntry[]>("ti_journal", []));
  useEffect(() => {
    localStorage.setItem("ti_journal", JSON.stringify(journal));
  }, [journal]);
  return (
    <TarocchiChatPage
      onSaveJournal={(entry) => setJournal((prev) => [entry, ...prev])}
      onNavigate={onNavigate}
    />
  );
}
function StitchPrenota() {
  const onNavigate = useStitchNavigate();
  const navigate = useNavigate();
  const initialServiceId = useStitchServiceId();
  const { session } = useAuth();
  const [bookings, setBookings] = useState(() => readStorage<BookingRecord[]>("ti_bookings", []));
  const [localProfile, setLocalProfile] = useState<ClientProfile>(() =>
    readStorage<ClientProfile>("ti_profile", {
      name: "",
      email: "",
      phone: "",
      isSignedIn: false,
    }),
  );

  useEffect(() => {
    localStorage.setItem("ti_bookings", JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    localStorage.setItem("ti_profile", JSON.stringify(localProfile));
  }, [localProfile]);

  // Preferisci il calendario/pagamento reale quando l'utente è autenticato.
  if (session) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <ProductionConsulti />
      </Suspense>
    );
  }

  return (
    <PrenotaPage
      initialServiceId={initialServiceId}
      profile={localProfile}
      onCreateBooking={(booking) => {
        setBookings((prev) => [booking, ...prev]);
        setLocalProfile({
          name: booking.clientName,
          email: booking.clientEmail,
          phone: booking.clientPhone,
          isSignedIn: true,
        });
        navigate("/login");
      }}
      onNavigate={onNavigate}
    />
  );
}
function StitchAreaRiservata() {
  // Area riservata reale (Supabase)
  return (
    <ProtectedRoute>
      <Suspense fallback={<RouteFallback />}>
        <ProductionRiservata />
      </Suspense>
    </ProtectedRoute>
  );
}

export default function App() {
  const unlocked = useSiteAccess();
  if (!unlocked) return <ComingSoon />;

  return (
    <AuthProvider>
      <ConsentProvider>
        <PercorsiProvider>
          <LanguageProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<StitchLayout />}>
                  <Route index element={<StitchHome />} />
                  <Route path="/chi-sono" element={<StitchChiSono />} />
                  <Route path="/consulti" element={<StitchConsulti />} />
                  <Route path="/percorsi" element={<StitchPercorsi />} />
                  <Route path="/prenota" element={<StitchPrenota />} />
                  <Route path="/tarocchi-chat" element={<StitchTarocchiChat />} />
                  <Route
                    path="/shop"
                    element={shopLive() ? <StitchShop /> : <Navigate to="/" replace />}
                  />
                  <Route path="/blog" element={<StitchBlog />} />
                  <Route path="/contatti" element={<StitchContatti />} />
                  <Route path="/riservata" element={<StitchAreaRiservata />} />
                  <Route
                    path="/carrello"
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <Carrello />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <Login />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <Admin />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <Privacy />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/disclaimer"
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <Disclaimer />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/termini-di-servizio"
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <TerminiDiServizio />
                      </Suspense>
                    }
                  />
                  <Route path="/termini" element={<Navigate to="/termini-di-servizio" replace />} />
                  <Route path="/rituali" element={<Navigate to="/percorsi" replace />} />
                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<RouteFallback />}>
                        <NonTrovata />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
              <CookieBanner />
              <AuthModal />
              <Suspense fallback={null}>
                <PercorsiModal />
                <UtilityCapsule />
                <TarotChat />
                <AccessibilityPanel />
              </Suspense>
            </BrowserRouter>
          </LanguageProvider>
        </PercorsiProvider>
      </ConsentProvider>
    </AuthProvider>
  );
}
