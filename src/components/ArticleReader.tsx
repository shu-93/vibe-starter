import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  MessageSquare, 
  ThumbsUp, 
  Type, 
  Check, 
  Clock, 
  Send 
} from 'lucide-react';
import { Article, Comment, INITIAL_COMMENTS } from '../data/newsData';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
  isSaved,
  onToggleSave
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [userName, setUserName] = useState<string>('Reader in Brooklyn');
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    // Scroll to top upon opening article
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setComments(INITIAL_COMMENTS[article.id] || [
      {
        id: 'c-default-1',
        author: 'Robert K.',
        location: 'New York, NY',
        timeAgo: '1h ago',
        content: 'This continues to be one of the most critical developments of the season. Essential reporting.',
        upvotes: 14
      }
    ]);
  }, [article.id]);

  // Audio player timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `user-${Date.now()}`,
      author: userName || 'Anonymous Reader',
      location: 'New York, NY',
      timeAgo: 'Just now',
      content: newCommentText.trim(),
      upvotes: 0
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleUpvote = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c))
    );
  };

  const copyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-[19px] leading-[31px]';
    if (fontSize === 'xlarge') return 'text-[22px] leading-[36px]';
    return 'text-[17px] leading-[28px]';
  };

  return (
    <article className="min-h-screen bg-paper-pure font-sans text-ink-black">
      {/* Top Floating Utility Ribbon */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border-hairline shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-charcoal hover:text-nyt-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Front Page</span>
          </button>

          <div className="text-center hidden sm:block">
            <span className="font-masthead-gothic text-lg select-none">The New York Times</span>
          </div>

          <div className="flex items-center gap-3 text-ink-charcoal">
            {/* Audio Toggle */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`p-1.5 border transition-colors flex items-center gap-1 text-xs ${
                isPlayingAudio
                  ? 'border-nyt-blue text-nyt-blue bg-blue-50/50'
                  : 'border-border-hairline hover:border-ink-black'
              }`}
              title="Listen to story"
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden md:inline font-semibold">Listen</span>
            </button>

            {/* Font Size Changer */}
            <div className="flex items-center border border-border-hairline">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs font-serif ${
                  fontSize === 'normal' ? 'bg-ink-black text-white' : 'hover:bg-slate-100'
                }`}
                title="Normal Text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-sm font-serif ${
                  fontSize === 'large' ? 'bg-ink-black text-white' : 'hover:bg-slate-100'
                }`}
                title="Larger Text"
              >
                A+
              </button>
            </div>

            {/* Save Bookmark */}
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-1.5 border transition-colors ${
                isSaved
                  ? 'border-nyt-blue text-nyt-blue bg-blue-50/50'
                  : 'border-border-hairline hover:border-ink-black'
              }`}
              title={isSaved ? 'Saved in Reading List' : 'Save story'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-nyt-blue' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={copyShareLink}
              className="p-1.5 border border-border-hairline hover:border-ink-black transition-colors relative"
              title="Share article"
            >
              <Share2 className="w-3.5 h-3.5" />
              {showShareToast && (
                <span className="absolute -bottom-8 right-0 bg-ink-black text-white text-[10px] py-1 px-2 whitespace-nowrap shadow-md">
                  Link copied
                </span>
              )}
            </button>

            {/* Comments Counter Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="p-1.5 border border-border-hairline hover:border-ink-black transition-colors flex items-center gap-1 text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-semibold">{comments.length}</span>
            </button>
          </div>
        </div>

        {/* Audio Player Bar */}
        {isPlayingAudio && (
          <div className="bg-paper-tint border-t border-border-hairline px-4 py-2 text-xs flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-nyt-blue animate-pulse" />
            <div className="flex-1">
              <div className="flex items-center justify-between text-[11px] text-ink-subtle mb-1">
                <span>Narrated by NYT Audio Desk</span>
                <span>{Math.floor((audioProgress / 100) * 5)}:00 / 5:00</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 overflow-hidden">
                <div
                  className="bg-nyt-blue h-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => setIsPlayingAudio(false)}
              className="text-ink-subtle hover:text-ink-black text-[11px] uppercase font-bold"
            >
              Stop
            </button>
          </div>
        )}
      </div>

      {/* Main Reading Frame */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Section Kicker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-xs uppercase tracking-widest text-opinion-crimson">
            {article.section}
          </span>
          {article.subSection && (
            <>
              <span className="text-border-hairline">•</span>
              <span className="font-medium text-xs uppercase tracking-wider text-ink-subtle">
                {article.subSection}
              </span>
            </>
          )}
        </div>

        {/* Article Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink-black leading-[1.15] tracking-tight mb-4">
          {article.title}
        </h1>

        {/* Deck */}
        <p className="font-serif text-lg sm:text-xl text-ink-charcoal leading-relaxed mb-6 font-normal">
          {article.deck}
        </p>

        {/* Byline & Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between border-t border-b border-border-hairline py-3 mb-6 text-xs text-ink-subtle gap-2">
          <div className="flex items-center gap-2">
            {article.authorAvatar && (
              <img
                src={article.authorAvatar}
                alt={article.byline}
                className="w-9 h-9 rounded-full object-cover border border-border-hairline"
              />
            )}
            <div>
              <div className="font-bold text-ink-black font-sans uppercase tracking-wider">
                {article.byline}
              </div>
              {article.authorRole && (
                <div className="text-[11px] text-ink-subtle">{article.authorRole}</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span>{article.publishDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <figure className="mb-8">
            <div className="overflow-hidden bg-paper-tint">
              <img
                src={article.imageUrl}
                alt={article.imageAlt || article.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
            {(article.imageCaption || article.imageCredit) && (
              <figcaption className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-ink-muted pt-2 border-b border-border-hairline pb-2 gap-1 font-sans">
                <span className="font-serif text-ink-charcoal italic">{article.imageCaption}</span>
                <span className="text-[10px] uppercase tracking-wider text-ink-subtle shrink-0">
                  {article.imageCredit}
                </span>
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Body */}
        <div className={`font-serif text-ink-charcoal space-y-5 ${getFontSizeClass()}`}>
          {article.content.map((paragraph, index) => {
            // First paragraph drop cap
            if (index === 0) {
              return (
                <p key={index} className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-ink-black">
                  {paragraph}
                </p>
              );
            }

            // Pull quote in between
            if (index === 2 && article.pullQuote) {
              return (
                <React.Fragment key={index}>
                  <p>{paragraph}</p>
                  <blockquote className="my-8 py-5 border-y-2 border-border-strong text-center">
                    <p className="font-serif italic text-xl sm:text-2xl text-ink-black leading-snug">
                      “{article.pullQuote.quote}”
                    </p>
                    <cite className="block text-xs uppercase tracking-widest font-sans font-bold text-ink-subtle mt-2 not-italic">
                      — {article.pullQuote.attribution}
                    </cite>
                  </blockquote>
                </React.Fragment>
              );
            }

            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Article End Tag */}
        <div className="my-8 pt-4 border-t border-border-hairline flex items-center justify-between text-xs text-ink-subtle">
          <span>A version of this article appears in print on Section A, Page 1.</span>
          <button
            onClick={copyShareLink}
            className="text-nyt-blue font-bold uppercase tracking-wider hover:underline"
          >
            Order Reprints
          </button>
        </div>

        {/* Reader Comments Drawer / Section */}
        <section className="mt-12 pt-8 border-t-2 border-border-strong">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-border-hairline">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-ink-black" />
              <h3 className="font-serif text-2xl font-bold text-ink-black">
                Comments ({comments.length})
              </h3>
            </div>
            <span className="text-xs text-ink-subtle">Moderated under NYT Editorial Standards</span>
          </div>

          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="mb-8 p-4 bg-paper-tint border border-border-hairline">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name & City"
                className="text-xs border border-border-hairline bg-white px-2 py-1 font-sans focus:outline-none focus:border-ink-black w-48"
              />
              <span className="text-xs text-ink-subtle">Share your perspective</span>
            </div>
            <textarea
              rows={3}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="What are your thoughts on this story? Comments are subject to community review..."
              className="w-full text-xs font-sans p-2 border border-border-hairline bg-white focus:outline-none focus:border-ink-black"
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  newCommentText.trim()
                    ? 'bg-ink-black text-white hover:bg-slate-800'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-white border border-border-hairline space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-ink-black">{comment.author}</span>
                    <span className="text-ink-subtle ml-2">{comment.location}</span>
                  </div>
                  <span className="text-ink-subtle text-[11px]">{comment.timeAgo}</span>
                </div>
                <p className="font-serif text-[15px] leading-relaxed text-ink-charcoal">
                  {comment.content}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border-hairline text-xs text-ink-subtle">
                  <button
                    onClick={() => handleUpvote(comment.id)}
                    className="flex items-center gap-1 hover:text-ink-black transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Recommend ({comment.upvotes})</span>
                  </button>
                  <button className="hover:text-ink-black">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back button bottom */}
        <div className="mt-12 text-center pb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-ink-black bg-ink-black text-white hover:bg-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Front Page</span>
          </button>
        </div>
      </div>
    </article>
  );
};
