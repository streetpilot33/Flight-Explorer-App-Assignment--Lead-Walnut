import { Flight } from '../types/flight';
import { formatDateTime, getStatusColor, statusKey } from '../utils/flightUtils';
import { useWatchlist } from '../contexts/WatchlistContext';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

interface FlightCardProps {
  flight: Flight;
  onClick: () => void;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const FlightCard = ({ flight, onClick }: FlightCardProps) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isWatched = isInWatchlist(flight.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWatched) {
      removeFromWatchlist(flight.id);
    } else {
      addToWatchlist(flight);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={{ rotateX: 2, rotateY: -2, translateZ: 6, transition: { type: 'spring', stiffness: 200, damping: 15 } }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-br from-white via-dawn to-sunset dark:from-[#0f1629] dark:via-[#0b1325] dark:to-[#0f1629] rounded-2xl shadow-lg hover:shadow-elevated transition-all duration-300 p-6 cursor-pointer border border-gradient-purple/10 dark:border-white/5 will-change-transform"
      onClick={onClick}
      style={{
        backgroundImage: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {flight.airline}
            </h3>
          </div>
          <p className="text-night/70 dark:text-white/70 font-medium pl-4">Flight {flight.flightNumber}</p>
        </div>
        <button
          onClick={handleWatchlistClick}
          className={`p-2 rounded-full transition-all duration-300 border ${
            isWatched 
              ? 'bg-gradient-to-r from-gradient-purple to-gradient-pink text-white shadow-lg border-transparent' 
              : 'text-gradient-purple hover:bg-gradient-purple/10 dark:hover:bg-white/5 border-transparent'
          }`}
        >
          {isWatched ? <FaStar size={20} /> : <FaRegStar size={20} />}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-gradient-blue/10 dark:border-white/10">
          <p className="text-sm font-medium text-primary dark:text-purple-300">Departure</p>
          <p className="text-3xl font-extrabold mt-1 text-night dark:text-white">{flight.origin.code}</p>
          <p className="text-sm text-night/60 dark:text-white/60 mt-2">{formatDateTime(flight.departure.scheduled)}</p>
        </div>
        <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-gradient-purple/10 dark:border-white/10">
          <p className="text-sm font-medium text-accent dark:text-pink-300">Arrival</p>
          <p className="text-3xl font-extrabold mt-1 text-night dark:text-white">{flight.destination.code}</p>
          <p className="text-sm text-night/60 dark:text-white/60 mt-2">{formatDateTime(flight.arrival.scheduled)}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-3 bg-white/60 dark:bg-white/5 p-2 pr-4 rounded-full backdrop-blur-sm border border-gradient-blue/10 dark:border-white/10">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(flight.status)} shadow-sm flex items-center gap-1`}> 
            {statusKey(flight.status) === 'on' && <FaCheckCircle />}
            {statusKey(flight.status) === 'delayed' && <FaClock />}
            {statusKey(flight.status) === 'cancelled' && <FaTimesCircle />}
            {flight.status}
          </span>
          <span className="text-sm font-medium text-night/70 dark:text-white/70">
            {flight.duration}
          </span>
        </div>
        <div className="flex items-center gap-2 text-night/60 dark:text-white/60">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-purple"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-pink"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-blue"></div>
        </div>
      </div>
    </motion.div>
  );
};