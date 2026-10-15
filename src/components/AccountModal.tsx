import React, { useState } from 'react';
import { X, User, Mail, ShieldCheck, CheckCircle } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  onOpenSubscribe: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  setUserEmail,
  isLoggedIn,
  setIsLoggedIn,
  onOpenSubscribe
}) => {
  const [emailInput, setEmailInput] = useState(userEmail || 'shuqin_93@msn.com');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setUserEmail(emailInput);
    setIsLoggedIn(true);
    onClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-ink-black max-w-md w-full shadow-2xl font-sans">
        {/* Header */}
        <div className="p-4 border-b border-border-hairline flex items-center justify-between bg-paper-tint">
          <span className="font-masthead-gothic text-2xl">The New York Times</span>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5 text-ink-black" />
          </button>
        </div>

        {isLoggedIn ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-border-hairline">
              <div className="w-12 h-12 rounded-full bg-ink-black text-white flex items-center justify-center font-bold text-lg">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-sm text-ink-black">{userEmail}</h3>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#2e7d32] font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> All-Access Subscriber
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border-hairline">
                <span className="text-ink-subtle">Edition Preference</span>
                <span className="font-bold">U.S. National</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-hairline">
                <span className="text-ink-subtle">Crossword Streak</span>
                <span className="font-bold text-nyt-blue">14 Days</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-hairline">
                <span className="text-ink-subtle">Newsletter Delivery</span>
                <span className="font-bold">Evening Briefing Active</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleLogout}
                className="w-full py-2 border border-border-hairline text-ink-charcoal text-xs font-bold uppercase tracking-wider hover:border-ink-black transition-colors"
              >
                Log Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 bg-ink-black text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="p-6 space-y-4">
            <div className="text-center">
              <h3 className="font-serif text-2xl font-bold text-ink-black">
                {isRegistering ? 'Create your NYT account' : 'Log in to The Times'}
              </h3>
              <p className="text-xs text-ink-subtle mt-1">
                Access articles, newsletters, and sync your reading list.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-subtle mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full p-2 border border-border-hairline bg-white text-xs focus:outline-none focus:border-ink-black"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-subtle mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full p-2 border border-border-hairline bg-white text-xs focus:outline-none focus:border-ink-black"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-ink-black hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest transition-colors"
            >
              {isRegistering ? 'Create Account' : 'Log In'}
            </button>

            <div className="text-center text-xs text-ink-subtle">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="hover:text-ink-black underline"
              >
                {isRegistering ? 'Already have an account? Log In' : 'Need an account? Register'}
              </button>
            </div>

            <div className="pt-2 border-t border-border-hairline text-center">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSubscribe();
                }}
                className="text-xs text-nyt-blue font-bold uppercase tracking-wider hover:underline"
              >
                Looking to subscribe? Get $1/week offer ›
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
