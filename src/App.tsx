import { useState, useEffect } from 'react';
import { Flight } from './types/flight';
import { getFlights } from './services/flightService';
import { WatchlistProvider } from './contexts/WatchlistContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { FlightSearch } from './components/FlightSearch';
import { FlightCard } from './components/FlightCard';
import { FlightDetails } from './components/FlightDetails';
import { Watchlist } from './components/Watchlist';
import { DarkModeToggle } from './components/DarkModeToggle';
import { Hero } from './components/Hero';
import { AnimatePresence, motion } from 'framer-motion';
import { Filters, FiltersState } from './components/Filters';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FiltersState>({ airline: '', status: '', time: 'any' });
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      const data = await getFlights();
      setFlights(data);
      setFilteredFlights(data);
    } catch (err) {
      setError('Failed to load flights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredFlights(applyFilters(flights, filters));
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = flights.filter((flight) => {
      return (
        flight.flightNumber.toLowerCase().includes(lowerQuery) ||
        flight.origin.code.toLowerCase().includes(lowerQuery) ||
        flight.destination.code.toLowerCase().includes(lowerQuery) ||
        flight.airline.toLowerCase().includes(lowerQuery)
      );
    });

    setFilteredFlights(applyFilters(filtered, filters));
  };

  const applyFilters = (list: Flight[], f: FiltersState) => {
    const inTime = (iso: string) => {
      const hour = new Date(iso).getUTCHours();
      switch (f.time) {
        case 'morning': return hour >= 5 && hour < 12;
        case 'afternoon': return hour >= 12 && hour < 17;
        case 'evening': return hour >= 17 && hour < 21;
        case 'night': return hour >= 21 || hour < 5;
        default: return true;
      }
    };

    return list.filter((fl) => (
      (!f.airline || fl.airline === f.airline) &&
      (!f.status || fl.status === f.status) &&
      (f.time === 'any' || inTime(fl.departure.scheduled))
    ));
  };

  useEffect(() => {
    setFilteredFlights(applyFilters(flights, filters));
  }, [filters, flights]);

  return (
    <WatchlistProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-[#0b1020] dark:via-[#0b1120] dark:to-[#0b1020] transition-colors">
          <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
            <div className="flex items-center justify-between mb-2">
              <h1 className="sr-only">Flight Explorer</h1>
              <DarkModeToggle />
            </div>

            <Hero />

            <section id="search" className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <FlightSearch onSearch={handleSearch} onDropdownOpenChange={setSearchDropdownOpen} />
              {!searchDropdownOpen && (
                <div className="mt-4">
                  <Filters flights={flights} value={filters} onChange={setFilters} />
                </div>
              )}
            </section>

            <section id="watchlist">
              <Watchlist onSelect={(f) => setSelectedFlight(f)} />
            </section>

            <section id="results">
            {loading ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto dark:border-purple-400"></div>
                <p className="mt-6 text-gray-600 font-medium dark:text-gray-300">Loading flights...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-6 rounded-xl text-center shadow-md animate-fade-in dark:bg-red-950/40 dark:text-red-300">
                <p className="font-medium text-lg">{error}</p>
              </div>
            ) : filteredFlights.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <p className="text-xl text-gray-600 font-medium dark:text-gray-300">No flights found matching your search.</p>
                <p className="text-gray-500 mt-2 dark:text-gray-400">Try searching with a different flight number or airport code.</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
                {filteredFlights.map((flight) => (
                  <motion.div key={flight.id} layout className="[transform-style:preserve-3d] transition-transform">
                    <FlightCard
                      flight={flight}
                      onClick={() => setSelectedFlight(flight)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
            </section>

            <AnimatePresence>
              {selectedFlight && (
                <FlightDetails
                  flight={selectedFlight}
                  onClose={() => setSelectedFlight(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </ThemeProvider>
    </WatchlistProvider>
  );
}

export default App;