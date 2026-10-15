import React from 'react';
import { TrendingUp, TrendingDown, Sun, CloudRain, Wind, Droplets, X } from 'lucide-react';

interface MarketsWeatherPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  editionName: string;
}

export const MarketsWeatherPopover: React.FC<MarketsWeatherPopoverProps> = ({
  isOpen,
  onClose,
  editionName
}) => {
  if (!isOpen) return null;

  const INDICES = [
    { name: 'S&P 500', value: '5,842.10', change: '+27.84', pct: '+0.48%', up: true },
    { name: 'Dow Jones', value: '43,077.70', change: '+337.28', pct: '+0.79%', up: true },
    { name: 'Nasdaq Composite', value: '18,367.08', change: '-35.12', pct: '-0.19%', up: false },
    { name: '10-Yr Treasury Yield', value: '4.03%', change: '-0.02', pct: '-0.49%', up: false },
    { name: 'Crude Oil (WTI)', value: '$70.58', change: '-0.19', pct: '-0.27%', up: false },
    { name: 'Gold', value: '$2,682.40', change: '+14.20', pct: '+0.53%', up: true },
    { name: 'Bitcoin', value: '$67,820', change: '+1,450', pct: '+2.18%', up: true }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white border-2 border-ink-black max-w-xl w-full shadow-2xl font-sans overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-3 bg-paper-warm border-b border-border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-xs text-ink-black">
              Markets &amp; Weather Dashboard • {editionName} Edition
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 transition-colors">
            <X className="w-4 h-4 text-ink-black" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Weather Panel */}
          <div className="p-3 bg-paper-tint border border-border-hairline">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-hairline">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-subtle">
                Weather Forecast • New York City, NY
              </span>
              <span className="text-[11px] text-ink-subtle">Updated 10m ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-8 h-8 text-amber-500" />
                <div>
                  <div className="text-2xl font-serif font-bold text-ink-black">64°F</div>
                  <div className="text-xs text-ink-muted">Partly Cloudy • High 68° / Low 52°</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-[11px] text-ink-subtle">
                <div className="p-1.5 bg-white border border-border-hairline">
                  <Wind className="w-3.5 h-3.5 mx-auto mb-0.5 text-slate-500" />
                  <span>8 mph W</span>
                </div>
                <div className="p-1.5 bg-white border border-border-hairline">
                  <Droplets className="w-3.5 h-3.5 mx-auto mb-0.5 text-nyt-blue" />
                  <span>46% Hum</span>
                </div>
                <div className="p-1.5 bg-white border border-border-hairline">
                  <span className="font-bold block text-emerald-600">32</span>
                  <span>Good AQI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Markets Ticker Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-black">
                Major Financial Indices &amp; Commodities
              </span>
              <span className="text-[10px] text-ink-subtle uppercase">NYT Business Desk</span>
            </div>
            <div className="border border-border-hairline divide-y divide-border-hairline text-xs font-sans">
              {INDICES.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-2 hover:bg-paper-tint transition-colors">
                  <span className="font-semibold text-ink-black">{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-ink-charcoal font-medium">{item.value}</span>
                    <span
                      className={`font-mono font-bold flex items-center gap-0.5 min-w-[70px] justify-end ${
                        item.up ? 'text-emerald-700' : 'text-opinion-crimson'
                      }`}
                    >
                      {item.up ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {item.pct}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-paper-tint border-t border-border-hairline flex items-center justify-between text-xs text-ink-subtle">
          <span>Market data delayed at least 15 minutes.</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-ink-black text-white uppercase text-[10px] font-bold tracking-wider hover:bg-slate-800"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
