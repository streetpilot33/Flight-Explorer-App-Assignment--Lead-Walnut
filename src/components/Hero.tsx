import { DarkModeToggle } from './DarkModeToggle';
import { motion } from 'framer-motion';

export const Hero = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
			className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/80 to-white/50 dark:from-white/[0.04] dark:to-white/[0.02] backdrop-blur-xl p-6 sm:p-10 shadow-elevated"
		>
			<motion.div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-3xl" animate={{ x: [0, 10, 0], y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 12 }} />
			<motion.div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-blue-600/15 to-cyan-500/15 blur-3xl" animate={{ x: [0, -12, 0], y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 14 }} />
			<div className="relative z-10 flex items-start justify-between gap-4">
				<div className="space-y-3">
					<p className="uppercase tracking-[0.35em] text-xs text-night/60 dark:text-white/60">crafted for the flightworthy</p>
					<h1 className="text-[10vw] leading-[0.9] sm:text-7xl md:text-8xl font-extrabold">
						<span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-purple-300 dark:to-pink-300">A REFLECTION</span>
						<span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-purple-300 dark:to-pink-300">OF CLARITY.</span>
					</h1>
					<p className="max-w-xl text-night/70 dark:text-white/70 text-base sm:text-lg">Search flights, track statuses, and curate a personal watchlist. Designed with precision and motion for those who value detail.</p>
					<div className="flex items-center gap-3 pt-2">
						<a href="#search" className="button-hover px-5 py-3 rounded-full bg-night text-white text-sm font-semibold shadow-card hover:shadow-elevated dark:bg-white dark:text-night">Search flights</a>
						<a href="#watchlist" className="px-5 py-3 rounded-full border border-night/20 text-night/90 dark:border-white/20 dark:text-white/90 text-sm font-semibold hover:bg-night/5 dark:hover:bg-white/10 transition-colors">View watchlist</a>
					</div>
				</div>
				<div className="hidden sm:block">
					<DarkModeToggle />
				</div>
			</div>
		</motion.section>
	);
};
