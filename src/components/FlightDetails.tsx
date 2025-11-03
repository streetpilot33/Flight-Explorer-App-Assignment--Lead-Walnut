import { Flight } from '../types/flight';
import { formatDateTime, getStatusColor, statusKey } from '../utils/flightUtils';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

interface FlightDetailsProps {
  flight: Flight;
  onClose: () => void;
}

export const FlightDetails = ({ flight, onClose }: FlightDetailsProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-night/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center px-4 py-8 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.2 } }}
          exit={{ scale: 0.98, opacity: 0, y: 10, transition: { duration: 0.15 } }}
          className="bg-gradient-to-br from-white via-dawn to-sunset dark:from-[#0f1629] dark:via-[#0b1325] dark:to-[#0f1629] rounded-3xl w-full max-w-3xl mx-auto p-6 relative shadow-2xl border border-gradient-purple/20 dark:border-white/10 max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-3 bg-white/80 dark:bg-white/10 rounded-full backdrop-blur-sm hover:bg-gradient-to-r hover:from-gradient-purple hover:to-gradient-pink hover:text-white transform hover:rotate-90 transition-all duration-300 group shadow-lg"
          >
            <FaTimes size={20} className="group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-primary to-accent p-2.5 rounded-2xl shadow-lg">
              <div className="w-9 h-9 flex items-center justify-center text-white">
                ✈️
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {flight.airline}
              </h2>
              <p className="text-night/70 dark:text-white/70 font-medium">Flight {flight.flightNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-5 shadow-lg backdrop-blur-sm border border-gradient-blue/20 dark:border-white/10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Departure
                </h3>
              </div>
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-white/5 dark:to-white/5 p-3.5 rounded-xl">
                  <p className="text-xl font-extrabold text-night dark:text-white">{flight.origin.name}</p>
                  <p className="text-base text-night/70 dark:text-white/70 mt-1">{flight.origin.city}</p>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/10 transition-colors">
                    <span className="text-night/60 dark:text-white/60 font-medium">Scheduled</span>
                    <span className="font-semibold text-night dark:text-white">{formatDateTime(flight.departure.scheduled)}</span>
                  </div>
                  {flight.departure.actual && (
                    <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/10 transition-colors">
                      <span className="text-night/60 dark:text-white/60 font-medium">Actual</span>
                      <span className="font-semibold text-night dark:text-white">{formatDateTime(flight.departure.actual)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/10 transition-colors">
                    <span className="text-night/60 dark:text-white/60 font-medium">Terminal</span>
                    <span className="font-semibold text-primary dark:text-purple-300">{flight.departure.terminal}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-primary/5 dark:hover:bg-white/10 transition-colors">
                    <span className="text-night/60 dark:text-white/60 font-medium">Gate</span>
                    <span className="font-semibold text-primary dark:text-purple-300">{flight.departure.gate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-5 shadow-lg backdrop-blur-sm border border-gradient-purple/20 dark:border-white/10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                  Arrival
                </h3>
              </div>
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-accent/5 to-secondary/5 dark:from-white/5 dark:to-white/5 p-3.5 rounded-xl">
                  <p className="text-xl font-extrabold text-night dark:text-white">{flight.destination.name}</p>
                  <p className="text-base text-night/70 dark:text-white/70 mt-1">{flight.destination.city}</p>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-accent/5 dark:hover:bg-white/10 transition-colors">
                    <span className="text-night/60 dark:text-white/60 font-medium">Scheduled</span>
                    <span className="font-semibold text-night dark:text-white">{formatDateTime(flight.arrival.scheduled)}</span>
                  </div>
                  {flight.arrival.estimated && (
                    <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-accent/5 dark:hover:bg-white/10 transition-colors">
                      <span className="text-night/60 dark:text-white/60 font-medium">Estimated</span>
                      <span className="font-semibold text-night dark:text-white">{formatDateTime(flight.arrival.estimated)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-accent/5 dark:hover:bg-white/10 transition-colors">
                    <span className="text-night/60 dark:text-white/60 font-medium">Terminal</span>
                    <span className="font-semibold text-accent dark:text-pink-300">{flight.arrival.terminal}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-accent/5 dark:hover:bg-white/10 transition-colors">
                    <span className="text-night/60 dark:text-white/60 font-medium">Gate</span>
                    <span className="font-semibold text-accent dark:text-pink-300">{flight.arrival.gate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-gradient-purple/20 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-3.5">
                <div className="bg-white/80 dark:bg-white/5 rounded-xl p-4 shadow-md backdrop-blur-sm border border-gradient-blue/20 dark:border-white/10 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 dark:hover:from-white/10 dark:hover:to-white/10 transition-colors group">
                  <p className="text-sm text-night/60 dark:text-white/60 font-medium mb-2">Status</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(flight.status)} animate-pulse-subtle shadow-md flex items-center gap-1`}>
                      {statusKey(flight.status) === 'on' && <FaCheckCircle />}
                      {statusKey(flight.status) === 'delayed' && <FaClock />}
                      {statusKey(flight.status) === 'cancelled' && <FaTimesCircle />}
                      {flight.status}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-gradient-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="bg-white/80 dark:bg-white/5 rounded-xl p-4 shadow-md backdrop-blur-sm border border-gradient-purple/20 dark:border-white/10 hover:bg-gradient-to-r hover:from-accent/5 hover:to-secondary/5 dark:hover:from-white/10 dark:hover:to-white/10 transition-colors group">
                  <p className="text-sm text-night/60 dark:text-white/60 font-medium mb-2">Aircraft</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-night dark:text-white">{flight.aircraft}</span>
                    <div className="w-2 h-2 rounded-full bg-gradient-purple opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-3.5">
                <div className="bg-white/80 dark:bg-white/5 rounded-xl p-4 shadow-md backdrop-blur-sm border border-gradient-pink/20 dark:border-white/10 hover:bg-gradient-to-r hover:from-secondary/5 hover:to-primary/5 dark:hover:from-white/10 dark:hover:to-white/10 transition-colors group">
                  <p className="text-sm text-night/60 dark:text-white/60 font-medium mb-2">Duration</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-night dark:text-white">{flight.duration}</span>
                    <div className="w-2 h-2 rounded-full bg-gradient-pink opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                {flight.delay > 0 && (
                  <div className="bg-white/80 dark:bg-white/5 rounded-xl p-4 shadow-md backdrop-blur-sm border border-error/20 dark:border-white/10 hover:bg-error/5 dark:hover:bg-white/10 transition-colors group">
                    <p className="text-sm text-night/60 dark:text-white/60 font-medium mb-2">Delay</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-error animate-pulse-subtle">{flight.delay} minutes</span>
                      <div className="w-2 h-2 rounded-full bg-error opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};