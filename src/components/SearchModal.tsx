import React from 'react';
import { X, Search, Clock, ArrowRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  query,
  setQuery,
  onSelectArticle
}) => {
  if (!isOpen) return null;

  const results = ARTICLES.filter((article) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.deck.toLowerCase().includes(q) ||
      article.byline.toLowerCase().includes(q) ||
      article.section.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-16 px-4">
      <div className="bg-white border-2 border-ink-black max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col font-sans">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-border-strong flex items-center gap-3 bg-paper-tint">
          <Search className="w-5 h-5 text-ink-subtle shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, reporters..."
            className="w-full text-base font-sans bg-transparent focus:outline-none placeholder:text-ink-subtle placeholder:italic text-ink-black"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase font-bold text-ink-subtle hover:text-ink-black"
            >
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5 text-ink-black" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-border-hairline">
          {!query.trim() ? (
            <div className="py-8 text-center text-ink-subtle">
              <p className="font-serif text-sm">Type any topic (e.g., “Trump”, “Ukraine”, “AI”, “Senate”, “Dodgers”)</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['White House', 'Ukraine', 'A.I. Agents', 'Texas Senate', 'Brewers'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-2.5 py-1 text-xs border border-border-hairline hover:border-ink-black bg-paper-tint"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-ink-subtle">
              <p className="font-serif text-sm">No results found for “{query}”.</p>
              <p className="text-xs mt-1">Try another search term or check spelling.</p>
            </div>
          ) : (
            results.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="py-3 hover:bg-paper-tint cursor-pointer transition-colors px-2 group"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-opinion-crimson mb-1">
                  <span>{article.section}</span>
                  <span className="text-ink-subtle">•</span>
                  <span className="text-ink-subtle">{article.readTime}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-ink-black group-hover:text-nyt-blue leading-snug">
                  {article.title}
                </h4>
                <p className="font-serif text-xs text-ink-charcoal line-clamp-2 mt-1">
                  {article.deck}
                </p>
                <div className="text-[11px] text-ink-subtle mt-1.5 flex items-center justify-between">
                  <span>{article.byline}</span>
                  <span className="group-hover:translate-x-1 transition-transform text-nyt-blue font-bold flex items-center gap-0.5">
                    Read article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-border-hairline bg-paper-tint flex items-center justify-between text-xs text-ink-subtle">
          <span>{results.length} result{results.length === 1 ? '' : 's'}</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
