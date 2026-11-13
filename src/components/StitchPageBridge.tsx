import type { ReactNode } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import type { RoutePath } from "../types";

type OutletCtx = {
  onNavigate: (path: RoutePath, serviceId?: string) => void;
  activeChannel: import("../types").ContactChannel | null;
  setActiveChannel: (channel: import("../types").ContactChannel | null) => void;
};

export function useStitchNavigate() {
  const ctx = useOutletContext<OutletCtx | undefined>();
  const navigate = useNavigate();
  if (ctx?.onNavigate) return ctx.onNavigate;
  return (path: RoutePath, serviceId?: string) => {
    const map: Record<RoutePath, string> = {
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
    const target = map[path] ?? "/";
    navigate(serviceId ? `${target}?servizio=${encodeURIComponent(serviceId)}` : target);
  };
}

export function useStitchServiceId() {
  const [params] = useSearchParams();
  return params.get("servizio") ?? undefined;
}

export function useStitchContactCtx() {
  return useOutletContext<OutletCtx>();
}

export function StitchPage({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
