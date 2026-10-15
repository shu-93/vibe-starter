/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  User, 
  MessageSquare, 
  Newspaper, 
  TrendingUp, 
  CloudSun, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  BookOpen
} from 'lucide-react';
import { 
  ARTICLES, 
  Article, 
  EDITIONS, 
  NAV_SECTIONS 
} from './data/newsData';
import { ArticleReader } from './components/ArticleReader';
import { GamesModal } from './components/GamesModal';
import { PollsModal } from './components/PollsModal';
import { BriefingModal } from './components/BriefingModal';
import { SubscribeModal } from './components/SubscribeModal';
import { AccountModal } from './components/AccountModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { SearchModal } from './components/SearchModal';
import { StickyHeader } from './components/StickyHeader';
import { BreakingNewsBar } from './components/BreakingNewsBar';
import { MarketsWeatherPopover } from './components/MarketsWeatherPopover';

type PaperTheme = 'pure' | 'antique' | 'night';

export default function App() {
  // Navigation & Article state
  const [activeSection, setActiveSection] = useState<string>('U.S.');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentEdition, setCurrentEdition] = useState(EDITIONS[0]);
  const [paperTheme, setPaperTheme] = useState<PaperTheme>('pure');

  // Saved / Bookmarks state
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([
    'women-leaving-trump-admin',
    'ai-agents-dinner-party'
  ]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Modals state
  const [isGamesModalOpen, setIsGamesModalOpen] = useState(false);
  const [initialGame, setInitialGame] = useState<'wordle' | 'mini' | 'connections' | 'spelling-bee'>('wordle');
  const [isPollsModalOpen, setIsPollsModalOpen] = useState(false);
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMarketsPopoverOpen, setIsMarketsPopoverOpen] = useState(false);

  // User state
  const [userEmail, setUserEmail] = useState('shuqin_93@msn.com');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Wirecutter pick modal
  const [wirecutterToast, setWirecutterToast] = useState(false);

  const toggleSave = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const openArticleById = (id: string) => {
    const article = ARTICLES.find((a) => a.id === id);
    if (article) {
      setSelectedArticle(article);
    }
  };

  const handleOpenGame = (game: 'wordle' | 'mini' | 'connections' | 'spelling-bee') => {
    setInitialGame(game);
    setIsGamesModalOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchModalOpen(true);
  };

  // If viewing an article in detail, show ArticleReader
  if (selectedArticle) {
    return (
      <div className={paperTheme === 'night' ? 'bg-[#141516] text-[#e6e4df]' : paperTheme === 'antique' ? 'bg-[#fbf8f2] text-[#1c1917]' : 'bg-white text-ink-black'}>
        <ArticleReader
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          isSaved={savedArticleIds.includes(selectedArticle.id)}
          onToggleSave={toggleSave}
        />
      </div>
    );
  }

  // Filter articles based on activeSection if not 'U.S.' or front page
  const isSectionFiltered = activeSection !== 'U.S.';
  const filteredArticles = isSectionFiltered
    ? ARTICLES.filter(a => a.section.toLowerCase() === activeSection.toLowerCase() || a.subSection?.toLowerCase() === activeSection.toLowerCase())
    : ARTICLES;

  // Theme styling classes
  const themeContainerClass = paperTheme === 'night'
    ? 'bg-[#121314] text-[#e5e3de]'
    : paperTheme === 'antique'
    ? 'bg-[#fcf9f2] text-[#1a1816]'
    : 'bg-paper-pure text-ink-black';

  return (
    <div className={`min-h-screen flex flex-col font-body-standard antialiased transition-colors duration-200 ${themeContainerClass}`}>
      {/* ───────────────── STICKY HEADER ───────────────── */}
      <StickyHeader
        activeSection={activeSection}
        onSelectSection={(sec) => {
          if (sec === 'Games') setIsGamesModalOpen(true);
          else setActiveSection(sec);
        }}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenSubscribe={() => setIsSubscribeModalOpen(true)}
        savedCount={savedArticleIds.length}
        onLogoClick={() => {
          setActiveSection('U.S.');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* ───────────────── BREAKING NEWS DEVELOPING BAR ───────────────── */}
      <BreakingNewsBar onSelectStory={(id) => openArticleById(id)} />

      {/* ───────────────── HEADER ───────────────── */}
      <header className="w-full border-b border-border-hairline">
        <div className="max-w-7xl mx-auto px-margin">
          {/* Top Bar: Editions, Weather, Subscriptions & Theme Selector */}
          <div className="flex items-center justify-between py-space-xs border-b border-border-hairline text-ink-subtle">
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs">
                {EDITIONS.map((ed, idx) => (
                  <React.Fragment key={ed.id}>
                    <button
                      onClick={() => setCurrentEdition(ed)}
                      className={`font-label-meta text-label-meta uppercase tracking-wider transition-colors cursor-pointer ${
                        currentEdition.id === ed.id
                          ? 'text-ink-black font-bold'
                          : 'text-ink-subtle hover:text-ink-black'
                      }`}
                    >
                      {ed.label}
                    </button>
                    {idx < EDITIONS.length - 1 && <span className="text-border-hairline">|</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Weather & Markets Interactive Trigger */}
              <button
                onClick={() => setIsMarketsPopoverOpen(true)}
                className="hidden lg:flex items-center gap-space-sm pl-space-md border-l border-border-hairline font-label-meta text-label-meta hover:opacity-80 transition-opacity cursor-pointer"
                title="View full financial markets and weather forecast"
              >
                <span className="flex items-center gap-1">
                  <CloudSun className="w-3.5 h-3.5 text-ink-subtle" />
                  <span className="font-semibold text-ink-charcoal">{currentEdition.weather}</span>
                </span>
                <span className="text-border-hairline">•</span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-nyt-blue" />
                  <span className="font-semibold text-ink-charcoal">{currentEdition.market}</span>
                </span>
              </button>
            </div>

            <div className="flex items-center gap-space-sm">
              {/* Paper Theme Mode Selector */}
              <div className="hidden sm:flex items-center border border-border-hairline mr-1 text-[10px] font-sans">
                <button
                  onClick={() => setPaperTheme('pure')}
                  className={`px-2 py-0.5 uppercase tracking-wider ${
                    paperTheme === 'pure' ? 'bg-ink-black text-white font-bold' : 'hover:bg-slate-100 text-ink-subtle'
                  }`}
                  title="Pure White Newsprint"
                >
                  Paper
                </button>
                <button
                  onClick={() => setPaperTheme('antique')}
                  className={`px-2 py-0.5 uppercase tracking-wider ${
                    paperTheme === 'antique' ? 'bg-[#4a3b32] text-white font-bold' : 'hover:bg-slate-100 text-ink-subtle'
                  }`}
                  title="Warm Antique Broadsheet"
                >
                  Broadsheet
                </button>
                <button
                  onClick={() => setPaperTheme('night')}
                  className={`px-2 py-0.5 uppercase tracking-wider ${
                    paperTheme === 'night' ? 'bg-slate-800 text-white font-bold' : 'hover:bg-slate-100 text-ink-subtle'
                  }`}
                  title="Night Reading Ink"
                >
                  Night
                </button>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-label-meta text-label-meta uppercase tracking-wider text-ink-charcoal hover:text-nyt-blue mr-space-xs hidden md:inline-block cursor-pointer"
              >
                Today's Paper
              </button>

              {/* Reading List saved button */}
              <button
                onClick={() => setIsSavedDrawerOpen(true)}
                className="font-label-meta text-label-meta uppercase tracking-wider text-ink-charcoal hover:text-nyt-blue hidden sm:flex items-center gap-1 cursor-pointer"
                title="Reading List"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved ({savedArticleIds.length})</span>
              </button>

              {/* Subscribe button */}
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="bg-nyt-blue hover:bg-[#255070] text-on-primary font-label-meta text-label-meta uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer"
              >
                Subscribe for $1/week
              </button>

              {/* Log In / Account */}
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="border border-ink-black bg-transparent hover:bg-ink-black text-ink-black hover:text-on-primary font-label-meta text-label-meta uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer hidden md:inline-block"
              >
                {isLoggedIn ? 'Account' : 'Log In'}
              </button>

              {/* User Avatar */}
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-90"
                title={userEmail}
              >
                <span className="text-white text-xs font-bold font-sans">
                  {userEmail.charAt(0).toUpperCase()}
                </span>
              </button>
            </div>
          </div>

          {/* Middle Row: Date, Masthead, Search Bar */}
          <div className="py-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm">
            <div className="w-full md:w-1/4 text-left order-2 md:order-1 font-label-meta text-label-meta text-ink-charcoal">
              <span className="font-bold">Wednesday, October 14, 2026</span>
              <div className="text-ink-subtle text-[10px]">Today’s Front Page • Vol. CLXXV No. 60,672</div>
            </div>

            <div className="w-full md:w-2/4 text-center order-1 md:order-2">
              <button
                onClick={() => {
                  setActiveSection('U.S.');
                  setSelectedArticle(null);
                }}
                className="inline-block group cursor-pointer"
              >
                <h1 className="font-masthead-gothic text-4xl sm:text-5xl md:text-6xl text-ink-black tracking-normal select-none leading-none group-hover:opacity-90 transition-opacity">
                  The New York Times
                </h1>
              </button>
            </div>

            {/* Search Input Box */}
            <div className="w-full md:w-1/4 text-right order-3 hidden md:flex justify-end items-center gap-space-xs">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchModalOpen(true)}
                  placeholder="Search articles..."
                  className="font-caption text-caption border-b border-ink-black bg-transparent py-1 pl-2 pr-6 focus:outline-none focus:border-nyt-blue placeholder:italic placeholder:text-ink-subtle w-36 lg:w-44"
                />
                <button type="submit" className="absolute right-1 text-ink-subtle hover:text-ink-black cursor-pointer">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Double Rule & Category Navigation Bar */}
          <div className="pt-1 pb-1 border-t border-b-2 border-border-strong">
            <nav className="flex items-center justify-between overflow-x-auto no-scrollbar py-space-xxs gap-space-md text-center">
              {NAV_SECTIONS.map((sec) => {
                const isActive = activeSection === sec;
                return (
                  <button
                    key={sec}
                    onClick={() => {
                      if (sec === 'Games') {
                        setIsGamesModalOpen(true);
                      } else {
                        setActiveSection(sec);
                      }
                    }}
                    className={`whitespace-nowrap transition-colors cursor-pointer text-xs ${
                      isActive
                        ? 'font-bold text-ink-black border-b-2 border-ink-black -mb-[5px] pb-0.5'
                        : 'font-nav-link text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {sec}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* ───────────────── ACTIVE SECTION BANNER (If filtered) ───────────────── */}
      {isSectionFiltered && (
        <div className="bg-paper-tint border-b border-border-hairline py-3">
          <div className="max-w-7xl mx-auto px-margin flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-ink-black">
                {activeSection} Section
              </h2>
              <span className="text-xs text-ink-subtle">
                Showing {filteredArticles.length} featured stories
              </span>
            </div>
            <button
              onClick={() => setActiveSection('U.S.')}
              className="text-xs uppercase font-bold text-nyt-blue hover:underline cursor-pointer"
            >
              ← Back to Front Page
            </button>
          </div>
        </div>
      )}

      {/* ───────────────── MAIN BROADSHEET ───────────────── */}
      <main className="w-full min-h-screen flex-1">
        <div className="max-w-7xl mx-auto px-margin pt-space-md pb-space-xxl">
          <div className="flex flex-col w-full">
            {/* Free to read announcement bar */}
            <div className="w-full flex items-center justify-between pb-2 mb-4 border-b border-border-hairline text-[13px] font-body-standard">
              <div className="flex items-center gap-1.5 text-ink-charcoal">
                <span className="font-normal">These top stories are</span>
                <button
                  onClick={() => setIsSubscribeModalOpen(true)}
                  className="font-bold text-ink-black underline decoration-ink-black decoration-1 underline-offset-2 hover:text-nyt-blue cursor-pointer"
                >
                  free to read.
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-ink-subtle font-label-meta text-label-meta uppercase tracking-wider">
                <span>Updated 4m ago</span>
                <span>•</span>
                <span className="text-ink-black font-semibold">Special Midterm Edition</span>
              </div>
            </div>

            {/* ── SECTION 1: TOP STORIES BROADSHEET GRID ── */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b-2 border-border-strong pb-8 mb-8">
              {/* LEFT COLUMN (4 cols): Main Package Lead */}
              <div className="lg:col-span-4 lg:pr-5 lg:border-r border-border-hairline flex flex-col justify-between">
                <div>
                  <div className="space-y-3">
                    <button
                      onClick={() => openArticleById('women-leaving-trump-admin')}
                      className="group block text-left cursor-pointer"
                    >
                      <h2 className="font-headline-xl text-headline-xl text-ink-black group-hover:text-nyt-blue transition-colors tracking-tight leading-[1.12]">
                        High-Ranking Women Are Leaving the Trump Administration
                      </h2>
                    </button>
                    <p className="font-body-editorial text-body-editorial text-ink-charcoal leading-relaxed">
                      In the president’s second term, those heading for the exits are female officials, raising fresh scrutiny over executive leadership and White House turnover.
                    </p>
                    <div className="flex items-center gap-2 font-label-meta text-label-meta text-ink-subtle uppercase">
                      <span className="font-bold text-ink-black">By Jonathan Swan and Maggie Haberman</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                  </div>

                  <div className="my-5 border-t border-border-hairline"></div>

                  <div className="space-y-2">
                    <button
                      onClick={() => openArticleById('steep-rise-fall-guilfoyle')}
                      className="group block text-left cursor-pointer"
                    >
                      <h3 className="font-headline-md text-headline-md text-ink-black group-hover:text-nyt-blue transition-colors">
                        The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                      </h3>
                    </button>
                    <p className="font-body-standard text-body-standard text-ink-muted">
                      From the pinnacle of campaign surrogacy to a quiet departure following an ambassadorial withdrawal in Greece.
                    </p>
                    <div className="flex items-center gap-3 pt-1 font-label-meta text-label-meta text-ink-subtle">
                      <span className="flex items-center gap-1 font-semibold text-ink-charcoal">
                        <MessageSquare className="w-3.5 h-3.5" /> 519
                      </span>
                      <span>•</span>
                      <span>Politics</span>
                    </div>
                  </div>
                </div>

                {/* Secondary story on left col bottom */}
                <div className="pt-6 mt-6 border-t border-border-hairline">
                  <button
                    onClick={() => openArticleById('trump-press-secretary-attorney')}
                    className="group block text-left space-y-1.5 cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue transition-colors">
                      Trump’s New Press Secretary: Not-Quite Attorney at Law
                    </h4>
                    <p className="font-body-standard text-body-standard text-ink-muted">
                      Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding.
                    </p>
                    <div className="font-label-meta text-label-meta text-ink-subtle uppercase pt-1">
                      4 min read
                    </div>
                  </button>
                </div>
              </div>

              {/* CENTER COLUMN (5 cols): Hero Photography & Immediate Analysis */}
              <div className="lg:col-span-5 lg:px-5 lg:border-r border-border-hairline mt-6 lg:mt-0 flex flex-col">
                <div
                  onClick={() => openArticleById('women-leaving-trump-admin')}
                  className="relative w-full overflow-hidden bg-paper-tint cursor-pointer group"
                >
                  <img
                    className="w-full h-auto aspect-[4/3] object-cover group-hover:opacity-95 transition-opacity"
                    alt="Kimberly Guilfoyle"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHMWRPAF08cAHDa7a6KCp-rPEvTSzARgiaLRXlf20-cdJGha76QvmMUwPXqFW4dI_5Io55RLFaO6dlfJ4lu6mNo5eRL9M6UqNwc_RMHBrfZpyaRflwIH8qA00q6HVzLJo_R-CkJEKMC0L8xf0eCBpvJDptX1d3HeJ_9hQmv7ECZcT6C7AIIKV1Ok1s8NXWc4UGilzScjUVVaMhbvF_BDLq7iFx5jO26AwfFGjI_gC5JC1HNp3ez-Ai"
                  />
                  <div className="flex items-start justify-between text-ink-subtle font-caption text-caption pt-2 leading-tight">
                    <span className="max-w-[75%]">
                      Kimberly Guilfoyle during a recent appearance in Washington before her diplomatic role in Athens dissolved.
                    </span>
                    <span className="text-right whitespace-nowrap text-ink-muted font-label-meta">
                      Tierney L. Cross/The New York Times
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-hairline">
                  <div>
                    <button
                      onClick={() => openArticleById('how-west-wing-replaces-inner-circle')}
                      className="group block text-left space-y-1 cursor-pointer"
                    >
                      <span className="font-label-section text-label-section uppercase text-opinion-crimson tracking-wider font-bold">
                        Analysis
                      </span>
                      <h5 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue">
                        How the West Wing Replaces Its Inner Circle
                      </h5>
                      <p className="font-body-standard text-[13px] text-ink-muted">
                        Departures at this pace have typically signaled policy pivots or shifting campaign priorities ahead of midterms.
                      </p>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => openArticleById('inside-vetting-failures')}
                      className="group block text-left space-y-1 cursor-pointer"
                    >
                      <span className="font-label-section text-label-section uppercase text-nyt-blue tracking-wider font-bold">
                        Behind The Story
                      </span>
                      <h5 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue">
                        Inside the Vetting Failures That Rocked Staffers
                      </h5>
                      <p className="font-body-standard text-[13px] text-ink-muted">
                        Officials recount hours of frantic conference calls as resume discrepancies emerged in public.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Quick Thumbnail Row */}
                <div className="mt-auto pt-4 border-t border-border-hairline flex items-center gap-3 overflow-x-auto no-scrollbar text-[11px] font-label-meta text-ink-muted uppercase">
                  <span className="font-bold text-ink-black">Photo Desks:</span>
                  <span className="hover:text-ink-black cursor-pointer">1. Kenny Holston</span>
                  <span>•</span>
                  <span className="hover:text-ink-black cursor-pointer">2. Eric Lee</span>
                  <span>•</span>
                  <span className="hover:text-ink-black cursor-pointer">3. Haiyun Jiang</span>
                </div>
              </div>

              {/* RIGHT COLUMN (3 cols): Election Dispatches & Side Rail Tracker */}
              <div className="lg:col-span-3 lg:pl-5 mt-6 lg:mt-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-1 mb-2 border-b-2 border-live-red">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-live-red animate-pulse"></span>
                      <span className="font-label-section text-label-section text-live-red uppercase font-bold tracking-widest">
                        Election Dispatches
                      </span>
                    </div>
                    <span className="font-label-meta text-label-meta text-ink-subtle uppercase">
                      Live Updates
                    </span>
                  </div>

                  <div className="space-y-3 mt-3">
                    <button
                      onClick={() => openArticleById('texas-senate-race-tightens')}
                      className="group block text-left cursor-pointer"
                    >
                      <h3 className="font-headline-md text-headline-md text-ink-black group-hover:text-nyt-blue transition-colors leading-tight">
                        Texas Senate Race Tightens, Polls Show, Even as Talarico Keeps His Edge
                      </h3>
                    </button>

                    <ul className="space-y-2.5 pt-1 text-ink-charcoal font-body-standard text-[13px] leading-snug">
                      <li className="flex items-start gap-2">
                        <span className="text-ink-subtle text-[10px] mt-1">■</span>
                        <span>Jon Ossoff says he’s not running for president, but history suggests political timetables shift fast.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-ink-subtle text-[10px] mt-1">■</span>
                        <span>The breathtaking cost of the midterms: over <strong>$10 billion</strong> and counting on national advertising.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-ink-subtle text-[10px] mt-1">■</span>
                        <span>A Maryland lawmaker blamed high fuel prices on opponents during a tense town hall exchange.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Latest Polls Box */}
                  <div className="mt-6 p-3 bg-paper-tint border border-border-hairline">
                    <div className="flex items-center justify-between border-b border-border-hairline pb-2 mb-2">
                      <span className="font-label-section text-label-section text-ink-black uppercase font-bold">
                        The Latest Polls
                      </span>
                      <button
                        onClick={() => setIsPollsModalOpen(true)}
                        className="font-label-meta text-label-meta text-nyt-blue hover:underline uppercase cursor-pointer"
                      >
                        All Polls ›
                      </button>
                    </div>
                    <div
                      onClick={() => setIsPollsModalOpen(true)}
                      className="grid grid-cols-2 gap-2 text-center text-ink-black font-body-standard text-xs cursor-pointer"
                    >
                      <div className="p-2 bg-paper-pure border border-border-hairline hover:border-ink-black transition-colors">
                        <span className="text-[10px] text-ink-subtle block uppercase font-label-meta">
                          Senate Edge
                        </span>
                        <span className="font-bold text-ink-black text-sm">DEM +1.8</span>
                      </div>
                      <div className="p-2 bg-paper-pure border border-border-hairline hover:border-ink-black transition-colors">
                        <span className="text-[10px] text-ink-subtle block uppercase font-label-meta">
                          House Margin
                        </span>
                        <span className="font-bold text-ink-black text-sm">GOP +0.6</span>
                      </div>
                      <div className="p-2 bg-paper-pure border border-border-hairline hover:border-ink-black transition-colors">
                        <span className="text-[10px] text-ink-subtle block uppercase font-label-meta">
                          Governor Net
                        </span>
                        <span className="font-bold text-ink-black text-sm">TIE 48%</span>
                      </div>
                      <div className="p-2 bg-paper-pure border border-border-hairline hover:border-ink-black transition-colors">
                        <span className="text-[10px] text-ink-subtle block uppercase font-label-meta">
                          Approval
                        </span>
                        <span className="font-bold text-opinion-crimson text-sm">41.2%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-hairline">
                  <button
                    onClick={() => setIsPollsModalOpen(true)}
                    className="group block text-left cursor-pointer"
                  >
                    <span className="font-label-section text-[10px] uppercase tracking-wider text-ink-subtle font-bold block mb-1">
                      Debate Analysis
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue leading-tight">
                      Fact-Checking Key Debates in Georgia, Maine and Michigan
                    </h4>
                    <span className="font-label-meta text-label-meta text-ink-subtle uppercase mt-1 block">
                      4 min read
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* ── SECTION 2: RUSSIA-UKRAINE WAR + EVENING BRIEFING ── */}
            <section className="w-full border-b-2 border-border-strong pb-8 mb-8">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-ink-black">
                <div className="flex items-center gap-3">
                  <h3 className="font-headline-lg text-headline-lg text-ink-black font-bold">
                    Russia-Ukraine War
                  </h3>
                  <span className="hidden sm:inline-block text-ink-subtle">|</span>
                  <div className="hidden sm:flex items-center gap-3 font-label-meta text-label-meta uppercase text-ink-muted">
                    <button
                      onClick={() => openArticleById('ukraine-exposure-satellites')}
                      className="hover:text-ink-black cursor-pointer"
                    >
                      Wins for Putin
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => openArticleById('ukraine-exposure-satellites')}
                      className="hover:text-ink-black cursor-pointer"
                    >
                      Escalating Assaults
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => openArticleById('why-trumps-diesel-deal-wont-lower-prices')}
                      className="hover:text-ink-black cursor-pointer"
                    >
                      Russian Oil Deal
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => openArticleById('ukraine-exposure-satellites')}
                  className="font-label-meta text-label-meta uppercase text-nyt-blue font-bold hover:underline cursor-pointer"
                >
                  Full Coverage ›
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Lead War Story (5 cols) */}
                <div className="md:col-span-5 md:pr-4 md:border-r border-border-hairline space-y-3">
                  <div
                    onClick={() => openArticleById('ukraine-exposure-satellites')}
                    className="relative w-full aspect-[16/9] overflow-hidden bg-paper-tint cursor-pointer group"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                      alt="Kyiv city skyline"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_zRzXZJMXqp039AWmVnBUkIEg12IRS3gvFMlVPdUBT-8UF0OvB_gTbi_pxZtDb8ln4QtKh4fSRCd3V_2QurQaGisD4ynD-pFcr-s3PVpyOe8cBLCB16id1GIiAbUslrhc_VT5v01EpDoESmOcnhPh1bhvQy9QOCB3aMbpGe_o8Y8ZxHWqwLm-2A0PD2yXma87norbL9qqVIK3WkAi_qiKnjhGcBkuaIjMeA9znAaE9AWOOMH3VQRn"
                    />
                  </div>
                  <div className="flex items-center justify-between text-ink-subtle font-caption text-[11px]">
                    <span>Blackouts across districts after missile volleys struck power hubs.</span>
                    <span className="font-label-meta">Evgeniy Maloletka/AP</span>
                  </div>
                  <button
                    onClick={() => openArticleById('ukraine-exposure-satellites')}
                    className="group block text-left cursor-pointer"
                  >
                    <h3 className="font-headline-md text-headline-md text-ink-black group-hover:text-nyt-blue leading-snug">
                      Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates
                    </h3>
                  </button>
                  <p className="font-body-standard text-body-standard text-ink-charcoal">
                    A huge attack cut power to 600,000 people in Kyiv, and a Pentagon-funded satellite internet program appeared to be curbed without warning.
                  </p>
                  <div className="flex items-center gap-3 font-label-meta text-label-meta text-ink-subtle">
                    <span className="flex items-center gap-1 font-semibold text-ink-charcoal">
                      <MessageSquare className="w-3 h-3" /> 1.1k
                    </span>
                    <span>•</span>
                    <span className="uppercase">World</span>
                    <span>•</span>
                    <span>6 min read</span>
                  </div>
                </div>

                {/* Secondary War Column (4 cols) */}
                <div className="md:col-span-4 md:px-2 md:border-r border-border-hairline space-y-5">
                  <div className="space-y-1.5 pb-4 border-b border-border-hairline">
                    <span className="font-label-section text-[10px] uppercase text-ink-subtle font-bold">
                      Economic Fallout
                    </span>
                    <button
                      onClick={() => openArticleById('why-trumps-diesel-deal-wont-lower-prices')}
                      className="group block text-left cursor-pointer"
                    >
                      <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue leading-tight">
                        Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices
                      </h4>
                    </button>
                    <p className="font-body-standard text-body-standard text-ink-muted">
                      Global market arbitrage and refining bottlenecks ensure relief at the pump remains elusive for American commuters.
                    </p>
                    <span className="font-label-meta text-label-meta text-ink-subtle uppercase block pt-1">
                      4 min read
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-label-section text-[10px] uppercase text-ink-subtle font-bold">
                      Intelligence Feed
                    </span>
                    <button
                      onClick={() => openArticleById('ukraine-exposure-satellites')}
                      className="group block text-left cursor-pointer"
                    >
                      <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue leading-tight">
                        The U.S. Continues to Provide Intelligence to Ukraine, Officials Say
                      </h4>
                    </button>
                    <p className="font-body-standard text-body-standard text-ink-muted">
                      Despite rhetoric from congressional hard-liners, real-time tactical radar sharing remains operational across allied borders.
                    </p>
                    <span className="font-label-meta text-label-meta text-ink-subtle uppercase block pt-1">
                      3 min read
                    </span>
                  </div>
                </div>

                {/* Evening Briefing Box (3 cols) */}
                <div className="md:col-span-3 bg-paper-tint p-4 border border-border-hairline flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-ink-black pb-2 mb-3">
                      <span className="font-label-section text-label-section text-ink-black uppercase font-bold tracking-wider">
                        The Evening Briefing
                      </span>
                      <Newspaper className="w-4 h-4 text-ink-black" />
                    </div>
                    <button
                      onClick={() => setIsBriefingModalOpen(true)}
                      className="group block text-left cursor-pointer"
                    >
                      <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue leading-snug">
                        Catch Up on Today’s Biggest Stories
                      </h4>
                    </button>
                    <p className="font-body-standard text-[13px] text-ink-charcoal mt-2 leading-relaxed">
                      Energy prices lift inflation indicators, Ukraine faces infrastructural strain, and the Texas Senate campaign reaches fever pitch.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border-hairline flex items-center justify-between font-label-meta text-label-meta uppercase text-ink-subtle">
                    <span>5 min read</span>
                    <button
                      onClick={() => setIsBriefingModalOpen(true)}
                      className="text-nyt-blue font-bold hover:underline cursor-pointer"
                    >
                      Read Briefing ›
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 3: THE GREAT READ & TECH/AI BENTO ── */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-b-2 border-border-strong pb-8 mb-8">
              {/* LEFT: Technology & AI Feature (7 cols) */}
              <div className="lg:col-span-7 lg:pr-4 lg:border-r border-border-hairline space-y-4">
                <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-label-section text-label-section uppercase text-ink-black font-bold tracking-wider">
                      Artificial Intelligence
                    </span>
                    <span className="font-label-meta text-label-meta text-ink-subtle">
                      | Business &amp; Society
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 font-label-meta text-[10px] text-ink-subtle uppercase">
                    <button
                      onClick={() => openArticleById('ai-agents-dinner-party')}
                      className="hover:text-ink-black cursor-pointer"
                    >
                      Rogue Behavior
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => openArticleById('ai-agents-dinner-party')}
                      className="hover:text-ink-black cursor-pointer"
                    >
                      Math Research
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <button
                      onClick={() => openArticleById('ai-agents-dinner-party')}
                      className="group block text-left cursor-pointer"
                    >
                      <h3 className="font-headline-md text-headline-md text-ink-black group-hover:text-nyt-blue leading-tight">
                        What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party
                      </h3>
                    </button>
                    <p className="font-body-standard text-body-standard text-ink-muted">
                      As autonomous bots spread into personal scheduling, we are increasingly glimpsing how digital entities negotiate with one another.
                    </p>
                    <div className="flex items-center gap-2 font-label-meta text-label-meta text-ink-subtle">
                      <span className="font-bold text-ink-black">By Aaron Fernandez</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <MessageSquare className="w-3 h-3" /> 210
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => openArticleById('ai-agents-dinner-party')}
                    className="relative w-full aspect-[4/3] bg-paper-tint overflow-hidden cursor-pointer group"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      alt="AI Dinner Party"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmAHZ7mD_be3ZnIm1XIFZ_rZIJCyIpu3zBJNeoMS5CMK0DKuPfpzPU34KnsQ1cwPikcELC-WjUpuTM0K-yt3-D-bMBFIiZHH6P-kdiMK9uV_a9vXZWtEv7Ep26vQAMFZ3ayJRM0iIwClSd11Mj6R-1almu6tZcqvRFIwOPrp_0jkkqm31aYKFABwbCNwWurbgH1ABpLdti-d3dkMHhd18XYDWbXefuKCUksNrof4RfuRuaJYgXng2N"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <button
                    onClick={() => openArticleById('anthropic-revenue-jump')}
                    className="group text-left cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-[15px] font-bold text-ink-black group-hover:text-nyt-blue">
                      Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter
                    </h4>
                  </button>
                  <span className="font-label-meta text-label-meta text-ink-subtle uppercase whitespace-nowrap">
                    3 min read
                  </span>
                </div>
              </div>

              {/* RIGHT: THE GREAT READ (5 cols) */}
              <div className="lg:col-span-5 bg-paper-tint p-5 border border-border-hairline flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-hairline">
                    <span className="font-label-section text-label-section uppercase text-opinion-crimson tracking-widest font-bold">
                      The Great Read
                    </span>
                    <span className="font-label-meta text-label-meta uppercase text-ink-subtle">
                      Longform Narrative
                    </span>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => openArticleById('coming-out-at-50')}
                      className="group block text-left cursor-pointer"
                    >
                      <h3 className="font-serif text-[28px] sm:text-[32px] leading-tight text-ink-black group-hover:text-nyt-blue italic font-normal">
                        “Coming Out at 50 Can Be Hard. Shelly Found a Coach.”
                      </h3>
                    </button>
                    <p className="font-body-editorial text-body-editorial text-ink-charcoal leading-relaxed">
                      She spent decades building an identity as a suburban wife and mother. Could she disrupt “a perfectly good family dynamic” to live her authentic truth?
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border-hairline flex items-center justify-between">
                  <div className="text-ink-subtle font-caption text-caption">
                    <span>Photo essay by Sophie Park for The New York Times</span>
                  </div>
                  <div className="flex items-center gap-1 font-label-meta text-label-meta text-ink-charcoal font-semibold">
                    <MessageSquare className="w-3.5 h-3.5" /> 259
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 4: OPINION & COLUMNS (High-Contrast Broadsheet Strip) ── */}
            <section className="w-full border-b-2 border-border-strong pb-8 mb-8">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-ink-black">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-lg text-headline-lg text-ink-black font-bold">
                    Opinion
                  </h3>
                  <span className="text-ink-subtle font-label-meta text-label-meta uppercase tracking-wider pl-2">
                    Columns &amp; Guest Essays
                  </span>
                </div>
                <button
                  onClick={() => setActiveSection('Opinion')}
                  className="font-label-meta text-label-meta uppercase text-opinion-crimson font-bold hover:underline cursor-pointer"
                >
                  Explore Opinion ›
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Column 1: David Wallace-Wells */}
                <div className="space-y-2 border-b sm:border-b-0 pb-4 sm:pb-0 sm:border-r border-border-hairline sm:pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-paper-tint border border-border-hairline overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt="David Wallace-Wells"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKuH0RHcqj-19dvgF1KXDZzDOmxsoLwoe_lVJnrg4F_Emb0FBpKp9pFHWFDKZXjLKaJdnA9fERR-tq3IvSea-7NqPcUOFLUAVNUL1CeB9qlYhZknRr9VJqIhMttBViCxk96IVxEBevofC9mMiTTVVsPIFzy5HdWlDBBEqmYB_bjFtUWs8_4md-EX0qWVJlpeWCwRMSpcXKUoxPvTXc_v-91CG9v9PdnQE0utMbW2Hh_98pevjKedX1"
                      />
                    </div>
                    <div>
                      <span className="font-label-section text-[11px] uppercase tracking-wider text-ink-black font-bold block">
                        David Wallace-Wells
                      </span>
                      <span className="font-label-meta text-[10px] text-ink-subtle">
                        Contributing Columnist
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openArticleById('democrats-shouldnt-wait')}
                    className="group block text-left cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-opinion-crimson transition-colors leading-snug">
                      Democrats Shouldn’t Wait Two More Years
                    </h4>
                  </button>
                  <p className="font-body-standard text-[13px] text-ink-muted">
                    Patience is not an effective political doctrine when federal institutions are being re-engineered overnight.
                  </p>
                  <div className="pt-2 font-label-meta text-label-meta text-ink-subtle flex items-center gap-1 font-semibold">
                    <MessageSquare className="w-3 h-3" /> 388 comments
                  </div>
                </div>

                {/* Column 2: Heather Kerr */}
                <div className="space-y-2 border-b sm:border-b-0 pb-4 sm:pb-0 lg:border-r border-border-hairline sm:pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-paper-tint border border-border-hairline overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt="Heather Kerr"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrvHSxgFTBJ_asax_Y7PxnStAuS3hTcQDxf-_oDTzgpzDXuPNjQQb6WVYHVF_2N4eMel9LXbFVDbVsQ8JK1cCX8ZcALkH0QqlTPGcRVIaUIe_orUH1To_na31_-J5erlco6BeGc7FYATqiwFHnhRqqdjtaF-r6l9ZR4GUZ3XrVDks2wI8s9Yp0yW9G_4ctKTrAHvEY2tXbrdU5nycPU2jcQlAO4jen1lQwEhKiqDO9LkjvfU4g1twu"
                      />
                    </div>
                    <div>
                      <span className="font-label-section text-[11px] uppercase tracking-wider text-ink-black font-bold block">
                        Heather Kerr
                      </span>
                      <span className="font-label-meta text-[10px] text-ink-subtle">
                        Guest Essay
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openArticleById('never-seen-ebola-spread')}
                    className="group block text-left cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-opinion-crimson transition-colors leading-snug">
                      I’ve Never Seen Ebola Spread Like This
                    </h4>
                  </button>
                  <p className="font-body-standard text-[13px] text-ink-muted">
                    Front-line medical units lack foundational sanitation tools as regional transport vectors accelerate transmission.
                  </p>
                  <div className="pt-2 font-label-meta text-label-meta text-ink-subtle">
                    <span>Global Health • 4 min read</span>
                  </div>
                </div>

                {/* Column 3: Carlos Lozada */}
                <div className="space-y-2 border-b sm:border-b-0 pb-4 sm:pb-0 sm:border-r border-border-hairline sm:pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-paper-tint border border-border-hairline overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt="Carlos Lozada"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg0q453un49t9IwXSpWzqJdZZUb1XKGptcrLJsZ7uTwB9dcZiQYo9Xfc_LuMMdDYkWlC08RdyReVXusRftqdBBgKTmZl59r2OwRROmIYG3OY2UXIWqOLKP_a_iRCzcjX-UQN3jZ7sgou6J-W-T-hsr_kED4HgC4SP7MVurujEsUWszKNrzrqCB26RO7hCiee58Er8bD4AqWEH62KXeo3ekx6UJ6GfE2Stxer40zBrLnsjgbgFGn6vM"
                      />
                    </div>
                    <div>
                      <span className="font-label-section text-[11px] uppercase tracking-wider text-ink-black font-bold block">
                        Carlos Lozada
                      </span>
                      <span className="font-label-meta text-[10px] text-ink-subtle">
                        Opinion Columnist
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openArticleById('manifesto-to-end-manifestoes')}
                    className="group block text-left cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-opinion-crimson transition-colors leading-snug">
                      A Manifesto to End All Manifestoes
                    </h4>
                  </button>
                  <p className="font-body-standard text-[13px] text-ink-muted">
                    Silicon Valley’s new crop of utopian pamphlets promise total abundance while casually dismissing civic life.
                  </p>
                  <div className="pt-2 font-label-meta text-label-meta text-ink-subtle flex items-center gap-1 font-semibold">
                    <MessageSquare className="w-3 h-3" /> 69 comments
                  </div>
                </div>

                {/* Column 4: Jayson Greene */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-paper-tint border border-border-hairline overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt="Jayson Greene"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5hv_Wib4TweOo1GNFDXPB0v4E1dqqClqg3_QHhq2FBn1lRVgId6LQvU8lbT1cZOCJ2XPFakN2CNnrJIrG42-55-K-rTu4iRoucAFJO1tYVxcb9X3Cc21l6mfjkMRNUWiVu4KTa0Yo01S8M4Dox5aWcXDk0FU5v_2JoQZJ5ciQxSGW7MiXRNhcsALjZoXzpNAzwUmCnDmc9WI5uV50wdrrwk4TQ8W43mjx5rZwypC47-D9Z4cgw_Wj"
                      />
                    </div>
                    <div>
                      <span className="font-label-section text-[11px] uppercase tracking-wider text-ink-black font-bold block">
                        Jayson Greene
                      </span>
                      <span className="font-label-meta text-[10px] text-ink-subtle">
                        Culture Critic
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openArticleById('tom-cruise-secret-masterpiece')}
                    className="group block text-left cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-opinion-crimson transition-colors leading-snug">
                      Tom Cruise’s Big Flop Is a Secret Masterpiece
                    </h4>
                  </button>
                  <p className="font-body-standard text-[13px] text-ink-muted">
                    Underneath the bloated production budget of ‘Digger’ sits one of cinema’s strangest parables on ecological dread.
                  </p>
                  <div className="pt-2 font-label-meta text-label-meta text-ink-subtle">
                    <span>Film Review • 5 min read</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 5: CULTURE, SPORTS & GAMES ROW ── */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
              {/* SPORTS / THE ATHLETIC (4 cols) */}
              <div className="lg:col-span-4 lg:pr-5 lg:border-r border-border-hairline flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-ink-black">
                    <div className="flex items-center gap-2">
                      <span className="font-label-section text-label-section uppercase font-bold text-ink-black">
                        The Athletic
                      </span>
                      <span className="bg-live-red text-white font-label-meta text-[9px] uppercase font-bold px-1 py-0.5">
                        Live
                      </span>
                    </div>
                    <span className="font-label-meta text-label-meta uppercase text-ink-subtle">
                      N.L.C.S. Game 3
                    </span>
                  </div>

                  <button
                    onClick={() => openArticleById('brewers-lead-dodgers-game-3')}
                    className="group block text-left space-y-2 cursor-pointer"
                  >
                    <h3 className="font-headline-md text-headline-md text-ink-black group-hover:text-nyt-blue leading-tight">
                      Brewers Lead Dodgers in Game 3 of N.L. Championship Series
                    </h3>
                    <p className="font-body-standard text-body-standard text-ink-charcoal">
                      Jackson Chourio’s home run on the first pitch of the game gave Milwaukee an early cushion as they seek a dominant 3-0 series stranglehold.
                    </p>
                  </button>

                  {/* Interactive Baseball Scoreboard Widget with Diamond graphic */}
                  <div className="mt-4 p-3 bg-paper-tint border border-border-hairline space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold font-body-standard pr-4">
                          <span>Milwaukee Brewers</span>
                          <span className="font-bold text-ink-black text-sm">4</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-body-standard text-ink-muted pr-4">
                          <span>Los Angeles Dodgers</span>
                          <span className="text-sm">1</span>
                        </div>
                      </div>

                      {/* Baseball Diamond Graphic */}
                      <div className="relative w-8 h-8 border border-slate-300 transform rotate-45 shrink-0 flex items-center justify-center bg-white">
                        {/* 1st base runner active */}
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-live-red"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-slate-300"></div>
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-300"></div>
                      </div>
                    </div>

                    <div className="text-[10px] font-label-meta uppercase text-live-red font-bold pt-1.5 border-t border-border-hairline flex items-center justify-between">
                      <span>Top 7th • 2 Outs • Runner on 1st</span>
                      <span className="text-ink-subtle font-normal">Pitch count: 88</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border-hairline">
                    <button
                      onClick={() => openArticleById('brewers-lead-dodgers-game-3')}
                      className="group block text-left cursor-pointer"
                    >
                      <h5 className="font-headline-sm text-[15px] font-bold text-ink-black group-hover:text-nyt-blue">
                        Shohei Ohtani Insists He Can Play. The Dodgers’ Season Hinges on It.
                      </h5>
                      <span className="font-label-meta text-label-meta text-ink-subtle uppercase pt-1 block">
                        From The Athletic Staff
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border-hairline">
                  <button
                    onClick={() => setActiveSection('The Athletic')}
                    className="text-nyt-blue font-label-meta text-label-meta uppercase font-bold hover:underline flex items-center justify-between w-full cursor-pointer"
                  >
                    <span>Go to The Athletic</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CULTURE & METRO BRIEFINGS (4 cols) */}
              <div className="lg:col-span-4 lg:px-2 lg:border-r border-border-hairline space-y-4">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-ink-black">
                  <span className="font-label-section text-label-section uppercase font-bold text-ink-black">
                    Culture &amp; Metropolis
                  </span>
                  <span className="font-label-meta text-label-meta uppercase text-ink-subtle">
                    NYC &amp; Beyond
                  </span>
                </div>

                <div className="space-y-3 pb-4 border-b border-border-hairline">
                  <button
                    onClick={() => openArticleById('battle-over-pierre-hotel')}
                    className="group block text-left space-y-1 cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue leading-snug">
                      Battle Over the Pierre Hotel Ends in Defeat for Buyer Backed by Lutnick
                    </h4>
                    <p className="font-body-standard text-body-standard text-ink-muted">
                      Motasem Khashoggi missed a key deadline to place a deposit on the landmark Manhattan residential tower.
                    </p>
                    <span className="font-label-meta text-label-meta text-ink-subtle uppercase block pt-0.5">
                      7 min read
                    </span>
                  </button>
                </div>

                <div className="space-y-3 pb-4 border-b border-border-hairline">
                  <button
                    onClick={() => openArticleById('the-toy-store-15-million-bird')}
                    className="group block text-left space-y-1 cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-headline-sm text-ink-black group-hover:text-nyt-blue leading-snug">
                      The Toy Store, and $15 Million Bird, at the Center of an Internet Frenzy
                    </h4>
                    <p className="font-body-standard text-body-standard text-ink-muted">
                      Art of Play in Brooklyn Heights finds itself in a viral social media standoff with Kelly Clarkson.
                    </p>
                    <span className="font-label-meta text-label-meta text-ink-subtle uppercase block pt-0.5">
                      5 min read
                    </span>
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => openArticleById('plaza-hotel-shut-clean-facade')}
                    className="group block text-left cursor-pointer"
                  >
                    <h5 className="font-headline-sm text-[15px] font-bold text-ink-black group-hover:text-nyt-blue leading-tight">
                      Plaza Hotel to Shut for Four-Year Cleanup of Its Celebrated Facade
                    </h5>
                    <span className="font-label-meta text-label-meta text-ink-subtle uppercase block pt-1">
                      3 min read
                    </span>
                  </button>
                </div>
              </div>

              {/* NYT GAMES & PUZZLES (4 cols) */}
              <div className="lg:col-span-4 bg-paper-warm p-4 border border-border-hairline flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-hairline">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-section text-label-section uppercase font-bold text-ink-black tracking-wider">
                        NYT Games
                      </span>
                    </div>
                    <span className="font-label-meta text-label-meta uppercase text-ink-subtle">
                      Daily Puzzles
                    </span>
                  </div>

                  {/* Playable Games Grid */}
                  <div className="grid grid-cols-2 gap-2 text-ink-black font-body-standard">
                    <button
                      onClick={() => handleOpenGame('wordle')}
                      className="p-2.5 bg-paper-pure border border-border-hairline hover:border-ink-black transition-colors block text-left cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs uppercase font-label-meta text-ink-black group-hover:text-nyt-blue">
                          Wordle
                        </span>
                        <span className="w-3 h-3 bg-[#6aaa64]"></span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-1 leading-tight">
                        Guess the daily 5-letter word in 6 attempts.
                      </p>
                    </button>

                    <button
                      onClick={() => handleOpenGame('connections')}
                      className="p-2.5 bg-paper-pure border border-border-hairline hover:border-ink-black transition-colors block text-left cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs uppercase font-label-meta text-ink-black group-hover:text-nyt-blue">
                          Connections
                        </span>
                        <span className="w-3 h-3 bg-[#b5e352]"></span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-1 leading-tight">
                        Group 16 words that share a hidden link.
                      </p>
                    </button>

                    <button
                      onClick={() => handleOpenGame('spelling-bee')}
                      className="p-2.5 bg-paper-pure border border-border-hairline hover:border-ink-black transition-colors block text-left cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs uppercase font-label-meta text-ink-black group-hover:text-nyt-blue">
                          Spelling Bee
                        </span>
                        <span className="w-3 h-3 bg-[#f7da21]"></span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-1 leading-tight">
                        How many words can you make with 7 letters?
                      </p>
                    </button>

                    <button
                      onClick={() => handleOpenGame('mini')}
                      className="p-2.5 bg-paper-pure border border-border-hairline hover:border-ink-black transition-colors block text-left cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs uppercase font-label-meta text-ink-black group-hover:text-nyt-blue">
                          The Mini
                        </span>
                        <span className="w-3 h-3 bg-nyt-blue"></span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-1 leading-tight">
                        Solve a bite-sized crossword in 2 minutes.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Wirecutter Widget */}
                <div className="mt-4 pt-3 border-t border-border-hairline">
                  <div className="flex items-center justify-between font-label-meta text-label-meta uppercase">
                    <span className="text-ink-subtle">Wirecutter Pick:</span>
                    <button
                      onClick={() => setWirecutterToast(true)}
                      className="text-ink-black font-bold hover:underline cursor-pointer"
                    >
                      The Best Air Purifier for Fall ›
                    </button>
                  </div>
                  {wirecutterToast && (
                    <div className="mt-2 p-2 bg-white border border-border-hairline text-[11px] text-ink-charcoal flex items-center justify-between animate-in fade-in duration-150">
                      <span>Wirecutter top pick: <strong>Coway Airmega AP-1512HH</strong></span>
                      <button
                        onClick={() => setWirecutterToast(false)}
                        className="text-xs text-ink-subtle hover:text-ink-black font-bold ml-2 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ───────────────── COMPREHENSIVE FOOTER ───────────────── */}
      <footer className="w-full bg-paper-tint border-t-2 border-border-strong pt-space-xl pb-space-xxl">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-border-hairline pb-space-md mb-space-lg">
            <h2 className="font-masthead-gothic text-2xl md:text-3xl text-ink-black">
              The New York Times
            </h2>
            <nav className="flex flex-wrap gap-space-md text-ink-subtle font-label-meta text-label-meta uppercase tracking-wider mt-space-sm md:mt-0">
              {['News', 'Opinion', 'Arts', 'Living', 'Play', 'Cooking', 'Wirecutter', 'The Athletic'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === 'Play') setIsGamesModalOpen(true);
                    else setActiveSection(item === 'News' ? 'U.S.' : item);
                  }}
                  className="hover:text-ink-black cursor-pointer transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-gutter pb-space-xl border-b border-border-hairline font-body-standard text-body-standard">
            <div>
              <h3 className="font-label-section text-label-section uppercase text-ink-black border-b border-ink-black pb-space-xxs mb-space-sm">
                News
              </h3>
              <ul className="space-y-space-xxs text-caption font-caption text-ink-muted">
                <li><button onClick={() => setActiveSection('U.S.')} className="hover:underline cursor-pointer">Home Page</button></li>
                <li><button onClick={() => setActiveSection('World')} className="hover:underline cursor-pointer">World</button></li>
                <li><button onClick={() => setActiveSection('U.S.')} className="hover:underline cursor-pointer">Health</button></li>
                <li><button onClick={() => setActiveSection('U.S.')} className="hover:underline cursor-pointer">U.S. Politics</button></li>
                <li><button onClick={() => setActiveSection('Business')} className="hover:underline cursor-pointer">Business &amp; Tech</button></li>
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:underline cursor-pointer">Today's Paper</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-label-section text-label-section uppercase text-ink-black border-b border-ink-black pb-space-xxs mb-space-sm">
                Opinion
              </h3>
              <ul className="space-y-space-xxs text-caption font-caption text-ink-muted">
                <li><button onClick={() => setActiveSection('Opinion')} className="hover:underline cursor-pointer">Today's Opinion</button></li>
                <li><button onClick={() => setActiveSection('Opinion')} className="hover:underline cursor-pointer">Columnists</button></li>
                <li><button onClick={() => setActiveSection('Opinion')} className="hover:underline cursor-pointer">Editorials</button></li>
                <li><button onClick={() => setActiveSection('Opinion')} className="hover:underline cursor-pointer">Guest Essays</button></li>
                <li><button onClick={() => setActiveSection('Opinion')} className="hover:underline cursor-pointer">Letters</button></li>
                <li><button onClick={() => setActiveSection('Opinion')} className="hover:underline cursor-pointer">Sunday Opinion</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-label-section text-label-section uppercase text-ink-black border-b border-ink-black pb-space-xxs mb-space-sm">
                Arts
              </h3>
              <ul className="space-y-space-xxs text-caption font-caption text-ink-muted">
                <li><button onClick={() => setActiveSection('Arts')} className="hover:underline cursor-pointer">Today's Arts</button></li>
                <li><button onClick={() => setActiveSection('Arts')} className="hover:underline cursor-pointer">Books &amp; Reviews</button></li>
                <li><button onClick={() => setActiveSection('Arts')} className="hover:underline cursor-pointer">Best Sellers</button></li>
                <li><button onClick={() => setActiveSection('Arts')} className="hover:underline cursor-pointer">Movies</button></li>
                <li><button onClick={() => setActiveSection('Arts')} className="hover:underline cursor-pointer">Theater</button></li>
                <li><button onClick={() => setActiveSection('Arts')} className="hover:underline cursor-pointer">Television</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-label-section text-label-section uppercase text-ink-black border-b border-ink-black pb-space-xxs mb-space-sm">
                Living
              </h3>
              <ul className="space-y-space-xxs text-caption font-caption text-ink-muted">
                <li><button onClick={() => setActiveSection('Lifestyle')} className="hover:underline cursor-pointer">Style &amp; Fashion</button></li>
                <li><button onClick={() => setActiveSection('Cooking')} className="hover:underline cursor-pointer">Food &amp; Wine</button></li>
                <li><button onClick={() => setActiveSection('Lifestyle')} className="hover:underline cursor-pointer">Travel</button></li>
                <li><button onClick={() => setActiveSection('Lifestyle')} className="hover:underline cursor-pointer">The NYT Magazine</button></li>
                <li><button onClick={() => setActiveSection('Lifestyle')} className="hover:underline cursor-pointer">Real Estate</button></li>
                <li><button onClick={() => setActiveSection('Lifestyle')} className="hover:underline cursor-pointer">Weddings</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-label-section text-label-section uppercase text-ink-black border-b border-ink-black pb-space-xxs mb-space-sm">
                More
              </h3>
              <ul className="space-y-space-xxs text-caption font-caption text-ink-muted">
                <li><button onClick={() => handleOpenGame('wordle')} className="hover:underline cursor-pointer">Games &amp; Crossword</button></li>
                <li><button onClick={() => setActiveSection('Cooking')} className="hover:underline cursor-pointer">NYT Cooking</button></li>
                <li><button onClick={() => setActiveSection('Wirecutter')} className="hover:underline cursor-pointer">Wirecutter Reviews</button></li>
                <li><button onClick={() => setActiveSection('The Athletic')} className="hover:underline cursor-pointer">The Athletic</button></li>
                <li><button onClick={() => setIsBriefingModalOpen(true)} className="hover:underline cursor-pointer">Podcasts &amp; Audio</button></li>
                <li><button onClick={() => setActiveSection('Video')} className="hover:underline cursor-pointer">Video Channel</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-label-section text-label-section uppercase text-ink-black border-b border-ink-black pb-space-xxs mb-space-sm">
                Subscribe
              </h3>
              <ul className="space-y-space-xxs text-caption font-caption text-ink-muted">
                <li><button onClick={() => setIsSubscribeModalOpen(true)} className="font-bold text-nyt-blue hover:underline cursor-pointer">Home Delivery</button></li>
                <li><button onClick={() => setIsSubscribeModalOpen(true)} className="font-bold text-nyt-blue hover:underline cursor-pointer">Digital All-Access</button></li>
                <li><button onClick={() => setIsSubscribeModalOpen(true)} className="hover:underline cursor-pointer">Gift Subscriptions</button></li>
                <li><button onClick={() => setIsSubscribeModalOpen(true)} className="hover:underline cursor-pointer">Group Subscriptions</button></li>
                <li><button onClick={() => setIsSubscribeModalOpen(true)} className="hover:underline cursor-pointer">Education Rates</button></li>
                <li><button onClick={() => setIsAccountModalOpen(true)} className="hover:underline cursor-pointer">Customer Support</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm text-ink-subtle font-caption text-caption">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-space-sm text-[11px]">
              <span>© 2026 The New York Times Company</span>
              <span className="text-border-hairline">•</span>
              <span className="hover:underline cursor-pointer">NYTCo</span>
              <span className="text-border-hairline">•</span>
              <span className="hover:underline cursor-pointer">Contact Us</span>
              <span className="text-border-hairline">•</span>
              <span className="hover:underline cursor-pointer">Accessibility</span>
              <span className="text-border-hairline">•</span>
              <span className="hover:underline cursor-pointer">Work with us</span>
              <span className="text-border-hairline">•</span>
              <span className="hover:underline cursor-pointer">Advertise</span>
              <span className="text-border-hairline">•</span>
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="text-border-hairline">•</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
              <span className="text-border-hairline">•</span>
              <span className="hover:underline cursor-pointer">Site Map</span>
            </div>
            <div className="font-label-meta text-label-meta uppercase tracking-widest text-ink-muted text-center">
              All the News That's Fit to Print
            </div>
          </div>
        </div>
      </footer>

      {/* ───────────────── INTERACTIVE MODALS & DRAWERS ───────────────── */}
      <GamesModal
        isOpen={isGamesModalOpen}
        onClose={() => setIsGamesModalOpen(false)}
        initialGame={initialGame}
      />

      <PollsModal
        isOpen={isPollsModalOpen}
        onClose={() => setIsPollsModalOpen(false)}
        onSelectRace={() => {
          setIsPollsModalOpen(false);
          openArticleById('texas-senate-race-tightens');
        }}
      />

      <BriefingModal
        isOpen={isBriefingModalOpen}
        onClose={() => setIsBriefingModalOpen(false)}
        onSelectArticle={(id) => openArticleById(id)}
      />

      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onOpenSubscribe={() => setIsSubscribeModalOpen(true)}
      />

      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticleIds={savedArticleIds}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveSaved={toggleSave}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        query={searchQuery}
        setQuery={setSearchQuery}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      <MarketsWeatherPopover
        isOpen={isMarketsPopoverOpen}
        onClose={() => setIsMarketsPopoverOpen(false)}
        editionName={currentEdition.label}
      />
    </div>
  );
}
