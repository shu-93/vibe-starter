import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticleIds: string[];
  onSelectArticle: (article: Article) => void;
  onRemoveSaved: (articleId: string) => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticleIds,
  onSelectArticle,
  onRemoveSaved
}) => {
  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter((a) => savedArticleIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col font-sans border-l-2 border-ink-black animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-border-hairline flex items-center justify-between bg-paper-tint">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 fill-ink-black" />
            <h3 className="font-serif font-bold text-lg text-ink-black">
              Reading List ({savedArticles.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5 text-ink-black" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border-hairline p-4">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-ink-subtle">
              <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="font-serif text-sm">Your reading list is empty.</p>
              <p className="text-xs mt-1">Bookmark any article with the ribbon icon to read later.</p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div key={article.id} className="py-4 first:pt-0">
                <div className="flex items-center justify-between text-[11px] text-ink-subtle uppercase mb-1">
                  <span className="font-bold text-opinion-crimson">{article.section}</span>
                  <span>{article.readTime}</span>
                </div>
                <h4
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="font-serif font-bold text-base text-ink-black hover:text-nyt-blue cursor-pointer leading-snug mb-1"
                >
                  {article.title}
                </h4>
                <p className="font-serif text-xs text-ink-muted line-clamp-2 mb-2">
                  {article.deck}
                </p>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-ink-subtle">{article.byline}</span>
                  <button
                    onClick={() => onRemoveSaved(article.id)}
                    className="text-xs text-ink-subtle hover:text-opinion-crimson flex items-center gap-1"
                    title="Remove from Reading List"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-hairline bg-paper-tint text-center text-xs text-ink-subtle">
          <span>Synced across your devices on your New York Times account.</span>
        </div>
      </div>
    </div>
  );
};
