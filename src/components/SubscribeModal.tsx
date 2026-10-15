import React, { useState } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [tier, setTier] = useState<'digital' | 'all-access'>('all-access');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => {
      if (onSuccess) onSuccess();
      onClose();
      setSubscribed(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-ink-black max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl font-sans">
        {/* Header */}
        <div className="p-4 border-b border-border-hairline flex items-center justify-between bg-paper-tint">
          <span className="font-masthead-gothic text-2xl">The New York Times</span>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5 text-ink-black" />
          </button>
        </div>

        {subscribed ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-[#2e7d32] text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Welcome to The New York Times</h3>
            <p className="text-xs text-ink-muted">
              Your subscription is active. Enjoy unlimited access to original independent journalism,
              interactive Games, Cooking, and Wirecutter.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center mb-6">
              <span className="font-bold text-[10px] uppercase tracking-widest text-live-red border border-live-red px-2 py-0.5 inline-block mb-2">
                Special Limited-Time Offer
              </span>
              <h2 className="font-serif text-3xl font-bold text-ink-black leading-tight">
                Understand the world.
                <br />
                $1 a week for your first year.
              </h2>
              <p className="text-xs text-ink-subtle mt-2">
                Cancel anytime. Includes unlimited reporting, podcast series, and news analysis.
              </p>
            </div>

            {/* Plan selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setTier('digital')}
                className={`p-3 text-left border transition-all ${
                  tier === 'digital'
                    ? 'border-2 border-ink-black bg-paper-tint'
                    : 'border-border-hairline hover:border-ink-black'
                }`}
              >
                <div className="font-bold text-xs uppercase tracking-wider text-ink-black">
                  Basic News
                </div>
                <div className="font-serif text-xl font-bold text-ink-black mt-1">$1.00<span className="text-xs font-normal text-ink-subtle">/wk</span></div>
                <ul className="mt-2 space-y-1 text-[11px] text-ink-muted">
                  <li className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#2e7d32]" /> News & Front Page
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#2e7d32]" /> Audio articles
                  </li>
                </ul>
              </button>

              <button
                type="button"
                onClick={() => setTier('all-access')}
                className={`p-3 text-left border relative transition-all ${
                  tier === 'all-access'
                    ? 'border-2 border-ink-black bg-paper-warm'
                    : 'border-border-hairline hover:border-ink-black'
                }`}
              >
                <span className="absolute -top-2.5 right-2 bg-nyt-blue text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5">
                  Best Value
                </span>
                <div className="font-bold text-xs uppercase tracking-wider text-ink-black">
                  All Access
                </div>
                <div className="font-serif text-xl font-bold text-ink-black mt-1">$1.50<span className="text-xs font-normal text-ink-subtle">/wk</span></div>
                <ul className="mt-2 space-y-1 text-[11px] text-ink-muted">
                  <li className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#2e7d32]" /> Full News Coverage
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#2e7d32]" /> NYT Games (Wordle)
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#2e7d32]" /> Cooking & Wirecutter
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#2e7d32]" /> The Athletic Sports
                  </li>
                </ul>
              </button>
            </div>

            {/* Subscribe Action */}
            <button
              onClick={handleSubscribe}
              className="w-full py-3 bg-nyt-blue hover:bg-[#255070] text-white font-bold text-xs uppercase tracking-widest transition-colors"
            >
              Start Subscription for $1/Week
            </button>

            <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-ink-subtle">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Billed $4 every 4 weeks. Cancel online anytime in account settings.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
