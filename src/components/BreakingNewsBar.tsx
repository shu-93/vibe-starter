import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Bell } from 'lucide-react';

interface BreakingNewsBarProps {
  onSelectStory: (id: string) => void;
}

export const BreakingNewsBar: React.FC<BreakingNewsBarProps> = ({ onSelectStory }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  if (isDismissed) return null;

  return (
    <div className="w-full bg-[#fcf2f2] border-y border-[#f5c6cb] font-sans">
      <div className="max-w-7xl mx-auto px-margin py-2">
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-live-red animate-pulse shrink-0"></span>
            <span className="font-bold text-live-red uppercase tracking-wider text-[11px] shrink-0">
              Developing
            </span>
            <span className="text-border-hairline hidden sm:inline">|</span>
            <button
              onClick={() => onSelectStory('women-leaving-trump-admin')}
              className="font-bold text-ink-black hover:text-live-red truncate text-left cursor-pointer transition-colors"
            >
              White House confirms senior personnel transitions; Senate oversight panel requests briefing files.
            </button>
            <span className="text-[11px] text-ink-subtle hidden md:inline shrink-0">
              Updated 2m ago
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-ink-charcoal hover:text-ink-black flex items-center gap-0.5 font-semibold"
            >
              <span>{isExpanded ? 'Less' : 'Details'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-ink-subtle hover:text-ink-black p-0.5"
              title="Dismiss alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-[#f5c6cb] text-xs text-ink-charcoal space-y-1.5 animate-in fade-in duration-150">
            <p>
              • <strong>2:45 PM:</strong> Deputy National Security Advisor tenders resignation citing strategic divergences.
            </p>
            <p>
              • <strong>2:18 PM:</strong> Senate Intelligence leaders issue joint request for documentation regarding security credential timelines.
            </p>
            <p>
              • <strong>1:50 PM:</strong> White House press secretary announces expedited appointment of acting cabinet liaisons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
