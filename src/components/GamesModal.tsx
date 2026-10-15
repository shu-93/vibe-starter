import React, { useState } from 'react';
import { X, Puzzle, Sparkles, Hash, Grid } from 'lucide-react';
import { WordleGame } from './WordleGame';
import { MiniCrosswordGame } from './MiniCrosswordGame';

interface GamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGame?: 'wordle' | 'mini' | 'connections' | 'spelling-bee';
}

export const GamesModal: React.FC<GamesModalProps> = ({
  isOpen,
  onClose,
  initialGame = 'wordle'
}) => {
  const [activeTab, setActiveTab] = useState<'wordle' | 'mini' | 'connections' | 'spelling-bee'>(
    initialGame
  );

  // Sync initialGame prop if opened with specific game
  React.useEffect(() => {
    if (initialGame) setActiveTab(initialGame);
  }, [initialGame]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-ink-black max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ink-black bg-paper-tint">
          <div className="flex items-center gap-2">
            <span className="font-masthead-gothic text-2xl tracking-normal">The New York Times</span>
            <span className="text-border-hairline">|</span>
            <span className="font-serif font-bold text-sm tracking-widest uppercase text-ink-black">
              Games
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-ink-black" />
          </button>
        </div>

        {/* Game Selector Tabs */}
        <div className="flex border-b border-border-hairline bg-paper-pure overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('wordle')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'wordle'
                ? 'border-ink-black text-ink-black bg-paper-tint'
                : 'border-transparent text-ink-subtle hover:text-ink-black'
            }`}
          >
            <span className="w-2.5 h-2.5 bg-[#6aaa64]"></span>
            Wordle
          </button>
          <button
            onClick={() => setActiveTab('mini')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'mini'
                ? 'border-ink-black text-ink-black bg-paper-tint'
                : 'border-transparent text-ink-subtle hover:text-ink-black'
            }`}
          >
            <span className="w-2.5 h-2.5 bg-nyt-blue"></span>
            The Mini
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'connections'
                ? 'border-ink-black text-ink-black bg-paper-tint'
                : 'border-transparent text-ink-subtle hover:text-ink-black'
            }`}
          >
            <span className="w-2.5 h-2.5 bg-[#b5e352]"></span>
            Connections
          </button>
          <button
            onClick={() => setActiveTab('spelling-bee')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'spelling-bee'
                ? 'border-ink-black text-ink-black bg-paper-tint'
                : 'border-transparent text-ink-subtle hover:text-ink-black'
            }`}
          >
            <span className="w-2.5 h-2.5 bg-[#f7da21]"></span>
            Spelling Bee
          </button>
        </div>

        {/* Content */}
        <div className="p-4 bg-white">
          {activeTab === 'wordle' && <WordleGame />}
          {activeTab === 'mini' && <MiniCrosswordGame />}
          {activeTab === 'connections' && <ConnectionsPreview />}
          {activeTab === 'spelling-bee' && <SpellingBeePreview />}
        </div>
      </div>
    </div>
  );
};

const ConnectionsPreview: React.FC = () => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<string[]>([]);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(4);
  const [feedback, setFeedback] = useState<string>('');

  const GROUPS = [
    {
      category: 'PARTS OF A NEWSPAPER',
      words: ['BYLINE', 'MASTHEAD', 'LEDE', 'FOLIO'],
      color: 'bg-[#f9df6d] text-ink-black'
    },
    {
      category: 'PRINTING TERMS',
      words: ['FONT', 'KERNING', 'SERIF', 'BLEED'],
      color: 'bg-[#a0c35a] text-ink-black'
    },
    {
      category: 'PUNCTUATION MARKS',
      words: ['COLON', 'DASH', 'PERIOD', 'COMMA'],
      color: 'bg-[#b0c4de] text-ink-black'
    },
    {
      category: 'SYNONYMS FOR REPORT',
      words: ['ARTICLE', 'DISPATCH', 'PIECE', 'ACCOUNT'],
      color: 'bg-[#ba81c5] text-white'
    }
  ];

  const allWords = [
    'BYLINE', 'FONT', 'COLON', 'ARTICLE',
    'MASTHEAD', 'KERNING', 'DASH', 'DISPATCH',
    'LEDE', 'SERIF', 'PERIOD', 'PIECE',
    'FOLIO', 'BLEED', 'COMMA', 'ACCOUNT'
  ];

  const toggleSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const submitGuess = () => {
    if (selectedWords.length !== 4) return;

    for (const group of GROUPS) {
      const match = group.words.every((w) => selectedWords.includes(w));
      if (match) {
        setSolvedGroups([...solvedGroups, group.category]);
        setSelectedWords([]);
        setFeedback(`Group Solved: ${group.category}!`);
        setTimeout(() => setFeedback(''), 2500);
        return;
      }
    }

    setAttemptsRemaining((prev) => Math.max(0, prev - 1));
    setFeedback('Incorrect group. Try again!');
    setTimeout(() => setFeedback(''), 2000);
  };

  return (
    <div className="max-w-md mx-auto p-2 text-center font-sans">
      <h3 className="font-serif text-xl font-bold tracking-tight">Connections</h3>
      <p className="text-xs text-ink-subtle mb-4">Group 4 words that share a hidden link.</p>

      {feedback && (
        <div className="mb-3 py-1 px-3 bg-ink-black text-white text-xs font-bold">
          {feedback}
        </div>
      )}

      {/* Solved Groups */}
      <div className="space-y-2 mb-3">
        {GROUPS.filter((g) => solvedGroups.includes(g.category)).map((g) => (
          <div key={g.category} className={`p-2.5 font-bold text-xs uppercase ${g.color}`}>
            <div>{g.category}</div>
            <div className="font-normal text-[11px] mt-0.5">{g.words.join(', ')}</div>
          </div>
        ))}
      </div>

      {/* Unsolved grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {allWords
          .filter((word) => {
            const group = GROUPS.find((g) => g.words.includes(word));
            return !group || !solvedGroups.includes(group.category);
          })
          .map((word) => {
            const isSelected = selectedWords.includes(word);
            return (
              <button
                key={word}
                onClick={() => toggleSelect(word)}
                className={`h-16 text-xs font-bold uppercase transition-colors border ${
                  isSelected
                    ? 'bg-ink-black text-white border-ink-black'
                    : 'bg-[#efefe6] hover:bg-[#e2e2d5] text-ink-black border-transparent'
                }`}
              >
                {word}
              </button>
            );
          })}
      </div>

      <div className="flex items-center justify-between text-xs text-ink-charcoal border-t border-border-hairline pt-3">
        <div className="flex items-center gap-1 font-label-meta">
          <span>Mistakes remaining:</span>
          {Array.from({ length: attemptsRemaining }).map((_, i) => (
            <span key={i} className="w-2 h-2 rounded-full bg-ink-charcoal inline-block"></span>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedWords([])}
            className="px-3 py-1 border border-border-hairline text-xs hover:border-ink-black"
          >
            Deselect All
          </button>
          <button
            onClick={submitGuess}
            disabled={selectedWords.length !== 4}
            className={`px-4 py-1 text-xs font-bold uppercase tracking-wider ${
              selectedWords.length === 4
                ? 'bg-ink-black text-white hover:bg-slate-800'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const SpellingBeePreview: React.FC = () => {
  const [word, setWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>(['REPORT', 'PRESS', 'EDITOR']);
  const [score, setScore] = useState(14);
  const [message, setMessage] = useState('');

  const CENTER = 'E';
  const OUTERS = ['P', 'O', 'R', 'T', 'S', 'D'];
  const VALID_WORDS = ['REPORT', 'PRESS', 'EDITOR', 'POST', 'SPEED', 'REPOST', 'STEEP', 'PEER'];

  const addLetter = (l: string) => setWord((prev) => prev + l);
  const deleteLetter = () => setWord((prev) => prev.slice(0, -1));

  const submitWord = () => {
    if (word.length < 4) {
      setMessage('Too short');
      setTimeout(() => setMessage(''), 1500);
      return;
    }
    if (!word.includes(CENTER)) {
      setMessage(`Missing center letter ${CENTER}`);
      setTimeout(() => setMessage(''), 1500);
      return;
    }
    if (foundWords.includes(word)) {
      setMessage('Already found');
      setTimeout(() => setMessage(''), 1500);
      return;
    }

    if (VALID_WORDS.includes(word)) {
      setFoundWords([...foundWords, word]);
      setScore((s) => s + word.length);
      setMessage(`Nice! +${word.length} points`);
      setWord('');
      setTimeout(() => setMessage(''), 1500);
    } else {
      setMessage('Not in word list');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto p-2 text-center font-sans">
      <h3 className="font-serif text-xl font-bold tracking-tight">Spelling Bee</h3>
      <p className="text-xs text-ink-subtle mb-2">Words must contain the center letter and be ≥4 letters.</p>

      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider px-2 py-1 bg-paper-tint border border-border-hairline mb-4">
        <span>Rank: Solid</span>
        <span>Score: {score} pts</span>
      </div>

      {message && (
        <div className="mb-2 py-1 px-3 bg-ink-black text-white text-xs font-bold inline-block">
          {message}
        </div>
      )}

      <div className="text-2xl font-bold tracking-widest min-h-[36px] border-b border-border-hairline mb-4 font-serif">
        {word ? (
          word.split('').map((c, i) => (
            <span key={i} className={c === CENTER ? 'text-[#f7da21]' : 'text-ink-black'}>
              {c}
            </span>
          ))
        ) : (
          <span className="text-ink-subtle text-sm font-normal font-sans">Click letters to spell</span>
        )}
      </div>

      {/* Hive Buttons */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="flex gap-2">
          {OUTERS.slice(0, 3).map((l) => (
            <button
              key={l}
              onClick={() => addLetter(l)}
              className="w-11 h-11 bg-paper-tint hover:bg-slate-200 font-bold text-base border border-border-hairline"
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={() => addLetter(CENTER)}
          className="w-12 h-12 bg-[#f7da21] hover:bg-[#e6c810] font-bold text-lg border border-[#e6c810] shadow-sm text-ink-black"
        >
          {CENTER}
        </button>
        <div className="flex gap-2">
          {OUTERS.slice(3, 6).map((l) => (
            <button
              key={l}
              onClick={() => addLetter(l)}
              className="w-11 h-11 bg-paper-tint hover:bg-slate-200 font-bold text-base border border-border-hairline"
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 mb-4 text-xs font-medium">
        <button
          onClick={deleteLetter}
          className="px-3 py-1.5 border border-border-hairline hover:border-ink-black"
        >
          Delete
        </button>
        <button
          onClick={submitWord}
          className="px-4 py-1.5 bg-ink-black text-white hover:bg-slate-800 font-bold uppercase tracking-wider"
        >
          Enter
        </button>
      </div>

      {/* Found words */}
      <div className="text-left text-xs border-t border-border-hairline pt-2">
        <div className="font-bold text-ink-subtle mb-1">Found ({foundWords.length}):</div>
        <div className="flex flex-wrap gap-1.5">
          {foundWords.map((w) => (
            <span key={w} className="px-2 py-0.5 bg-paper-tint border border-border-hairline text-ink-charcoal font-semibold">
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
