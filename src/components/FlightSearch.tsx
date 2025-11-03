import { useState, useMemo, useRef, useEffect } from 'react';
import { Flight } from '../types/flight';
import { AIRPORTS } from '../utils/airports';
import { motion } from 'framer-motion';

interface FlightSearchProps {
  onSearch: (query: string) => void;
  onDropdownOpenChange?: (open: boolean) => void;
}

export const FlightSearch = ({ onSearch, onDropdownOpenChange }: FlightSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, _setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const setOpen = (next: boolean) => {
    _setOpen(next);
    onDropdownOpenChange?.(next);
  };

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as typeof AIRPORTS;
    return AIRPORTS.filter(a =>
      a.code.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setError('Please enter a flight number or airport code.');
      return;
    }
    setError(null);
    setOpen(false);
    onSearch(trimmed);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      const s = suggestions[activeIndex];
      if (s) {
        setSearchQuery(s.code);
        setOpen(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative" ref={containerRef}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary blur-xl opacity-15 dark:opacity-20 animate-gradient"></div>
        <div className={`relative flex gap-4 p-3 rounded-2xl shadow-lg transition-colors backdrop-blur-xl border ${error ? 'border-error/50' : 'border-gradient-purple/20'} bg-white/90 dark:bg-white/5 dark:border-white/10`}>
          <div className="relative flex-1 group">
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 dark:from-white/5 dark:via-white/5 dark:to-white/5"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpen(true); setActiveIndex(0); }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
              placeholder="Search by flight number or airport code (e.g., AA123 or JFK)"
              aria-invalid={!!error}
              aria-describedby={error ? 'search-error' : undefined}
              className="w-full p-4 bg-white/70 dark:bg-transparent rounded-xl focus:outline-none text-lg placeholder-night/60 dark:placeholder-white/40 relative z-10 text-night dark:text-white"
            />
            {open && suggestions.length > 0 && (
              <ul className="absolute z-30 mt-2 w-full max-h-64 overflow-auto rounded-xl border border-black/10 dark:border-white/10 shadow-card backdrop-blur-xl bg-white/95 dark:bg-[#0b1325]/90">
                {suggestions.map((s, i) => (
                  <li
                    key={s.code}
                    className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between ${i === activeIndex ? 'bg-black/5 dark:bg-white/10' : ''}`}
                    onMouseDown={() => { setSearchQuery(s.code); setOpen(false); }}
                  >
                    <span className="font-semibold text-night dark:text-white">{s.code}</span>
                    <span className="text-night/70 dark:text-white/60">{s.city} — {s.name}</span>
                  </li>
                ))}
              </ul>
            )}
            {error && (
              <p id="search-error" className="mt-2 text-sm text-error">{error}</p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.03, rotate: -0.5, translateZ: 4 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-lg shadow-lg
                     hover:shadow-xl active:shadow-card transition-all duration-200 relative overflow-hidden group"
          >
            <span className="relative z-10">Search</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </motion.button>
        </div>
      </div>
    </form>
  );
};