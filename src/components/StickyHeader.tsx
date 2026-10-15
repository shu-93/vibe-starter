import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Newspaper, ArrowUp } from 'lucide-react';
import { NAV_SECTIONS } from '../data/newsData';

interface StickyHeaderProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenSubscribe: () => void;
  savedCount: number;
  onLogoClick: () => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  activeSection,
  onSelectSection,
  onOpenSearch,
  onOpenSaved,
  onOpenSubscribe,
  savedCount,
  onLogoClick
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after scrolling past 200px
      if (window.scrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-ink-black shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Left: Mini Masthead */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLogoClick}
            className="font-masthead-gothic text-xl sm:text-2xl text-ink-black tracking-normal select-none hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            The New York Times
          </button>
          <span className="text-border-hairline hidden md:inline">|</span>
          <span className="font-serif font-bold text-xs uppercase tracking-widest text-opinion-crimson hidden md:inline">
            {activeSection}
          </span>
        </div>

        {/* Center: Quick navigation links */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-medium text-ink-muted">
          {NAV_SECTIONS.slice(0, 7).map((sec) => (
            <button
              key={sec}
              onClick={() => onSelectSection(sec)}
              className={`hover:text-ink-black transition-colors ${
                activeSection === sec ? 'font-bold text-ink-black underline decoration-2 underline-offset-4' : ''
              }`}
            >
              {sec}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-ink-charcoal hover:text-ink-black hover:bg-slate-100 transition-colors"
            title="Search articles"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSaved}
            className="p-1.5 text-ink-charcoal hover:text-ink-black hover:bg-slate-100 transition-colors relative"
            title="Reading List"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-nyt-blue text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSubscribe}
            className="bg-nyt-blue hover:bg-[#255070] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 transition-colors"
          >
            Subscribe
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-1.5 border border-border-hairline hover:border-ink-black text-ink-subtle hover:text-ink-black text-xs"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
