import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const DarkModeToggle = () => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === 'dark';
	return (
		<motion.button
			whileHover={{ scale: 1.03 }}
			whileTap={{ scale: 0.96, rotate: isDark ? -6 : 6 }}
			onClick={toggleTheme}
			aria-label="Toggle dark mode"
			className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-full border transition-all
				${isDark ? 'bg-night text-white border-white/10 shadow-elevated' : 'bg-white text-night border-black/10 shadow-card'}`}
		>
			<span className="relative flex items-center justify-center w-5 h-5">
				<motion.span
					animate={{ rotate: isDark ? 20 : 0 }}
					transition={{ type: 'spring', stiffness: 200, damping: 15 }}
					className={`absolute inset-0 rounded-full transition-all ${isDark ? 'bg-yellow-400 blur-[2px] opacity-80' : 'bg-blue-500/20 opacity-0'}`}
				/>
				{isDark ? <FaMoon size={16} /> : <FaSun size={16} />}
			</span>
			<span className="text-sm font-medium">{isDark ? 'Dark' : 'Light'}</span>
		</motion.button>
	);
};
