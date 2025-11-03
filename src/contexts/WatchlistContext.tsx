import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Flight } from '../types/flight';

interface WatchlistContextType {
  watchlist: Flight[];
  addToWatchlist: (flight: Flight) => void;
  removeFromWatchlist: (flightId: string) => void;
  isInWatchlist: (flightId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Flight[]>([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem('flightWatchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flightWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (flight: Flight) => {
    setWatchlist(prev => {
      if (prev.some(f => f.id === flight.id)) return prev;
      return [...prev, flight];
    });
  };

  const removeFromWatchlist = (flightId: string) => {
    setWatchlist(prev => prev.filter(flight => flight.id !== flightId));
  };

  const isInWatchlist = (flightId: string) => {
    return watchlist.some(flight => flight.id === flightId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};