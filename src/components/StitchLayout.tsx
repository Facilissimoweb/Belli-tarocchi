import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mailtoHref } from "../lib/mailto";
import { getPhoneHref, telegramHref, whatsappChatHref } from "../lib/whatsapp";
import type { ContactChannel, RoutePath } from "../types";
import { Footer } from "./Footer";
import { BottomNav as StitchBottomNav } from "./StitchBottomNav";
import { Drawer as StitchDrawer } from "./StitchDrawer";
import { Header as StitchHeader } from "./StitchHeader";

const PATH_TO_ROUTE: Record<string, RoutePath> = {
  "/": "home",
  "/chi-sono": "chi-sono",
  "/consulti": "consulti",
  "/percorsi": "percorsi",
  "/tarocchi-chat": "tarocchi-chat",
  "/shop": "shop",
  "/blog": "blog",
  "/riservata": "area-riservata",
  "/login": "area-riservata",
  "/contatti": "contatti",
  "/prenota": "prenota",
};

const ROUTE_TO_PATH: Record<RoutePath, string> = {
  home: "/",
  "chi-sono": "/chi-sono",
  consulti: "/consulti",
  percorsi: "/percorsi",
  "tarocchi-chat": "/tarocchi-chat",
  shop: "/shop",
  blog: "/blog",
  "area-riservata": "/riservata",
  contatti: "/contatti",
  prenota: "/prenota",
};

export function StitchLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { session } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState<ContactChannel | null>(null);

  const currentPath = useMemo<RoutePath>(() => {
    if (PATH_TO_ROUTE[pathname]) return PATH_TO_ROUTE[pathname];
    if (pathname.startsWith("/arcani")) return "tarocchi-chat";
    if (pathname.startsWith("/carrello")) return "shop";
    return "home";
  }, [pathname]);

  const handleNavigate = (path: RoutePath, serviceId?: string) => {
    const target = ROUTE_TO_PATH[path] ?? "/";
    if (serviceId) {
      navigate(`${target}?servizio=${encodeURIComponent(serviceId)}`);
    } else {
      navigate(target);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectChannel = (channel: ContactChannel) => {
    setActiveChannel(channel);
    const href =
      channel === "whatsapp"
        ? whatsappChatHref()
        : channel === "telegram"
          ? telegramHref()
          : channel === "telefono"
            ? getPhoneHref()
            : mailtoHref();
    if (href) {
      if (channel === "email" || channel === "telefono") {
        window.location.assign(href);
      } else {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    } else {
      navigate("/contatti");
    }
  };

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-on-primary min-h-screen flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_15%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />

      <StitchHeader
        onNavigate={handleNavigate}
        onOpenDrawer={() => setDrawerOpen(true)}
        isSignedIn={Boolean(session)}
      />

      <StitchDrawer
        isOpen={drawerOpen}
        currentPath={currentPath}
        onClose={() => setDrawerOpen(false)}
        onNavigate={handleNavigate}
      />

      <main className="flex flex-col relative w-full pt-16 bg-surface flex-1">
        <div className="max-w-md mx-auto w-full pb-space-xl">
          <Outlet context={{ onNavigate: handleNavigate, activeChannel, setActiveChannel }} />
        </div>
      </main>

      <Footer />
      <StitchBottomNav activeChannel={activeChannel} onSelectChannel={handleSelectChannel} />
    </div>
  );
}
