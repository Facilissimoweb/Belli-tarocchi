import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/tarotData';
import { BlogArticle, RoutePath } from '../types';

interface BlogPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(
    null
  );

  if (selectedArticle) {
    return (
      <div className="flex flex-col w-full px-margin-mobile gap-space-lg pt-space-md">
        <button
          type="button"
          onClick={() => setSelectedArticle(null)}
          className="self-start inline-flex items-center gap-1 font-label-md text-label-md text-primary"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Torna agli articoli
        </button>

        <article className="rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-xl flex flex-col">
          <div className="relative w-full h-44 bg-surface-container-low">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${selectedArticle.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/35 to-transparent" />
          </div>

          <div className="p-space-lg flex flex-col gap-space-md -mt-2 relative">
            <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-primary uppercase tracking-wider">
              <span>{selectedArticle.category}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h1 className="font-headline-sm text-headline-sm text-on-surface">
              {selectedArticle.title}
            </h1>
            <span className="font-label-sm text-label-sm text-outline">
              {selectedArticle.date} • Maria Teresa Rogani
            </span>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/30 to-transparent" />

            <div className="flex flex-col gap-space-sm">
              {selectedArticle.content.map((para, idx) => (
                <p
                  key={idx}
                  className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="p-space-md rounded-lg bg-surface-container-lowest/80 flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                Spunto di Meditazione
              </span>
              <p className="font-body-md text-body-md text-on-surface italic">
                “{selectedArticle.meditationPrompt}”
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('prenota')}
              className="w-full min-h-[48px] rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold flex items-center justify-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[20px]">
                calendar_month
              </span>
              Prenota un Consulto Evolutivo
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-margin-mobile gap-space-xl pt-space-md">
      <div className="flex flex-col items-center text-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">
            menu_book
          </span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Diario Simbolico
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal">
          Riflessioni sugli Arcani
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
          Approfondimenti su tarologia evolutiva, archetipi e pratiche quotidiane di consapevolezza.
        </p>
      </div>

      <div className="flex flex-col gap-space-md">
        {BLOG_ARTICLES.map((article) => (
          <article
            key={article.id}
            className="rounded-xl overflow-hidden bg-surface-container/75 backdrop-blur-md shadow-md flex flex-col"
          >
            <div className="relative w-full h-36 bg-surface-container-low">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${article.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-primary">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-space-lg flex flex-col gap-space-sm -mt-2 relative">
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                {article.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                {article.excerpt}
              </p>
              <button
                type="button"
                onClick={() => setSelectedArticle(article)}
                className="self-start pt-1 font-label-md text-label-md text-primary flex items-center gap-1"
              >
                Leggi articolo
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
