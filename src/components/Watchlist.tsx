import { Flight } from '../types/flight';
import { useWatchlist } from '../contexts/WatchlistContext';
import { FlightCard } from './FlightCard';
import { motion } from 'framer-motion';

interface WatchlistProps {
	onSelect: (flight: Flight) => void;
}

export const Watchlist = ({ onSelect }: WatchlistProps) => {
	const { watchlist } = useWatchlist();

	if (watchlist.length === 0) {
		return (
			<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-gradient-purple/10 dark:border-white/10 shadow-card">
				<p className="text-center text-night/60 dark:text-white/60">Your watchlist is empty. Add flights to keep track of them here.</p>
			</motion.div>
		);
	}

	return (
		<div className="mt-12">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Watchlist</h2>
				<span className="text-night/50 dark:text-white/60 text-sm">{watchlist.length} saved {watchlist.length === 1 ? 'flight' : 'flights'}</span>
			</div>
			<motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{watchlist.map((flight) => (
					<motion.div key={`watch-${flight.id}`} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
						<FlightCard flight={flight} onClick={() => onSelect(flight)} />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};
