import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus, BarChart3, ChevronRight } from 'lucide-react';

interface PollsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRace?: (raceId: string) => void;
}

export const PollsModal: React.FC<PollsModalProps> = ({ isOpen, onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'senate' | 'house' | 'governor'>('all');

  if (!isOpen) return null;

  const RACES = [
    {
      state: 'Texas',
      office: 'U.S. Senate',
      candidateD: 'James Talarico',
      pctD: 49.2,
      candidateR: 'Ted Cruz',
      pctR: 47.4,
      margin: 'DEM +1.8',
      trend: 'up',
      samples: '1,240 RV',
      pollster: 'NYT/Siena College'
    },
    {
      state: 'Georgia',
      office: 'U.S. Senate',
      candidateD: 'Raphael Warnock',
      pctD: 50.1,
      candidateR: 'Brian Kemp',
      pctR: 48.3,
      margin: 'DEM +1.8',
      trend: 'up',
      samples: '980 LV',
      pollster: 'Atlanta Journal-Constitution'
    },
    {
      state: 'Maine',
      office: 'U.S. Senate',
      candidateD: 'Graham Platner',
      pctD: 46.5,
      candidateR: 'Susan Collins',
      pctR: 48.0,
      margin: 'GOP +1.5',
      trend: 'down',
      samples: '650 LV',
      pollster: 'University of New Hampshire'
    },
    {
      state: 'Michigan',
      office: 'Governor',
      candidateD: 'Mallory McMorrow',
      pctD: 51.4,
      candidateR: 'John James',
      pctR: 46.2,
      margin: 'DEM +5.2',
      trend: 'up',
      samples: '820 LV',
      pollster: 'Detroit Free Press'
    },
    {
      state: 'Pennsylvania',
      office: 'U.S. Senate',
      candidateD: 'John Fetterman',
      pctD: 48.8,
      candidateR: 'Dave McCormick',
      pctR: 48.5,
      margin: 'DEM +0.3',
      trend: 'neutral',
      samples: '1,100 LV',
      pollster: 'Muhlenberg College'
    },
    {
      state: 'National',
      office: 'Generic Congressional Ballot',
      candidateD: 'Democrats',
      pctD: 46.8,
      candidateR: 'Republicans',
      pctR: 47.4,
      margin: 'GOP +0.6',
      trend: 'down',
      samples: '3,450 RV',
      pollster: 'NYT/Siena College Aggregate'
    }
  ];

  const filteredRaces = RACES.filter((r) => {
    if (selectedFilter === 'senate') return r.office.includes('Senate');
    if (selectedFilter === 'house') return r.office.includes('Congressional');
    if (selectedFilter === 'governor') return r.office.includes('Governor');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-ink-black max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ink-black bg-paper-tint">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-live-red"></span>
              <span className="font-serif font-bold text-lg tracking-tight text-ink-black">
                The New York Times Polling Tracker
              </span>
            </div>
            <p className="text-xs text-ink-subtle mt-0.5">
              Midterm Senate, House & Gubernatorial Averages • Updated hourly
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5 text-ink-black" />
          </button>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 border-b border-border-hairline bg-paper-warm">
          <div className="p-3 bg-white border border-border-hairline text-center">
            <span className="text-[10px] text-ink-subtle uppercase tracking-wider block font-bold">
              Senate Control
            </span>
            <span className="text-xl font-bold font-serif text-ink-black mt-1 block">DEM +1.8</span>
            <span className="text-[10px] text-nyt-blue font-semibold">Talarico leads in TX</span>
          </div>
          <div className="p-3 bg-white border border-border-hairline text-center">
            <span className="text-[10px] text-ink-subtle uppercase tracking-wider block font-bold">
              House Margin
            </span>
            <span className="text-xl font-bold font-serif text-ink-black mt-1 block">GOP +0.6</span>
            <span className="text-[10px] text-ink-muted">219 GOP / 216 DEM</span>
          </div>
          <div className="p-3 bg-white border border-border-hairline text-center">
            <span className="text-[10px] text-ink-subtle uppercase tracking-wider block font-bold">
              Governors Net
            </span>
            <span className="text-xl font-bold font-serif text-ink-black mt-1 block">TIE 48%</span>
            <span className="text-[10px] text-ink-muted">3 Toss-up states</span>
          </div>
          <div className="p-3 bg-white border border-border-hairline text-center">
            <span className="text-[10px] text-ink-subtle uppercase tracking-wider block font-bold">
              Presidential Approval
            </span>
            <span className="text-xl font-bold font-serif text-opinion-crimson mt-1 block">41.2%</span>
            <span className="text-[10px] text-opinion-crimson">Disapprove: 54.8%</span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="px-4 py-2 border-b border-border-hairline flex items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'senate', 'house', 'governor'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors border ${
                  selectedFilter === filter
                    ? 'bg-ink-black text-white border-ink-black'
                    : 'bg-white text-ink-charcoal border-border-hairline hover:border-ink-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="text-xs text-ink-subtle hidden sm:inline">
            Showing {filteredRaces.length} battleground races
          </span>
        </div>

        {/* Races Table */}
        <div className="divide-y divide-border-hairline">
          {filteredRaces.map((race, idx) => (
            <div key={idx} className="p-4 hover:bg-paper-tint transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-sm text-ink-black mr-2">{race.state}</span>
                  <span className="text-xs text-ink-subtle uppercase tracking-wider">
                    {race.office}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-serif font-bold text-sm px-2 py-0.5 border ${
                      race.margin.startsWith('DEM')
                        ? 'border-nyt-blue text-nyt-blue bg-blue-50/50'
                        : race.margin.startsWith('GOP')
                        ? 'border-opinion-crimson text-opinion-crimson bg-red-50/50'
                        : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    {race.margin}
                  </span>
                </div>
              </div>

              {/* Progress visual comparison */}
              <div className="space-y-1.5 my-3">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-nyt-blue font-bold">
                    {race.candidateD} (D): {race.pctD}%
                  </span>
                  <span className="text-opinion-crimson font-bold">
                    {race.candidateR} (R): {race.pctR}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 flex overflow-hidden">
                  <div
                    className="bg-nyt-blue h-full"
                    style={{ width: `${race.pctD}%` }}
                  ></div>
                  <div
                    className="bg-opinion-crimson h-full ml-auto"
                    style={{ width: `${race.pctR}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-ink-subtle">
                <span>Pollster: {race.pollster}</span>
                <span>Sample: {race.samples}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-paper-tint border-t border-border-hairline text-xs text-ink-subtle flex items-center justify-between">
          <span>Methodology: Siena College poll of registered voters weighted by census turnout.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-ink-black text-ink-black font-bold uppercase text-xs hover:bg-ink-black hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
