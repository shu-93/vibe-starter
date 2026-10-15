import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Award } from 'lucide-react';

const TARGET_WORDS = ['TIMES', 'PRESS', 'PAPER', 'PRINT', 'MEDIA', 'DAILY'];
const SECRET_WORD = 'TIMES';
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

export const WordleGame: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [message, setMessage] = useState<string>('');

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        setMessage('Too short');
        setTimeout(() => setMessage(''), 1500);
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess === SECRET_WORD) {
        setGameStatus('won');
        setMessage('Splendid! You guessed the daily word.');
      } else if (newGuesses.length >= MAX_ATTEMPTS) {
        setGameStatus('lost');
        setMessage(`The word was ${SECRET_WORD}`);
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
  };

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (SECRET_WORD[index] === letter) {
      return 'bg-[#6aaa64] text-white border-[#6aaa64]';
    }
    if (SECRET_WORD.includes(letter)) {
      return 'bg-[#c9b458] text-white border-[#c9b458]';
    }
    return 'bg-[#787c7e] text-white border-[#787c7e]';
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto p-4 select-none">
      <div className="flex items-center justify-between w-full pb-3 mb-3 border-b border-border-hairline">
        <div>
          <h3 className="font-serif text-xl font-bold tracking-tight">Wordle</h3>
          <p className="text-xs text-ink-subtle">Get 6 chances to guess a 5-letter word.</p>
        </div>
        <button
          onClick={resetGame}
          className="p-1.5 text-xs flex items-center gap-1 border border-border-hairline hover:border-ink-black text-ink-charcoal transition-colors"
          title="Play Again"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {message && (
        <div className="mb-2 px-3 py-1 bg-ink-black text-white text-xs font-bold animate-bounce rounded-none">
          {message}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-rows-6 gap-1.5 mb-5">
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
                  ? getLetterStatus(char, colIndex, guesses[rowIndex])
                  : hasChar
                  ? 'border-ink-charcoal text-ink-black'
                  : 'border-border-hairline text-ink-black';

                return (
                  <div
                    key={colIndex}
                    className={`w-11 h-11 border-2 flex items-center justify-center font-bold text-lg font-sans transition-colors ${statusClass}`}
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
              return (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`h-11 ${
                    isWide ? 'px-2.5 text-[11px] font-bold' : 'w-8 text-xs font-semibold'
                  } bg-[#d3d6da] hover:bg-[#bbb] active:scale-95 text-ink-black flex items-center justify-center transition-colors rounded-none`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {gameStatus === 'won' && (
        <div className="mt-4 p-3 bg-paper-tint border border-[#6aaa64] text-center w-full">
          <div className="flex items-center justify-center gap-1.5 text-[#6aaa64] font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>Genius! Solved in {guesses.length}/6</span>
          </div>
          <p className="text-xs text-ink-muted mt-1">Play everyday for your New York Times Games streak.</p>
        </div>
      )}
    </div>
  );
};
