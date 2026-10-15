import React, { useState } from 'react';
import { X, Volume2, Play, Pause, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../data/newsData';

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (articleId: string) => void;
}

export const BriefingModal: React.FC<BriefingModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  if (!isOpen) return null;

  const DIGEST_ITEMS = [
    {
      id: 'women-leaving-trump-admin',
      headline: 'White House Staffing Turmoil Deepens',
      summary: 'A string of high-profile departures among female directors has focused fresh scrutiny on decision-making inside the West Wing.'
    },
    {
      id: 'ukraine-exposure-satellites',
      headline: 'Kyiv Power Substation Strikes',
      summary: 'Over 600,000 residents in the Ukrainian capital remain without heat or electricity following pre-dawn missile barrages.'
    },
    {
      id: 'texas-senate-race-tightens',
      headline: 'Texas Senate Margin Compresses',
      summary: 'New Siena College data shows candidate Talarico holding a 1.8 point advantage as midterm ad spend passes $10 billion.'
    },
    {
      id: 'ai-agents-dinner-party',
      headline: 'Autonomous Agents Enter Social Scheduling',
      summary: 'Researchers reveal how personal AI proxies negotiate dietary choices and ride splits without human prompting.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-ink-black max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-border-strong bg-paper-warm">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl text-ink-black">
                The Evening Briefing
              </span>
            </div>
            <p className="text-xs text-ink-subtle mt-0.5">
              Wednesday, October 14, 2026 • 5 min audio & text digest
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5 text-ink-black" />
          </button>
        </div>

        {/* Audio Player Banner */}
        <div className="p-4 bg-paper-tint border-b border-border-hairline flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-nyt-blue hover:bg-[#255070] text-white flex items-center justify-center transition-colors shrink-0 shadow-sm"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-ink-black">Listen to Today’s Briefing</span>
              <span className="text-ink-subtle">
                {isPlaying ? 'Playing • 2:14 / 5:00' : '5:00 min'}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5">
              <div
                className="bg-nyt-blue h-full"
                style={{ width: isPlaying ? '45%' : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Digest Items */}
        <div className="p-4 space-y-4 divide-y divide-border-hairline">
          {DIGEST_ITEMS.map((item, idx) => (
            <div key={item.id} className={idx > 0 ? 'pt-4' : ''}>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-base text-ink-black hover:text-nyt-blue cursor-pointer"
                      onClick={() => {
                        onSelectArticle(item.id);
                        onClose();
                      }}>
                    {item.headline}
                  </h4>
                  <p className="font-serif text-xs text-ink-charcoal leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onSelectArticle(item.id);
                    onClose();
                  }}
                  className="p-1 hover:text-nyt-blue text-ink-subtle shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-hairline bg-paper-tint flex items-center justify-between text-xs">
          <span className="text-ink-subtle">Produced by the New York Times Audio Desk</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-ink-black text-ink-black font-bold uppercase text-xs hover:bg-ink-black hover:text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
