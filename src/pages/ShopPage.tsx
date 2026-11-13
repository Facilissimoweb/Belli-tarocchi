import React, { useState } from 'react';
import { SHOP_PRODUCTS } from '../data/tarotData';
import { OrderItem, OrderRecord, RoutePath, ShopProduct } from '../types';

interface ShopPageProps {
  onCreateOrder: (order: OrderRecord) => void;
  onNavigate: (path: RoutePath) => void;
}

const CATEGORIES = [
  'Tutti',
  'Mazzi & Diari',
  'Cristalli & Rituali',
  'Buoni Regalo',
] as const;

export const ShopPage: React.FC<ShopPageProps> = ({
  onCreateOrder,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>('Tutti');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(
    null
  );

  const filteredProducts =
    selectedCategory === 'Tutti'
      ? SHOP_PRODUCTS
      : SHOP_PRODUCTS.filter((p) => p.category === selectedCategory);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const addToCart = (product: ShopProduct) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const order: OrderRecord = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('it-IT'),
      items: cart.map((i) => ({
        title: i.product.title,
        quantity: i.quantity,
        price: i.product.price,
      })),
      total: totalAmount,
      status: 'Richiesta Registrata',
    };
    onCreateOrder(order);
    setConfirmedOrder(order);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-lg pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            shopping_bag
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Bottega Olistica
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Strumenti per il Tuo Spazio Sacro
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Mazzi, diari riflessivi, cristalli naturali e buoni dono curati personalmente da Maria Teresa Rogani.
        </p>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-space-md py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container-high/80 text-on-surface'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {confirmedOrder && (
        <div className="rounded-xl p-space-lg bg-surface-container/85 backdrop-blur-md border border-primary/30 flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[24px]">
              verified
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase">
                Ordine {confirmedOrder.id}
              </span>
              <h2 className="font-title-md text-title-md text-on-surface">
                Ordine Salvato nell&apos;Area Riservata
              </h2>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Totale: <strong className="text-primary">€ {confirmedOrder.total}</strong>. Riceverai le istruzioni di spedizione o ritiro in studio.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('area-riservata')}
            className="self-start font-label-md text-label-md text-primary flex items-center gap-1"
          >
            Vedi nei miei ordini
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </button>
        </div>
      )}

      {/* Cart Summary Banner */}
      {totalItems > 0 && (
        <div className="rounded-xl p-space-md bg-surface-container-high/90 backdrop-blur-md flex items-center justify-between shadow-lg border border-primary/25">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[22px]">
              shopping_bag
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface">
                {totalItems} {totalItems === 1 ? 'articolo' : 'articoli'} nel carrello
              </span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                Totale € {totalAmount}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowCart((v) => !v)}
            className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold"
          >
            {showCart ? 'Chiudi' : 'Rivedi Carrello'}
          </button>
        </div>
      )}

      {showCart && cart.length > 0 && (
        <section className="rounded-xl p-space-lg bg-surface-container/90 backdrop-blur-md shadow-xl flex flex-col gap-space-md border border-primary/20">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Il Tuo Carrello
          </h2>
          <div className="flex flex-col gap-space-sm">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest/80"
              >
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    {product.title}
                  </span>
                  <span className="font-label-sm text-label-sm text-primary">
                    € {product.price} × {quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-label-md text-on-surface w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(212,175,55,0.28)]"
          >
            Conferma Ordine • € {totalAmount}
          </button>
        </section>
      )}

      {/* Product Grid */}
      <div className="flex flex-col gap-space-md">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col"
          >
            <div className="relative w-full h-36 bg-surface-container-low">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-primary">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-space-lg flex flex-col gap-space-sm -mt-2 relative">
              <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                {product.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
              <span className="font-label-sm text-[11px] text-outline">
                {product.details}
              </span>
              <div className="pt-space-xs flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                  € {product.price}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    add_shopping_cart
                  </span>
                  Aggiungi
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
