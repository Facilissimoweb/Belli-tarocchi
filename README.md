# Tarot Italia (Belli-tarocchi)

Repository pulito di produzione: UI dark glass + logica operativa (Supabase Auth, prenotazioni, Stripe/carrello, chat, API Vercel).

## Stack

- React 19 + Vite + Tailwind CSS v4
- React Router
- Supabase Auth
- API routes in `/api` (Vercel)

## Avvio locale

```bash
npm install
cp .env.example .env.local
# compila le variabili VITE_* / server
npm run dev
```

## Note migrazione

- Pagine e componenti di produzione sono in `src/pages` e `src/components`.
- Il template Stitch/AI Studio è conservato in `src/pages/stitch`, `src/components/stitch`, `src/App.stitch.tsx` come riferimento UI.
- I testi pubblici restano in `src/data/siteContent.ts`.

## Deploy

Collega questo repo a Vercel e configura gli stessi secret del progetto precedente (vedi `.env.example`).
