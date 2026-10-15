import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Award, Share2, Check, BarChart2 } from 'lucide-react';

const SECRET_WORD = 'TIMES';
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

export const WordleGame: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [message, setMessage] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        setIsShaking(true);
        setMessage('Not enough letters');
        setTimeout(() => {
          setIsShaking(false);
          setMessage('');
        }, 1200);
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess === SECRET_WORD) {
        setGameStatus('won');
        setMessage('Splendid! You solved today’s puzzle.');
        setTimeout(() => setShowStats(true), 1500);
      } else if (newGuesses.length >= MAX_ATTEMPTS) {
        setGameStatus('lost');
        setMessage(`The word was ${SECRET_WORD}`);
        setTimeout(() => setShowStats(true), 1500);
      }
    } else if (key === 'BACKSPACE' || key === 'DEL') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + key);
    }
  }, [currentGuess, gameStatus, guesses]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else {
        const letter = e.key.toUpperCase();
        if (/^[A-Z]$/.test(letter)) {
          handleKeyPress(letter);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyPress]);

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setMessage('');
    setShowStats(false);
  };

  const getLetterStatus = (letter: string, index: number) => {
    if (SECRET_WORD[index] === letter) {
      return 'bg-[#6aaa64] text-white border-[#6aaa64]';
    }
    if (SECRET_WORD.includes(letter)) {
      return 'bg-[#c9b458] text-white border-[#c9b458]';
    }
    return 'bg-[#787c7e] text-white border-[#787c7e]';
  };

  const getKeyBg = (key: string) => {
    let status = 'bg-[#d3d6da] text-ink-black';
    for (const guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === key) {
          if (SECRET_WORD[i] === key) return 'bg-[#6aaa64] text-white';
          if (SECRET_WORD.includes(key) && status !== 'bg-[#6aaa64] text-white') {
            status = 'bg-[#c9b458] text-white';
          } else if (!SECRET_WORD.includes(key) && status === 'bg-[#d3d6da] text-ink-black') {
            status = 'bg-[#787c7e] text-white';
          }
        }
      }
    }
    return status;
  };

  const copyEmojiResults = () => {
    let result = `Wordle 1,241 ${guesses.length}/${MAX_ATTEMPTS}\n\n`;
    for (const guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (SECRET_WORD[i] === guess[i]) result += '🟩';
        else if (SECRET_WORD.includes(guess[i])) result += '🟨';
        else result += '⬛';
      }
      result += '\n';
    }
    navigator.clipboard?.writeText(result);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto p-4 select-none font-sans">
      <div className="flex items-center justify-between w-full pb-3 mb-3 border-b border-border-hairline">
        <div>
          <h3 className="font-serif text-2xl font-bold tracking-tight">Wordle</h3>
          <p className="text-xs text-ink-subtle">Get 6 chances to guess a 5-letter word.</p>
        </div>
        <div className="flex items-center gap-1">
          {gameStatus !== 'playing' && (
            <button
              onClick={() => setShowStats(true)}
              className="p-1.5 border border-border-hairline hover:border-ink-black text-ink-charcoal text-xs"
              title="Statistics"
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={resetGame}
            className="p-1.5 text-xs flex items-center gap-1 border border-border-hairline hover:border-ink-black text-ink-charcoal transition-colors cursor-pointer"
            title="Play Again"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-2 px-4 py-1.5 bg-ink-black text-white text-xs font-bold shadow-lg animate-in fade-in duration-100">
          {message}
        </div>
      )}

      {/* Grid */}
      <div className={`grid grid-rows-6 gap-1.5 mb-5 ${isShaking ? 'animate-bounce' : ''}`}>
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
          const isSubmitted = rowIndex < guesses.length;
          const isCurrent = rowIndex === guesses.length;
          const rowWord = isSubmitted
            ? guesses[rowIndex]
            : isCurrent
            ? currentGuess.padEnd(WORD_LENGTH, ' ')
            : '     ';

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const char = rowWord[colIndex] || ' ';
                const hasChar = char !== ' ';
                const statusClass = isSubmitted
                  ? getLetterStatus(char, colIndex)
                  : hasChar
                  ? 'border-ink-black text-ink-black scale-102 transition-transform'
                  : 'border-slate-300 text-ink-black';

                return (
                  <div
                    key={colIndex}
                    className={`w-11 h-11 border-2 flex items-center justify-center font-bold text-lg font-sans transition-all duration-300 ${statusClass}`}
                  >
                    {hasChar ? char : ''}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Keyboard */}
      <div className="w-full space-y-1.5">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1">
            {row.map((key) => {
              const isWide = key === 'ENTER' || key === 'DEL';
              const keyBg = getKeyBg(key);
              return (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`h-12 ${
                    isWide ? 'px-3 text-[10px] font-bold' : 'w-8 text-xs font-semibold'
                  } ${keyBg} hover:opacity-90 active:scale-95 text-ink-black flex items-center justify-center transition-all cursor-pointer`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Statistics Modal Popup */}
      {showStats && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-ink-black max-w-xs w-full p-6 text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <h4 className="font-serif font-bold text-xl mb-4">STATISTICS</h4>
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div>
                <div className="text-2xl font-bold font-serif">1</div>
                <div className="text-[10px] text-ink-subtle uppercase">Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif">{gameStatus === 'won' ? '100' : '0'}</div>
                <div className="text-[10px] text-ink-subtle uppercase">Win %</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif">{gameStatus === 'won' ? '1' : '0'}</div>
                <div className="text-[10px] text-ink-subtle uppercase">Current</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif">1</div>
                <div className="text-[10px] text-ink-subtle uppercase">Max</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyEmojiResults}
                className="w-full py-2.5 bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedShare ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedShare ? 'Copied Grid!' : 'Share Results'}</span>
              </button>
              <button
                onClick={() => setShowStats(false)}
                className="px-3 py-2.5 border border-border-hairline text-xs uppercase font-bold hover:border-ink-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
