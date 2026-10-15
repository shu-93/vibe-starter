import React, { useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface Cell {
  row: number;
  col: number;
  number?: number;
  solution: string;
  isBlack?: boolean;
}

// 5x5 Mini Crossword Grid
// Row 0: P O S T S
// Row 1: R A D A R
// Row 2: E X P E L
// Row 3: S C E N E
// Row 4: S E E D S
const GRID_DATA: Cell[][] = [
  [
    { row: 0, col: 0, number: 1, solution: 'P' },
    { row: 0, col: 1, number: 2, solution: 'O' },
    { row: 0, col: 2, number: 3, solution: 'S' },
    { row: 0, col: 3, number: 4, solution: 'T' },
    { row: 0, col: 4, number: 5, solution: 'S' }
  ],
  [
    { row: 1, col: 0, number: 6, solution: 'R' },
    { row: 1, col: 1, solution: 'A' },
    { row: 1, col: 2, solution: 'D' },
    { row: 1, col: 3, solution: 'A' },
    { row: 1, col: 4, solution: 'R' }
  ],
  [
    { row: 2, col: 0, number: 7, solution: 'E' },
    { row: 2, col: 1, solution: 'X' },
    { row: 2, col: 2, solution: 'P' },
    { row: 2, col: 3, solution: 'E' },
    { row: 2, col: 4, solution: 'L' }
  ],
  [
    { row: 3, col: 0, number: 8, solution: 'S' },
    { row: 3, col: 1, solution: 'C' },
    { row: 3, col: 2, solution: 'E' },
    { row: 3, col: 3, solution: 'N' },
    { row: 3, col: 4, solution: 'E' }
  ],
  [
    { row: 4, col: 0, number: 9, solution: 'S' },
    { row: 4, col: 1, solution: 'E' },
    { row: 4, col: 2, solution: 'E' },
    { row: 4, col: 3, solution: 'D' },
    { row: 4, col: 4, solution: 'S' }
  ]
];

const CLUES = {
  across: [
    { num: 1, text: 'Shares online, or wooden fence supports' },
    { num: 6, text: 'Air traffic control detection system' },
    { num: 7, text: 'Officially force out of school' },
    { num: 8, text: 'Playwright’s division, or theatrical setting' },
    { num: 9, text: 'Botanical starters for a garden' }
  ],
  down: [
    { num: 1, text: 'Journalistic medium in our broadsheet masthead' },
    { num: 2, text: 'Tree that drops acorns' },
    { num: 3, text: 'Speed at which a car travels' },
    { num: 4, text: 'Tavern beverages' },
    { num: 5, text: 'Winter sports on snowy hills' }
  ]
};

export const MiniCrosswordGame: React.FC = () => {
  const [userGrid, setUserGrid] = useState<string[][]>(() =>
    Array(5).fill('').map(() => Array(5).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleCellClick = (r: number, c: number) => {
    if (selectedCell.r === r && selectedCell.c === c) {
      setDirection((d) => (d === 'across' ? 'down' : 'across'));
    } else {
      setSelectedCell({ r, c });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { r, c } = selectedCell;

    if (e.key === 'Backspace') {
      const newGrid = userGrid.map((row) => [...row]);
      newGrid[r][c] = '';
      setUserGrid(newGrid);
      // Move backwards
      if (direction === 'across' && c > 0) setSelectedCell({ r, c: c - 1 });
      if (direction === 'down' && r > 0) setSelectedCell({ r: r - 1, c });
      return;
    }

    if (e.key === 'ArrowRight' && c < 4) setSelectedCell({ r, c: c + 1 });
    if (e.key === 'ArrowLeft' && c > 0) setSelectedCell({ r, c: c - 1 });
    if (e.key === 'ArrowDown' && r < 4) setSelectedCell({ r: r + 1, c });
    if (e.key === 'ArrowUp' && r > 0) setSelectedCell({ r: r - 1, c });

    if (/^[a-zA-Z]$/.test(e.key)) {
      const letter = e.key.toUpperCase();
      const newGrid = userGrid.map((row) => [...row]);
      newGrid[r][c] = letter;
      setUserGrid(newGrid);

      // Check completion
      let allCorrect = true;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (newGrid[i][j] !== GRID_DATA[i][j].solution) {
            allCorrect = false;
          }
        }
      }
      if (allCorrect) {
        setIsCompleted(true);
      }

      // Auto advance
      if (direction === 'across' && c < 4) {
        setSelectedCell({ r, c: c + 1 });
      } else if (direction === 'down' && r < 4) {
        setSelectedCell({ r: r + 1, c });
      }
    }
  };

  const resetGame = () => {
    setUserGrid(Array(5).fill('').map(() => Array(5).fill('')));
    setSelectedCell({ r: 0, c: 0 });
    setIsCompleted(false);
  };

  const solveGame = () => {
    const solved = GRID_DATA.map((row) => row.map((cell) => cell.solution));
    setUserGrid(solved);
    setIsCompleted(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-xl mx-auto focus:outline-none" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-between w-full pb-2 mb-3 border-b border-border-hairline">
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight">The Mini</h3>
            <p className="text-xs text-ink-subtle">Solve in 2 minutes.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetGame}
              className="p-1 text-xs border border-border-hairline hover:border-ink-black flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button
              onClick={solveGame}
              className="p-1 text-xs bg-paper-tint hover:bg-slate-200 border border-border-hairline"
            >
              Reveal
            </button>
          </div>
        </div>

        {/* 5x5 Grid */}
        <div className="grid grid-cols-5 border-2 border-ink-black bg-ink-black gap-[1px]">
          {GRID_DATA.map((row, r) =>
            row.map((cell, c) => {
              const isSelected = selectedCell.r === r && selectedCell.c === c;
              const isRowOrCol =
                direction === 'across' ? selectedCell.r === r : selectedCell.c === c;
              const val = userGrid[r][c];

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-12 h-12 relative flex items-center justify-center font-bold text-lg font-sans cursor-pointer select-none transition-colors ${
                    isSelected
                      ? 'bg-[#ffda00] text-ink-black'
                      : isRowOrCol
                      ? 'bg-[#e5f3ff] text-ink-black'
                      : 'bg-white text-ink-black hover:bg-slate-50'
                  }`}
                >
                  {cell.number && (
                    <span className="absolute top-0.5 left-1 text-[9px] font-sans font-medium text-ink-subtle pointer-events-none">
                      {cell.number}
                    </span>
                  )}
                  {val}
                </div>
              );
            })
          )}
        </div>

        {isCompleted && (
          <div className="mt-3 p-2 bg-[#e8f5e9] border border-[#2e7d32] text-xs font-semibold text-[#1b5e20] flex items-center gap-1.5 w-full justify-center">
            <CheckCircle2 className="w-4 h-4" />
            Congratulations! Mini completed!
          </div>
        )}
      </div>

      {/* Clues */}
      <div className="flex-1 space-y-4 text-xs font-sans">
        <div>
          <h4 className="font-bold uppercase tracking-wider text-ink-black border-b border-ink-black pb-1 mb-1.5">
            Across
          </h4>
          <ul className="space-y-1">
            {CLUES.across.map((clue) => (
              <li
                key={clue.num}
                className={`py-0.5 px-1 cursor-pointer transition-colors ${
                  direction === 'across' && selectedCell.r === clue.num - 1
                    ? 'bg-[#e5f3ff] font-semibold text-nyt-blue'
                    : 'text-ink-charcoal hover:bg-paper-tint'
                }`}
                onClick={() => {
                  setSelectedCell({ r: clue.num - 1, c: 0 });
                  setDirection('across');
                }}
              >
                <span className="font-bold mr-1.5">{clue.num}</span>
                {clue.text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider text-ink-black border-b border-ink-black pb-1 mb-1.5">
            Down
          </h4>
          <ul className="space-y-1">
            {CLUES.down.map((clue) => (
              <li
                key={clue.num}
                className={`py-0.5 px-1 cursor-pointer transition-colors ${
                  direction === 'down' && selectedCell.c === clue.num - 1
                    ? 'bg-[#e5f3ff] font-semibold text-nyt-blue'
                    : 'text-ink-charcoal hover:bg-paper-tint'
                }`}
                onClick={() => {
                  setSelectedCell({ r: 0, c: clue.num - 1 });
                  setDirection('down');
                }}
              >
                <span className="font-bold mr-1.5">{clue.num}</span>
                {clue.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
