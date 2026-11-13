export type RoutePath =
  | 'home'
  | 'chi-sono'
  | 'consulti'
  | 'percorsi'
  | 'tarocchi-chat'
  | 'shop'
  | 'blog'
  | 'area-riservata'
  | 'contatti'
  | 'prenota';

export type ContactChannel = 'whatsapp' | 'telegram' | 'telefono' | 'email';

export interface ConsultationService {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  modality: string;
  price: number;
  badge?: string;
  badgeVariant?: 'primary' | 'tertiary';
  image: string;
  imageAlt: string;
  description: string;
  highlights: string[];
  kind: 'consulto' | 'percorso';
  modules?: string[];
}

export interface ArcanaCard {
  number: string;
  name: string;
  archetype: string;
  keywords: string[];
  meaning: string;
  reflectionQuestion: string;
  symbolIcon: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  category: 'Mazzi & Diari' | 'Cristalli & Rituali' | 'Buoni Regalo';
  price: number;
  image: string;
  description: string;
  details: string;
  inStock: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
  meditationPrompt: string;
}

export interface BookingRecord {
  id: string;
  serviceId: string;
  serviceTitle: string;
  price: number;
  modality: 'Online (Videochiamata)' | 'Studio (In Presenza)';
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  intention: string;
  status: 'Confermato' | 'Annullato';
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  cards: ArcanaCard[];
  question: string;
  note: string;
}

export interface OrderItem {
  product: ShopProduct;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  date: string;
  items: { title: string; quantity: number; price: number }[];
  total: number;
  status: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'guide';
  text: string;
  timestamp: string;
  drawnCards?: ArcanaCard[];
}

export interface ClientProfile {
  name: string;
  email: string;
  phone: string;
  isSignedIn: boolean;
}
